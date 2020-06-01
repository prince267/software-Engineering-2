import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { get } from "../../api/index";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import "./listingPage.css";

const DepartmentDetails = require("../../assets/Departments.json");

const useStyles = (theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
  },
  root1: {
    Width: 50,
  },
  root2: {
    display: "flex",
    marginTop: 100,
    marginLeft: "43%",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginLeft: 13,
    fontSize: 13,
    marginBottom: 18,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoding: true,
      Department: "",
      Courses: [],
      Cities: [],
      States: [],
      selectedCity: "",
      selectedState: "",
      selectedCourse: "",
      CollegeData: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  async componentDidMount() {
    this.setState({ Department: this.props.location.state.data });
    let Data = await get(
      `http://localhost:8080/college?Department=${this.props.location.state.data}`
    );
    this.setState({ isLoding: false });
    this.setState({ CollegeData: Data });
    let course = await get(
      `http://localhost:8080/course?department=${this.props.location.state.data}`
    );
    this.setState({ Courses: course });
    let cities = await get(`http://localhost:8080/address?type=city`);
    this.setState({ Cities: cities });
    let states = await get("http://localhost:8080/address?type=state");
    this.setState({ States: states });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.location.state.data !== prevProps.location.state.data) {
      this.setState({
        Department: this.props.location.state.data,
        selectedCity: "",
        selectedState: "",
        selectedCourse: "",
        isLoding: true,
        isNoData: false,
        CollegeData: [],
      });
      let data = await get(
        `http://localhost:8080/college?Department=${this.props.location.state.data}`
      );
      this.setState({ isLoding: false });
      this.setState({ CollegeData: data });
      let cities = await get(`http://localhost:8080/address?type=city`);
      this.setState({ Cities: cities });
      let course = await get(
        `http://localhost:8080/course?department=${this.props.location.state.data}`
      );
      this.setState({ Courses: course });
    }
  }
  
  DepartmentDetailsText(Department) {
    if (Department === "Engineering") {
      return <p>{DepartmentDetails.Engineering}</p>;
    }
    if (Department === "Medical") {
      return <p>{DepartmentDetails.Medical}</p>;
    }
    if (Department === "Commerce") {
      return <p>{DepartmentDetails.Commerce}</p>;
    }
    if (Department === "Management") {
      return <p>{DepartmentDetails.Management}</p>;
    }
  }

  loader() {
    if (this.state.isLoding) {
      return (
        <div>
          <div className="loader"></div>
        </div>
      );
    } else if (this.state.CollegeData.length === 0) {
      return (
        <div>
          <p className="noResult">Sorry !! No College Found</p>
        </div>
      );
    }
  }

  CityList = () => {
    return this.state.Cities.map((city) => (
      <MenuItem value={city.city}>{city.city}</MenuItem>
    ));
  };

  StateList = () => {
    return this.state.States.map((state) => (
      <MenuItem value={state.state}>{state.state}</MenuItem>
    ));
  };

  CourseList = () => {
    return this.state.Courses.map((course) => (
      <MenuItem value={course.id}>{course.CourseName}</MenuItem>
    ));
  };
  
  async handleChange(event) {
    this.setState({ selectedState: event.target.value });
    if (event.target.value === "") {
      let cities = await get(`http://localhost:8080/address?type=city`);
      this.setState({ Cities: cities });
    } else {
      let cities = await get(
        `http://localhost:8080/address?state=${event.target.value}`
      );
      this.setState({ Cities: cities });
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    const {
      selectedCity,
      selectedCourse,
      selectedState,
      Department,
    } = this.state;
    console.log(selectedCity, selectedCourse, selectedState);
    if (selectedCity === "" && selectedCourse === "" && selectedState === "") {
      this.setState({
        isLoding: true,
        CollegeData: [],
      });
      let data = await get(
        `http://localhost:8080/college?Department=${this.props.location.state.data}`
      );
      this.setState({ isLoding: false });
      this.setState({ CollegeData: data });
    } else {
      let url = `http://localhost:8080/filter?city=${selectedCity}&state=${selectedState}&course=${selectedCourse}&department=${Department}`;
      this.setState({
        isLoding: true,
        CollegeData: [],
      });
      let data = await get(url);
      this.setState({ isLoding: false });
      this.setState({ CollegeData: data });
    }
  }

  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <div>
        <p style={{ textAlign: "center", fontSize: 30 }}>
          What is {this.state.Department} ?
        </p>
        <p
          style={{
            textAlign: "left",
            fontSize: 16,
            marginLeft: 25,
            marginRight: 30,
          }}
        >
          {this.DepartmentDetailsText(this.state.Department)}
        </p>
        <br />
        <br />
        <div className={classes.root}>
          <Card
            className={classes.root1}
            variant="none"
            style={{ width: 300, marginLeft: 25, marginRight: 30 }}
          >
            <CardContent>
              <Typography variant="h6" component="h9">
                Filter College
              </Typography>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                * Select State, City, Courses for Filter
              </Typography>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.selectedState}
                  onChange={this.handleChange}
                >
                  <MenuItem value={""}>--</MenuItem>
                  {this.StateList()}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.selectedCity}
                  onChange={(event) => {
                    this.setState({ selectedCity: event.target.value });
                  }}
                >
                  <MenuItem value={""}>--</MenuItem>
                  {this.CityList()}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Courses</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.selectedCourse}
                  onChange={(event) => {
                    this.setState({ selectedCourse: event.target.value });
                  }}>
                  <MenuItem value={""}>--</MenuItem>
                  {this.CourseList()}
                </Select>
              </FormControl>
              <Button
                style={{ marginLeft: "24%", marginTop: 10 }}
                onClick={this.handleSubmit}
                variant="contained"
                color="primary"
              >
                Apply Filter
              </Button>
            </CardContent>
          </Card>
          <GridList cellHeight={160} className={classes.gridList} cols={2}>
            {this.loader()}

            {this.state.CollegeData.map((college) => (
              <Card
                className={classes.root1}
                style={{
                  width: 450,
                  height: 280,
                  marginLeft: 30,
                  marginBottom: 30,
                }}
              >
                <CardHeader
                  style={{ backgroundColor: "#F5F5F5" }}
                  avatar={
                    <Avatar>
                      <img src={college.Logo} alt="Logo" />
                    </Avatar>
                  }
                  title={college.CollegeName}
                  subheader={college.City}
                />
                <CardContent>
                  <div>
                    <div style={{ display: "inline-block", marginRight: 70 }}>
                      <Typography variant="h7" component="h9">
                        {bull}Fees
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {college.Fees} per Year
                      </Typography>
                      <Typography variant="h7" component="h9">
                        {bull} Rating
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        <Rating
                          name="read-only"
                          size="small"
                          value={college.Rating}
                          readOnly
                        />
                      </Typography>
                    </div>
                    <div style={{ display: "inline-block", marginLeft: 70 }}>
                      <Typography variant="h7" component="h9">
                        {bull} Average Package
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        ₹ {college.MedianSalary} LPA
                      </Typography>
                      <Typography variant="h7" component="h9">
                        {bull} Website
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        <a
                          href={college.Website}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {college.Website}
                        </a>
                      </Typography>
                    </div>
                  </div>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      window.open(`/cdp?${college.CollegeName}`, "_blank");
                    }}
                  >
                    Explore More
                  </Button>
                </CardActions>
              </Card>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Listing);

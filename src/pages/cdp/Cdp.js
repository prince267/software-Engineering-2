import React, { Component } from "react";
import { get } from "../../api/index";
import Slider from "react-slick";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Typography from "@material-ui/core/Typography";
import LanguageIcon from "@material-ui/icons/Language";
import "./Cdp.css";
import NotFound from "../notFound/notFound";

export default class Cdp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CollegeData: {},
      notFound: false,
    };
  }
  async componentDidMount() {
    let collegeName = decodeURI(this.props.location.search).replace("?", "");
    let collegeData = await get(
      "http://localhost:8080/college?name=" + collegeName
    );
    if (collegeData.CollegeName === undefined) {
      this.setState({ notFound: true });
    } else {
      this.setState({ CollegeData: collegeData });
    }
  }
  render() {
    var settings = {
      dots: true,
      autoplay: true,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    const bull = (
      <span
        style={{
          display: "inline-block",
          margin: "0 2px",
          transform: "scale(0.8)",
        }}
      >
        •
      </span>
    );
    const clgname = (
      <h4 style={{ color: "black", display: "inline" }}>
        {this.state.CollegeData.CollegeName}
      </h4>
    );
    if (this.state.notFound) {
      return <NotFound />;
    } else {
      return (
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div className="body">
            <Slider {...settings}>
              <div>
                <img
                  style={{ height: 500 }}
                  src={this.state.CollegeData.Image1}
                  alt="first"
                />
              </div>
              <div>
                <img
                  style={{ height: 500 }}
                  src={this.state.CollegeData.Image2}
                  alt="second"
                />
              </div>
              <div>
                <img
                  style={{ height: 500 }}
                  src={this.state.CollegeData.Image3}
                  alt="third"
                />
              </div>
            </Slider>
          </div>
          <div className="body1">
            <div>
              <img
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  float: "left",
                  marginRight: 15,
                }}
                src={this.state.CollegeData.Logo}
                alt="Logo"
              />
            </div>
            <div>
              <h2 style={{ margin: "0px" }}>
                {this.state.CollegeData.CollegeName}
              </h2>
            </div>
            <div style={{ fontSize: 15, marginTop: 5, color: "#484848" }}>
              <LocationOnIcon fontSize="small" style={{ float: "left" }} />
              {this.state.CollegeData.Address1}, {this.state.CollegeData.City},{" "}
              {this.state.CollegeData.State}
            </div>
            <div style={{ marginTop: 20 }}>
              <hr />
            </div>

            <br />
            <Typography style={{ fontSize: 16 }}>{bull} About :</Typography>
            <Typography
              style={{
                marginLeft: 13,
                fontSize: 14,
                marginBottom: 18,
              }}
              color="textSecondary"
            >
              {this.state.CollegeData.Description}. {clgname} college campus
              includes libraries, lecture halls, residence halls, student
              centers or dining halls, and park-like settings. {clgname} campus
              is a collection of buildings and grounds that belong to a given
              institution, either academic or non-academic.
            </Typography>

            <div className="grid-container">
              <div className="grid-item">
                <Typography style={{ fontSize: 16 }}>
                  {bull} Course Offered :
                </Typography>
                <Typography
                  style={{
                    marginLeft: 13,
                    fontSize: 14,
                    marginBottom: 18,
                  }}
                  color="textSecondary"
                >
                  {this.state.CollegeData.CourseName}{" "}
                  <span style={{ color: "black" }}>
                    [{this.state.CollegeData.Department}]
                  </span>
                </Typography>
              </div>
              <div className="grid-item">
                <Typography style={{ fontSize: 16 }}>{bull} Fees :</Typography>
                <Typography
                  style={{
                    marginLeft: 13,
                    fontSize: 14,
                    marginBottom: 18,
                  }}
                  color="textSecondary"
                >
                  {this.state.CollegeData.Fees} per Year
                </Typography>
              </div>
              <div className="grid-item">
                <Typography style={{ fontSize: 16 }}>
                  {bull} Average Package :
                </Typography>
                <Typography
                  style={{
                    marginLeft: 13,
                    fontSize: 14,
                    marginBottom: 18,
                  }}
                  color="textSecondary"
                >
                  {this.state.CollegeData.MedianSalary} LPA
                </Typography>
              </div>
              <div className="grid-item">
                <Typography style={{ fontSize: 16 }}>
                  {bull} Rating :
                </Typography>
                <Typography
                  style={{
                    marginLeft: 13,
                    fontSize: 14,
                    marginBottom: 18,
                    color: "blue",
                  }}
                >
                  {this.state.CollegeData.Rating} / 5
                </Typography>
              </div>
              <div className="grid-item" style={{ marginTop: 25 }}>
                <p>
                  <PhoneIcon
                    fontSize="small"
                    style={{ float: "left", marginRight: 10 }}
                  />{" "}
                  {this.state.CollegeData.Phone}
                </p>
              </div>
              <div className="grid-item" style={{ marginTop: 25 }}>
                <p>
                  {" "}
                  <LanguageIcon
                    fontSize="small"
                    style={{ float: "left", marginRight: 10 }}
                  />{" "}
                  <a href={this.state.CollegeData.Website}>
                    {this.state.CollegeData.Website}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

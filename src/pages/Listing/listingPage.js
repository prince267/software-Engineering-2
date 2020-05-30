import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
// import LazyLoad from 'react-lazyload';

import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import './listingPage.css'
const DepartmentDetails = require('../../assets/Departments.json')
const useStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        // padding: 20,
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 1000,
    },
    root1: {
        Width: 50,
    },
    root2: {
        display: 'flex',
        marginTop: 100,
        marginLeft: '43%'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginLeft: 13,
        fontSize: 13,
        marginBottom: 18,
    },
});

class Listing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Department: "",
            Course:"",
            City:"",
            State:"",
            CollegeData: []
        }
    }
    async componentDidMount() {
        this.setState({ Department: this.props.location.state.data })
        let response = await fetch(`http://localhost:8080/college?Department=${this.props.location.state.data}`, {
            method: 'GET',
            header: {
                'Access-Control-Allow-Origin': '*'
            },
            redirect: 'follow'
        });
        let data = await response.json()
        this.setState({ CollegeData: data })
        // console.log("****** ", this.state.Department)
    }


    async componentDidUpdate(prevProps, prevState) {

        if (this.props.location.state.data !== prevProps.location.state.data) {
            this.setState({ Department: this.props.location.state.data })
            this.setState({CollegeData:[]})
            // this.setState({isLoading:true})
            let response = await fetch(`http://localhost:8080/college?Department=${this.props.location.state.data}`, {
                method: 'GET',
                header: {
                    'Access-Control-Allow-Origin': '*'
                },
                redirect: 'follow'
            });
            let data = await response.json()
            // this.setState({isLoading:false})
            this.setState({ CollegeData: data })
        }
    }
    DepartmentDetailsText(Department) {
        // console.log(Department)
        if (Department === "Engineering") {
            return (
                <p>{DepartmentDetails.Engineering}</p>
            )
        }
        if (Department === "Medical") {
            return (
                <p>{DepartmentDetails.Medical}</p>
            )
        }
        if (Department === "Commerce") {
            return (
                <p>{DepartmentDetails.Commerce}</p>
            )
        }
        if (Department === "Management") {
            return (
                <p>{DepartmentDetails.Management}</p>
            )
        }
    }

    loader() {
        if (this.state.CollegeData.length === 0) {
            return (
                <div>
                    <div className="loader"></div>
                </div>
                
            )
        }
    }
    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;

        return (
            <div>
                <p style={{ textAlign: 'center', fontSize: 30 }}>What is {this.state.Department} ?</p>
                <p style={{ textAlign: 'left', fontSize: 18, marginLeft: 25, marginRight: 30 }}>
                    {this.DepartmentDetailsText(this.state.Department)}
                </p>
                <br /><br />
                <div className={classes.root}>
                    <Card className={classes.root1} variant="none" style={{ width: 300, marginLeft: 25, marginRight: 30 }}>
                        <CardContent>
                            {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Word of the Day
        </Typography> */}
                            <Typography variant="h5" component="h2">
                                Filter
        </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                adjective
        </Typography>
                            <Typography variant="body2" component="p">
                                well meaning and kindly.
          <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                    <GridList cellHeight={160} className={classes.gridList} cols={2}>
                    
                       
                       {this.loader()}
                       
                    
                        {this.state.CollegeData.map((college) => (
                        // <GridListTile key={tile.Logo}>
                        <Card className={classes.root1} style={{ width: 450, height: 300, marginLeft: 30, marginBottom: 30 }}>
                            <CardHeader
                                style={{ backgroundColor: '#F5F5F5' }}
                                avatar={
                                    <Avatar>
                                        <img src={college.Logo} alt="Logo" />
                                    </Avatar>
                                }
                                title={college.CollegeName}
                                subheader={college.City}
                            />
                            <CardContent>
                                {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Word of the Day
        </Typography> */}

                                <div>
                                    <div style={{ display: 'inline-block', marginRight: 70 }}>
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
                                            <Rating name="read-only" size="small" value={college.Rating} readOnly />
                                        </Typography>

                                    </div>
                                    <div style={{ display: 'inline-block', marginLeft: 70 }}>
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
                                            {college.Website}
                                        </Typography>
                                    </div>

                                </div>


                            </CardContent>
                            <CardActions>
                                <Button size="small">Explore More</Button>
                            </CardActions>
                        </Card>

                        // </GridListTile>
                    ))}
                    </GridList>
                </div>
            </div>

        )
    }
}

export default withStyles(useStyles)(Listing);
import React, { Component } from 'react';
import { get } from '../../api/index'
import Slider from "react-slick";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import './Cdp.css'
export default class Cdp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            CollegeData: {}
        }
    }
    async componentDidMount() {
        let collegeName = decodeURI(this.props.location.search).replace('?', '')
        let collegeData = await get("http://localhost:8080/college?name=" + collegeName)
        this.setState({ CollegeData: collegeData })
        console.log(this.state.CollegeData)
    }
    render() {
        var settings = {
            dots: true,
            autoplay: true,
            infinite: true,
            speed: 800,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div className="body">
                    <Slider {...settings}>
                        <div >
                            <img style={{ height: 500 }} src={this.state.CollegeData.Image1} alt="first" />
                        </div>
                        <div>
                            <img style={{ height: 500 }} src={this.state.CollegeData.Image2} alt="second" />
                        </div>
                        <div>
                            <img style={{ height: 500 }} src={this.state.CollegeData.Image3} alt="forth" />
                        </div>
                    </Slider>
                </div>
                <div className="body1">
                    <div>
                        <img style={{ height: '50px', width: '50px', borderRadius: '50%', float: 'left', marginRight: 15 }} src={this.state.CollegeData.Logo} alt="Logo" />

                    </div>
                    <div>
                        <h2 style={{ margin: '0px' }}> {this.state.CollegeData.CollegeName}</h2>
                    </div>
                    <div style={{ fontSize: 15, marginTop: 5, color: '#484848' }}>
                        <LocationOnIcon fontSize='small' style={{ float: 'left' }} />
                        {this.state.CollegeData.Address1}, {this.state.CollegeData.City}, {this.state.CollegeData.State}
                    </div>

                    <p>College Description : {this.state.CollegeData.Description}</p>
                    <p><PhoneIcon fontSize='small' style={{ float: 'left' }} /> {this.state.CollegeData.Phone}</p>
                    <p>Course Offered : {this.state.CollegeData.CourseName} [{this.state.CollegeData.Department}]</p>
                    <p>Fees : {this.state.CollegeData.Fees} per Year</p>
                    <p>Average Package: {this.state.CollegeData.MedianSalary} LPA</p>
                    <p>Rating : {this.state.CollegeData.Rating}</p>
                    <p>Website: <a href={this.state.CollegeData.Website}>{this.state.CollegeData.Website}</a></p>
                </div>


            </div>


        )
    }
}
import React, { Component } from "react";
import Slider from "react-slick";
import first from "../../assets/first.jpg";
import third from "../../assets/third.jpg";
import second from "../../assets/second.jpeg";
import forth from "../../assets/forth.jpeg";
import "./home.css";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { get } from "../../api/index";

// const getdat= async() =>{
//     const data = await get("http://localhost:8080/college?name=*")
//     return data
// }

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: [],
      value: "",
      college: "",
      inputValue: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  async componentDidMount() {}
  handleSubmit() {
    window.open(`/cdp?${this.state.college}`, "_blank");
  }

  async handleChange(event) {
    this.setState({ college: event.target.value });
    let data = await get(
      `http://localhost:8080/college?name=%${event.target.value}%`
    );
    this.setState({
      Data: data,
    });

    // let data = await get(`http://localhost:8080/college?name=%${newValue}%`);
  }
  render() {
    var settings = {
      dots: false,
      arrows: false,
      autoplay: true,
      infinite: true,
      speed: 500,
      pauseOnHover: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    };

    return (
      <div className="container">
        <Slider {...settings}>
          <div>
            <img className="image" src={first} alt="first" />
          </div>
          <div>
            <img className="image" src={second} alt="second" />
          </div>
          <div>
            <img className="image" src={forth} alt="forth" />
          </div>
          <div>
            <img className="image" src={third} alt="third" />
          </div>
        </Slider>
        <div className="text-block">
          <p className="headText">Find Colleges that are Best for You</p>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Autocomplete
              value={this.state.value}
              onChange={(event, newValue) => {
                if (newValue === null) {
                  this.setState({
                    value: newValue,
                    college: "",
                  });
                } else {
                  this.setState({
                    value: newValue,
                    college: newValue.CollegeName,
                  });
                }
              }}
              inputValue={this.state.inputValue}
              onInputChange={(event, newInputValue) => {
                this.setState({ inputValue: newInputValue });
              }}
              id="combo-box-demo"
              options={this.state.Data}
              getOptionLabel={(option) => option.CollegeName}
              style={{ width: 510 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={this.handleChange}
                  label="Search Colleges & Schools"
                  variant="filled"
                  style={{
                    backgroundColor: "white",
                    borderRadius: 8,
                    marginLeft: 15,
                    marginBottom: 15,
                  }}
                />
              )}
            />
            <button
              onClick={this.handleSubmit}
              disabled={this.state.college.length === 0}
              className="but"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
}

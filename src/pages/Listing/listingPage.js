import React, { Component } from 'react';
import { useLocation } from "react-router-dom";

export default class Listing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hello: "",
            CollegeData: []
        }
    }
    print = (a) => {
        console.log(a)
    }
  async componentDidMount() {
        this.setState({ hello: this.props.location.state.data })
        let response = await fetch(`http://localhost:8080/user?Department=${this.props.location.state.data}`);
            let data = await response.json()
            this.setState({ CollegeData: data })
        // console.log("****** ", this.state.hello)
    }


    async componentDidUpdate(prevProps, prevState) {


        console.log(",,,,,", prevState)
        //   console.log(prevProps)
        console.log("$$$$$$$ ", this.props.location.state)
        if (this.props.location.state.data != prevProps.location.state.data) {
            this.setState({ hello: this.props.location.state.data })
            let response = await fetch(`http://localhost:8080/user?Department=${this.props.location.state.data}`);
            let data = await response.json()
            this.setState({ CollegeData: data })
        }
        // this.setState({hello:this.props.location.state})
        // console.log(this.state.hello)
    }
    render() {
        var a = this.props.location.state;
        // this.print(a)
        return (
            <div>
                {this.state.hello}  Listing page
        <p>{this.state.CollegeData.length}</p>
            </div>

        )
    }
}
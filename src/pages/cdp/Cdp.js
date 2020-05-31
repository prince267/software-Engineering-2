import React, {Component} from 'react';

export default class Cdp extends Component {
    constructor(props){
        super(props)
        this.state={
            CollegeName:""
        }
    }
    componentDidMount(){
        let collegeName=decodeURI(this.props.location.search).replace('?','')
        this.setState({CollegeName:collegeName})
    }
    render(){
        return(
            <div>
                <p>college name {this.state.CollegeName} description page working</p>
            </div>
        )
    }
}
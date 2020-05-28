import React, { Component } from 'react';
import { useLocation } from "react-router-dom";
export default function Listing(props) {
    var a = props.location.state.data
    console.log(a)
    return (
        <div>

            <p>{a} Page</p>
        </div>
    )

}
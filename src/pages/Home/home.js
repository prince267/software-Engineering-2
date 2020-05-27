import React from 'react';
import Slider from "react-slick";
import first from '../../assets/first.jpg'
import third from '../../assets/third.jpg'
import second from '../../assets/second.jpeg'
import forth from '../../assets/forth.jpeg'
import "./home.css";


export default function Home() {
    var settings = {
        dots: false,
        arrows: false,
        autoplay: true,
        infinite: true,
        speed: 500,
        pauseOnHover: false,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="container">
            <Slider {...settings}>
                <div >
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

                <p className="headText">
                    Find Colleges that are Best for You
            </p>
                <input type="text" id="fname" name="firstname" placeholder="Search Colleges & Schools" />
                <button
                    className="but">
                    Search
            </button>

            </div>
        </div>

    )
}
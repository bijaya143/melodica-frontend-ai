import React from "react";
import Slider from "react-slick";
import HeroSlideCard from "./HeroSlideCard";
import "./css/HeroSlider.css";
import { Link } from "react-router-dom";

const HeroSlider = ({ items, type }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1, // Corrected from 0 to 1
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 1024, // Large tablets or small laptops
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 768, // Tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "30px",
        },
      },
      {
        breakpoint: 600, // Small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <div className="hero-slider">
      <h3 className="section-title">Crafted For You</h3>
      <Slider {...settings}>
        {items.slice(0, 5).map((item, index) => (
          <Link to={`/song/${item._id}`} key={index}>
            <div className="slider-item">
              <HeroSlideCard item={item} type={type} />
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;

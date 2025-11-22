import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import imgslider1 from "../../assets/images/slide-1.jpg";
import imgslider2 from "../../assets/images/slider-2.jpg";
import product1 from "../../assets/images/product-single-img-3.jpg";
import product2 from "../../assets/images/product-single-img-2.jpg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Mainslider() {
  const [showSlider, setShowSlider] = useState(false); // 👈 حالة للتحكم بالظهور

  useEffect(() => {
     setTimeout(() => {
      setShowSlider(true);
    }, 800);

    
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    adaptiveHeight: true,
  };

  return (
    <div className="d-flex w-100 my-4" style={{ gap: 16, height: "345px" }}>
      {showSlider ? (
        <>
          <div className="w-75 h-100 mx-auto">
            <Slider {...settings}>
              <div>
                <img src={imgslider1} alt="slider 1" className="w-100" />
              </div>
              <div>
                <img src={imgslider2} alt="slider 2" className="w-100" />
              </div>
            </Slider>
          </div>

          <div className="w-25 d-flex flex-column justify-content-between">
            <img src={product1} alt="product 1" className="w-100 mb-2 h-50" />
            <img src={product2} alt="product 2" className="w-100 h-50" />
          </div>
        </>
      ) :null}
    </div>
  );
}

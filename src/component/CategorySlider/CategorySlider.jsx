import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

function CategorySlider() {
  var settings = {
    dots: FontFaceSetLoadEvent,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  let [category, setCategory] = useState([]);
  function getCategory() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setCategory(data.data);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <Slider {...settings}>
        {category?.map((img) => {
          return (
            <>
              <img src={img.image} alt={img.name} className="category-img" />
              <h5>{img.name}</h5>
            </>
          );
        })}
      </Slider>
    </>
  );
}

export default CategorySlider;

import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick-theme.css";

import poster5 from '../assets/ATRISTRY POSTER.png';
import poster1 from '../assets/data.jpeg';
import poster2 from '../assets/loign.jpeg';
import poster3 from '../assets/Net.jpeg';
import poster4 from '../assets/CODE SPRINT.png';

const container = (delay) => ({
  hidden: {x: -100, opacity: 0},
  visible: {
      x:0,
      opacity:1,
      transition:{duration:0.5, delay:delay},

  },
})

const Poster = () => {
  const data = [
    { img: poster1 },
    { img: poster2 },
    { img: poster3 },
    { img: poster4 },
    { img: poster5 },
  ];

  const settings = {
    infinite: true,
    pauseOnHover: false,
    speed: 2000,
    slidesToShow: 3, 
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0', 
    focusOnSelect: false,
    autoplay: true, 
    autoplaySpeed: 1000, 
    cssEase: 'ease-in-out',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="border-b border-neutral-800 pb-40">
      <motion.h1 
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -100 }}
      transition={{ duration: 1.5 }}

      className="my-20 text-center text-4xl text-white ">Posters Designs</motion.h1>
      <div className="w-3/4 m-auto">
        <div className="mt-20">
          <Slider {...settings}>
            {data.map((d, index) => (
              <div key={index} className="mx-6">
                <img className="h-64 w-64 object-contain  drop-shadow-2xl" src={d.img} alt="" />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      
    </div>
  );
};

export default Poster;

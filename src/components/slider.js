import React, { useEffect, useRef } from "react";
import Swiper from "swiper";

function Slider({ sliderdata, sliderId }) {
  const slideshowRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (sliderdata && slideshowRef.current) {
      const swiper = new Swiper(slideshowRef.current, {
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        slidesPerView: 1,
        spaceBetween: 20,
        on: {
          slideChange: () => {},
        },
      });

      swiperRef.current = swiper;

      const interval = setInterval(() => {
        swiperRef.current.slideNext();
      }, 5000);

      return () => {
        clearInterval(interval);
        swiperRef.current.destroy();
      };
    }
  }, [sliderdata, sliderId]);

  return (
    <div
      id={sliderId}
      className="swiper-container hero-slider"
      ref={slideshowRef}
    >
      <div className="swiper-wrapper">
        {sliderdata?.map((data) => (
          <div className="swiper-slide hero-content-wrap" key={data.id}>
            <img src={data.image} alt={data.title} id="newslidebanner" />
            <div className="hero-content-overlay position-absolute w-100 h-100">
              <div className="container h-100"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;

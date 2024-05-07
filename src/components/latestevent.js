import React, { useEffect, useRef, useState } from "react";
import Swiper from "swiper";

import "swiper/css";

function Latestevent() {
  const slideshowRef = useRef(null);
  // const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    {
      id: 1,
      img: "https://stcharleschennai.com/images/Bday.jpg",
      title: "Bring water to the children 1",
      content:
        "  Lorem ipsum dolor sit amet, consectetur adipiscingelit. Mauris tempus vestibulum mauris.",
    },
    {
      id: 2,
      img: "https://stcharleschennai.com/images/Bday.jpg",
      title: "Bring water to the children 2",
      content:
        "  Lorem ipsum dolor sit amet, consectetur adipiscingelit. Mauris tempus vestibulum mauris.",
    },
    {
      id: 3,
      img: "https://stcharleschennai.com/images/Bday.jpg",
      title: "Bring water to the children 3",
      content:
        "  Lorem ipsum dolor sit amet, consectetur adipiscingelit. Mauris tempus vestibulum mauris.",
    },
    {
      id: 4,
      img: "https://stcharleschennai.com/images/Bday.jpg",
      title: "Bring water to the children 4",
      content:
        "  Lorem ipsum dolor sit amet, consectetur adipiscingelit. Mauris tempus vestibulum mauris.",
    },
    {
      id: 5,
      img: "https://stcharleschennai.com/images/Bday.jpg",
      title: "Bring water to the children 5",
      content:
        "  Lorem ipsum dolor sit amet, consectetur adipiscingelit. Mauris tempus vestibulum mauris.",
    },
    {
      id: 6,
      img: "https://stcharleschennai.com/images/Bday.jpg",
      title: "Bring water to the children  6",
      content:
        "  Lorem ipsum dolor sit amet, consectetur adipiscingelit. Mauris tempus vestibulum mauris.",
    },
    {
      id: 7,
      img: "https://stcharleschennai.com/images/Bday.jpg",
      title: "Bring water to the children 7",
      content:
        "  Lorem ipsum dolor sit amet, consectetur adipiscingelit. Mauris tempus vestibulum mauris.",
    },
    {
      id: 8,
      img: "https://stcharleschennai.com/images/Bday.jpg",
      title: "Bring water to the children  8",
      content:
        "  Lorem ipsum dolor sit amet, consectetur adipiscingelit. Mauris tempus vestibulum mauris.",
    },
    {
      id: 9,
      img: "https://stcharleschennai.com/images/Bday.jpg",
      title: "Bring water to the children  9",
      content:
        "  Lorem ipsum dolor sit amet, consectetur adipiscingelit. Mauris tempus vestibulum mauris.",
    },
  ];

  useEffect(() => {
    // const slides = slideshowRef.current.querySelectorAll(".swiper-slide");

    const swiper = new Swiper(slideshowRef.current, {
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      slidesPerView: 1, // Default slidesPerView
      spaceBetween: 20,
      on: {
        slideChange: () => {
          // setCurrentSlide(swiper.realIndex);
        },
      },
      breakpoints: {
        // Set different slidesPerView for different screen sizes
        768: {
          slidesPerView: 2, // 2 slides per view on screens larger than 768px
        },
        1024: {
          slidesPerView: 3, // 3 slides per view on screens larger than 1024px
        },
        1200: {
          slidesPerView: 4, // 4 slides per view on screens larger than 1200px
        },
      },
    });

    const interval = setInterval(() => {
      swiper.slideNext();
    }, 3000);

    return () => {
      clearInterval(interval);
      swiper.destroy();
    };
  }, []);

  return (
    <>
      <div className="our-causes">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h2 className="entry-title">Latest Events</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div
                className="swiper-container causes-slider"
                ref={slideshowRef}
              >
                <div className="swiper-wrapper">
                  {data?.map((data) => (
                    <div className="swiper-slide" key={data.id}>
                      <div className="cause-wrap">
                        <figure className="m-0">
                          <img
                            src={data.img}
                            alt="Bring water to the children"
                          />
                        </figure>
                        <div className="cause-content-wrap">
                          <header className="entry-header d-flex flex-wrap align-items-center">
                            <h3 className="entry-title w-100 m-0">
                              <a href="/">{data.title}</a>
                            </h3>
                          </header>
                          <div className="entry-content">
                            <p className="m-0">{data.content}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="swiper-button-next" />
                <div className="swiper-button-prev" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Latestevent;

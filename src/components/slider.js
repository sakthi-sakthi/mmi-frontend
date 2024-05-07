import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Slider = React.memo(({ sliderdata }) => {

    return (
        <>
            <section className="hero-one slidesect">
                <Carousel
                    autoPlay
                    infiniteLoop
                    showArrows
                    showStatus
                    showThumbs={false}
                    stopOnHover={true}
                    interval={5000}
                    transitionTime={500}
                >
                    {sliderdata?.map((item, index) => (
                        <div key={index}>
                            <img src={item?.image} alt="hero-one-slider" />
                            <div className="hero-data text-center">
                                <h1 className='text-white'>
                                    {item?.title}
                                </h1>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </section>
        </>
    );
});

export default Slider;

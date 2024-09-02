import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import hotal1 from '../../../asesets/travel/hotal-1.webp';
import hotal2 from '../../../asesets/travel/hotal-2.webp';
import hotal3 from '../../../asesets/travel/hotal-3.avif';
import ImageZoom from 'js-image-zoom';

// import './SlideImg.css'; // Import CSS for additional styles

function SlideImg() {
    const settings = {
        dots: false,
        // infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 2000,
    };



    const images = [
        { src: hotal1, alt: 'Hotel 1' },
        { src: hotal2, alt: 'Hotel 2' },
        { src: hotal3, alt: 'Hotel 3' },
    ];



    return (
        <Slider {...settings} className="slider-details-hotal">

            {images?.map((image, index) => {
                return <div lassName="img-container" key={index}>
                    {/* <ZoomImage src={image.src} alt={image.alt} /> */}
                    <img src={image.src} alt={image.alt} />
                </div>
            })}
        </Slider>
    );
}

// const ZoomImage = ({ src, alt }) => {
//     console.log('gtrhtr', src, alt);
//     const zoomContainerRef = useRef(null);

//     useEffect(() => {
//         const options = {
//             // width: 400, // Adjust the width according to your needs
//             zoomWidth: 500, // Adjust the zoom width according to your needs
//             offset: { vertical: 0, horizontal: 10 },
//             zoomStyle: 'z-index: 1111;',
//         };

//         new ImageZoom(zoomContainerRef.current, options);
//     }, []);

//     return (
//         <div ref={zoomContainerRef} className="zoom-container">
//             <img src={src} alt={alt} />
//         </div>
//     );
// };


export default SlideImg;

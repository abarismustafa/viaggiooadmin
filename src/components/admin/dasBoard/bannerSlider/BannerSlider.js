import Slider from "react-slick";

import img1 from '../../../../asesets/adminImage/s-1.jpg'
import img2 from '../../../../asesets/adminImage/s-3.jpg'
import img3 from '../../../../asesets/adminImage/s-4.jpg'
import img4 from '../../../../asesets/adminImage/s-5.jpg'


function BannerSlide() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        // autoplay: true,
        speed: 2000,
        // autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>
            <section className="BannerSlider">
                <Slider {...settings}>
                    <div>
                        <img src={img1} alt="" />
                    </div>
                    <div>
                        <img src={img2} alt="" />
                    </div>
                    <div>
                        <img src={img3} alt="" />
                    </div>
                    <div>
                        <img src={img4} alt="" />
                    </div>
                    {/* <div>
                        <img src={img1} alt="" />
                    </div> */}
                </Slider>
            </section>
        </>
    )
}
export default BannerSlide

import Slider from "react-slick";
import img1 from '../../asesets/banner/paypanda1.jpg'
import img2 from '../../asesets/banner/paypanda2.jpg'
import img3 from '../../asesets/banner/paypanda3.jpg'

import img4 from '../../asesets/banner/paypanda4.jpg'
function SliderLogin() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const mockData = [
        { id: '1', img: img1 },
        { id: '2', img: img2 },
        { id: '3', img: img3 },
        { id: '4', img: img4 },

    ]
    return (
        <>
            <Slider {...settings} className="login-banner">
                {mockData && mockData?.map((item) => {
                    return <div className="img-ban-login" key={item?.id}>
                        <img src={item?.img} alt="" />
                    </div>
                })}
            </Slider>
        </>
    )
}
export default SliderLogin
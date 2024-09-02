import Slider from "react-slick"
import '../serviceSlider/serviceSlide.css'
function ServiceSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 3
    };
    return (
        <>
            <div className="ServiceSlider">
                <Slider {...settings}>
                    <div className="first-slide">
                        <div className="item">
                            <a href="https://www.masterpay.pro/services#BillPayment" className="services-inner" style={{ backgroundColor: 'rgb(246, 214, 214)' }}>
                                <div className="image-box">
                                    <img src="https://www.masterpay.pro/assets_theme2/img/bill-payment.svg" alt="img" />
                                </div>
                                <h4>Utility Bills Payment</h4>
                                <p>Offer your Customers to pay Electricity, Gas and Water bills of all the Operators in India without any hassles.</p>
                                <span className="readMore">Read More</span>
                            </a>
                        </div>

                    </div>
                    <div className="first-slide">
                        <div className="item">
                            <a href="https://www.masterpay.pro/services#BillPayment" className="services-inner" style={{ backgroundColor: 'rgb(246, 214, 214)' }}>
                                <div className="image-box">
                                    <img src="https://www.masterpay.pro/assets_theme2/img/bill-payment.svg" alt="img" />
                                </div>
                                <h4>Utility Bills Payment</h4>
                                <p>Offer your Customers to pay Electricity, Gas and Water bills of all the Operators in India without any hassles.</p>
                                <span className="readMore">Read More</span>
                            </a>
                        </div>

                    </div>
                    <div className="first-slide">
                        <div className="item">
                            <a href="https://www.masterpay.pro/services#BillPayment" className="services-inner" style={{ backgroundColor: 'rgb(246, 214, 214)' }}>
                                <div className="image-box">
                                    <img src="https://www.masterpay.pro/assets_theme2/img/bill-payment.svg" alt="img" />
                                </div>
                                <h4>Utility Bills Payment</h4>
                                <p>Offer your Customers to pay Electricity, Gas and Water bills of all the Operators in India without any hassles.</p>
                                <span className="readMore">Read More</span>
                            </a>
                        </div>

                    </div>
                    <div className="first-slide">
                        <div className="item">
                            <a href="https://www.masterpay.pro/services#BillPayment" className="services-inner" style={{ backgroundColor: 'rgb(246, 214, 214)' }}>
                                <div className="image-box">
                                    <img src="https://www.masterpay.pro/assets_theme2/img/bill-payment.svg" alt="img" />
                                </div>
                                <h4>Utility Bills Payment</h4>
                                <p>Offer your Customers to pay Electricity, Gas and Water bills of all the Operators in India without any hassles.</p>
                                <span className="readMore">Read More</span>
                            </a>
                        </div>

                    </div>
                    <div className="first-slide">
                        <div className="item">
                            <a href="https://www.masterpay.pro/services#BillPayment" className="services-inner" style={{ backgroundColor: 'rgb(246, 214, 214)' }}>
                                <div className="image-box">
                                    <img src="https://www.masterpay.pro/assets_theme2/img/bill-payment.svg" alt="img" />
                                </div>
                                <h4>Utility Bills Payment</h4>
                                <p>Offer your Customers to pay Electricity, Gas and Water bills of all the Operators in India without any hassles.</p>
                                <span className="readMore">Read More</span>
                            </a>
                        </div>

                    </div>
                    <div className="first-slide">
                        <div className="item">
                            <a href="https://www.masterpay.pro/services#BillPayment" className="services-inner" style={{ backgroundColor: 'rgb(246, 214, 214)' }}>
                                <div className="image-box">
                                    <img src="https://www.masterpay.pro/assets_theme2/img/bill-payment.svg" alt="img" />
                                </div>
                                <h4>Utility Bills Payment</h4>
                                <p>Offer your Customers to pay Electricity, Gas and Water bills of all the Operators in India without any hassles.</p>
                                <span className="readMore">Read More</span>
                            </a>
                        </div>

                    </div>
                    <div className="first-slide">
                        <div className="item">
                            <a href="https://www.masterpay.pro/services#BillPayment" className="services-inner" style={{ backgroundColor: 'rgb(246, 214, 214)' }}>
                                <div className="image-box">
                                    <img src="https://www.masterpay.pro/assets_theme2/img/bill-payment.svg" alt="img" />
                                </div>
                                <h4>Utility Bills Payment</h4>
                                <p>Offer your Customers to pay Electricity, Gas and Water bills of all the Operators in India without any hassles.</p>
                                <span className="readMore">Read More</span>
                            </a>
                        </div>

                    </div>
                </Slider>
            </div>
        </>
    )
}
export default ServiceSlider
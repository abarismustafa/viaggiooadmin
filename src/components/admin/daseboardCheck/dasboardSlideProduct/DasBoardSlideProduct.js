import Slider from "react-slick";
import '../dasboardSlideProduct/dasboardSlideProduct.css'
import { FaMobileAlt } from "react-icons/fa";
import { CgDisplayFullwidth } from "react-icons/cg";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { SiStoryblok } from "react-icons/si";
import { FaDharmachakra } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { FaRupeeSign } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { FaShippingFast } from "react-icons/fa";
import { GiGasStove } from "react-icons/gi";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { MdOutlineDeveloperBoard } from "react-icons/md";
import { IoIosWater } from "react-icons/io";
import { Link } from "react-router-dom";

function DasBoardSlideProduct() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 6,
        slidesToScroll: 3,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
        
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
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <>
            <div className="slider-container-2">
                <Slider {...settings}>
                    <div className="product">
                        <Link to="/mobile-reacharge">
                            <div className="prodc">
                                <div className="moobile">
                                    <FaMobileAlt />
                                </div>
                                <div className="nameDivice">
                                    Mobile
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="product">
                        <Link to="/dth-reacharge">
                            <div className="prodc">
                                <div className="moobile">
                                    <CgDisplayFullwidth />
                                </div>
                                <div className="nameDivice">
                                    DTH
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="product">
                        <Link to="/postpaid-recharge">
                            <div className="prodc">
                                <div className="moobile">
                                    <BsFillFileEarmarkPostFill />
                                </div>
                                <div className="nameDivice">
                                    Post Paid
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="product">
                        <Link to="/electricity-bills">
                            <div className="prodc">
                                <div className="moobile">
                                    <FaLightbulb />
                                </div>
                                <div className="nameDivice nameDivice-ripay">
                                    Electricity
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="product">
                        <Link to="/fastag-recharge">
                            <div className="prodc">
                                <div className="moobile">
                                    <FaShippingFast />
                                </div>
                                <div className="nameDivice nameDivice-ripay">
                                    Fastag
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="product">
                        <Link to="/gas-bills">
                            <div className="prodc">
                                <div className="moobile">
                                    <GiGasStove />
                                </div>
                                <div className="nameDivice nameDivice-ripay">
                                    Gas
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="product">
                        <Link to="/water-bills">
                            <div className="prodc">
                                <div className="moobile">
                                    <IoIosWater />
                                </div>
                                <div className="nameDivice nameDivice-ripay">
                                    Water
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="product">
                        <Link to="/Boardband">
                            <div className="prodc">
                                <div className="moobile">
                                    <MdOutlineDeveloperBoard />
                                </div>
                                <div className="nameDivice nameDivice-ripay">
                                    Boardband Postpaid
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="product">
                        <Link to="/money-transfer">
                            <div className="prodc">
                                <div className="moobile">
                                    <FaMoneyBillTransfer />
                                </div>
                                <div className="nameDivice">
                                    Money Transfer
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/* <div className="product">
                        <a href="#">
                            <div className="prodc">
                                <div className="moobile">
                                    <SiStoryblok />
                                </div>
                                <div className="nameDivice">
                                    YBL DMT
                                </div>
                            </div>
                        </a>
                    </div> */}
                    <div className="product">
                        <Link to="/aeps-OnBoarded">
                            <div className="prodc">
                                <div className="moobile">
                                    <CgDisplayFullwidth />
                                </div>
                                <div className="nameDivice">
                                    AEPS
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/* <div className="product">
                        <a href="#">
                            <div className="prodc">
                                <div className="moobile">
                                    <FaDharmachakra />
                                </div>
                                <div className="nameDivice">
                                    Aadhar
                                    Pay
                                </div>
                            </div>
                        </a>
                    </div> */}
                    <div className="product">
                        <Link to="/ccbill_payment_report">
                            <div className="prodc">
                                <div className="moobile">
                                    <CiCreditCard1 />
                                </div>
                                <div className="nameDivice">
                                    Card
                                    Bill
                                </div>
                            </div>
                        </Link>
                    </div>
                    {/* <div className="product">
                        <a href="#">
                            <div className="prodc">
                                <div className="moobile">
                                    <FaRupeeSign />
                                </div>
                                <div className="nameDivice nameDivice-ripay">
                                    Rupay Prepaid Card
                                </div>
                            </div>
                        </a>
                    </div> */}

                    <div className="product">
                        <Link to="/landline-bills">
                            <div className="prodc">
                                <div className="moobile">
                                    <TbDeviceLandlinePhone />
                                </div>
                                <div className="nameDivice nameDivice-ripay">
                                    Landline
                                </div>
                            </div>
                        </Link>
                    </div>
                </Slider>
            </div>
        </>
    )
}
export default DasBoardSlideProduct
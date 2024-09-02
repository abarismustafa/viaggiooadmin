import Slider from "react-slick"

import banner1 from '../../../asesets/banner/banner-3.png'
import banner2 from '../../../asesets/banner/banner-2.png'
import banner3 from '../../../asesets/banner/banner-1.png'

function Banner() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <>
            <Slider {...settings}>
                <div>
                    <img src={banner1} alt="" />
                </div>
                <div>
                    <img src={banner2} alt="" />
                </div>
                <div>
                    <img src={banner3} alt="" />
                </div>

            </Slider>
            <section className="BannerMain BannerMain-2">

                {/* <div className="fadeOut owl-carousel owl-theme owl-loaded owl-drag">
                    <div className="owl-stage-outer">
                        <div className="owl-stage" style={{ transform: 'translate3d(-6076px, 0px, 0px)', transition: 'all 0s ease 0s', width: 12154 }}>
                            <div className="owl-item cloned" style={{ width: '1519.2px' }}>
                                <div className="item" style={{ backgroundImage: 'url(https://www.masterpay.pro/assets_theme2/img/banner-3.png)' }}>
                                    <div className="Wrapper">
                                        <div className="slideInner">
                                            <div className="imageSection">
                                                
                                            </div>
                                            <div className="RightSection">
                                                <div className="Title">
                                                    <h2>More opportunities, More Earnings only at <span>MasterPay</span></h2>
                                                </div>
                                                <div className="appDwonload">
                                                    <h3>Download mobile app</h3>
                                                    <a href="https://play.google.com/store/apps/details?id=com.champion.mpay" target="_blank"><img src="https://www.masterpay.pro/assets_theme2/img/playstore.svg" alt /></a>
                                                </div>
                                                <div className="tagline">
                                                    <h3>Aapka Apna <span>Digital Dost</span></h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="owl-item cloned" style={{ width: '1519.2px' }}><div className="item" style={{ backgroundImage: 'url(https://www.masterpay.pro/assets_theme2/img/banner-4.png)' }}>
                                <div className="Wrapper">
                                    <div className="slideInner">
                                        <div className="imageSection">
                                           
                                        </div>
                                        <div className="RightSection">
                                            <div className="Title">
                                                <h2>Baniyein Atmanirbhar, <span>MasterPay</span> ke sung</h2>
                                            </div>
                                            <div className="appDwonload">
                                                <h3>Download mobile app</h3>
                                                <a href="https://play.google.com/store/apps/details?id=com.champion.mpay" target="_blank"><img src="https://www.masterpay.pro/assets_theme2/img/playstore.svg" alt /></a>
                                            </div>
                                            <div className="tagline">
                                                <h3>Aapka Apna <span>Digital Dost</span></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div><div className="owl-item" style={{ width: '1519.2px' }}><div className="item" style={{ backgroundImage: 'url(https://www.masterpay.pro/assets_theme2/img/banner-1.png)' }}>
                                <div className="Wrapper">
                                    <div className="slideInner">
                                        <div className="imageSection">
                                            
                                        </div>
                                        <div className="RightSection">
                                            <div className="Title">
                                                <h2><span>MasterPay</span> Ki Services Lao, Double Dhandha Badhao.</h2>
                                            </div>
                                            <div className="appDwonload">
                                                <h3>Download mobile app</h3>
                                                <a href="https://play.google.com/store/apps/details?id=com.champion.mpay" target="_blank"><img src="https://www.masterpay.pro/assets_theme2/img/playstore.svg" alt /></a>
                                            </div>
                                            <div className="tagline">
                                                <h3>Aapka Apna <span>Digital Dost</span></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div><div className="owl-item" style={{ width: '1519.2px' }}><div className="item" style={{ backgroundImage: 'url(https://www.masterpay.pro/assets_theme2/img/banner-2.png)' }}>
                                <div className="Wrapper">
                                    <div className="slideInner">
                                        <div className="imageSection">
                                            
                                        </div>
                                        <div className="RightSection">
                                            <div className="Title">
                                                <h2>Be Vocal to go Local for<br /> a better <span><i style={{ marginRight: 10 }}>कल </i> </span> with <span>MasterPay</span></h2>
                                            </div>
                                            <div className="appDwonload">
                                                <h3>Download mobile app</h3>
                                                <a href="https://play.google.com/store/apps/details?id=com.champion.mpay" target="_blank"><img src="https://www.masterpay.pro/assets_theme2/img/playstore.svg" alt /></a>
                                            </div>
                                            <div className="tagline">
                                                <h3>Aapka Apna <span>Digital Dost</span></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div><div className="owl-item animated owl-animated-in fadeIn active" style={{ width: '1519.2px' }}><div className="item" style={{ backgroundImage: 'url(https://www.masterpay.pro/assets_theme2/img/banner-3.png)' }}>
                                <div className="Wrapper">
                                    <div className="slideInner">
                                        <div className="imageSection">
                                            
                                        </div>
                                        <div className="RightSection">
                                            <div className="Title">
                                                <h2>More opportunities, More Earnings only at <span>MasterPay</span></h2>
                                            </div>
                                            <div className="appDwonload">
                                                <h3>Download mobile app</h3>
                                                <a href="https://play.google.com/store/apps/details?id=com.champion.mpay" target="_blank"><img src="https://www.masterpay.pro/assets_theme2/img/playstore.svg" alt /></a>
                                            </div>
                                            <div className="tagline">
                                                <h3>Aapka Apna <span>Digital Dost</span></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div><div className="owl-item animated owl-animated-in fadeIn" style={{ width: '1519.2px' }}><div className="item" style={{ backgroundImage: 'url(https://www.masterpay.pro/assets_theme2/img/banner-4.png)' }}>
                                <div className="Wrapper">
                                    <div className="slideInner">
                                        <div className="imageSection">
                                           
                                        </div>
                                        <div className="RightSection">
                                            <div className="Title">
                                                <h2>Baniyein Atmanirbhar, <span>MasterPay</span> ke sung</h2>
                                            </div>
                                            <div className="appDwonload">
                                                <h3>Download mobile app</h3>
                                                <a href="https://play.google.com/store/apps/details?id=com.champion.mpay" target="_blank"><img src="https://www.masterpay.pro/assets_theme2/img/playstore.svg" alt /></a>
                                            </div>
                                            <div className="tagline">
                                                <h3>Aapka Apna <span>Digital Dost</span></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div><div className="owl-item cloned" style={{ width: '1519.2px' }}><div className="item" style={{ backgroundImage: 'url(https://www.masterpay.pro/assets_theme2/img/banner-1.png)' }}>
                                <div className="Wrapper">
                                    <div className="slideInner">
                                        <div className="imageSection">
                                            
                                        </div>
                                        <div className="RightSection">
                                            <div className="Title">
                                                <h2><span>MasterPay</span> Ki Services Lao, Double Dhandha Badhao.</h2>
                                            </div>
                                            <div className="appDwonload">
                                                <h3>Download mobile app</h3>
                                                <a href="https://play.google.com/store/apps/details?id=com.champion.mpay" target="_blank"><img src="https://www.masterpay.pro/assets_theme2/img/playstore.svg" alt /></a>
                                            </div>
                                            <div className="tagline">
                                                <h3>Aapka Apna <span>Digital Dost</span></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div><div className="owl-item cloned" style={{ width: '1519.2px' }}><div className="item" style={{ backgroundImage: 'url(https://www.masterpay.pro/assets_theme2/img/banner-2.png)' }}>
                                <div className="Wrapper">
                                    <div className="slideInner">
                                        <div className="imageSection">
                                            
                                        </div>
                                        <div className="RightSection">
                                            <div className="Title">
                                                <h2>Be Vocal to go Local for<br /> a better <span><i style={{ marginRight: 10 }}>कल </i> </span> with <span>MasterPay</span></h2>
                                            </div>
                                            <div className="appDwonload">
                                                <h3>Download mobile app</h3>
                                                <a href="https://play.google.com/store/apps/details?id=com.champion.mpay" target="_blank"><img src="https://www.masterpay.pro/assets_theme2/img/playstore.svg" alt /></a>
                                            </div>
                                            <div className="tagline">
                                                <h3>Aapka Apna <span>Digital Dost</span></h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div></div></div>
                    </div>
                    <div className="owl-nav disabled">
                        <button type="button" role="presentation" className="owl-prev" fdprocessedid="w44fnz">
                            <span aria-label="Previous">‹</span></button><button type="button" role="presentation" className="owl-next" fdprocessedid="8gn3eb"><span aria-label="Next">›</span></button></div><div className="owl-dots"><button role="button" className fdprocessedid="dacqvm"><span /></button><button role="button" fdprocessedid="6a8fb" className><span /></button><button role="button" fdprocessedid="l1us4j" className="active"><span /></button><button role="button" fdprocessedid="rg4npi" className><span /></button></div></div> */}
                <div className="BannerbottomSection">
                    <div className="Wrapper">
                        <div className="signUpContent">
                            <div className="content uk-scrollspy-inview uk-animation-slide-left" uk-scrollspy="cls: uk-animation-slide-left; repeat: false" style={{}}>
                                <h3>Let’s together “move ahead towards Atmanirbhar भारत </h3>
                                <p>through Digitalisation by ‘Being Digital’ now, now, now”</p>
                            </div>
                            <div className="singUpbutton uk-scrollspy-inview uk-animation-slide-right" uk-scrollspy="cls: uk-animation-slide-right; repeat: false" style={{}}>
                                <a className="ScrollLink" href="#SignUPSection">Sign up Now!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default Banner

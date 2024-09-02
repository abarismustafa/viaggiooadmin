
function ContactForm() {
    return (
        <>
            <section className="ContactForm">
                <div className="Wrapper">
                    <div className="contactDetails">
                        <div className="leftDetails">
                            <h3 uk-scrollspy="cls: uk-animation-slide-bottom; repeat: false" style={{}} className="uk-scrollspy-inview uk-animation-slide-bottom">We want to <br />hear from you</h3>
                            <p uk-scrollspy="cls: uk-animation-slide-bottom; repeat: false" style={{}} className="uk-scrollspy-inview uk-animation-slide-bottom">Come be a part of Growth...<br /> as<br /> “Growth Drives Everyone”</p>
                            <div className="details">
                                <ul uk-scrollspy="cls: uk-animation-slide-bottom;target: li; repeat: false">
                                    <li style={{}} className="uk-scrollspy-inview uk-animation-slide-bottom">
                                        <span />
                                        <div className="text">
                                            <h4>Regd. Office:</h4>
                                            <p>351-52-36-37-22, Iscon Mall, 150Ft. Ring Road,<br /> Rajkot, Gujarat - 360005</p>
                                        </div>
                                    </li>
                                    <li style={{}} className="uk-scrollspy-inview uk-animation-slide-bottom">
                                        <span />
                                        <div className="text">
                                            <h4>Customer Care:</h4>
                                            <p><a href="tel:+918459006006">+91 8459 006 006</a></p>
                                        </div>
                                    </li>
                                    <li style={{}} className="uk-scrollspy-inview uk-animation-slide-bottom">
                                        <span />
                                        <div className="text">
                                            <h4>Email:</h4>
                                            <p><a href="mailto:sales@masterpay.pro">sales@masterpay.pro</a></p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="RightForm uk-scrollspy-inview uk-animation-slide-right" uk-scrollspy="cls: uk-animation-slide-right; repeat: false" style={{}}>
                            <div className="FormBox">
                                <div className="heading">
                                    <span className="icon">
                                        <svg viewBox="0 0 458.86 512">
                                            <path style={{ fill: '#ffffff' }} d="M352.46,220a20,20,0,0,0-20-20h-206a20,20,0,0,0,0,40h206A20,20,0,0,0,352.46,220Z" />
                                            <path style={{ fill: '#ffffff' }} d="M126.46,280a20,20,0,1,0,0,40H251.57a20,20,0,1,0,0-40Z" />
                                            <path style={{ fill: '#ffffff' }} d="M173.46,472H106.57a40,40,0,0,1-40-40V80a40,40,0,0,1,40-40H352.46a40,40,0,0,1,40,40V203a20,20,0,1,0,40,0V80a80.09,80.09,0,0,0-80-80H106.57a80.09,80.09,0,0,0-80,80V432a80.09,80.09,0,0,0,80,80h66.89a20,20,0,0,0,0-40Z" />
                                            <path style={{ fill: '#ffffff' }} d="M467.88,289.57a60.06,60.06,0,0,0-84.84,0L273.24,399.12a20,20,0,0,0-5,8.35l-23.91,78.73a20,20,0,0,0,24.48,25.09l80.73-22.36a20,20,0,0,0,8.79-5.12L467.89,374.43A60.07,60.07,0,0,0,467.88,289.57ZM333.78,451.77,293.16,463,305,423.89,379.14,350l28.29,28.29ZM439.61,346.13,435.74,350l-28.29-28.29,3.86-3.85a20,20,0,0,1,28.3,28.27Z" />
                                            <path style={{ fill: '#ffffff' }} d="M332.46,120h-206a20,20,0,0,0,0,40h206a20,20,0,0,0,0-40Z" />
                                        </svg>
                                    </span>
                                    <h3>Send us your inquiry</h3>
                                </div>
                                <div className="FormInner">
                                    <form name="contact" id="contact" className="ContactFormMain" noValidate="novalidate">
                                        <div className="row" id="messageContact" style={{ display: 'none' }} />
                                        <div className="row">
                                            <div className="col-lg-12 col-xl-6 form-group">
                                                <input type="text" name="name" id="Yourname" placeholder="Full Name" className="form-control" />
                                            </div>
                                            <div className="col-lg-12 col-xl-6 form-group">
                                                <input type="text" name="number" id="UserPhone" onkeypress="return isNumberKey(event)" placeholder="Mobile Number" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 col-xl-6 form-group">
                                                <input type="email" name="email" id="UserEmail" placeholder="Email address" className="form-control" />
                                            </div>
                                            <div className="col-lg-12 col-xl-6 form-group">
                                                <select className="form-control" name="identity" id="identity">
                                                    <option value selected>Your Identity</option>
                                                    <option value="Distributor">Distributor</option>
                                                    <option value="Retailer">Retailer</option>
                                                    <option value="Alliance">Alliance</option>
                                                    <option value="Others">Others</option>
                                                </select>
                                                <span className="dropArrow" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 form-group">
                                                <textarea className="form-control" name="message" id="Message" placeholder="Message" rows={10} defaultValue={""} />
                                            </div>
                                        </div>
                                        <div className="buttonRow form-group p-0 mb-2">
                                            <button className="button Primary" type="submit" name="btnsignincontact" id="btnsignincontact" value="Send Message!">Send Message</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
export default ContactForm
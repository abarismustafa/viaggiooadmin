
function SignUpSection() {
    return (
        <>
            <section className="signUpSection " id="SignUPSection">
                <div className="Wrapper">
                    <div className="TopContent" uk-scrollspy="cls: uk-animation-slide-bottom; target: > div; delay: 300; repeat: false">
                        <div className="ourservie uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                            <span className="leftLine">
                                <i />
                                <i />
                            </span>
                            <p>SIGN UP WITH US</p>
                            <span className="rightLine">
                                <i />
                                <i />
                            </span>
                        </div>
                        <div className="Title uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                            <h3>Apply to make MasterPay your Digital Dost</h3>
                        </div>
                        <div className="content uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                            <p>At MasterPay, we give not just the Best but Legendary satisfaction to our Customers,<br /> through Service Excellence.</p>
                        </div>
                    </div>
                    <div id="messageRegister" style={{ display: 'none' }} />
                    <div className="signUPInner">
                        <form name="form1" id="form1" className="RegiForm" noValidate="novalidate">
                            <ul uk-scrollspy="cls: uk-animation-fade; target: >li; delay: 200; repeat: false">
                                <li style={{}} className="uk-scrollspy-inview uk-animation-fade">
                                    <input type="radio" id="Distributor" defaultValue="Distributor" name="role" defaultChecked />
                                    <label className="SignOptRadio" htmlFor="Distributor">
                                        <i className="icon">
                                            <svg viewBox="0 0 52 52">
                                                <path d="M51.65,26.68l-3.47,2.6-1-1.39,1.39-1H41.6V25.12h6.93l-1.39-1,1-1.39,3.47,2.6a.89.89,0,0,1,.17.17A.87.87,0,0,1,51.65,26.68ZM42.3,12.38l.24-1.71-4.9,4.9-1.23-1.23,4.9-4.9-1.72.24L39.36,8l4.29-.61a.86.86,0,0,1,.74.24.87.87,0,0,1,.24.74L44,12.63ZM35.19,18,34,16.79l1.23-1.22,1.23,1.22Zm1.23,17.17-1.23,1.23L34,35.19,35.19,34Zm-3.69-2.83A12.87,12.87,0,0,1,26,34a12.82,12.82,0,0,1-6.73-1.68.45.45,0,0,1-.18-.22,5.5,5.5,0,0,1-.18-1.6h0a.85.85,0,0,0,0-.09c0-.69.07-2.33,1.56-2.85h0a9.73,9.73,0,0,0,2.86-1.33.46.46,0,0,1,.65.12.48.48,0,0,1-.11.66,10.75,10.75,0,0,1-3.15,1.47c-.8.29-.89,1.17-.92,2,0,0,0,.06,0,.09a6.2,6.2,0,0,0,.07,1.09A12.53,12.53,0,0,0,26,33.09a12.47,12.47,0,0,0,6.08-1.45,6.61,6.61,0,0,0,.07-1.09.82.82,0,0,1,0-.09c0-.8-.11-1.68-.92-2A10.65,10.65,0,0,1,28.08,27a.48.48,0,0,1-.11-.66.46.46,0,0,1,.65-.12,9.89,9.89,0,0,0,2.86,1.33h0c1.5.52,1.54,2.16,1.56,2.85,0,0,0,.06,0,.09h0a5.79,5.79,0,0,1-.17,1.59A.48.48,0,0,1,32.73,32.35ZM26,26.18h-.11a3.13,3.13,0,0,1-2.43-1.07C22.18,23.58,22.4,21,22.43,20.7a3.61,3.61,0,0,1,1.69-3.21A3.77,3.77,0,0,1,26,17H26a3.77,3.77,0,0,1,1.85.5,3.61,3.61,0,0,1,1.67,3.2c0,.25.24,2.87-1.08,4.41A3.15,3.15,0,0,1,26,26.18Zm2.59-5.39a.06.06,0,0,1,0,0C28.52,18.38,26.94,18,26,18h0c-.75,0-2.51.27-2.62,2.8,0,0,0,0,0,0s-.24,2.43.85,3.68a2.23,2.23,0,0,0,1.77.75h0a2.24,2.24,0,0,0,1.78-.75C28.88,23.22,28.64,20.82,28.63,20.79Zm-1.77-6.94H25.13V12.12h1.73Zm0-10.4v6.94H25.13V3.45l-1,1.39-1.39-1L25.31.33l.12-.12a.9.9,0,0,1,1.26.12l2.6,3.47-1.39,1ZM15.58,35.19,16.81,34,18,35.19l-1.23,1.23Zm0-18.39,1.23-1.23L18,16.8,16.81,18Zm-1.23-1.23-4.9-4.9.24,1.71L8,12.63,7.37,8.34a.9.9,0,0,1,0-.25.87.87,0,0,1,1-.73L12.64,8,12.4,9.68l-1.72-.24,4.9,4.9Zm-4,9.55v1.73H3.47l1.39,1-1,1.39L.35,26.68a.9.9,0,0,1-.17-.17A.87.87,0,0,1,.35,25.3l3.47-2.6,1,1.39-1.39,1Zm3.47,0v1.73H12.13V25.12ZM9.7,39.6l-.24,1.72,4.9-4.9,1.22,1.23-4.9,4.9,1.71-.24L12.64,44l-4.29.61H8.1a.87.87,0,0,1-.73-1L8,39.35Zm15.43-1.47h1.73v1.73H25.13Zm0,10.4V41.6h1.73v6.93l1-1.39,1.39,1-2.6,3.47a.87.87,0,0,1-1.39,0l-2.6-3.47,1.39-1ZM39.87,25.12v1.73H38.13V25.12ZM37.64,36.41l4.9,4.9L42.3,39.6,44,39.35l.61,4.29a.85.85,0,0,1,0,.12.87.87,0,0,1-.87.87h-.12L39.36,44l.24-1.72,1.71.25-4.9-4.9Z" />
                                            </svg>
                                        </i>
                                        <span>As a Distributor</span>
                                    </label>
                                </li>
                                <li className="or uk-scrollspy-inview uk-animation-fade" style={{}}>
                                    <h4>Or</h4>
                                </li>
                                <li style={{}} className="uk-scrollspy-inview uk-animation-fade">
                                    <input type="radio" id="Retailer" defaultValue="Retailer" name="role" />
                                    <label className="SignOptRadio" htmlFor="Retailer">
                                        <i className="icon">
                                            <svg viewBox="0 0 49 39">
                                                <path d="M45.93,16.72V37.59h.82a.7.7,0,1,1,0,1.41H2.25a.7.7,0,1,1,0-1.41h.82V16.72A6.5,6.5,0,0,1,0,11.23a.7.7,0,0,1,.09-.35L5.79,1.11A2.27,2.27,0,0,1,7.74,0H41.25a2.27,2.27,0,0,1,2,1.11l5.69,9.77a.7.7,0,0,1,.1.35A6.5,6.5,0,0,1,45.93,16.72Zm-13,20.87h7.77V35.24H32.89Zm0-3.76h7.77V21H32.89ZM4.5,37.59h27V20.25a.71.71,0,0,1,.72-.7h9.21a.71.71,0,0,1,.72.7V37.59h2.4V17.41a6.76,6.76,0,0,1-2.16.35,6.69,6.69,0,0,1-5.95-3.58,6.72,6.72,0,0,1-11.89,0,6.72,6.72,0,0,1-11.89,0,6.69,6.69,0,0,1-5.95,3.58,6.76,6.76,0,0,1-2.16-.35ZM35.62,11.93H25.27a5.24,5.24,0,0,0,10.36,0Zm-11.89,0H13.38a5.24,5.24,0,0,0,10.36,0ZM6.66,16.35a5.2,5.2,0,0,0,5.18-4.42H4l-.12,0-.12,0H1.49A5.2,5.2,0,0,0,6.66,16.35ZM42,1.81a.82.82,0,0,0-.71-.4H7.74a.82.82,0,0,0-.71.4L2,10.53H3.79l.12,0,.12,0H47Zm4,10.12H37.16a5.24,5.24,0,0,0,10.36,0ZM7.62,19.55H28.34a.71.71,0,0,1,.72.7V34.54a.71.71,0,0,1-.72.7H7.62a.71.71,0,0,1-.72-.7V20.25A.71.71,0,0,1,7.62,19.55Zm.72,14.29H27.62V21H8.34Z" />
                                            </svg>
                                        </i>
                                        <span>As a Retailer</span>
                                    </label>
                                </li>
                            </ul>
                            <div className="signUpForm" uk-scrollspy="cls: uk-animation-slide-bottom; target: .row > div; delay: 300; repeat: false">
                                <div className="row">
                                    <div className="col-lg-6 col-xl-3 form-group uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                                        <input type="text" name="firstname" id="Firstname" placeholder="First Name*" className="form-control" />
                                    </div>
                                    <div className="col-lg-6 col-xl-3 form-group uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                                        <input type="text" name="lastname" id="Lastname" placeholder="Last Name*" className="form-control" />
                                    </div>
                                    <div className="col-lg-6 col-xl-3 form-group uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                                        <input type="text" name="number" id="MobileNumber" placeholder="Mobile Number*" onkeypress="return isNumberKey(event)" className="form-control" />
                                    </div>
                                    <div className="col-lg-6 col-xl-3 form-group uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                                        <input type="email" name="email" id="REmail" placeholder="Email address*" className="form-control" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-xl-3 form-group uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                                        <input type="text" name="address" id="Address" placeholder="Address*" className="form-control" />
                                    </div>
                                    <div className="col-lg-6 col-xl-3 form-group uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                                        <input type="hidden" name="hidStateCode" id="hidStateCode" />
                                        <select id="myState" name="state_id" onchange="getCityName('https://www.masterpay.pro/city_list/getCity/')" placeholder=" " className="form-control">
                                            <option value>State*</option>
                                            <option value={1}>Andaman and Nicobar Islands</option><option value={2}>Andhra Pradesh</option><option value={3}>Arunachal Pradesh</option><option value={4}>Assam</option><option value={5}>Bihar</option><option value={6}>Chandigarh</option><option value={7}>Chhattisgarh</option><option value={8}>Dadra and Nagar Haveli</option><option value={9}>Daman and Diu</option><option value={10}>Delhi</option><option value={11}>Goa</option><option value={12}>Gujarat</option><option value={13}>Haryana</option><option value={14}>Himachal Pradesh</option><option value={15}>Jammu and Kashmir</option><option value={16}>Jharkhand</option><option value={17}>Karnataka</option><option value={19}>Kerala</option><option value={20}>Lakshadweep</option><option value={21}>Madhya Pradesh</option><option value={22}>Maharashtra</option><option value={23}>Manipur</option><option value={24}>Meghalaya</option><option value={25}>Mizoram</option><option value={26}>Nagaland</option><option value={29}>Odisha</option><option value={31}>Pondicherry</option><option value={32}>Punjab</option><option value={33}>Rajasthan</option><option value={34}>Sikkim</option><option value={35}>Tamil Nadu</option><option value={36}>Telangana</option><option value={37}>Tripura</option><option value={38}>Uttar Pradesh</option><option value={39}>Uttarakhand</option><option value={41}>West Bengal</option>
                                        </select>
                                        {/* <span class="label">State*</span> */}
                                    </div>
                                    <div className="col-lg-6 col-xl-3 form-group uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                                        <select name="city_id" id="myCity" placeholder=" " className="form-control">
                                            <option value>City*</option>
                                        </select>
                                        {/* <span class="label">City*</span> */}
                                    </div>
                                    <div className="col-lg-6 col-xl-3 form-group uk-scrollspy-inview uk-animation-slide-bottom" style={{}}>
                                        <input type="text" name="pincode" id="Pincode" onkeypress="return isNumberKey(event)" placeholder="Pincode*" className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group agreeRow uk-scrollspy-inview uk-animation-fade" uk-scrollspy="cls: uk-animation-fade;" style={{}}>
                                    <input type="checkbox" name="agree" id="agree" />
                                    <label className="customCheckbox" htmlFor="agree">Agree <a href="https://www.masterpay.pro/terms-conditions" target="_blank">Terms &amp; Conditions</a></label>
                                </div>
                                <div className="form-group button-center text-center uk-scrollspy-inview uk-animation-fade" uk-scrollspy="cls: uk-animation-fade;" style={{}}>
                                    <button type="submit" className="button Primary" name="btnsignin" id="btnsignin" value="Sign Up" fdprocessedid="3z8ogr">Register now!</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </>
    )
}
export default SignUpSection
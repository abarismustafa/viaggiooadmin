import { useState } from "react";

import SignUpPage from "../../pages/singnUp";
import { Link } from "react-router-dom";
import logo from '../../asesets/logo/logo1.png'


function Header({ handleClick, setislogin }) {
    const [modalShow, setModalShow] = useState(false);
    return (
        <>
            <header className="HeaderMain">
                <div className="Wrapper">
                    <div className="Logo">
                        <Link to="/">
                            <img src={logo} alt="" />
                        </Link>
                    </div>
                    {/* Navigation Start */}
                    <div className="MinMenu">
                        <nav className="NavbarMain">
                            <ul>
                                <li><Link to="/" className="" >Home</Link></li>
                                <li><Link to="services">Services</Link></li>
                                <li><Link to="about" >About us</Link></li>
                                <li><Link to="contact-us" >Contact us</Link></li>
                            </ul>
                        </nav>
                        <div className="SignInbtn" >
                            <a href="#" className="HeaderSignin" onClick={() => setModalShow(true)}>
                                <span>Sign in</span>
                            </a>
                        </div>
                        <div className="menuicon">
                            <label className="menuicon-label" htmlFor="menustate">
                                <span className="menuicon-bread-top">
                                    <span className="menuicon-top" />
                                </span>
                                <span className="menuicon-bread-middle">
                                    <span className="menuicon-middle" />
                                </span>
                                <span className="menuicon-bread-bottom">
                                    <span className="menuicon-bottom" />
                                </span>
                            </label>
                        </div>
                    </div>
                    {/* Navigation End */}
                </div>
            </header>
            <SignUpPage
                show={modalShow}
                setislogin={setislogin}
                onHide={() => setModalShow(false)}
                handleClick={handleClick}
            />
        </>
    )
}
export default Header
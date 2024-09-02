
import { Link, useNavigate } from 'react-router-dom'
import imageLogo from '../../asesets/logo/image 2.png'
function MerchantLoginHeader({ loginForm, handleSubmitBack,currentPage }) {

    const clocal = window.localStorage.getItem('userToken')
    console.log(clocal);

    const navigate = useNavigate()

    const logOut = () => {
        window.localStorage.removeItem('userToken')
        window.localStorage.removeItem('userIdToken')
        window.localStorage.removeItem('openMenu')
        // window.location.reload()
        navigate('/login-area')
    }
    return (
        <>
            <section className="MerchantLoginHeader">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="header-sec">
                                <div className="image-log">
                                    <img src={imageLogo} alt="" />
                                </div>
                                <div className='buttonArea'>
                                    {/* {loginForm ? <Link to="/login-area" className='btn login-area me-3'>Log Out</Link> : <Link to="/login-area" className='btn login-area me-3' onClick={handleSubmitBack}>LOGIN</Link>}
                                    {clocal ? <Link to="#" className='btn login-area me-3' onClick={logOut}>Log Out</Link> : <Link to="/login-area" className='btn login-area me-3'>LOGIN</Link>}
                                    
                                    {clocal ? '' : <Link to="/Signup" className='btn login-area me-3' >SIGNUP</Link>} */}
                                    {currentPage === '/registrationComplete' ? (
                                        <button className='btn login-area me-3' onClick={logOut}>LOGOUT</button>
                                    ) : (
                                        <>
                                            <Link to="/login-area" className='btn login-area me-3'>LOGIN</Link>
                                            <Link to="/Signup" className='btn login-area me-3'>SIGNUP</Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default MerchantLoginHeader
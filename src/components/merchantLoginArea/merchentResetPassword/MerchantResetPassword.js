import { useEffect, useRef, useState } from "react";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { fogotPassVerifyByEmail, fogotPassVerifyByMobile, isVerifiedEmailOtp, isVerifiedMobileOtp, resendOtpsforgetPassword, resetApi } from "../../../api/login/Login";
import { ToastContainer, toast } from "react-toastify";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";
import { TbLayoutNavbarExpand } from "react-icons/tb";
import { Modal } from "react-bootstrap";
import { RiTimerLine } from 'react-icons/ri';
import { TiTick } from 'react-icons/ti';
import { FaCheckCircle } from 'react-icons/fa';

function MerchantResetPassword({ handleSubmitBack, getOtp, resetOtp, OtpUp, openReset, handleChange, initalValue, userId, setOtpUp, setOpenReset, setLoginForm, setInitialValue, buttonDisable, mobileMsg, setButtonDisable, setMobileMsg, panError, mobileError, emailError,
    EmailpanError, loader3, show, handleClose, setResetOtp }) {





    const [isValid, setIsValid] = useState(false);
    const [resetInitialValue, setResetInitialValue] = useState({
        user_id: '',
        password: '',
        repassword: ''
    })
    const [isTimerEnded, setIsTimerEnded] = useState(false);
    const [message2, setMessage2] = useState('');
    const [error2, setError2] = useState('');
    const [timeLeft, setTimeLeft] = useState(180);
    const [loading, setLoading] = useState(false);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    // const [otp, setOtp] = useState({
    //     user_id: userId,
    //     otp: ''
    // })

    const toastSuccessMessage = (data) => {
        toast.success(`${data}`, {
            position: "top-center",
        });
    };
    const toastErrorMessage = (data) => {
        toast.error(`${data}`, {
            position: "top-center",
        });
    };

    // const otpChandleChange = (e) => {
    //     const clone = { ...otp }
    //     const vlaue = e.target.value
    //     const name = e.target.name
    //     clone[name] = vlaue
    //     setOtp(clone)
    // }

    /////
    const length = 6
    const [otp, setOtp] = useState(new Array(length).fill(''));



    useEffect(() => {
        if (!show) return;
      
        const timer = setInterval(() => {
          setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
              clearInterval(timer);
              setIsResendDisabled(false);
              setIsTimerEnded(true); 
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
      
        return () => clearInterval(timer);
      }, [show]);
    
    useEffect(() => {
  if (show) {
    setTimeLeft(180);
    setIsTimerEnded(false);
    setIsResendDisabled(true);
  }
}, [show]);

      const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };

    let str = ''
    for (let index = 0; index < otp.length; index++) {
        const element = otp[index];
        str = str + element
    }

    


    const inputs = useRef([]);

    const otpChandleChange = (index, value) => {
        // const input = value.replace(/[^0-9+]/g, '');
        const newOtp = [...otp];
        if (value.length == 2) {
            return
        }
        newOtp[index] = value;
        setOtp(newOtp);


        // Move to the next input field if there's a value
        if (value && inputs.current[index + 1]) {
            inputs.current[index + 1].focus();
        }

    };

    const handleKeyDown = (index, e) => {
        // Move to the previous input field if backspace is pressed and the input is empty
        if (e.key === 'Backspace' && !otp[index] && inputs.current[index - 1]) {
            inputs.current[index - 1].focus();
        }
    };

    const handleEnterPress = (e) => {
        if (e.key === 'Enter' && otp.every(value => value.length === 1)) {
            submitOtp();
        }
    };

    ////
    const [radioSet, setRadioSet] = useState(false);
    const handlemobileotpclose= () => {
        handleClose()
        
        setTimeLeft(180);
        setIsTimerEnded(false);
        setMessage2('');
        setError2('');
        setOtp(new Array(length).fill(''));

    }
    const submitOtp = async () => {
        try {
            let res;
            if (radioSet) {
                res = await fogotPassVerifyByEmail({ otp: str, user_id: userId });
            } else {
                res = await fogotPassVerifyByMobile({ otp: str, user_id: userId });
            }
    
            if (res?.data?.statusCode == '200') {
                toastSuccessMessage(res?.data?.data?.message);
                setTimeout(() => {
                    handlemobileotpclose();
                    setOtpUp(false);
                    setOpenReset(true);
                }, 2000);
            } else if (res?.data?.statusCode == '400') {
                toastErrorMessage(res?.data?.message); // Accessing message from res.data
            } else if (res?.data?.error === true && res?.data?.statusCode != '400') {
                toastErrorMessage(res?.data?.data?.message);
            }
        } catch (error) {
            toastErrorMessage('An unexpected error occurred. Please try again.');
        }
    };
    

    const resendHandler = (e, str) => {
        if (str) {

            const clone = { ...resetInitialValue }
            const vlaue = e.target.value
            const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!&])[A-Z](?=.*[a-zA-Z\d@$!&])[a-zA-Z\d@$!&]{8,}$/;
            setIsValid(regex.test(vlaue));
            const name = e.target.name
            clone[name] = vlaue
            setResetInitialValue(clone)
            return
        }
        const clone = { ...resetInitialValue }
        const vlaue = e.target.value
        const name = e.target.name
        clone[name] = vlaue
        setResetInitialValue(clone)

    }
    const handleSubmit = async () => {
        const cloen = { ...resetInitialValue, user_id: window.localStorage.getItem("forgotUser") }
        try {
            const res = await resetApi(cloen)
            console.log(res?.data.data.message);
            if (res?.data?.statusCode == "200") {
                toastSuccessMessage("Paswoord reset successfully")
                setTimeout(() => {
                    window.location.reload()
                }, 400)
            }
            if (res?.data?.statusCode == 402) {
                toastErrorMessage ("Failed to reset Paswoord")
            }
        } catch (error) {
        }
    }



    const handleRadio = (e) => {
        if (e == 'number') {
            setRadioSet(!radioSet)
            setMobileMsg('')
            setInitialValue({
                mobileNo: '+91',
                pan: '',
                emailId: '',
            })
        } else {
            setButtonDisable(false)
            setMobileMsg('')
            setInitialValue({
                pan: '',
                emailId: '',
                mobileNo: '',
            })
            setRadioSet(!radioSet)
        }
    }
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        // console.log('fgfd', !showPassword);
        setShowPassword(!showPassword);
    };


    const handlePaste = (event) => {
        event.preventDefault();
    }

    const inputRef = useRef(null);

    const handleMouseDown = (event) => {
        if (document.activeElement === inputRef.current) {
            event.preventDefault();
        }
    };

    const handleSelect = (event) => {
        event.preventDefault();
        if (inputRef.current) {
            inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
        }
    };

    const handleResendOtp = () => {
        const response = resendOtpsforgetPassword({ user_id: userId });
        setIsTimerEnded(false);
        setTimeLeft(180);
        setIsResendDisabled(true);
        setOtp(new Array(6).fill(''));
      
      }
      


const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const isValidPAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const isValidMobile = (mobile) => {
    
    const numberOnly = mobile.startsWith('+91') ? mobile.slice(3) : mobile;
    
   
    const mobileRegex = /^[0-9]\d{9}$/;
    return mobileRegex.test(numberOnly);
  };
    return (
        <>
            <>
                {resetOtp ? <div className="mobile-login-phone">
                    <form action="" >

                        {/* hide content so radio button of mobile and email cannaot see */}
                        {/* <div className="input-group mb-3 justify-content-center">
                            <div className="form-check mr-3">
                                <input className="form-check-input" type="radio" onChange={() => { handleRadio('number') }} name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Mobile
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={() => { handleRadio('mail') }} />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    Email
                                </label>
                            </div>
                        </div> */}
                        {radioSet ? <> <div className="input-group  mb-4">
                            <span className="input-group-text" id="basic-addon1"><MdOutlineEmail /></span>
                            <input type="mail" className={`form-control ${initalValue.emailId && isValidEmail(initalValue.emailId) ? 'is-valid' : ''}`}    placeholder="Enter Email" name="emailId" value={initalValue.emailId} onChange={handleChange} />

                        </div>
                            <div id="emailHelp" className="form-text  mb-2">{emailError}</div>
                            <div className="input-group  mb-4">
                                <span className="input-group-text" id="basic-addon1"><TbLayoutNavbarExpand /></span>
                                <input type="text" 
                                 className={`form-control ${initalValue.pan && isValidPAN(initalValue.pan) ? 'is-valid' : ''}`}  placeholder="Enter PAN Number" name="pan" value={initalValue.pan} onChange={handleChange} />

                            </div>
                            <div id="emailHelp" className="form-text text-danger mb-2">{EmailpanError}</div>
                        </>
                            : <>
                                <div className="input-group  mb-4">
                                    <span className="input-group-text" id="basic-addon1"><MdOutlinePhoneAndroid /></span>
                                    <input type="text"   className={`form-control ${initalValue.mobileNo && isValidMobile(initalValue.mobileNo) ? 'is-valid' : ''}`}  placeholder="Enter Mobile Number" ref={inputRef}
                                        onMouseDown={handleMouseDown}
                                        onSelect={handleSelect} onPaste={handlePaste} name="mobileNo" value={initalValue.mobileNo} onChange={(e) => { handleChange(e, 'mobile') }} />

                                </div>
                                <div id="emailHelp" className="form-text text-danger mb-2">{mobileError}</div>
                                <div className="input-group  mb-4">
                                    <span className="input-group-text" id="basic-addon1"><TbLayoutNavbarExpand /></span>
                                    <input type="text" 
                                    className={`form-control ${initalValue.pan && isValidPAN(initalValue.pan) ? 'is-valid' : ''}`} placeholder="Enter PAN Number" name="pan" value={initalValue.pan} onChange={handleChange} />

                                </div>
                                <div id="emailHelp" className="form-text text-danger mb-2">{panError}</div>
                            </>}


                        {/* <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><MdOutlinePhoneAndroid /></span>
                            <input type="text" className="form-control" placeholder="Enter Mobile Number" name="mobileNo" value={initalValue.mobileNo} onChange={handleChange} />
                        </div> */}
                        <div>
                            <button
                                type="button"
                                disabled={radioSet ? !initalValue.emailId || !isValidPAN(initalValue.pan) : !initalValue.mobileNo || !isValidPAN(initalValue.pan)}
                                className={`btn ${radioSet ? (!initalValue.emailId || !isValidPAN(initalValue.pan) ? 'disableebuttoncls not-allowed' : 'btn-login') : (!isValidMobile(initalValue.mobileNo) || !isValidPAN(initalValue.pan) ? 'disableebuttoncls not-allowed' : 'btn-login')}`}
                                onClick={() => { getOtp(radioSet) }}
                            >
                                Send OTP
                                {loader3 && (
                                    <div style={{ height: "16px", width: "16px" }} className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                )}
                            </button>

                        </div>
                    </form>
                    <div className="text-align-center mt-2">
                        <div onClick={handleSubmitBack} style={{ cursor: 'pointer' }}>Back To Sign In</div>
                    </div>
                </div> : <></>}
            </>


            {/* {OtpUp ? <div className="mobile-login-phone">
                <form action="" >
                    <div className="input-group input-group-2 mb-3">
                       
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                type="number"
                                value={value}
                                onChange={(e) => otpChandleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={(input) => (inputs.current[index] = input)}
                                style={{ width: '14%' }}
                            />
                        ))}
                    </div>
                    <div>
                        
                        <button type="button" className="btn btn-login" disabled={str.length !== 6} onClick={submitOtp}>Submit Otp</button>

                    </div>
                </form>
                <div className="text-align-center mt-1">
                    <div onClick={handleSubmitBack} style={{ cursor: 'pointer' }}>Back To Sign In</div>
                </div>

            </div> : <></>} */}

            <Modal
                show={show}
                onHide={handlemobileotpclose}
                centered
                className="email-optp-modle"
                style={{
                    zIndex: 1050,
                   
                  }} 
            >
               <Modal.Body style={{
    backgroundColor: '#ffffff',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
  }}>
               <div className="set-head">
    <div className="row">
        <div className="col-lg-12">
            <div className="headinf-otp">
                <h2>OTP Verification</h2>
                <p className="set-lage">Enter 6 Digit Number Verification Code On Your Mobile Number ID!</p>
            </div>
            {isTimerEnded ? (
                <div className="d-flex justify-content-center align-items-center">
                    <button type="button" className="btn btn-resend-otp" onClick={handleResendOtp}>
                        {isResendDisabled ? (
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        ) : (
                            'Resend OTP'
                        )}
                    </button>
                </div>
            ) : (
                <>
                   
                     <div className="verification-timer">Verification Code {formatTime(timeLeft)} <span className="resend-otp" onClick={handleResendOtp}>Resend OTP</span></div>
                    <div className="col-lg-12">
                        <div className="otp-inputs">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    type="number"
                                    maxLength="1"
                                    value={value}
                                    onChange={(e) => otpChandleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    ref={(input) => (inputs.current[index] = input)}
                                    className="otp-input"
                                    style={{ width: '14%' }}
                                    onKeyPress={index === otp.length - 1 ? handleEnterPress : null}
                                    onPaste={(e) => e.preventDefault()}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="input-group mb-3">
                            <button
                                type="button"
                                disabled={str.length !== 6}
                                className={`form-control btn ${str.length !== 6 ? 'disableebuttoncls not-allowed' : 'btn-login'}`}
                                onClick={submitOtp}
                            >
                                {loading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    'Submit OTP'
                                )}
                            </button>
                        </div>
                        {message2 && <div className="alert alert-success mt-3">{message2}</div>}
                        {error2 && <div className="alert alert-danger mt-3">{error2}</div>}
                    </div>
                </>
            )}
        </div>
    </div>
</div>

</Modal.Body>

                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer> */}
            </Modal>







            {openReset ? (
  <div className="mobile-login-phone">
    <form action="">
      <div className={`input-group input-group-eye ${resetInitialValue?.password ? 'mb-1' : 'mb-4'}`}>
        <span className="input-group-text" id="basic-addon1">
          <RiLockPasswordFill />
        </span>
        <input
          type={showPassword ? 'text' : 'password'}
          className={`form-control ${isValid ? 'is-valid' : ''}`}
          placeholder="Enter New password"
          name="password"
          value={resetInitialValue?.password}
          onChange={(e) => {
            resendHandler(e, 'password');
          }}
        />
        {isValid && <FaCheckCircle className="text-success position-absolute end-0 top-50 translate-middle-y me-4" />}  
        <div className="eye" onClick={toggleShowPassword}>
          {showPassword ? <IoMdEye style={{marginRight:'2rem'}} /> : <FaEyeSlash style={{marginRight:'2rem'}} />}
        </div>
      </div>
      {resetInitialValue?.password && (
        isValid ? (
          <p className="text-success mb-3">Valid password</p>
        ) : (
          <p className="text-danger mb-3">8+ chars, start with a capital, include a special char, alphanumeric.</p>
        )
      )}
      <div className="input-group mb-2">
        <span className="input-group-text" id="basic-addon1">
          <RiLockPasswordFill />
        </span>
        <input
          type="password"
          className={`form-control ${
            resetInitialValue?.repassword && (resetInitialValue?.password === resetInitialValue?.repassword)
              ? 'is-valid'
              : resetInitialValue?.repassword
              ? 'is-invalid'
              : ''
          }`}
          placeholder="Enter Confirm password"
          name="repassword"
          value={resetInitialValue?.repassword}
          onChange={resendHandler}
        />
      </div>
      {resetInitialValue?.repassword && resetInitialValue?.password !== resetInitialValue?.repassword && (
        <p className="text-danger mb-3">Passwords do not match</p>
      )}
      <div>
        <button
          type="button"
          disabled={!isValid || resetInitialValue?.password !== resetInitialValue?.repassword}
          className={`btn ${
            !isValid || resetInitialValue?.password !== resetInitialValue?.repassword
              ? 'disableebuttoncls'
              : 'btn-login'
          }`}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
    <div className="text-align-center mt-1">
      <div onClick={handleSubmitBack} style={{ cursor: 'pointer' }}>
        Back To Sign In
      </div>
    </div>
  </div>
) : (
  <></>
)}
            <ToastContainer />
        </>
    )
}
export default MerchantResetPassword

import { FaMobileScreenButton } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";
import TabSignUp from "../tabSinUp/TabSignUp";
import { CountryList, emailSinup, emailSinupOtp, isEmailExits, isEmailExits2, isVerifiedMobileOtp, registerUser, userType,resendOtpslogin } from "../../../../api/login/Login";
import { getUserDetails } from "../../../../utils/localStorage";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { MdVerified } from "react-icons/md";
import { onboardingRequest } from "../../../../api/login/Login";
import { FaMapMarkerAlt } from 'react-icons/fa';
import axios from "axios";
function SignUpMerchantForm({ initalValue, handleChange, mobileGenerateOtpMobile, userIDD, mobileVeridedInput, getOtp, mobileOtp, emailVeridedInput, emailgetOtp, nextForm, emailOtp, submitOtpEmail, formResiter, setEmailVeridedInput, setMobileOtp, setMobileVerified, handleCountryCode, countryCode, setEmailOtp, setFormResiter, loader1, showMobileOtp, handleClose2, mobileExit, setMobileExit }) {
    // console.log(countryCode);
    // console.log(initalValue.mobileNo.length);

    const [showEmailOtp, setShowEmailOtp] = useState(false);



    const [emailExit, setemailExit] = useState('')

    const [veriFiedIconMobile, setVeriFiedIconMobile] = useState(false)

    const [veriFiedIconEmail, setVeriFiedIconEmail] = useState(false)
    const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(true);

    const handleClose3 = () => setShowEmailOtp(false);
    const handleShow3 = () => setShowEmailOtp(true);



    const [isChecked, setIsChecked] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setIsChecked(false)
        setShow(false);
        // setMobileVerified(true)
        // setMobileOtp(false)
        // setFormResiter(false)
        window.location.reload()

    }
    const handleShow = () => {
        setShow(true);
    }

    const [emailUser, setEmailUser] = useState()
    const [loader2, setloader2] = useState(false)
    const [loader3, setloader3] = useState(false)
    const [loader4, setloader4] = useState(false)
    const [loader5, setloader5] = useState(false)
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [country, setCountry] = useState(null)
    // console.log(country);

    const [userId, setUserId] = useState()
    // console.log(userId);
    const [mobileId, setMobile] = useState()
    // console.log(mobileId);


    const [errorValue, setErrorValue] = useState({})


    const [count, setCount] = useState(0)
    const [stateList, setStateList] = useState([]); 
    const [selectedState, setSelectedState] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [isTimerEnded, setIsTimerEnded] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180);
    const [resendLoading, setResendLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message2, setMessage2] = useState('');
    const [error2, setError2] = useState('');
    const [otpMessage, setOtpMessage] = useState('');
    const [otpError, setOtpError] = useState('');

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };
    const [stateOptions, setStateOptions] = useState([]);
    const length = 6;
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const [otp1, setOtp1] = useState(new Array(length).fill(''));
    const inputs = useRef([]);
    const inputs1 = useRef([]);

    
    console.log(initalValue.mobileNo.slice(3, 13));

    const [resiter, setResister] = useState({
        // email: '',
        mobile: mobileId,
        user_type_id: "65e2f15785bfd78f9866c090",
        name: '',
        password: '',
        refer_id: ''
    })
    // console.log(resiter);
    useEffect(() => {
        setResister({ ...resiter, password: initalValue.mobileNo.slice(3, 13) })
    }, [initalValue])

    const countryget = async () => {
        try {
            const res = await CountryList()
            setCountry(res?.data)
        } catch (error) {

        }

    }
    useEffect(() => {
        countryget()
    }, [])



    const validation = (values) => {
        const error = {}
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.name) {
            error.name = "Name is Required!"

        }

        // if (!values.email) {
        //     error.email = "Email is required";
        // } else if (!regexEmail.test(values.email)) {
        //     error.email = "Invalid Email";
        // }
        if (!values.password) {
            error.password = "Password is Required!"

        }
        if (!values.refer_id) {
            error.refer_id = "Refer Id Required!"

        }
        if (!selectedState) {
            error.state = "State is Required!";
        }
        return error

    }


    
    // console.log(otp);

    let str = ''
    for (let index = 0; index < otp.length; index++) {
        const element = otp[index];
        str = str + element
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            getOtp();
        }
    };
    const handleKeyPress2 = (event) => {
        if (event.key === 'Enter') {
            SubmitEmail();
        }
    };
    console.log(str);

 

    const otpChandleChange = (index, value) => {
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

    // const otpChandleChange = (e) => {
    //     const clone = { ...otp }
    //     const vlaue = e.target.value
    //     const name = e.target.name
    //     clone[name] = vlaue
    //     setOtp(clone)
    // }

    const handleResiter = (e) => {
        const clone = { ...resiter }
        const vlaue = e.target.value
        const name = e.target.name
        clone[name] = vlaue
        setResister(clone)


    }

    const handleResiter2 = (e) => {
        const clone = { ...resiter, user_type_id: e }
        // console.log(clone);

    }

    const toastSuccessMessage = (message) => {
        toast.success(`${message}`, {
            position: "top-center",
        });
    };

    const toastSuccessMessage1 = (message) => {
        toast.error(`${message}`, {
            position: "top-center",
        });
    };

    const userTypeget = async () => {
        try {
            const res = await userType()
            setData(res?.data)
        } catch (error) {
        }
    }
    useEffect(() => {
        let timer;
        if (showMobileOtp || showEmailOtp) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setIsTimerEnded(true);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [showMobileOtp, showEmailOtp]);
    const resetOtpState = () => {
        setTimeLeft(180);
        setIsTimerEnded(false);
        setOtpMessage('');
        setOtpError('');
        setOtp(new Array(length).fill(''));
        setOtp1(new Array(length).fill(''));
    };

    const tabChange = (i, id) => {
        setUserId(id)
        const clone = { ...resiter, user_type_id: id }
        // console.log(clone);
        setResister(clone)
        setCount(i)
    }
    // useEffect(() => {
    //     setUserId(data?.[0]?._id)
    // }, [data])
    useEffect(() => {
        userTypeget()
    }, [])

    // const getOtp = () => {
    //     mobileGenerateOtpMobile()
    //     setMobileVerified(false)
    //     setMobileOtp(true)
    // }
    const handlemobileotpclose= () => {
        handleClose2()
        
        setTimeLeft(180);
        setIsTimerEnded(false);
        setMessage2('');
        setError2('');
        setOtp(new Array(length).fill(''));

    }
    const submitOtp = async () => {
        // debugger
        setloader2(true)
        try {
            const res = await isVerifiedMobileOtp({ otp: str, user_id: userIDD })
            // console.log(res?.data?.data.user);
            setMobile(res?.data?.data?.user);
            if (res?.data?.statusCode == '200') {
                getUserDetails(res?.data?.user)
                toastSuccessMessage(res.data.data.message)
                // debugger
                setTimeout(() => {

                    setEmailVeridedInput(true)
                    setMobileOtp(false)
                    setMobileVerified(false)
                }, 2000)
                handlemobileotpclose()
                setVeriFiedIconMobile(true)
                setMobileExit('')
            }
            setloader2(false)

            if (res?.data?.error == true) {
                toastSuccessMessage1(res?.data?.message)
            }
            // console.log(res);
        } catch (error) {
            setloader2(false)
        }
    }

    const handleSubmit = async (event) => {
        setloader5(true)
        const cloen = { ...resiter, mobile: mobileId, email: emailUser,state:selectedState }
        console.log("cloen",cloen)
        event.preventDefault()
        setErrorValue(validation(cloen))

        try {
            const res = await registerUser(cloen)
            if (res?.statusCode == '200') {
                toastSuccessMessage(res?.data?.message)
                // debugger
                setTimeout(() => {
                    navigate('/login-area')
                }, 2000)
            }
            if (res?.statusCode == 402) {
                toastSuccessMessage1(res?.data?.message)
                // debugger
            }
            setloader5(false)
        } catch (error) {
            setloader5(true)
            // console.log(error);
            // toastSuccessMessage(res?.data?.message)
        }

    }

    const [emailInitial, setEmailInitial] = useState({
        deviceId: '',
        emailId: ''
    })

    const handleEmail = (e) => {
        const cloneEmail = { ...emailInitial }
        const value = e.target.value
        const name = e.target.name
        cloneEmail[name] = value
        setEmailInitial(cloneEmail)

        // isEmailExitt(value)
    }


    const [debouncedValue, setDebouncedValue] = useState(emailInitial.emailId);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(emailInitial.emailId);
        }, 2000);

        return () => {
            clearTimeout(handler);
        };
    }, [emailInitial.emailId]);

    useEffect(() => {
        if (debouncedValue) {
            isEmailExitt(debouncedValue);
        }
    }, [debouncedValue]);







    const [errorMessageEmail, setErrorMessageEmail] = useState()



    const isEmailExitt = async (value) => {
        try {
            const res = await isEmailExits2(value)
            if (res?.data?.isExist == true) {
                // alert('Email Does Not Exit')
                setemailExit('Email ID Already Exists')

            } if (res?.data?.isExist == false) {
                SubmitEmail()

            }
        } catch (error) {

        }
    }




    const SubmitEmail = async () => {
        setloader3(true)
        try {
            const res = await emailSinup(emailInitial)

            if (res?.data?.error == false) {
                handleShow3()
                window.localStorage.setItem('emailToken', res?.data?.data.user)
                toastSuccessMessage(res?.data?.message)
                setEmailVeridedInput(false)
                setEmailOtp(true)
            }

            if (res?.data?.error == true) {
                setErrorMessageEmail(res?.data?.message)
            }
            setloader3(false)
        } catch (error) {
            setloader3(false)
        }
    }


    const length1 = 6
  
    // console.log(otp);

    let str1 = ''
    for (let index = 0; index < otp1.length; index++) {
        const element = otp1[index];
        str1 = str1 + element
    }

    console.log(str1);


    const otpChandleChange1 = (index, value) => {
        const newOtp = [...otp1];
        if (value.length == 2) {
            return
        }
        newOtp[index] = value;
        setOtp1(newOtp);

        // Move to the next input field if there's a value
        if (value && inputs1.current[index + 1]) {
            inputs1.current[index + 1].focus();
        }
    };

    const handleKeyDown1 = (index, e) => {
        // Move to the previous input field if backspace is pressed and the input is empty
        if (e.key === 'Backspace' && !otp1[index] && inputs1.current[index - 1]) {
            inputs1.current[index - 1].focus();
        }
    };

    const handleEnterPressEmail = (e) => {
        if (e.key === 'Enter' && otp1.every(value => value.length === 1)) {
            submitEmailOtp();
        }
    };


    const submitEmailOtp = async () => {
        setloader4(true)
        const otpEmailData = { otp: str1, user_id: window.localStorage.getItem('emailToken') }
        try {
            const res = await emailSinupOtp(otpEmailData)
            setEmailUser(res?.data?.data.user)
            // console.log(res?.data?.data.user);
            if (res.data.error == false) {
                toastSuccessMessage(res?.data?.message)
                setVeriFiedIconEmail(true)
                setemailExit('')
                setFormResiter(true)
                setShowEmailOtp(false)
                setEmailVeridedInput(false)
                setEmailOtp(false)
            }
            if (res.data.error == true) {
                toastSuccessMessage1(res?.data?.message)
            }
            setloader4(false)
        } catch (error) {
            setloader4(false)
        }

    }

    // const emailgetOtp = () => {
    //     // setEmailVeridedInput(false)
    //     setEmailOtp(true)
    //     setEmailVeridedInput(false)
    // }

    // const submitOtpEmail = () => {
    //     setFormResiter(true)
    //     setEmailVeridedInput(false)
    //     setEmailOtp(false)
    // }

    // const nextForm = () => {
    //     setFormResiter(true)
    //     setEmailVeridedInput(false)
    // }
    const inputRef = useRef(null);

    const handlePaste = (event) => {
        event.preventDefault();
    };

    const handleMouseDown = (event) => {
        if (document.activeElement === inputRef.current) {
            event.preventDefault();
        }
    };

    const handleSelect = (event) => {
        const input = inputRef.current;
        if (input) {
            const start = input.selectionStart;
            const end = input.selectionEnd;

            if (start < 3) {
                event.preventDefault();
                if (end > 3) {
                    input.setSelectionRange(3, end);
                } else {
                    input.setSelectionRange(3, 3);
                }
            }
        }
    };

    const handleFocus = (event) => {
        if (inputRef.current) {
            inputRef.current.setSelectionRange(3, inputRef.current.value.length);
        }
    };

    useEffect(() => {
        if (isChecked) {
            sendOnboardingRequest();
        }
    }, [isChecked]);
    
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        handleShow();
    };
    console.log("isChecked",isChecked)

    useEffect(() => {
        setOtp(new Array(length).fill(''))
    }, [showMobileOtp])

    useEffect(() => {
        setOtp1(new Array(length).fill(''))
    }, [showEmailOtp])




    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
    };
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
      };

    useEffect(() => {
        // Check if all required fields are filled
        const areFieldsFilled = resiter.name && selectedState && initalValue.mobileNo.length === 13 && emailInitial.emailId;
        setIsCheckboxDisabled(!areFieldsFilled);
    }, [resiter.name, selectedState, initalValue.mobileNo, emailInitial.emailId]);

    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    }, []);
  console.log("location",location)
  
  const sendOnboardingRequest = async () => {
    const onboardingData = {
        name: resiter.name,
        email: emailInitial.emailId,
        mobileNo: initalValue.mobileNo,
        latitude:location.latitude || "28.5788357",
        longitude:location.longitude || "77.3147627",
        state: selectedState
    };

    try {
        const response = await onboardingRequest(onboardingData);
        console.log('Onboarding request sent:', response);
     
    } catch (error) {
        console.error('Error sending onboarding request:', error);
        
    }
};
console.log('checkboxdata',resiter.name,emailInitial.emailId,initalValue.mobileNo,selectedState)
const disabledButtonStyle = {
    cursor: "none",
    backgroundColor: "#d3d3d3", 
};
useEffect(() => {
    const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
            if (prevTime <= 1) {
                clearInterval(timer);
                setIsTimerEnded(true);
                return 0;
            }
            return prevTime - 1;
        });
    }, 1000);

    return () => clearInterval(timer);
}, []);

useEffect(() => {
   
    axios.get('https://api.paypandabnk.com/api/state/country/101')
        .then(response => {
            if (response.data.error === false) {
                const states = response.data.data.map(state => ({
                    value: state._id,
                    name: state.name
                }));
                setStateOptions(states);
            } else {
                console.error('Error fetching states:', response.data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching states:', error);
        });
}, []);
const handleResendOTP = async (type) => {
    setResendLoading(true);
    setOtpError('');
    setOtpMessage('');
    
    try {
        let response;
        // if (type === 'mobile') {
            response = await resendOtpslogin({user_id: userIDD});
        // } else {
        //     // Assuming you have a similar function for email OTP resend
        //     response = await resendEmailOtp({user_id: window.localStorage.getItem('emailToken')});
        // }
        
        if (response.status === 200) {
            setOtpMessage('OTP has been resent successfully.');
            resetOtpState();
        } else {
            setOtpError('Failed to resend OTP.');
        }
    } catch (error) {
        setOtpError('Failed to resend OTP.');
    } finally {
        setResendLoading(false);
    }
};
const otpHandleChange = (index, value, setOtpFunction, inputsRef) => {
    if (value.length > 1) return;
    const newOtp = [...(setOtpFunction === setOtp ? otp : otp1)];
    newOtp[index] = value;
    setOtpFunction(newOtp);

    if (value && inputsRef.current[index + 1]) {
        inputsRef.current[index + 1].focus();
    }
};
const handleOtpSubmit = async (type) => {
    setResendLoading(true);
    setOtpError('');
    setOtpMessage('');

    try {
        let response;
        if (type === 'mobile') {
            response = await isVerifiedMobileOtp({ otp: otp.join(''), user_id: userIDD });
        } else {
            response = await emailSinupOtp({ otp: otp1.join(''), user_id: window.localStorage.getItem('emailToken') });
        }

        if (response.data.error === false) {
            setOtpMessage(response.data.message);
            if (type === 'mobile') {
                setMobile(response.data.data.user);
                setEmailVeridedInput(true);
                setMobileOtp(false);
                setMobileVerified(false);
                setVeriFiedIconMobile(true);
                setMobileExit('');
            } else {
                setEmailUser(response.data.data.user);
                setVeriFiedIconEmail(true);
                setemailExit('');
                setFormResiter(true);
                setShowEmailOtp(false);
                setEmailVeridedInput(false);
                setEmailOtp(false);
            }
            handleCloseOtpModal(type);
        } else {
            setOtpError(response.data.message);
        }
    } catch (error) {
        setOtpError('Failed to verify OTP.');
    } finally {
        setResendLoading(false);
    }
};

const handleCloseOtpModal = (type) => {
    if (type === 'mobile') {
        handleClose2();
    } else {
        setShowEmailOtp(false);
    }
    resetOtpState();
};
    return (
        <>

            <div className="mt-3">
                {/* {mobileVeridedInput && } */}
                {/* <>
                    {mobileVeridedInput ? <div className="row">
                        <div className="col-lg-12">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1"><FaMobileScreenButton /></span>
                                <span className="input-group-text input-group-text-2" id="basic-addon1" >
                                    <select class="form-select" aria-label="Default select example" value={countryCode} onChange={handleCountryCode}>
                                        <option selected disabled>Select Country</option>
                                        {country && country?.map((item) => {
                                            return <option value={'+' + item?.phone_code}>{item?.name}</option>
                                        })}
                                    </select>
                                </span>
                                <input type="text" className="form-control" placeholder="Enter Mobile Number" ref={inputRef}
                                    onMouseDown={handleMouseDown}
                                    onSelect={handleSelect} onPaste={handlePaste} name="mobileNo" onKeyDown={handleKeyPress} value={initalValue.mobileNo} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="input-group mb-3">
                                
                                <button type="button" disabled={initalValue.mobileNo.length == 13 ? false : true} className="form-control btn btn-login" onClick={getOtp}>
                                    Get OTP
                                    {loader1 && <div style={{ height: "16px", width: "16px" }} className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    }
                                </button>
                            </div>
                        </div>
                    </div> : <></>
                    }
                </> */}

<Modal show={showMobileOtp} onHide={() => handleCloseOtpModal('mobile')} centered className="email-optp-modle">
                <Modal.Body>
                    <div className="set-head">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="headinf-otp">
                                    <h2>Mobile OTP Verification</h2>
                                    <p className="set-lage">Enter 6 Digit Number Verification Code On Your Mobile Number!</p>
                                </div>
                                {isTimerEnded ? (
                                    <div className="d-flex justify-content-center align-items-center">
                                        <button type="button" className="btn btn-resend-otp" onClick={() => handleResendOTP('mobile')} disabled={resendLoading}>
                                            {resendLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Resend OTP'}
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="verification-timer">Verification Code {formatTime(timeLeft)} <span className="resend-otp" onClick={() => handleResendOTP('mobile')}>Resend OTP</span></div>
                                        <div className="otp-inputs">
                                            {otp.map((value, index) => (
                                                <input
                                                    key={index}
                                                    type="number"
                                                    maxLength="1"
                                                    value={value}
                                                    onChange={(e) => otpHandleChange(index, e.target.value, setOtp, inputs)}
                                                    onKeyDown={(e) => handleKeyDown(index, e, inputs)}
                                                    ref={(input) => (inputs.current[index] = input)}
                                                    className="otp-input"
                                                />
                                            ))}
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button
                                                type="button"
                                                className="btn btn-submit-otp"
                                                onClick={() => handleOtpSubmit('mobile')}
                                                disabled={resendLoading || otp.some(digit => digit === '')}
                                            >
                                                {resendLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Submit OTP'}
                                            </button>
                                        </div>
                                    </>
                                )}
                                {otpMessage && <div className="alert alert-success mt-3">{otpMessage}</div>}
                                {otpError && <div className="alert alert-danger mt-3">{otpError}</div>}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

                <Modal show={showEmailOtp}
                 onHide={() => handleCloseOtpModal('email')} centered className="email-optp-modle">
                <Modal.Body>
                    <div className="set-head">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="headinf-otp">
                                    <h2>Email OTP Verification</h2>
                                    <p className="set-lage">Enter 6 Digit Number Verification Code On Your Email ID!</p>
                                </div>
                                {isTimerEnded ? (
                                    <div className="d-flex justify-content-center align-items-center">
                                        <button type="button" className="btn btn-resend-otp" onClick={() => handleResendOTP('email')} disabled={resendLoading}>
                                            {resendLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Resend OTP'}
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="verification-timer">Verification Code {formatTime(timeLeft)} <span className="resend-otp" onClick={() => handleResendOTP('email')}>Resend OTP</span></div>
                                        <div className="otp-inputs">
                                            {otp1.map((value, index) => (
                                                <input
                                                    key={index}
                                                    type="number"
                                                    maxLength="1"
                                                    value={value}
                                                    onChange={(e) => otpHandleChange(index, e.target.value, setOtp1, inputs1)}
                                                    onKeyDown={(e) => handleKeyDown(index, e, inputs1)}
                                                    ref={(input) => (inputs1.current[index] = input)}
                                                    className="otp-input"
                                                />
                                            ))}
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center">
                                            <button
                                                type="button"
                                                className="btn btn-submit-otp"
                                                onClick={() => handleOtpSubmit('email')}
                                                disabled={resendLoading || otp1.some(digit => digit === '')}
                                            >
                                                {resendLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Submit OTP'}
                                            </button>
                                        </div>
                                    </>
                                )}
                                {otpMessage && <div className="alert alert-success mt-3">{otpMessage}</div>}
                                {otpError && <div className="alert alert-danger mt-3">{otpError}</div>}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


                {/* <>

                    {mobileOtp ? <> <div className="col-lg-12">
                        <div className="input-group input-group-2 mb-3">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    type="number"
                                    maxLength="1"
                                    value={value}
                                    onChange={(e) => otpChandleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    ref={(input) => (inputs.current[index] = input)}
                                    style={{ width: '14%' }}
                                />
                            ))}
                        
                        </div>
                    </div>
                        <div className="col-lg-12">
                            <div className="input-group mb-3">
                               
                                <button type="button" className="form-control btn btn-login" disabled={str.length !== 6} onClick={submitOtp}>
                                    Submit OTP
                                    {loader2 && <div style={{ height: "16px", width: "16px" }} className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    }
                                </button>
                            </div>
                        </div> </> : <></>}
                </> */}



                {/* {emailVeridedInput ? <div className="row">
                    <div className="col-lg-12">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon1"><MdEmail /></span>
                            <input type="email" className="form-control" placeholder="Enter Email" name="emailId" onKeyDown={handleKeyPress2} value={emailInitial.emailId} onChange={handleEmail} />
                        </div>
                        <p style={{ color: 'red' }}>{errorMessageEmail}</p>
                    </div>
                    <div className="col-lg-12">
                        <div className="input-group mb-3">
                            
                            <button type="button" className="form-control btn btn-login me-1" onClick={SubmitEmail}>
                                {loader3 && <div style={{ height: "16px", width: "16px" }} className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                }
                                Get OTP
                            </button>

                        </div>
                    </div>
                </div> : <>
                </>} */}



                {/* {emailOtp ? <> <div className="col-lg-12">
                    <div className="input-group input-group-2 mb-3">
                        {otp1.map((value, index) => (
                            <input
                                key={index}
                                type="number"
                                maxLength="1"
                                value={value}
                                onChange={(e) => otpChandleChange1(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown1(index, e)}
                                ref={(input) => (inputs1.current[index] = input)}
                                style={{ width: '14%' }}
                            />
                        ))}
                        
                    </div>
                </div>
                    <div className="col-lg-12">
                        <div className="input-group mb-3">
                            
                            <button type="button" className="form-control btn btn-login" onClick={submitEmailOtp}>
                                {loader4 && <div style={{ height: "16px", width: "16px" }} className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                }
                                Submit OTP
                            </button>
                        </div>
                    </div> </> : <></>} */}




                {formResiter ? <TabSignUp data={data} count={count} tabChange={tabChange} resiter={resiter} handleResiter2={handleResiter2} /> : <></>}
                {formResiter ? <form >
                    <div className="row">

                        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                            <label htmlFor="">Name <span style={{ color: 'red' }}>*</span></label>
                            <div className="input-group mb-1">
                                <span className="input-group-text" id="basic-addon1"><FaRegUser /></span>
                                <input type="text" className="form-control" placeholder="Enter Your Name" name="name" value={resiter.name} onChange={handleResiter} />
                            </div>
                            <p style={{ color: "red", marginBottom: '2px' }}>
                                {errorValue.name}
                            </p>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 mb-3 form-group uk-scrollspy-inview uk-animation-slide-bottom">
      <label htmlFor="state">State <span style={{ color: 'red' }}>*</span></label>
      {/* <div className="input-group mb-1">
        <span className="input-group-text" id="basic-addon1"><FaMapMarkerAlt /></span>
        <input
          type="text"
          placeholder="Search states..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="form-control"
        />
      </div> */}
      <div className="input-group mb-1">
        <span className="input-group-text" id="basic-addon1"><FaMapMarkerAlt /></span>
        
        <input type="hidden" name="state" id="basic-addon1" />
        
        <select
          id="myState"
          name="state_id"
          value={selectedState}
          onChange={handleStateChange}
          className="form-select form-control"
        >
          <option value="" disabled>Select State </option>
          
          {stateOptions
                                        .filter(state => state.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map(state => (
                                            <option key={state.value} value={state.value}>{state.name}</option>
                                        ))}
        </select>
      </div>
      <span className="text-danger">{errorValue.state}</span>
    </div>
                                    {/* <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                        <div className="input-group mb-1 ">
                            <select 
                                className="form-select" 
                                value={selectedState} 
                                onChange={handleStateChange}
                            >
                                <option value="" disabled>Select State</option>
                                {stateList.map((state) => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                            <span className="text-danger">{errorValue.state}</span>
                        </div>
                    </div> */}


                        <div className="col-lg-12">
                            <div className="input-group mb-3 input-group-set-mob">
                                <span className="input-group-text" id="basic-addon1"><FaMobileScreenButton /></span>
                                <span className="input-group-text input-group-text-2" id="basic-addon1" >
                                    <select class="form-select" aria-label="Default select example" value={countryCode} onChange={handleCountryCode}>
                                        <option selected disabled>Select Country</option>
                                        {country && country?.map((item, i) => {
                                            return <option value={'+' + item?.phone_code} selected={item?.name == 'India'}>{item?.name}</option>
                                        })}
                                    </select>
                                </span>
                                <input type="text" className="form-control" placeholder="Enter Mobile Number" ref={inputRef}
                                    onMouseDown={handleMouseDown}
                                    onSelect={handleSelect} onPaste={handlePaste} name="mobileNo" onKeyDown={handleKeyPress} value={initalValue.mobileNo} onChange={handleChange} />
                                {veriFiedIconMobile && <div className="setVerufied">
                                    <MdVerified />
                                </div>}

                            </div>
                            {mobileExit && <p style={{ color: 'red' }}>{mobileExit}</p>}
                        </div>
                        {/* <div className="col-lg-12">
                            <div className="input-group mb-3">
                                <button type="button" disabled={initalValue.mobileNo.length == 13 ? false : true} className="form-control btn btn-login" onClick={getOtp}>
                                    Get OTP
                                    {loader1 && <div style={{ height: "16px", width: "16px" }} className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    }
                                </button>
                            </div>
                        </div> */}
                        {/* ------ */}


                        <div className="col-lg-12">
                            <div className="input-group mb-3 input-group-set-mob">
                                <span className="input-group-text" id="basic-addon1"><MdEmail /></span>
                                <input type="email" className="form-control" placeholder="Enter Email" name="emailId" onKeyDown={handleKeyPress2} value={emailInitial.emailId} onChange={handleEmail} />
                                {veriFiedIconEmail && <div className="setVerufied">
                                    <MdVerified />
                                </div>}
                            </div>
                            <p style={{ color: 'red' }}>{errorMessageEmail}</p>
                            {emailExit && <p style={{ color: 'red' }}>{emailExit}</p>}

                        </div>
                        {/* <div className="col-lg-12">
                            <div className="input-group mb-3">
                                
                                <button type="button" className="form-control btn btn-login me-1" onClick={SubmitEmail}>
                                    {loader3 && <div style={{ height: "16px", width: "16px" }} className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    }
                                    Get OTP
                                </button>

                            </div>
                        </div> */}





















                        {/* <div className="col-lg-6  mb-3">
                            <label htmlFor="">Email <span style={{ color: 'red' }}>*</span></label>
                            <div className="input-group mb-1">
                                <span className="input-group-text" id="basic-addon1"><MdOutlineEmail /></span>
                                <input type="text" className="form-control" placeholder="Enter Your Email" name="email" value={resiter.email} onChange={handleResiter} />
                            </div>
                            <p style={{ color: "red", marginBottom: '2px' }}>
                                {errorValue.email}
                            </p>
                        </div> */}
                        <div className="col-lg-6   mb-3">
                            <label htmlFor="">Password <span style={{ color: 'red' }}>*</span></label>
                            <div className="input-group mb-1">
                                <span className="input-group-text" id="basic-addon1"><RiLockPasswordFill /></span>
                                {/* <input type="password" className="form-control" placeholder="Enter Your Password" name="password" value={resiter.password} onChange={handleResiter} */}
                                <input type="text" className="form-control" placeholder="Enter Your Password" name="password" disabled value={resiter.password} onChange={handleResiter} />
                            </div>
                            <p style={{ color: "red", marginBottom: '2px' }}>
                                {errorValue.name}
                            </p>
                        </div>
                        <div className="col-lg-6 mb-3">
                            <label htmlFor="">Refer ID <span style={{ color: 'red' }}>*</span></label>
                            <div className="input-group mb-1">
                                <span className="input-group-text" id="basic-addon1"><RiLockPasswordFill /></span>
                                <input type="text" className="form-control" placeholder="Enter Refer id" name="refer_id" value={resiter.refer_id} onChange={handleResiter} />
                            </div>
                            <p style={{ color: "red", marginBottom: '2px' }}>
                                {errorValue.refer_id}
                            </p>
                        </div>

                        <div className="col-lg-6 mb-3">
                            <div className="form-check form-check-form" style={{paddingLeft:'2rem'}}>
                                <input className="form-check-input" type="checkbox" id="flexCheckDefault" checked={isChecked}
                                    onChange={handleCheckboxChange} disabled={isCheckboxDisabled} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Without Refer ID 
                                </label>
                            </div>
                        </div>
                        <div>
                            <button type="button" disabled={!resiter.name || !resiter.password || !resiter.refer_id}   className={`btn ${!resiter.name || !resiter.password || !resiter.refer_id ? 'disableebuttoncls' : 'btn-login'}`}
                             onClick={handleSubmit}  >
                                {loader5 && <div style={{ height: "16px", width: "16px" }} className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                }
                                REGISTER
                            </button>
                        </div>
                    </div>
                </form> : <></>}


                <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ color: 'green' }}>Thank You !</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <div className="para-comor">

                            <p>Thank you for your interest in PayPanda payment solutions. Our enterprise team will contact you shortly.</p>
                            <p>If you have any further questions, feel free to contact us at <a href="mailto:support@paypanda.in" target="blank">support@paypanda.in</a> or call us toll-free at <a href="tel:+9118008890178" target="blank">18008890178</a> .</p>
                        </div>
                    </Modal.Body>
                    {/* <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer> */}
                </Modal>


            </div>
        </>
    )
}
export default SignUpMerchantForm
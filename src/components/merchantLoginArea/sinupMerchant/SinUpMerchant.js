import { useEffect, useState } from "react"
import MerchantLoginAreaBanner from "../../../common/merchantLoginAreaBanner/MerchantLoginAreaBanner"
import MerchantLoginHeader from "../../../common/merchantLoginHeader/MerchantLoginHeader"
import SignUpMerchantForm from "./signUpMerchantForm/SignUpMerchantForm"
import TabSignUp from "./tabSinUp/TabSignUp"
import { isMobileExits, mobileGenerateOtp, sinupApi, userType } from "../../../api/login/Login"
import { ToastContainer, toast } from "react-toastify"
import SliderLogin from "../../../common/sliderLogin/SliderLogin"
import Footer from "../../footer/footer"


function SignUpMerchant() {

    const [loader1, setloader1] = useState(false)

    const [showMobileOtp, setShowMobileOtp] = useState(false);

    const [mobileExit, setMobileExit] = useState()

    const handleClose2 = () => setShowMobileOtp(false);
    const handleShow2 = () => setShowMobileOtp(true);

    const [mobileVeridedInput, setMobileVerified] = useState(true)
    const [mobileOtp, setMobileOtp] = useState(false)
    const [emailVeridedInput, setEmailVeridedInput] = useState(false)
    const [emailOtp, setEmailOtp] = useState(false)
    const [formResiter, setFormResiter] = useState(true);


    const [countryCode, setCountryCode] = useState()
    const [verifyotpValue,setVarifyOtpValue]=useState(null);

    const [userIDD, setUserID] = useState()

    const [countryCode1, setCountryCode1] = useState(10)
    // console.log(userIDD);

    const [initalValue, setInitialValue] = useState({
        mobileNo: '+91',
        emailId: ''
    })
    const [veriFiedIconMobile, setVeriFiedIconMobile] = useState(false)
    // console.log(initalValue);

    const handleChange = (e) => {
        const clone = { ...initalValue }
        const input = e.target.value.replace(/[^0-9+]/g, '');
        const vlaue = input
        const name = e.target.name

        // clone[name] = vlaue

        if (e.target.value.length == 2) {
            return
        }
        let newValue = { ...initalValue };
        if (name === "mobileNo") {
            setMobileExit('');
            setVeriFiedIconMobile(false);
         
    
            if (input.length <= 13) {
                newValue = { ...newValue, [name]: input };
            }
        } else {
            newValue = { ...newValue, [name]: input };
        }
    
       

        setInitialValue(newValue);

        if (newValue.mobileNo?.length === 13) {
            isMobileExit(newValue.mobileNo);
        }
     


    }

    const handleCountryCode = (e) => {
        setCountryCode(e.target.value);
        const clone = { ...initalValue, mobileNo: e.target.value }
        setInitialValue(clone)

    }

    const verifiedPhone = (input) => {
        console.log(input);
        const regexMobileNumber = /^[0-9]{10}$/;
        if (input.match(regexMobileNumber)) {
            return true;
        } else {
            return false;
        }
    }

    const isMobileExit = async (value) => {
        try {
            const res = await isMobileExits(value)
            console.log(res?.data?.isExist);
            if (res?.data?.isExist == true) {
                // alert('Mobile Exit')

                setMobileExit('Mobile Number Already Exists')

            }
            else {
                setMobileExit('');
               
                mobileGenerateOtpMobile(value);
                handleShow2();
            }
        } catch (error) {
            console.error('Error checking mobile existence:', error);
        }
    }


    const toastSuccessMessage = () => {
        toast.success(`OTP Send Successfully.`, {
            position: "top-center",
        });
    };

    const mobileGenerateOtpMobile = async (value) => {
        setloader1(true)
        const clone = { ...initalValue, mobileNo: value }
        // console.log(clone);
        try {
            const res = await sinupApi(clone)
            // console.log(res?.data);
            setUserID(res?.data?.data?.user);
            if (res?.data?.statusCode == '200') {
                toastSuccessMessage();
                setMobileVerified(false)
                setMobileOtp(true)
            }
            setloader1(false)

        } catch (error) {
            setloader1(false)
        }
    }

    const getOtp = () => {
        mobileGenerateOtpMobile()
    }

    const emailgetOtp = () => {
        // setEmailVeridedInput(false)
        setEmailOtp(true)
        setEmailVeridedInput(false)
    }

    const submitOtpEmail = () => {
        setFormResiter(true)
        setEmailVeridedInput(false)
        setEmailOtp(false)
    }

    const nextForm = () => {
        setFormResiter(true)
        setEmailVeridedInput(false)
    }





    return (
        <>
       {/* <style>
        {`
          #body {
            overflow-y: hidden;
          }
        `}
      </style> */}
            <MerchantLoginHeader />
            {/* <MerchantLoginAreaBanner title='Merchant Create account' /> */}
            <div className="container-login100">
                <section className="my-4-4">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-7">
                                {/* <SliderLogin /> */}
                            </div>
                            <div className="col-lg-5 ">
                                <div className="login-area-sec">
                                    <h1 className="text-align-center">Signup</h1>
                                    <SignUpMerchantForm
                                        mobileVeridedInput={mobileVeridedInput}
                                        getOtp={getOtp}
                                        mobileOtp={mobileOtp}
                                        emailVeridedInput={emailVeridedInput}
                                        emailgetOtp={emailgetOtp}
                                        nextForm={nextForm}
                                        emailOtp={emailOtp}
                                        submitOtpEmail={submitOtpEmail}
                                        formResiter={formResiter}
                                        setEmailVeridedInput={setEmailVeridedInput}

                                        setMobileOtp={setMobileOtp}
                                        setMobileVerified={setMobileVerified}

                                        initalValue={initalValue}
                                        handleChange={handleChange}
                                        mobileGenerateOtpMobile={mobileGenerateOtpMobile}
                                        userIDD={userIDD}

                                        handleCountryCode={handleCountryCode}
                                        countryCode={countryCode}

                                        setEmailOtp={setEmailOtp}
                                        setFormResiter={setFormResiter}
                                        loader1={loader1}

                                        showMobileOtp={showMobileOtp}
                                        handleClose2={handleClose2}
                                        mobileExit={mobileExit}
                                        setMobileExit={setMobileExit}
                                        veriFiedIconMobile={veriFiedIconMobile}
                                        setVeriFiedIconMobile={setVeriFiedIconMobile}
                                        
                                        

                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer />
                </section>
              
            </div>
            <Footer/>

        </>
    )
}
export default SignUpMerchant
import { useRef, useState, useEffect, useCallback } from "react";
import { Modal } from "react-bootstrap";
import { ForgotPinOtp, generateOtpForResendTpin } from "../../../../../api/login/Login";

function ForgetPin(props) {
    const length = 6;
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const [timeLeft, setTimeLeft] = useState(180);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [loader1, setloader1] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const inputs = useRef([]);
    const timerRef = useRef(null);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);

        setTimeLeft(180);
        setIsResendDisabled(true);

        timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timerRef.current);
                    setIsResendDisabled(false);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    }, []);

    useEffect(() => {
        if (!props.show) return;
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [props.show, startTimer]);

    const handleResendOtp = async () => {
        try {
            setIsResendDisabled(true);
            const datasend = { user_id: window.localStorage.getItem('userIdToken'), otp: otp.join('') };
            const response = await props.ForgotPinGet();

            if (response.status === 200) {
                setOtp(new Array(length).fill(''));
                setMessage(response?.message || 'OTP resent successfully');
                setError('');
                startTimer();
            } else {
                setError(response?.message || 'Failed to resend OTP');
            }
        } catch (error) {
            setError('An error occurred while resending OTP');
        } finally {
            setIsResendDisabled(false);
        }
    };

    const otpChandleChange = (index, value) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        
        if (numericValue.length > 1) return;
        
        const newOtp = [...otp];
        newOtp[index] = numericValue;
        setOtp(newOtp);

        if (numericValue && inputs.current[index + 1]) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && inputs.current[index - 1]) {
            inputs.current[index - 1].focus();
        }
    };

    const submitOtp = async () => {
        setloader1(true);
        const datasend = { user_id: window.localStorage.getItem('userIdToken'), otp: otp.join('') };
        try {
            const res = await ForgotPinOtp(datasend);
            if (res?.data?.statusCode == 200) {
                props.toastSuccessMessage(res?.data?.message);
                setTimeout(() => {
                    props.handleClose();
                }, 1000);
                setOtp(new Array(length).fill(''));
            }
            if (res?.data?.error == true) {
                props.toastErrorMessage(res?.data?.message);
            }
        } catch (error) {
            props.toastErrorMessage('An error occurred while verifying OTP');
        } finally {
            setloader1(false);

        }
    };

    const handleEnterPress = (e) => {
        if (e.key === 'Enter' && otp.every(value => value.length === 1)) {
            submitOtp();
        }
    };

    return (
        <Modal show={props.show} onHide={props.handleClose} centered className="email-optp-modle">
            <Modal.Body>
                <div className="set-head">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="headinf-otp">
                                <h2>OTP Verification</h2>
                                <p className="set-lage">{props?.OtpMsg?.message}</p>
                            </div>
                            <div className="verification-code">
                                <p>Verify Code <span>{formatTime(timeLeft)}</span></p>
                                <div className="resend-otp">
                                    <p onClick={handleResendOtp} style={{
                                        cursor: isResendDisabled ? 'default' : 'pointer',
                                        color: isResendDisabled ? 'gray' : 'blue',
                                        pointerEvents: isResendDisabled ? 'none' : 'auto',
                                    }}>
                                        {isResendDisabled ? `Resend in ${formatTime(timeLeft)}` : 'Resend OTP'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="input-group input-group-2 mb-3">
                                {otp.map((value, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength="1"
                                        value={value}
                                        onChange={(e) => otpChandleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        ref={(input) => (inputs.current[index] = input)}
                                        style={{ width: '14%' }}
                                        onKeyPress={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                            if (index === otp.length - 1) {
                                                handleEnterPress(e);
                                            }
                                        }}
                                        onPaste={(e) => e.preventDefault()}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="input-group mb-3">
                                <button 
                                    type="button" 
                                    disabled={otp.join('').length !== 6 || loader1} 
                                    onClick={submitOtp} 
                                    className={`form-control btn ${otp.join('').length !== 6 || loader1 ? 'disableebuttoncls' : 'btn-login'}`}
                                >
                                    Submit OTP 
                                    {loader1 && <div style={{ height: "16px", width: "16px" }} className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>}
                                </button>
                            </div>
                        </div>
                        {message && <div className="col-lg-12 text-success">{message}</div>}
                        {error && <div className="col-lg-12 text-danger">{error}</div>}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ForgetPin;
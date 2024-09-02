import { useEffect, useRef, useState,useCallback } from "react";
import { Button, Modal } from "react-bootstrap";
import { resendOtpsloginForm } from "../../../../api/login/Login";
function VerifyOtp(props) {
    const length = 6;
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const [isTimerEnded, setIsTimerEnded] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [timeLeft, setTimeLeft] = useState(120);
    const [loading, setLoading] = useState(false);
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    const inputs = useRef([]);


    

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleClose = () => {
        props.handleClose();
        setTimeLeft(120);
        setIsTimerEnded(false);
        setMessage('');
        setError('');
        setOtp(new Array(length).fill(''));
    };
    const timerRef = useRef(null);

const startTimer = useCallback(() => {
  if (timerRef.current) clearInterval(timerRef.current);

  setTimeLeft(120);
  setIsTimerEnded(false);
  setIsResendDisabled(true);

  timerRef.current = setInterval(() => {
    setTimeLeft((prevTime) => {
      if (prevTime <= 1) {
        clearInterval(timerRef.current);
        setIsResendDisabled(false);
        setIsTimerEnded(true);
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

const handleResendOtp = useCallback(async () => {
    try {
        setIsResendDisabled(true);  
      const response = await resendOtpsloginForm({
        customer_mobile: props.storedMobileNo,
        user_id: props.logintoken
      });
  
      if (response.status === 200) {
        setOtp(new Array(length).fill(''));
        setMessage(response?.message);
        setError('');
        startTimer();
       
      } else {
        setMessage(response?.message);
        setError(response.error);
      }
    } catch (error) {
      setMessage('An error occurred');
      setError(error.message);
    }
    finally {
        setIsResendDisabled(false); // Re-enable the button after processing
      }
  }, [startTimer, length, props.storedMobileNo, props.logintoken]);

    // const handleResendOtp = () => {
     
    //     setIsTimerEnded(false);
    //     setTimeLeft(120);
    //     setIsResendDisabled(true);
    //     setOtp(new Array(length).fill(''));
    //     setMessage('OTP resent successfully');
    //     setError('');
    // };

  

    const otpHandleChange = (index, value) => {
        // Only allow numeric input
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

    const handleEnterPress = (e) => {
        if (e.key === 'Enter' && otp.every(value => value.length === 1)) {
            handleSubmitOtp();
        }
    };

    const handleSubmitOtp = () => {
        setLoading(true);
        props.loginOtp(otp).then(() => {
            setLoading(false);
            // handleClose();
        }).catch((error) => {
            setLoading(false);
            setError('Invalid OTP. Please try again.');
        });
    };

    const isOtpComplete = otp.every(value => value !== '');

    return (
        <Modal show={props.show} onHide={handleClose} centered className="email-optp-modle"  style={{
            zIndex: 1050,
           
          }}>
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
                <div className="verification-code">
                    <p>Verify OTP</p>
                    <div className="resend-otp">
                        <span className="resend-otp" onClick={handleResendOtp}  style={{
          cursor: isResendDisabled ? 'default' : 'pointer',
          color: isResendDisabled ? 'gray' : 'blue',
          pointerEvents: isResendDisabled ? 'none' : 'auto',
        }}>
                            {isResendDisabled ? `Resend in ${formatTime(timeLeft)}` : 'Resend OTP'}
                        </span>
                    </div>
                </div>
                
                {/* OTP input section */}
                <div className="col-lg-12">
                    <div className="otp-inputs">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength="1"
                                value={value}
                                className="otp-input"
                                style={{ width: '14%' }}
                                onChange={(e) => otpHandleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={(input) => (inputs.current[index] = input)}
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
                    <div className="input-group">
                        <button
                            type="button"
                            disabled={!isOtpComplete || loading}
                            className={`form-control btn ${!isOtpComplete || loading ? 'disableebuttoncls not-allowed' : 'btn-login'}`}
                            onClick={handleSubmitOtp}
                        >
                            {loading ? 'Submitting...' : 'Submit OTP'}
                        </button>
                    </div>
                </div>
                {message && <div className="col-lg-12 text-success">{message}</div>}
                {error && <div className="col-lg-12 text-danger">{error}</div>}
            </div>
        </div>
    </div>
</Modal.Body>
    </Modal>
    );
}

export default VerifyOtp;

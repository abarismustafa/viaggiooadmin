import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Modal } from 'react-bootstrap';
import { resendOtpslogin } from "../../../../api/login/Login";
import { toastErrorMessage, toastSuccessMessage } from '../../../compeleteRegister/ToastShare';

const MobilesinupOtpModal = ({
  show,
  onHide,
  otp,
  inputs,
  otpMessage,
  otpError,
  handleResendOTP,
  otpHandleChange,
  handleKeyDown,
  handleOtpSubmit,
  setOtp,
  // resendOtpslogin, // Assuming you have an API function for resending OTP
  storedMobileNo,
  logintoken
}) => {
  const [isTimerEnded, setIsTimerEnded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [resendLoading, setResendLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

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
    if (!show) return;
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [show, startTimer]);

  const handleResendOtp = useCallback(async () => {
    try {
      setResendLoading(true);
      setIsResendDisabled(true);
      const response = await resendOtpslogin({
        customer_mobile: storedMobileNo,
        user_id: logintoken
      });
  console.log("response",response)
      if (response?.data?.statusCode == 200) {
        toastSuccessMessage(response?.data?.message)
        setOtp(new Array(6).fill(''));
        startTimer();
      }
      else{
        toastErrorMessage(response?.data?.data?.message)
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
    } finally {
      setResendLoading(false);
      setIsResendDisabled(false);
    }
  }, [startTimer, setOtp, resendOtpslogin, storedMobileNo, logintoken]);

  return (
    <Modal show={show} onHide={onHide} centered className="email-optp-modle" style={{ zIndex: 1050 }}>
      <Modal.Body style={{
        backgroundColor: '#ffffff',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}>
        <div className="set-head">
          <div className="row">
            <div className="col-lg-12">
              <div className="headinf-otp">
                <h2>Mobile OTP Verification</h2>
                <p className="set-lage">Enter 6 Digit Number Verification Code On Your Mobile Number!</p>
              </div>
              {isTimerEnded ? (
                <div className="d-flex justify-content-center align-items-center">
                  <button 
                    type="button" 
                    className="btn btn-resend-otp" 
                    onClick={handleResendOtp} 
                    disabled={resendLoading || isResendDisabled}
                  >
                    {resendLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Resend OTP'}
                  </button>
                </div>
              ) : (
                <>
                  <div className="verification-timer">
                    Verification Code {formatTime(timeLeft)} 
                    <span 
                      className="resend-otp" 
                      onClick={handleResendOtp}
                      style={{
                        cursor: isResendDisabled ? 'default' : 'pointer',
                        color: isResendDisabled ? 'gray' : 'blue',
                        pointerEvents: isResendDisabled ? 'none' : 'auto',
                      }}
                    >
                      Resend OTP
                    </span>
                  </div>
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
  );
};

export default MobilesinupOtpModal;
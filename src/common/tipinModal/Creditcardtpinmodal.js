import React, { useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './TipinModal.css'; 

function Creditcardtpinmodal(props) {
    const displayAmount = props.isAmountEdited ? props.editableAmount : props.originalAmount;
    const length = 4;
    const [otp, setOtp] = useState(new Array(length).fill(''));
    const inputs = useRef([]);

    const str = otp.join('');

    const otpChandleChange = (index, value) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && inputs.current[index + 1]) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && inputs.current[index - 1]) {
            inputs.current[index - 1].focus();
        }
    };

    const submitOtp = () => {
        if (props.paySubmit) {
            props.paySubmit(str);
            console.log("calledpaySubm")
        } else if (props.submitata) {
            props.submitata(str);
            console.log("submitata")
        }
        setOtp(new Array(length).fill(''));
    };

    const handleEnterPress = (e) => {
        if (e.key === 'Enter' && otp.every(value => value.length === 1)) {
            submitOtp();
        }
    };

    return (
        <Modal
            {...props}
            centered
            className="tipin-modal"
            style={{
                zIndex: 1050,
               
              }}
        >
            <Modal.Body style={{
    backgroundColor: '#ffffff',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
  }}>
                <div className="tipin-content">
                    <h2 className="tipin-title">Enter TPIN</h2>
                    <div className="amount-display">
                        <span>Amount:</span>
                        <strong>₹ {displayAmount}</strong>
                    </div>
                    <div className="otp-input-group">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                type="password"
                                maxLength="1"
                                value={value}
                                onChange={(e) => otpChandleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={(input) => (inputs.current[index] = input)}
                                onKeyPress={index === otp.length - 1 ? handleEnterPress : null}
                                className="otp-input"
                            />
                        ))}
                    </div>
                    <button 
                        type="button" 
                        className="submit-btn"
                        disabled={str.length !== 4} 
                        onClick={submitOtp}
                    >
                        {props?.loader1 ? (
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : 'Submit'}
                    </button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default Creditcardtpinmodal;
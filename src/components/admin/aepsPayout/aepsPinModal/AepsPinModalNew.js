import { useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { payoutDoTransaction } from "../../../../api/login/Login";
import './AepsPinModalNew.css';

function AepsPinModalNew(props) {
  const length = 4;
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputs = useRef([]);

  const otpHandleChange = (index, value) => {
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

  const submitOtp = async () => {
    const tpin = otp.join('');
    const datasend = { 
      ...props?.initialValue, 
      user_id: window.localStorage.getItem('userIdToken'), 
      tpin: tpin, 
      transId: props?.selectedItem?._id 
    };

    try {
      const res = await payoutDoTransaction(datasend);
      if (res?.data?.error === false) {
        props.toastSuccessMessage('Transaction Processed');
        setTimeout(() => {
          props.onHide();
        }, 1000);
      } else {
        props.toastErrorMessage('Transaction Failed');
      }
    } catch (error) {
      props.toastErrorMessage('An error occurred');
    }
    setOtp(new Array(length).fill(''));
  };

  return (
    <Modal
      {...props}
      centered
      className="aeps-pin-modal"
      style={{ zIndex: 1050 }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="transaction-details">
          <h4>Transaction Details</h4>
          <div className="detail-row">
            <span>Amount:</span>
            <strong>₹ {props?.initialValue?.amount}</strong>
          </div>
          <div className="detail-row">
            <span>Bank:</span>
            <strong>{props?.initialValue?.bank_name}</strong>
          </div>
          <div className="detail-row">
            <span>Account:</span>
            <strong>{props?.initialValue?.account_number}</strong>
          </div>
          <div className="detail-row">
            <span>Payment Mode:</span>
            <strong>{props?.initialValue?.paymentMode === 'NE' ? 'NEFT' : 'IMPS'}</strong>
          </div>
        </div>

        <Form.Group className="mt-4">
          <Form.Label>Enter TPIN</Form.Label>
          <div className="otp-input-group">
            {otp.map((value, index) => (
              <Form.Control
                key={index}
                type="password"
                maxLength="1"
                value={value}
                onChange={(e) => otpHandleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(input) => (inputs.current[index] = input)}
              />
            ))}
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={submitOtp} 
          disabled={otp.join('').length !== 4}
        >
          Confirm Payment
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AepsPinModalNew;

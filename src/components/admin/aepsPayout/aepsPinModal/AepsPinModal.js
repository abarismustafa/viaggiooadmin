import { useRef, useState } from "react";
import { Modal } from "react-bootstrap"
import { payoutDoTransaction } from "../../../../api/login/Login";


function AepsPinModal(props) {
    console.log(props);

    const length = 4
    const [otp, setOtp] = useState(new Array(length).fill(''));
    // console.log(otp);

    let str = ''
    for (let index = 0; index < otp.length; index++) {
        const element = otp[index];
        str = str + element
    }

    console.log(str);

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

    const getOtp = () => {
        // setPinForget(false)
    }

    const submitOtp = async (tipin) => {
        // setloader1(true)
        const datasend = { ...props?.initialValue, user_id: window.localStorage.getItem('userIdToken'), tpin: str, transId: props?.selectedItem?._id }
        // console.log(datasend);


        try {
            const res = await payoutDoTransaction(datasend)
            if (res?.data?.error == false) {
                props.toastSuccessMessage('Transaction Procced')
                setTimeout(() => {
                    props.handleClose()
                }, 1000)
            } else {
                props.toastErrorMessage('Transaction Failed')
            }
        } catch (error) {

        }
        setOtp(new Array(length).fill(''))
    }


    const handleEnterPress = (e) => {
        if (e.key === 'Enter' && otp.every(value => value.length === 1)) {
            submitOtp();
        }
    };
    return (
        <>
            <Modal
           
                {...props}
                // size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="email-optp-modle email-optp-modle-2"
                style={{
                    zIndex: 1050,
                   
                  }} 
            >
                {/* <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title>
                </Modal.Header> */}
                <Modal.Body style={{
    backgroundColor: '#ffffff',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
  }}>
                    <div className="set-head set-head-2">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="headinf-otp">
                                    <h2>Enter TPIN</h2>
                                    {/* <p className="set-lage">Enter 6 Digit Number Verification Code On Your Mobile Number ID !</p> */}
                                </div>
                                <div className="verification-code">
                                    <p>Amount : </p>
                                    <div className="resend-otp">
                                        <p>₹ {props?.initialData?.amount}{props?.initialValue?.amount}</p>
                                    </div>
                                </div>
                                <div className="verification-code">
                                    <p>Transaction Charge : </p>
                                    <div className="resend-otp">
                                        <p>₹ 0</p>
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-12">
                                <div className="input-group input-group-2 mb-3">
                                    {otp.map((value, index) => (
                                        <input
                                            key={index}
                                            type="password"
                                            maxLength="1"
                                            value={value}
                                            onChange={(e) => otpChandleChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            ref={(input) => (inputs.current[index] = input)}
                                            style={{ width: '21%' }}
                                            onKeyPress={index === otp.length - 1 ? handleEnterPress : null} // Handle Enter key press on last OTP input
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="input-group mb-3">

                                    <button type="button" className="form-control btn btn-login" disabled={str.length !== 4} onClick={submitOtp}>
                                        Submit
                                        {props?.loader1 && <div style={{ height: "16px", width: "16px" }} className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        }
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer> */}
            </Modal>
        </>
    )
}
export default AepsPinModal

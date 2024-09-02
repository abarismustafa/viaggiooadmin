import { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { qickDhanOtp } from "../../../../api/login/Login";
import QrCodeGenerate from "./qrCodeGnerate/QrCodeGenerate";


function QuickDhanOtp(props) {

    const [qrshow, setqrShow] = useState(false);

    const handleCloseqr = () => setqrShow(false);
    const handleShow = () => setqrShow(true);

    const [QrCodeUrl, setQrCodeUrl] = useState()


    const length = 6
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

    const submitOtp = async () => {
        const clone = { user_id: window.localStorage.getItem('userIdToken'), referenceid: props?.referenceid, otp: str }
        try {
            const res = await qickDhanOtp(clone)
            if (res?.data?.error == false) {
                props?.toastSuccessMessage(res?.data?.message)
                setOtp(new Array(length).fill(''))
                props?.handleClose()
                handleShow()
                setQrCodeUrl(res?.data?.data?.qr_link)
            } else {
                props?.toastSuccessMessage1(res?.data?.message)
            }
        } catch (error) {

        }
    }
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                ria-labelledby="contained-modal-title-vcenter"
                centered
                className="email-optp-modle"
            >
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <div className="set-head">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="headinf-otp">
                                    <h2>OTP Verification</h2>
                                    <p className="set-lage">Enter 6 Digit Number Verification Code On Your Mobile Number ID !</p>
                                </div>
                                <div className="verification-code">
                                    <p>Verification Code <span>03:00</span></p>
                                    <div className="resend-otp">
                                        <p>Resend OTP</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
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

                                    <button type="button"  disabled={str.length !== 6}
                                    className={`form-control btn ${str.length !== 6 ? 'disableebuttoncls' : 'btn-login'}`} onClick={submitOtp}>
                                        Submit OTP
                                        {/* {loader2 && <div style={{ height: "16px", width: "16px" }} className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        } */}
                                    </button>
                                </div>

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

            <QrCodeGenerate
                qrshow={qrshow}
                handleCloseqr={handleCloseqr}
                QrCodeUrl={QrCodeUrl}
            />
        </>
    )
}
export default QuickDhanOtp
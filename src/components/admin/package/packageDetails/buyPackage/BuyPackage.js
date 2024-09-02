import { useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap"


function BuyPackage(props) {
    console.log(props);
    const inputs = useRef([]);
    const [loader1, setloader1] = useState(false)


    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="by-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Package Purchase
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="">
                        <div className="walet-purchage-show">
                            <p><strong>Main Wallet - </strong></p>
                            <p>6000 Rs</p>
                        </div>
                        <div className="walet-purchage-show">
                            <p><strong>Purchase Amount -</strong></p>
                            <p>1000 Rs</p>
                        </div>
                        <div className="walet-purchage-show">
                            <p><strong>Total Main Wallet -</strong></p>
                            <p>5000 Rs</p>
                        </div>

                        <div className="form-group form-group-cus text-align-center col-lg-12 m-0">
                            <label htmlFor="txtCnfPassword" className="mb-3">Enter Tpin <span style={{ color: 'red' }}>*</span></label>
                            <div className="otp-box">
                                {props?.otp.map((value, index) => (
                                    <input
                                        key={index}
                                        type="password"
                                        value={value}
                                        onChange={(e) => props?.otpChandleChange(index, e.target.value)}
                                        onKeyDown={(e) => props?.handleKeyDown(index, e)}
                                        // ref={(input) => (props?.inputs?.current[index] = input)}
                                        style={{ width: '23%', marginBottom: '15px' }}
                                    />
                                ))}
                            </div>
                            <button type="button" className="btn btn-success mt-2">
                                PAY
                                {loader1 && <div style={{ height: "16px", width: "16px" }} className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                }
                            </button>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button onClick={props.onHide}>Close</Button> */}
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default BuyPackage
import { Popconfirm } from "antd";
import { useEffect, useRef, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { FaRupeeSign } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

function TifinPopup(props) {
    const [pinInputDis, setpinInputDis] = useState(true)
    const [amountError, setAmountError] = useState('');
    const length = 4
    const [otp, setOtp] = useState(new Array(length).fill(''));

    const inputs = useRef([]);

    const inputEnable = () => {
        setpinInputDis(false)
    }

    const handleAmountChange = (e) => {
        const value = e.target.value;
        const amount = parseFloat(value);
        
        if (isNaN(amount) || amount < 100) {
            setAmountError('Minimum amount is 100');
        } else if (amount > props.maxamount) {
            setAmountError(`Maximum amount is ${props.maxamount}`);
        } else {
            setAmountError('');
        }

        props.handleAmount(e);
    }

    const otpChandleChange = (index, value) => {
        if (value.length == 2) {
            return
        }
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

    const confirm = (e) => {
        props.sendMoney(otp.join(''));
        resetOtp();
    };

    const cancel = (e) => {
        // Handle cancel if needed
    };

    const resetOtp = () => {
        setOtp(new Array(4).fill(''));
    };

    const closeButtonLastModal = () => {
        const clone = { ...props?.initialMoney, amount: '' }
        props?.setInitialMoney(clone)
        setOtp(new Array(4).fill(''));
        props.onHide()
    }

    const isOtpComplete = otp.every(value => value.length === 1);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal-set"
        >
            <Modal.Body>
                <div className="send-money-deatils">
                    <div className="send-money-name">
                        <h2>Name: </h2>
                        <p>{props?.verifyData?.bank_account_name ? props?.verifyData?.bank_account_name : props?.sendMoneyData?.recipient_name}</p>
                    </div>
                    {props?.sendMoneyData?.recipient_mobile == undefined ? ' ' : <>
                        <div className="send-money-Mobile">
                            <h2>Mobile : </h2>
                            <p>{props?.sendMoneyData?.recipient_mobile}</p>
                        </div>
                    </>}
                    <div className="send-money-accNum">
                        <h2>IFSC Code : </h2>
                        <p>{props?.sendMoneyData?.ifsc}</p>
                    </div>
                    <div className="send-money-accNum">
                        <h2>Account Number : </h2>
                        <p>{props?.sendMoneyData?.account}</p>
                    </div>
                    <div className="send-money-bnkName">
                        <h2>Bank Name : </h2>
                        <p>{props?.sendMoneyData?.bank}</p>
                    </div>
                </div>

                <div className="input-group input-group-input mb-3 mt-3">
                    <span className="input-group-text" id="basic-addon1"><FaRupeeSign /></span>
                    <input 
                        type="number" 
                        className={`form-control ${amountError ? 'is-invalid' : ''}`}
                        placeholder={`Enter Amount (Min: 100, Max: ${props.maxamount})`}
                        disabled={pinInputDis} 
                        name="amount" 
                        value={props?.initialMoney?.amount} 
                        onChange={handleAmountChange}  
                    />
                    <MdEdit className="edit-co" onClick={inputEnable} />
                </div>
                {amountError && <div className="invalid-feedback d-block mb-3">{amountError}</div>}

                <div className="form-group form-group-cus text-align-center col-lg-12 m-0">
                    <label htmlFor="txtCnfPassword" className="mb-3">Enter TPIN <span style={{ color: 'red' }}>*</span></label>
                    <div className="otp-container">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                type="password"
                                pattern="\d*"
                                maxLength="1"
                                value={value}
                                onChange={(e) => otpChandleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={(input) => (inputs.current[index] = input)}
                                className="otp-input2"
                            />
                        ))}
                    </div>
                    <Popconfirm
                        title="Send"
                        description="Are you sure to Send ?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button 
                            type="button" 
                            disabled={!isOtpComplete || amountError || !props?.initialMoney?.amount} 
                            className={`btn ${!isOtpComplete || amountError || !props?.initialMoney?.amount ? 'commonbotton_disable' : 'btn-success'} mt-2 mb-2`}
                        >
                            PAY
                            {props?.loading3 ? <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div> : ''}
                        </button>
                    </Popconfirm>

                    <Button onClick={closeButtonLastModal}>Close</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default TifinPopup
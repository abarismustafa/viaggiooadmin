import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { FaRupeeSign } from "react-icons/fa";
import { LuSendHorizonal } from "react-icons/lu";
import { sendMoneyTrans, verificationBank } from "../../../../api/login/Login";
import { Popconfirm, message } from "antd";
import TifinPopup from "./tifinPopup/TifinPopUp";
import { useNavigate } from 'react-router-dom'

function UserTransfer(props, ref) {

    console.log(props);

    const [modalShow, setModalShow] = useState(false);

    const [verifyData, setVerifyData] = useState(null)
    // console.log(verifyData);

    const [loading1, setloading1] = useState(false)
    const [loading2, setloading2] = useState(false);
    const [loading3, setloading3] = useState(false);
    const [storetid, setStoreTid] = useState(null);
    const [amountError, setAmountError] = useState('');
    const [channelKey, setChannelKey] = useState(1);
    const [initialMoney, setInitialMoney] = useState({
        user_id: '',
        recipient_id: '',
        amount: '',
        customer_mobile: '',
        channel: 'NEFT',
        latlong: '',
        beneficiary_name: '',
        bank_name: '',
        ifsc_code: '',
        // bank_id: '',
        // bank_code: '',
        // bank_logo: '',
        account_number: '',
        customer_name: ''
    })

    const navigate = useNavigate();


    const handleAmount = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        if (name === 'amount') {
            const amount = parseFloat(value);
            if (isNaN(amount) || amount < 100) {
                setAmountError('Minimum amount is 100');
            } else if (amount > props.maxamount) {
                setAmountError(`Maximum amount is ${props.maxamount}`);
            } else {
                setAmountError('');
            }
        }

        const clone = { ...initialMoney, [name]: value };
        setInitialMoney(clone);
    }

    const handleChangeChanel = (str) => {
        const key = str === 'IMPS' ? 2 : 1;
        setChannelKey(key);
        const clone = { ...initialMoney, channel: str };
        setInitialMoney(clone);
    }

    const [position, setPosition] = useState({ latitude: null, longitude: null });

    // console.log('position', position);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            alert('Geolocation is not available in your browser.')
        }
    }, []);


    const confirm = (e) => {
        // console.log(e);

        // sendMoney()
        // message.success('Click on Yes');
    };
    const cancel = (e) => {
        // console.log(e);
        // message.error('Thanks 🙏');
    };

    const tifinPopupOpen = () => {
        props.onHide()
        setModalShow(true)
    }

    const handleEnterPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            props.onHide()
            setModalShow(true)
        }
    };

    const sendMoney = async (tipin) => {
        // console.log(tipin);
        const tipinn = tipin
        // setloading1(true)
        setloading3(true)
        const clone = {
            ...initialMoney, tpin: tipin, recipient_id: props.sendMoneyData.recipient_id, customer_mobile: props.customerNumber, channel: channelKey, beneficiary_name: props.sendMoneyData.recipient_name,
            bank_name: props.sendMoneyData.bank, ifsc_code: props.sendMoneyData.ifsc, account_number: props.sendMoneyData.account, customer_name: props.customerinformation, bank_id: props.sendMoneyData.bankId, api_id: props.initialCustomer.api_id, user_id: window.localStorage.getItem('userIdToken'), latlong: `${position.latitude} , ${position.longitude}`
        }
        // console.log(clone);
        try {
            const res = await sendMoneyTrans(clone)
            // console.log(res?.data?.message);
            if (res?.data?.statusCode == '200') {
                props.toastSuccessMessage(res?.data?.message)
                console.log("succcestdata", res?.data)
                const tid = res?.data?.data?.[0]?.batchId;
                setStoreTid(tid)
                setModalShow(false)
                if (props.walletShowHeader) props.walletShowHeader();
                setTimeout(() => {
                    navigate(`/deatils/${tid}`);
                }, 300);
            }
            // else {
            //     alert('Amount must be greater than 100')
            // }
            // setloading1(false)
            if (res?.data?.error == true) {
                props.toastSuccessMessageError(res?.data?.message)
                setloading3(false)
            }
        } catch (error) {
            // setloading1(false)
            setloading3(false)
        }
    }

    console.log("storetid", storetid)
    const [buttonDisable, setButtonDisable] = useState(true)
    // console.log(buttonDisable);

    useEffect(() => {
        console.log(props?.sendMoneyData?.isVerified);
        if (props?.sendMoneyData?.isVerified == true) {
            setButtonDisable(true)
        } else {
            setButtonDisable(false)
        }
    }, [props?.sendMoneyData?.isVerified])

    const VerifiedBank = async () => {
        setloading2(true)
        const clone = { name: props.sendMoneyData.recipient_name, ifsc: props.sendMoneyData.ifsc, bankAccount: props?.sendMoneyData?.account, phone: props.sendMoneyData.recipient_mobile, recipient_id: props?.sendMoneyData?.recipient_id, bank_id: props.sendMoneyData.bankId, api_id: props.initialCustomer.api_id, user_id: window.localStorage.getItem('userIdToken') }
        // bank_id: initialMoney.bank_id,
        try {
            const res = await verificationBank(clone)
            // console.log(res?.data?.data);
            if (res?.data?.statusCode == '200') {
                props.toastSuccessMessage(res?.data?.message)
                props.updateRecipetList()
                // props.SubmitCustomer()
                // res?.data?.statusCode
                setVerifyData(res?.data?.data)
                setButtonDisable(true)
            }
            if (res?.data?.error == true) {
                props?.toastSuccessMessageError(res?.data?.message)
            }
            if (res?.data?.message !== 'Verified') {
                setButtonDisable(false)

                // res?.data?.statusCode
            }
            setloading2(false)
        } catch (error) {
            setloading2(false)
        }
    }


    // useEffect(() => {
    //     const clone = { ...initialMoney, amount: '' }
    //     setInitialMoney(clone)

    // }, [modalShow])


    // const [pinComferm, setPinComferm] = useState(false)

    // const [pin, setPin] = useState({
    //     otp_pin: ''
    // })

    // const handlePin = (e) => {
    //     const clone = { ...pin }
    //     const value = e.target.value
    //     const name = e.target.name
    //     clone[name] = value
    //     setPin(clone)

    //     if (clone.otp_pin.length == 4) {
    //         setPinComferm(true)
    //     }

    // }
    // useEffect(() => {
    //     if (!props.show) {
    //       // Reset the input value when the modal closes
    //       setInitialMoney('');
    //     }
    //   }, [props.show]);
    //   if (!props.show) return null;
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modal-dialog-modal"
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter">
                        <div className="head-modal text-align-center">
                            <h2>Send Money</h2>
                            <p>Domestic Money Transfer</p>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="send-money-deatils">
                        <div className="send-money-name">
                            <h2>Name : </h2>
                            <p>{verifyData?.bank_account_name ? verifyData?.bank_account_name : props?.sendMoneyData?.recipient_name}</p>
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
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="send-moneyForm mt-1">
                                <form action="">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1"><FaRupeeSign /></span>
                                        <input type="number" className={`form-control ${amountError ? 'is-invalid' : ''}`}
                                            placeholder={`Enter Amount (Min: 100, Max: ${props.maxamount})`} name="amount" onKeyPress={handleEnterPress} value={initialMoney.amount} onChange={handleAmount} />
                                        {/* <span className="input-group-text" id="basic-addon1" onClick={sendMoney}><LuSendHorizonal /></span> */}
                                    </div>
                                    {amountError && <div className="invalid-feedback d-block mb-1">{amountError}</div>}


                                    <button type="button"
                                        className={`btn ${!initialMoney?.amount || amountError ? 'commonbotton_disable' : 'btn-success'} btn-cnf`} disabled={!initialMoney?.amount || amountError} onClick={tifinPopupOpen}>
                                        Submit
                                        {loading1 ? < div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div> : ''}
                                    </button>

                                    {/* <Popconfirm
                                        title="Send"
                                        description="Are you sure to Send ?"
                                        onConfirm={confirm}
                                        onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <button type="button" className="btn btn-success btn-cnf" disabled={!initialMoney?.amount}>
                                            Submit
                                            {loading1 ? < div class="spinner-border text-primary" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div> : ''}
                                        </button>
                                    </Popconfirm> */}

                                    <div className="mode-sec">
                                        <h4>Select Transfer Mode</h4>
                                        <div className="selctMode mt-3">
                                            <div className="form-check me-3">
                                                <input
                                                    className="form-check-input form-check-input-2"
                                                    type="radio"
                                                    name="channel"
                                                    id="IMPS"
                                                    onChange={(e) => handleChangeChanel('IMPS')}
                                                />
                                                <label className="form-check-label mt-1 ms-2" htmlFor="IMPS">
                                                    IMPS
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input form-check-input-2"
                                                    type="radio"
                                                    name="channel"
                                                    id="NEFT"
                                                    onChange={(e) => handleChangeChanel('NEFT')}
                                                    defaultChecked={true}
                                                />
                                                <label className="form-check-label mt-1 ms-2" htmlFor="NEFT">
                                                    NEFT
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* <div className="col-lg-12">
                            <div className="send-moneyForm mt-1">
                                <form action="">
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1 " className="form-label text-align-label">Enter PIN</label>
                                        <input type="number" className="form-control" id="exampleFormControlInput1" name="otp_pin" value={pin.otp_pin} placeholder="Enter Your Transaction PIN" onChange={handlePin} />
                                    </div>
                                    {pinComferm ? <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1 " className="form-label text-align-label text-align-label-2">Pin Verification Completed.Proceed For Transaction</label>
                                        <button type="button" className="btn btn-success btn-cnf">CONFIRM & PAY</button>
                                    </div> : ''}

                                </form>
                            </div>
                        </div> */}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="money-footer-button">
                        <Button disabled={buttonDisable} onClick={VerifiedBank} className={` ${buttonDisable ? 'commonbotton_disable' : ''} mr-3`}>
                            Verified Account
                            {loading2 ? < div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div> : ''}
                        </Button>
                        <Button onClick={props.onHide}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <TifinPopup
                show={modalShow}
                onHide={() => setModalShow(false)}
                setModalShow={props.setModalShow}
                sendMoney={sendMoney}
                sendMoneyData={props?.sendMoneyData}
                verifyData={verifyData}
                handleAmount={handleAmount}
                initialMoney={initialMoney}
                setInitialMoney={setInitialMoney}
                loading3={loading3}
                amountError={amountError}
                maxamount={props.maxamount}
            />
        </>
    )
}
export default UserTransfer
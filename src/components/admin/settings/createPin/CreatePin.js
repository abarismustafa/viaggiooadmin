import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import { ForgotPinGet, pinChange } from "../../../../api/login/Login";
import ForgetPin from "./forgetpin/ForgetPin";
function CreatePin() {
    const [loader1, setloader1] = useState(false)
    const [show, setShow] = useState(false);
    const [OtpMsg, setOtpMsg] = useState(null)

    const handleClose = () => {
        setShow(false);
    }


    const [initialData, setInitialData] = useState({
        user_id: '',
        oldPin: '',
        newPin: '',
        confirmPin: ''
    })

    const handleChange = (e) => {
        const clone = { ...initialData }
        const value = e.target.value
        if (/^\d*$/.test(value)) {
            const name = e.target.name
            clone[name] = value
            setInitialData(clone)
        }
    }

    const toastSuccessMessage = (str) => {
        toast.success(`${str}`, {
            position: "top-center"
        })
    };

    const toastErrorMessage = (str) => {
        toast.error(`${str}`, {
            position: "top-center"
        })
    };


    const handleShow = async () => {
        setShow(true)
        const res = await ForgotPinGet()
        // console.log(res?.data?.statusCode == 200);
        if (res?.data?.statusCode == 200) {
            toastSuccessMessage('OTP send Customer Mobile Number')
            setOtpMsg(res?.data?.data)
        }
    };

    const submitData = async () => {
        // console.log('dsf');
        setloader1(true)
        const clone = { ...initialData, user_id: window.localStorage.getItem('userIdToken') }
        try {
            const res = await pinChange(clone)
            // console.log(res?.data);
            if (res?.data?.statusCode == '200') {
                toastSuccessMessage(res?.data?.data?.mesage);
                setInitialData({
                    user_id: '',
                    oldPin: '',
                    newPin: '',
                    confirmPin: ''
                })
            }
            if (res?.data?.statusCode == '403') {
                toastErrorMessage(res?.data?.message);
            }
            setloader1(false)
        } catch (error) {
            setloader1(false)
        }
    }
    return (
        <>
            <div className="PageHeading">
                <h1>Transaction Pin</h1>
            </div>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header Forget_Pin">
                        <span>Change Your Transaction Pin</span>
                        <button type="button" className="btn btn-primary " onClick={handleShow} >Forgot Pin</button>
                    </div>
                    <div className="card-body">
                        <form action="">
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtOldPassword">Old Transaction Pin <span style={{ color: 'red' }}>*</span></label>
                                    <input className="form-control" id="txtOldPassword" name="oldPin" type="password" placeholder="Old Transaction Pin" value={initialData.oldPin} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtNewPassword">New Transaction Pin <span style={{ color: 'red' }}>*</span></label>
                                    <input className="form-control" id="txtNewPassword" name="newPin" type="password" placeholder="New Transaction Pin" value={initialData.newPin} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtCnfPassword">Confirm Transaction Pin <span style={{ color: 'red' }}>*</span></label>
                                    <input className="form-control" id="txtCnfPassword" name="confirmPin" type="password" placeholder="Confirm New Transaction Pin" value={initialData.confirmPin} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="text-align-center">
                                <button type="button" disabled={!initialData.oldPin || !initialData.newPin || !initialData.confirmPin}  className={`btn ${!initialData.oldPin || !initialData.newPin || !initialData.confirmPin ? 'commonbotton_disable' : 'btn-primary'} `} onClick={submitData}>
                                    Change Tpin
                                    {loader1 && <div style={{ height: "16px", width: "16px" }} className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    }
                                </button>
                            </div>
                        </form></div>
                </div>
            </div>
            <ForgetPin handleClose={handleClose} show={show} toastSuccessMessage={toastSuccessMessage} toastErrorMessage={toastErrorMessage} OtpMsg={OtpMsg} ForgotPinGet={ForgotPinGet}/>
            <ToastContainer />
        </>
    )
}
export default CreatePin
import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { ekoVeryfyCustomer, resendOtpsCustomer } from "../../../../../api/login/Login"
import { toastErrorMessage } from "../../../../compeleteRegister/ToastShare"


function OtpCustomer(props) {
    const [initialValue, setInitialValue] = useState({
        customer_mobile: '',
        user_id: '',
        otp: ''
    })

    const handleChange = (e) => {
        const clone = { ...initialValue }
        const value = e.target.value
        const name = e.target.name
        clone[name] = value
        setInitialValue(clone)
    }

    const otpSubmit = async () => {
        const clone = { ...initialValue, customer_mobile: props.initialCustomer.mobile,
            api_id:props.initialCustomer.api_id, user_id: window.localStorage.getItem('userIdToken') }
        try {
            const res = await ekoVeryfyCustomer(clone)
            if (res?.data?.statusCode == 400 || res?.data?.statusCode == 200) {
                props.toastSuccessMessage(res?.data?.message)
                // props.handleClose()
            }
            else{
               toastErrorMessage(res?.message)
            }
        } catch (error) {

        }
    }

    const ResentotpSubmit = async () => {
        const clone = { customer_mobile: props.customerNumber, user_id: window.localStorage.getItem('userIdToken') }
        try {
            const res = await resendOtpsCustomer(clone)
            if (res?.data?.statusCode == 200) {
                props.toastSuccessMessage(res?.data?.message)
                // props.handleClose()
            }
        } catch (error) {

        }
    }

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="otp-customer"
            >
                <Modal.Header closeButton>
                    {/* <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                    <div className="tab-pane fade show in" id="Mobile" role="tabpanel" aria-labelledby="MobileTab">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">
                                <h2 className="SecTitle-2">Otp Customer</h2>
                                <div className=" form-group">
                                    <div className="col-lg-12">
                                        <div className="form-group text-align-center">
                                            <div className="fl-wrap fl-wrap-input text-align-center">
                                                <label htmlFor="Name" className="fl-label ">OTP</label>
                                                <input type="text" className="form-control fl-input" id="Name" name="otp" value={initialValue.otp} placeholder="Enter OTP" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="FormButtons text-align-center">
                                        <button type="button" className="btn btn-success me-2" disabled={!initialValue.otp} onClick={otpSubmit}>OTP Submit</button>
                                        <button type="button" className="btn btn-success" onClick={ResentotpSubmit}>OTP Resend</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    )
}
export default OtpCustomer
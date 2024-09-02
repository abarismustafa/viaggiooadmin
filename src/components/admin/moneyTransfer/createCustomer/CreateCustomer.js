import { Button, Modal } from "react-bootstrap"

import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react";
import * as yup from 'yup'
import { createCustomer, getPincodeDetails } from "../../../../api/login/Login";
import { ToastContainer, toast } from "react-toastify";
import OtpCustomer from "./otpCustomer/OtpCustomer";
function CreateCustomer(props) {
    // console.log(props.initialCustomer.api_id);
    // console.log(props?.initialCustomer?.api_id !== 'Paysprint');



    const [loader1, setloader1] = useState(false)

    const [defalutValue, setDefalutValue] = useState({
        user_id: '',
        customer_mobile: '',
        name: '',
        dob: '',
        country: '',
        city: '',
        state: '',
        pincode: '',
        district: '',
        area: '',
        otp: '',
        api_id: ''
    })


    const handleChange = (e, pincode) => {

        if (pincode) {
            console.log('pincode');
            const clone = { ...defalutValue }
            const value = e.target.value
            const name = e.target.name
            clone[name] = value
            pinCodeDetails(clone)
            setDefalutValue(clone)
            return
        }
        const clone = { ...defalutValue }
        const value = e.target.value
        const name = e.target.name
        clone[name] = value
        setDefalutValue(clone)
    }

    const toastSuccessMessage = (data) => {
        toast.success(`${data}`, {
            position: "top-center",
        });
    };

    function calculateBirthdate() {
        var today = new Date();
        var birthYear = today.getFullYear() - 18;
        var birthdate = new Date(birthYear, 0, 1); // Assuming January 1st of the birth year
        return birthdate;
    }
    // Example usage:
    var birthdate = calculateBirthdate();


    const pinCodeDetails = async (clone) => {
        const clone2 = { ...defalutValue }
        try {
            const res = await getPincodeDetails(clone?.pincode)
            // console.log(res?.data?.data);
            // setDefalutValue({
            //     city: res?.data?.data?.city,
            //     district: res?.data?.data?.district,
            //     state: res?.data?.data?.state,
            //     area: res?.data?.data?.sub_distance

            // })
            setDefalutValue({ ...clone2, city: res?.data?.data?.city, district: res?.data?.data?.district, state: res?.data?.data?.state, area: res?.data?.data?.sub_distance, pincode: clone.pincode })
        } catch (error) {

        }
    }


    const handleSubmit = async () => {
        setloader1(true)
        const clone = { ...defalutValue, api_id: props?.initialCustomer?.api_id, user_id: window.localStorage.getItem('userIdToken') }
        try {
            const res = await createCustomer(clone)
            if (res?.data?.statusCode == 200) {
                props.toastSuccessMessage(res?.data?.message)
                props.setModalShow2(false)
                // props.handleShow(true)
                if (props?.initialCustomer?.api_id !== 'Paysprint') {
                    props.handleShow(true)
                }
                // else {
                //     props.handleShow(true)
                // }
            }
            if (res?.data?.statusCode == 500) {
                props.toastSuccessMessageError(res?.data?.message)
            }
            if (res?.data?.statusCode == 1 || res?.data?.statusCode == 4) {
                props.toastSuccessMessage(res?.data?.message)
                setTimeout(() => {
                    props.onHide()
                }, 200)
            }
            setloader1(false)
        } catch (error) {

        }
    }

    useEffect(() => {
        const clone = { ...defalutValue, customer_mobile: props.updateNumber.mobile, country: 'India', dob: birthdate.toISOString().slice(0, 10) }
        setDefalutValue(
            clone
        )
    }, [props.updateNumber.mobile])


    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h2 className="SecTitle-2">Create Customer</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="tab-pane fade  show in" id="Mobile" role="tabpanel" aria-labelledby="MobileTab">
                        <div className="row">
                            <div className="col-md-12 col-sm-12">

                                <div className="row form-group">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="fl-wrap fl-wrap-input">
                                                <label htmlFor="Name" className="fl-label">Name <span style={{ color: 'red' }}>*</span></label>
                                                <input type="text" className="form-control fl-input" id="Name" name="name" value={defalutValue.name} placeholder="Enter Name" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="fl-wrap fl-wrap-input">
                                                <label htmlFor="customer_mobile" className="fl-label">Customer Mobile <span style={{ color: 'red' }}>*</span></label>
                                                <input type="number" disabled className="form-control fl-input" id="customer_mobile" name="customer_mobile" value={defalutValue.customer_mobile} placeholder="Enter Mobile Number" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="fl-wrap fl-wrap-input">
                                                <label htmlFor="Date-Of-Birth" className="fl-label">Date Of Birth <span style={{ color: 'red' }}>*</span></label>
                                                <input type="date" className="form-control fl-input" id="Date-Of-Birth" name="dob" value={defalutValue.dob} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="fl-wrap fl-wrap-input">
                                                <label htmlFor="Country" className="fl-label">Country <span style={{ color: 'red' }}>*</span></label>
                                                <input type="text" disabled className="form-control fl-input" id="Country" name="country" value={defalutValue.country} placeholder="Enter Country Name" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="fl-wrap fl-wrap-input">
                                                <label htmlFor="pincode" className="fl-label">Pin Code <span style={{ color: 'red' }}>*</span></label>
                                                <input type="number" className="form-control fl-input" id="pincode" name="pincode" value={defalutValue.pincode} placeholder="Enter Pin Code" onChange={(e) => handleChange(e, 'pincode')} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="fl-wrap fl-wrap-input">
                                                <label htmlFor="state" className="fl-label">State <span style={{ color: 'red' }}>*</span></label>
                                                <input type="text" className="form-control fl-input" disabled id="state" name="state" value={defalutValue.state} placeholder="Enter State Name" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="fl-wrap fl-wrap-input">
                                                <label htmlFor="Country" className="fl-label">City <span style={{ color: 'red' }}>*</span></label>
                                                <input type="text" className="form-control fl-input" id="Country" name="city" disabled value={defalutValue.city} placeholder="Enter City Name" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="fl-wrap fl-wrap-input">
                                                <label htmlFor="district" className="fl-label">District <span style={{ color: 'red' }}>*</span></label>
                                                <input type="text" className="form-control fl-input" id="district" disabled name="district" value={defalutValue.district} placeholder="Enter District Name" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <div className="fl-wrap fl-wrap-input">
                                                <label htmlFor="area" className="fl-label">Area <span style={{ color: 'red' }}>*</span></label>
                                                <input type="text" className="form-control fl-input" disabled id="area" name="area" value={defalutValue.area} placeholder="Enter Area Name" onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>


                                    {props?.initialCustomer.api_id === "66bca8b95727c7563ad6e315" ? null : (
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <div className="fl-wrap fl-wrap-input">
                                                    <label htmlFor="otp" className="fl-label">OTP <span style={{ color: 'red' }}>*</span></label>
                                                    <input
                                                        type="number"
                                                        className="form-control fl-input"
                                                        id="otp"
                                                        name="otp"
                                                        value={defalutValue.otp}
                                                        placeholder="Enter OTP"
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}




                                    <div className="FormButtons">

                                        <button type="button" className="btn btn-success" onClick={handleSubmit}>

                                            Submit
                                            {loader1 && <div style={{ height: "16px", width: "16px" }} className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            }
                                        </button>
                                        {/* <button
                                                type="button"
                                                onClick={resetForm}
                                                className="btn btn-warning float-right"
                                            >
                                                rest
                                            </button> */}
                                    </div>
                                </div>

                            </div>
                            {/* <ResentTransition /> */}
                        </div>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button
                        onClick={props.onHide}>Close</Button>
                </Modal.Footer> */}
            </Modal>
            {/* <ToastContainer /> */}


        </>
    )
}
export default CreateCustomer
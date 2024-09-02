import { useState } from "react";
import { useEffect } from "react"
import { getShippingAddressById, sendShipping, sendShippingUpdate } from "../../../api/login/Login";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const toastSuccessMessage = (str) => {
    toast.success(`${str}`, {
        position: "top-center"
    })
};


function FormBillAdd({ ship, type }) {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [state, setState] = useState({
        type: type,
        country: "",
        firstname: "",
        lastname: "",
        email: "",
        mobile_number: "",
        state: "",
        city: "",
        pin_code: "",
        addressLine1: "",
        addressLine2: "",
        landmark: "",
        province: "",
        company: "",
        userid: window.localStorage.getItem('user_id')
    })
    const onchengeHandle = (e) => {
        let newValue = e.target.value.replace(/\s/g, '');
        // if (!(/^\s*$/.test(e.target.value))) {
        //     return
        // }
        if (e.target.name == 'addressLine1' || e.target.name == 'addressLine2' || e.target.name == 'state' || e.target.name == 'city' || e.target.name == 'province') {
            newValue = e.target.value

        }
        const clone = { ...state }
        const value = newValue
        clone[e.target.name] = value
        setState(clone)
    }
    const token = window.localStorage.getItem('token')
    const onsubmitData = async () => {
        setShow(true)
        const clone = {
            type: type,
            country: state.country,
            state: state.state,
            city: state.city,
            pin_code: state.pin_code,
            addressLine1: state.addressLine1,
            addressLine2: state.addressLine2,
            landmark: state.landmark,
            province: state.province,
            company: state.company,
            email: state.email,
            mobile_number: state.mobile_number,
            firstname: state.firstname,
            lastname: state.lastname,
            user_id: window.localStorage.getItem('userToken')
        }
        try {
            await sendShipping(clone)
            setShow(false)
            toastSuccessMessage(`${type} Address Add Successfully`)
            setTimeout(() => {
                navigate('/admin/shipping_Address')
            }, 2000)
        } catch (error) {
            setShow(false)
        }
    }

    const onsubmitDataUpdate = async () => {
        setShow(true)
        const clone = {
            type: type,
            country: state.country,
            state: state.state,
            city: state.city,
            pin_code: state.pin_code,
            addressLine1: state.addressLine1,
            addressLine2: state.addressLine2,
            landmark: state.landmark,
            province: state.province,
            company: state.company,
            email: state.email,
            mobile_number: state.mobile_number,
            firstname: state.firstname,
            lastname: state.lastname,
            user_id: window.localStorage.getItem('userToken')
        }
        try {
            await sendShippingUpdate({ value: clone, id: params.id })
            setShow(false)
            toastSuccessMessage(`${type} Address Update Successfully`)
        } catch (error) {
            setShow(false)
        }
    }


    const params = useParams()
    const setAddress = (val) => {
        const clone = { ...state, type: val }
        setState(clone)
    }

    useEffect(() => {
        if (params?.id) {
            const getDataId = async () => {
                try {
                    const datas = await getShippingAddressById(params?.id)
                    setState({ ...state, ...datas.data.data })
                } catch (error) {

                }
            }
            getDataId()
        }
    }, [params?.id])

    // useEffect(() => {
    //     if (isError) {
    //         alert('Address Not Add')
    //     }
    // }, [isError])



    return <div className="container" style={{ margin: "20px auto" }}>
        <ToastContainer />
        <form className="row ">

            {ship === 'Shipping' && <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Address Type</label>
                <input type="text" className="form-control" name="firstname" disabled value=" Shipping Address" aria-describedby="emailHelp" />
            </div>}

            {ship === 'billing' && <div className="mb-3 col-6">

                <label htmlFor="exampleInputEmail1" className="form-label">Address Type</label>
                <input type="text" className="form-control" name="firstname" disabled value=" Billing Address" aria-describedby="emailHelp" />
            </div>}


            {/* {ship === 'Shipping' && <>
                <div className="mb-3 col-6">
                    <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                    <input type="text" className="form-control" value={state.firstname} name="firstname" onChange={onchengeHandle} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="lastname" value={state.lastname} onChange={onchengeHandle} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="text" className="form-control" name="email" value={state.email} onChange={onchengeHandle} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="exampleInputEmail1" className="form-label">Phone</label>
                    <input type="number" className="form-control" name="phone" value={state.phone} onChange={onchengeHandle} aria-describedby="emailHelp" />
                </div>
            </>} */}

            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">First Name <span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-control" value={state.firstname} name="firstname" onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Last Name <span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-control" name="lastname" value={state.lastname} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Email <span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-control" name="email" value={state.email} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Phone <span style={{ color: 'red' }}>*</span></label>
                <input type="number" className="form-control" name="mobile_number" value={state.mobile_number} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>


            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Country <span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-control" value={state.country} name="country" onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>

            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">State <span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-control" name="state" value={state.state} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">City <span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-control" name="city" value={state.city} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">ZIP <span style={{ color: 'red' }}>*</span></label>
                <input type="number" className="form-control" name="pin_code" value={state.pin_code} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Province <span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-control" name="province" value={state.province} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Address Line1 <span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-control" name="addressLine1" value={state.addressLine1} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Address Line2</label>
                <input type="text" className="form-control" name="addressLine2" value={state.addressLine2} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div>
            {/* <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Landmark <span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-control" name="landmark" value={state.landmark} onChange={onchengeHandle} aria-describedby="emailHelp" />
            </div> */}
            <div className="mb-3 col-6">
                <label htmlFor="exampleInputEmail1" className="form-label">Company <span style={{ color: 'red' }}>*</span></label>
                <input type="text" className="form-control" name="company" onChange={onchengeHandle} value={state.company} aria-describedby="emailHelp" />
            </div>
            {/* {isSuccess && (<div className="alert alert-success" role="alert">
            Address Add Successfully!
        </div>)}
        {isAddsuss && (<div className="alert alert-success" role="alert">
            Address Add Successfully!
        </div>)} */}

            <div className="billing-address-set">

                <Link to="/billing_Address" className="btn btn-warning mr-3">Back</Link>
                <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary" disabled={!params?.id ? '' : !state.country || !state.state || !state.city || !state.pin_code || !state.province || !state.addressLine1 || !state.company} onClick={params?.id ? onsubmitDataUpdate : onsubmitData}>Submit  {show && <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}</button>
            </div>
        </form>
    </div>
}
export default FormBillAdd
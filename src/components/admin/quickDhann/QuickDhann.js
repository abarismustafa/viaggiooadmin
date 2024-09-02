import { useEffect, useState } from "react";
import Loader from "../../../common/loader/Loader"
import Select from "react-select";
import { bankListApi, qickDhan } from "../../../api/login/Login";
import QuickDhanOtp from "./quickDhannOtp/QuickDhanOtp";
import { ToastContainer, toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DeclearPage from "../../../common/declearPage/DeclearPage";
import './QuickDhann.css';
import ComingSoon from "./ComingSoon";
function QuickDhann() {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const [referenceid, setReferenceid] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formValues, setFormValues] = useState({
        mobile: '',
        customer_name: '',
        amount: '',
        address: '',
        purpose: '',
        pincode: '',
        user_id: '',
    });

    const handleChange = (e, str) => {
        const clone = { ...formValues }
        if (str == 'mobile' && e.target.value.length == 11) {
            return
        }
        if (str == 'pincode' && e.target.value.length == 7) {
            return
        }
        const value = e.target.value
        const name = e.target.name
        clone[name] = value
        setFormValues(clone)
    };


    const toastSuccessMessage = (message) => {
        toast.success(`${message}`, {
            position: "top-center",
        });
    };

    const toastSuccessMessage1 = (message) => {
        toast.error(`${message}`, {
            position: "top-center",
        });
    };


    const handleSubmit = async () => {
        const clone = { ...formValues, user_id: window.localStorage.getItem('userIdToken') }
        try {
            const res = await qickDhan(clone)
            setReferenceid(res?.data?.data?.referenceid)
            if (res?.data?.error == false) {
                toastSuccessMessage(res?.data?.message)
                handleShow()
                setFormValues(
                    {
                        mobile: '',
                        customer_name: '',
                        amount: '',
                        address: '',
                        purpose: '',
                        pincode: '',
                    }
                )
            } else {
                toastSuccessMessage1(res?.data?.message)
            }

        } catch (error) {

        }
    };

    return (
      
    //     <div className="qd-container">
    //     <header className="qd-header">
    //       <h1>Quick Dhan</h1>
    //     </header>
    //     <main className="qd-main">
    //       <h2>Coming Soon...</h2>
    //       <div className="hourglass"></div>
    //       <p>Get ready for a revolutionary financial experience. Quick Dhan is on its way to transform your digital transactions!</p>
    //       <div className="qd-features">
    //         <div className="qd-feature">
    //           <i className="fas fa-mobile-alt"></i>
    //           <span>Easy Banking</span>
    //         </div>
    //         <div className="qd-feature">
    //           <i className="fas fa-shield-alt"></i>
    //           <span>Secure Transactions</span>
    //         </div>
    //         <div className="qd-feature">
    //           <i className="fas fa-chart-line"></i>
    //           <span>Mobile Banking Options</span>
    //         </div>
    //       </div>
    //     </main>
       
    //   </div>
    <>
    <ComingSoon />
    </>
    )
}
export default QuickDhann
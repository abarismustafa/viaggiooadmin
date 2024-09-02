import { FaArrowDownLong, FaArrowUpLong, FaEyeSlash, FaEye } from "react-icons/fa6";
import imsgChart from '../../../asesets/adminImage/chart.png';
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line, PolarArea } from "react-chartjs-2";
import DasBoardSlideProduct from "./dasboardSlideProduct/DasBoardSlideProduct";
import { useEffect, useState, useRef } from "react";
import { Getprofile, dateGet, generateOtpForTpin, verifyOtpForTpin, generatenewTpin, resendOtpsCustomer, generateOtpForResendTpin, demoapiCheck } from "../../../api/login/Login";
import { TiTick, TiTickOutline } from 'react-icons/ti';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './Dashboard.css';
import image from "../../../asesets/logo/PayPanda_logo_Final-09-e1670775011263.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserTpinStatus } from "../../../utils/localStorage";
import CustomMarquee from "./CustomMarquee";



function DasBoardCheck({ walletData }) {
    const [data, setData] = useState({});

    const [number, setNumber] = useState('');
    const [loader1, setLoader1] = useState(false);
    const [loader, setLoader] = useState(false);
    const [newPin, setNewPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [pinError, setPinError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);

    const [userTpinstatus, setUserTpinstatus] = useState(null);
    const [dataprofile, setDataprofile] = useState(null);
    const [message1, setMessage1] = useState('');
    const [error1, setError1] = useState('');
    const [loading, setLoading] = useState(false);
    const [message2, setMessage2] = useState('');
    const [error2, setError2] = useState('');
    const [message3, setMessage3] = useState('');
    const [error3, setError3] = useState('');
    const storedUserid = localStorage.getItem('userIdToken');
    console.log("storedUserid", storedUserid);
    const [showNewPin, setShowNewPin] = useState(false);
    const [showConfirmPin, setShowConfirmPin] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180);
    const [isTimerEnded, setIsTimerEnded] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [initializing, setInitializing] = useState(true);
    const [modalVisibility, setModalVisibility] = useState({
        showModal: false,
        showModal2: false,
        showModal3: false,
        showOverlay: false
    })

    const currentDates = async () => {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;

        try {
            const res = await dateGet(currentDate);
            setData(res?.data?.data);
        } catch (error) {
            console.error(error);
        }
    };



    console.log("userTpinstatus", userTpinstatus)
    console.log("userTpinstatustype", typeof (userTpinstatus))
    const handleGetPin = () => {
        console.log("Number entered:", number);

    };

    const handleGetPin2 = () => {
        console.log('Generating Tpin for number:', number);
        alert(`Generated Tpin for ${number}`);
    };
    const handleCloseModal1 = () => {
        setModalVisibility(prev => ({ ...prev, showModal: false, showOverlay: false }));
        setMessage1('');
        setError1('');
    };

    const handleOpenModal2 = () => {
        setModalVisibility(prev => ({ ...prev, showModal2: true, showOverlay: true }));
    };

    const handleCloseModal2 = () => {
        setModalVisibility(prev => ({ ...prev, showModal2: false, showOverlay: false }));
    };

    const handleOpenModal3 = () => {
        setModalVisibility(prev => ({ ...prev, showModal3: true, showOverlay: true }));
    };

    const handleCloseModal3 = () => {
        setModalVisibility(prev => ({ ...prev, showModal3: false, showOverlay: false }));
    };
    const handleSubmitmodal3 = (e) => {
        setModalVisibility(prev => ({ ...prev, showModal3: false, showModal2: true }));
    }
    // const handleSubmitmodal2 = (e) => {
    //     handleCloseModal2();
    //     setShowOverlay(false)

    // }
    const handleNewPinChange = (e) => {
        const pin = e.target.value;
        if (/^\d{0,6}$/.test(pin)) {
            setNewPin(pin);
            setPinError(pin.length !== 4);
        } else {
            setPinError(true);
        }
    };

    const handleConfirmPinChange = (e) => {
        const pin = e.target.value;
        if (/^\d{0,6}$/.test(pin)) {
            setConfirmPin(pin);
            setConfirmError(pin.length !== 4 || pin !== newPin);
        } else {
            setConfirmError(true);
        }
    };

    useEffect(() => {
        currentDates();
        const storedTpinStatus = localStorage.getItem('userTpinstatus');
        setUserTpinstatus(storedTpinStatus);
    }, []);

    useEffect(() => {
        const initializeModals = () => {
            if (userTpinstatus === "CV") {

                setModalVisibility({
                    showModal: false,
                    showModal2: false,
                    showModal3: false,
                    showOverlay: false
                });
            } else if (userTpinstatus === "NP" || userTpinstatus === null || userTpinstatus === undefined || userTpinstatus === '' || userTpinstatus == "undefined") {

                setModalVisibility({
                    showModal: true,
                    showModal2: false,
                    showModal3: false,
                    showOverlay: true
                });
            } else if (userTpinstatus === "OV") {

                setModalVisibility({
                    showModal: false,
                    showModal2: true,
                    showModal3: false,
                    showOverlay: true
                });
            } else {

                setModalVisibility({
                    showModal: false,
                    showModal2: false,
                    showModal3: false,
                    showOverlay: false
                });
            }
        };


        if (userTpinstatus !== null) {
            initializeModals();
        }
    }, [userTpinstatus]);


    const handleSubmitmodal1 = async () => {
        setLoader1(true);

        try {
            const response = await generateOtpForTpin({});
            setLoader1(false);

            if (response && response.data && response.data.error === false) {
                toast.success('TPIN generated successfully');
                console.log("tpin generated");
                setMessage1(response.data.message);
                handleCloseModal1();
                handleOpenModal3();
            } else {
                setError1("Failed to generate TPIN");
                toast.error('Failed to generate TPIN');
            }
        } catch (error) {
            setLoader1(false);
            setError1('Failed to generate OTP for Tpin');
            toast.error('Failed to generate TPIN');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPin.length !== 4 || confirmPin.length !== 4 || newPin !== confirmPin) {
            setConfirmError(true);
            return;
        }

        setLoader(true);

        setMessage3('');
        setError3('');

        try {
            const response = await generatenewTpin({
                user_id: storedUserid,
                genTpin: newPin,
                confirmTpin: confirmPin
            });
            console.log("resposetpin", response)
            if (response?.data?.statusCode == '200') {
                getUserTpinStatus("CV")
                setMessage3('New TPIN generated successfully.');
                toast.success('New TPIN generated successfully!');
                handleCloseModal2();
            } else {
                setError3('Failed to generate TPIN.');
                toast.error('Failed to generate TPIN.');
            }
        } catch (error) {
            setError3('Failed to generate TPIN.');
            toast.error('Failed to generate TPIN.');
        } finally {
            setLoader(false);
        }
    };



    const isSubmitDisabled = pinError || confirmError || newPin.length !== 4 || confirmPin.length !== 4 || newPin !== confirmPin;





    const length1 = 6;
    const [otp1, setOtp1] = useState(new Array(length1).fill(''));
    const inputs1 = useRef([]);

    const otpChandleChange1 = (index, value) => {
        const newOtp = [...otp1];
        if (value.length === 2) {
            return;
        }
        newOtp[index] = value;
        setOtp1(newOtp);

        if (value && index < length1 - 1 && inputs1.current[index + 1]) {
            inputs1.current[index + 1].focus();
        }
    };

    const handleKeyDown1 = (index, e) => {
        if (e.key === 'Backspace' && !otp1[index] && index > 0 && inputs1.current[index - 1]) {
            inputs1.current[index - 1].focus();
        }
    };

    const isAllInputsFilled = !otp1.includes('');

    const handleSubmitOTP = async () => {
        setLoading(true);
        setMessage2('');
        setError2('');

        try {
            const response = await verifyOtpForTpin({ user_id: storedUserid, otp: otp1.join('') });
            console.log("otpres", response);

            if (response?.data?.statusCode == '200') {
                getUserTpinStatus("OV");
                setMessage2('OTP verified successfully.');
                toast.success('OTP verified successfully.');
                handleSubmitmodal3();
            } else if (response?.message === 'Invalid OTP') {
                setError2('Invalid OTP.');
                toast.error('Invalid OTP.');
            } else {
                setError2('Failed to verify OTP.');
                toast.error('Failed to verify OTP.');
            }
        } catch (error) {
            console.error("otperr", error);

            if (error.response?.data?.message === 'Invalid OTP') {
                setError2('Invalid OTP.');
                toast.error('Invalid OTP.');
            } else {
                setError2('Failed to verify OTP.');
                toast.error('Failed to verify OTP.');
            }
        } finally {
            setLoading(false);
        }
    };



    const dummyInputs = new Array(length1).fill(null);
    function processCustomerMobile() {

        var value = window.localStorage.getItem('regisNumber');


        var mobile = '';


        if (value) {

            if (value.charAt(0) == '+' || value.charAt(0) == '0') {
                mobile = value.replace(/[^a-zA-Z0-9+]/g, "").substr(3);
            } else {
                mobile = value.replace(/[^a-zA-Z0-9]/g, "");
            }
        } else {
            console.log('No registration number found in localStorage.');
        }


        return mobile;
    }


    var customerMobile = processCustomerMobile();


    useEffect(() => {
        console.log(" timeLeft:", timeLeft, "isTimerEnded:", isTimerEnded);
        let timer;
        if (timeLeft > 0 && !isTimerEnded) {
            timer = setTimeout(() => {
                console.log("Decreasing timeLeft:", timeLeft - 1);
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && !isTimerEnded) {
            setIsTimerEnded(true);
            console.log("Timer ended");
        }
        return () => clearTimeout(timer);
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleResendOTP = async () => {
        setResendLoading(true);
        setError2('');
        setMessage2('');

        try {
            const response = await generateOtpForResendTpin({ customer_mobile: customerMobile, user_id: storedUserid });
            if (response.status === 200) {
                setMessage2('OTP has been resent successfully.');
                setTimeLeft(180);
                setIsTimerEnded(false);
            } else {
                setError2('Failed to resend OTP.');
            }
        } catch (error) {
            setError2('Failed to resend OTP.');
        } finally {
            setResendLoading(false);
        }
    };


    // const getDataProfile = async () => {
    //     try {
    //         const res = await Getprofile();
    //         setDataprofile(res?.data?.data)
    //     } catch (error) {

    //     }
    // }
    // useEffect(() => {
    //     getDataProfile()


    // }, [])
    console.log('data', data);
    const storedUserType = localStorage.getItem('userType');
    const userName = walletData ? walletData?.name : "";
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await demoapiCheck()
                console.log('ledgerreport report Service Report Data:', data);
            } catch (error) {
                console.error('Error fetching commission service report data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {modalVisibility.showOverlay && <div className="overlay modalpinoverlayclass"></div>}
            <div className="ContentArea">
                <div className="card">

                    <CustomMarquee retailerName={userName} />

                    {storedUserType === 'Super Distributor' || storedUserType === 'Distributor' ? (
                        <>
                        </>
                    ) : (
                        <>

                            <DasBoardSlideProduct />

                        </>
                    )}
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="total-txn">
                                            <div>
                                                <span role="img" aria-label="insert-row-above" size={52} className="anticon anticon-insert-row-above hover:animate-spin border-dashed cursor-pointer transition-all border-black font-extrabold bg-[#ffffff42] rounded-full p-4">
                                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="insert-row-above" width="1em" height="1em" fill="currentColor" aria-hidden="true"><defs></defs><path d="M878.7 336H145.3c-18.4 0-33.3 14.3-33.3 32v464c0 17.7 14.9 32 33.3 32h733.3c18.4 0 33.3-14.3 33.3-32V368c.1-17.7-14.8-32-33.2-32zM360 792H184V632h176v160zm0-224H184V408h176v160zm240 224H424V632h176v160zm0-224H424V408h176v160zm240 224H664V632h176v160zm0-224H664V408h176v160zm64-408H120c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8z" /></svg>
                                                </span>
                                            </div>
                                            <div className="rupees">
                                                <span>{data?.dmtTotal ?? 0} ₹</span>
                                            </div>
                                            <div className="tName">
                                                <span>Total Txn</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="total-txn money_in">
                                            <div>
                                                <span role="img" aria-label="insert-row-above" size={52} className="anticon anticon-insert-row-above hover:animate-spin border-dashed cursor-pointer transition-all border-black font-extrabold bg-[#ffffff42] rounded-full p-4">
                                                    <FaArrowDownLong />
                                                </span>
                                            </div>
                                            <div className="rupees">
                                                <span>{data?.wallet?.creditTotal ?? 0} ₹</span>
                                            </div>
                                            <div className="tName">
                                                <span>Credit</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="total-txn Money-out mt-3">
                                            <div>
                                                <span role="img" aria-label="insert-row-above" size={52} className="anticon anticon-insert-row-above hover:animate-spin border-dashed cursor-pointer transition-all border-black font-extrabold bg-[#ffffff42] rounded-full p-4">
                                                    <FaArrowUpLong />
                                                </span>
                                            </div>
                                            <div className="rupees">
                                                <span>{data?.wallet?.debitTotal ?? 0} ₹</span>
                                            </div>
                                            <div className="tName">
                                                <span>Debit</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="total-txn dispute mt-3">
                                            <div>
                                                <span role="img" aria-label="insert-row-above" size={52} className="anticon anticon-insert-row-above hover:animate-spin border-dashed cursor-pointer transition-all border-black font-extrabold bg-[#ffffff42] rounded-full p-4">
                                                    <FaArrowUpLong />
                                                </span>
                                            </div>
                                            <div className="rupees">
                                                {console.log(data?.disputeRequest ?? 0)}
                                                <span>{data?.disputeRequest ?? 0}</span>
                                            </div>
                                            <div className="tName">
                                                <span>Dispute Request</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {window.localStorage.getItem('userType') == 'Retailer' && <>
                                <div className="col-lg-12 mt-3">
                                    <h2 className="text-align-center bussnuness">Today's Business Summary</h2>
                                </div>



                                <div className="col-lg-12 mt-3">
                                    <h6>Today's DMT Summary</h6>
                                </div>
                                <div className="col-lg-4">
                                    <div className="bussnes-data">
                                        <div className="left-sides">
                                            SUCCESS
                                        </div>
                                        <div className="right-sides">
                                            {data?.dmt?.[0]?.success ?? 0}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="bussnes-data-red">
                                        <div className="left-sides">
                                            FAILED
                                        </div>
                                        <div className="right-sides">
                                            {data?.dmt?.[0]?.failed ?? 0}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="bussnes-data-yellow">
                                        <div className="left-sides">
                                            PENDING
                                        </div>
                                        <div className="right-sides">
                                            {data?.dmt?.[0]?.pending ?? 0}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 mt-3">
                                    <h6>Today's Payout Summary</h6>
                                </div>
                                <div className="col-lg-4">
                                    <div className="bussnes-data">
                                        <div className="left-sides">
                                            SUCCESS
                                        </div>
                                        <div className="right-sides">
                                            {data?.payout?.[0]?.success ?? 0}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="bussnes-data-red">
                                        <div className="left-sides">
                                            FAILED
                                        </div>
                                        <div className="right-sides">
                                            {data?.payout?.[0]?.failed ?? 0}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <div className="bussnes-data-yellow">
                                        <div className="left-sides">
                                            PENDING
                                        </div>
                                        <div className="right-sides">
                                            {data?.payout?.[0]?.pending ?? 0}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 mt-3">
                                    <h6>Today's Cms Summary</h6>
                                </div>
                                <div className="col-lg-4">
                                    <div className="bussnes-data">
                                        <div className="left-sides">
                                            SUCCESS
                                        </div>
                                        <div className="right-sides">
                                            {data && data?.cms?.success}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="bussnes-data-red">
                                        <div className="left-sides">
                                            FAILED
                                        </div>
                                        <div className="right-sides">
                                            {data && data?.cms?.failed}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <div className="bussnes-data-yellow">
                                        <div className="left-sides">
                                            PENDING
                                        </div>
                                        <div className="right-sides">
                                            {data && data?.cms?.pending}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12 mt-3">
                                    <h6>Today's Quick Dhan Summary</h6>
                                </div>
                                <div className="col-lg-4">
                                    <div className="bussnes-data">
                                        <div className="left-sides">
                                            SUCCESS
                                        </div>
                                        <div className="right-sides">
                                            {data && data?.quickDhan?.success}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="bussnes-data-red">
                                        <div className="left-sides">
                                            FAILED
                                        </div>
                                        <div className="right-sides">
                                            {data && data?.quickDhan?.failed}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <div className="bussnes-data-yellow">
                                        <div className="left-sides">
                                            PENDING
                                        </div>
                                        <div className="right-sides">
                                            {data && data?.quickDhan?.pending}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 mt-3">
                                    <h6>Today's Adhaar Pay Summary</h6>
                                </div>
                                <div className="col-lg-4">
                                    <div className="bussnes-data">
                                        <div className="left-sides">
                                            SUCCESS
                                        </div>
                                        <div className="right-sides">
                                            {data && data?.adhaarPay?.success}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="bussnes-data-red">
                                        <div className="left-sides">
                                            FAILED
                                        </div>
                                        <div className="right-sides">
                                            {data && data?.adhaarPay?.failed}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <div className="bussnes-data-yellow">
                                        <div className="left-sides">
                                            PENDING
                                        </div>
                                        <div className="right-sides">
                                            {data && data?.adhaarPay?.pending}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 mt-3">
                                    <h6>Today's Cash Withdrew Summary</h6>
                                </div>
                                <div className="col-lg-4">
                                    <div className="bussnes-data">
                                        <div className="left-sides">
                                            SUCCESS
                                        </div>
                                        <div className="right-sides">
                                            {data && data?.CashWithdrew?.success}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="bussnes-data-red">
                                        <div className="left-sides">
                                            FAILED
                                        </div>
                                        <div className="right-sides">
                                            {data && data?.CashWithdrew?.failed}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <div className="bussnes-data-yellow">
                                        <div className="left-sides">
                                            PENDING
                                        </div>
                                        <div className="right-sides">
                                            {data && data?.CashWithdrew?.pending}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-12 mt-3">
                                    <h6>Today's Cash Deposit Summary</h6>
                                </div>
                                <div className="col-lg-4">
                                    <div className="bussnes-data">
                                        <div className="left-sides">
                                            SUCCESS
                                        </div>
                                        <div className="right-sides">
                                            {data && data?.CashDeposit?.success}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="bussnes-data-red">
                                        <div className="left-sides">
                                            FAILED
                                        </div>
                                        <div className="right-sides">
                                            {data && data?.CashDeposit?.failed}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <div className="bussnes-data-yellow">
                                        <div className="left-sides">
                                            PENDING
                                        </div>
                                        <div className="right-sides">
                                            {data && data?.CashDeposit?.pending}
                                        </div>
                                    </div>
                                </div>





                                {data?.services && data?.services?.map((item) => {
                                    return <div key={item?._id} className="row">
                                        <div className="col-lg-12 mt-3 text-align-center">
                                            <h6>{item?.service_name}</h6>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="bussnes-data">
                                                <div className="left-sides">
                                                    SUCCESS
                                                </div>
                                                <div className="right-sides">
                                                    {item?.successTotalAmount}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="bussnes-data-red">
                                                <div className="left-sides">
                                                    FAILED
                                                </div>
                                                <div className="right-sides">
                                                    {item?.failedTotalAmount}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="bussnes-data-yellow">
                                                <div className="left-sides">
                                                    PENDING
                                                </div>
                                                <div className="right-sides">
                                                    {item?.pendingTotalAmount}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })}

                            </>}
                        </div>
                    </div>
                </div>
            </div>


            {/* Bootstrap Modal 1 */}
            {modalVisibility.showModal && (
                <div className={`modal fade mediaqurymodalpop show d-block`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" onHide={handleCloseModal1} >
                    <div className="lock-screen">
                        <div className="lock-screen__content">
                            <img className="lock-screen__imgae" src={image} />
                            {/* <h1 className="lock-screen__greeting">Hey, {dataprofile?.name?.split(' ')[0] || ""}</h1> */}
                            <h2 className="lock-screen__message">
                                Generate Tpin for secure payments.
                            </h2>
                            <p className="lock-screen__instruction">Click on button to generate Tpin</p>
                            <button className="unlock-button" onClick={handleSubmitmodal1}>
                                {loader1 ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Generate Tpin'}</button>


                            {message1 && (
                                <div className="alert alert-success mt-1" role="alert">
                                    {message1}
                                </div>
                            )}
                            {error1 && (
                                <div className="alert alert-danger mt-1" role="alert">
                                    {error1}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {/* Bootstrap Modal 3 */}
            {modalVisibility.showModal3 && (
                <div className={`modal fade modal-cssclasss mediaqurymodalpop show d-block`} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content modal-content-otp">
                            <div className="modal-header text-center">
                                <h5 className="modal-title modaltitle-otp">OTP Verification</h5>
                            </div>
                            <div className="modal-body">
                                {isTimerEnded ? (
                                    <>
                                        <p>Enter 6 Digit Number Verification Code On Your Mobile Number ID !</p>
                                        <button type="button" className="btn btn-resend-otp" onClick={handleResendOTP}>
                                            {resendLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Resend OTP'}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p>Enter 6 Digit Number Verification Code On Your Mobile Number ID !</p>
                                        <div className="verification-timer">Verification Code {formatTime(timeLeft)} <span className="resend-otp" onClick={handleResendOTP}>Resend OTP</span></div>
                                        <div className="otp-inputs">
                                            {otp1.map((value, index) => (
                                                <input
                                                    key={index}
                                                    type="number"
                                                    maxLength="1"
                                                    value={value}
                                                    onChange={(e) => otpChandleChange1(index, e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown1(index, e)}
                                                    ref={(input) => (inputs1.current[index] = input)}
                                                    className="otp-input"
                                                />
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            className="btn btn-submit-otp"
                                            onClick={handleSubmitOTP}
                                            disabled={!isAllInputsFilled || loading}
                                        >
                                            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Submit OTP'}
                                        </button>
                                        {message2 && <div className="alert alert-success mt-3">{message2}</div>}
                                        {error2 && <div className="alert alert-danger mt-3">{error2}</div>}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Bootstrap Modal 2 */}
            {modalVisibility.showModal2 && (
                <div className={`modal fade modal-cssclasss mediaqurymodalpop show d-block`} tabIndex="-1" role="dialog">
                    <div className="modal-dialog getpinmodal" role="document">
                        <div className="modal-content text-center">
                            <div className="modal-header text-center">
                                <h5 className="modal-title modaltitle-otp">Create your Tpin</h5>
                            </div>
                            <div className="modal-body">
                                <div className="col-lg-12">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <div className="input-group">
                                                <input
                                                    type={showNewPin ? "text" : "password"}
                                                    className={`form-control ${newPin.length === 4 && !pinError ? 'is-valid' : ''}`}
                                                    id="newPin"
                                                    value={newPin}
                                                    onChange={handleNewPinChange}
                                                    placeholder="Enter new PIN"
                                                    aria-label="New PIN"
                                                    aria-describedby="basic-addon1"
                                                    required
                                                />
                                                {newPin.length === 4 && !pinError && (
                                                    <span className="position-absolute top-50 end-0 translate-middle-y pe-2">
                                                        <TiTick />
                                                    </span>
                                                )}
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={() => setShowNewPin(!showNewPin)}
                                                >
                                                    {showNewPin ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                            {pinError && (
                                                <div className="text-danger">
                                                    Please enter exactly 4 numeric digits.
                                                </div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <div className="input-group">
                                                <input
                                                    type={showConfirmPin ? "text" : "password"}
                                                    className={`form-control ${confirmPin.length === 4 && !confirmError ? 'is-valid' : ''}`}
                                                    id="confirmPin"
                                                    value={confirmPin}
                                                    onChange={handleConfirmPinChange}
                                                    placeholder="Confirm new PIN"
                                                    aria-label="Confirm PIN"
                                                    aria-describedby="basic-addon2"
                                                    required
                                                />

                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={() => setShowConfirmPin(!showConfirmPin)}
                                                >
                                                    {showConfirmPin ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                            {confirmError && <div className="text-danger">PINs do not match or are not 4 digits.</div>}
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-submit-otp"
                                            disabled={pinError || confirmError || newPin.length !== 4 || confirmPin.length !== 4}
                                        >
                                            {loader ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Submit'}
                                        </button>
                                        {message3 && <div className="alert alert-success mt-3">{message3}</div>}
                                        {error3 && <div className="alert alert-danger mt-3">{error3}</div>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </>
    );
}

export default DasBoardCheck;

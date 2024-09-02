import React, { useState, useEffect, useRef } from 'react';
import { Pagination, Modal, Button, Form, Table, Col, Row, Card, Badge } from 'react-bootstrap';
import { FaEye, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Loader from '../../../common/loader/Loader';
import { getDownstreamList, fundtransferToRefer, confirmReverseTransfer, Getprofile, getDownstreamListReport } from '../../../api/login/Login';
import "./Userlist.css";
import { WalletsShow } from '../../../api/login/Login';
import { Popconfirm } from 'antd';
import axios from 'axios';
import { baseUrl } from '../../../baseUrl';








function Userlist({ walletShowHeader }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(10);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [expandedUserId, setExpandedUserId] = useState(null);
    const navigate = useNavigate();
    const [transferAmount, setTransferAmount] = useState('');
    const [walletData, setWalletData] = useState({});
    const [filterData, setFilterData] = useState({
        userId: '',
        name: '',
        email: '',
        mobile: '',
        is_approved: '',
        refer_id: ''
    });

    const [isTransferValid, setIsTransferValid] = useState(false);
    const storedUserType = localStorage.getItem('userType');
    const storedUserTypeId = localStorage.getItem('userTypeId');
    const userToken = window.localStorage.getItem('userToken')
    const [showTpinModal, setShowTpinModal] = useState(false);
    const [showReverseTpinModal, setShowReverseTpinModal] = useState(false);
    const [tpin, setTpin] = useState('');
    const [tpinError, setTpinError] = useState('');
    const [showReverseTransferModal, setShowReverseTransferModal] = useState(false);
    const [reverseTransferAmount, setReverseTransferAmount] = useState('');
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(120);
    const [isTimerEnded, setIsTimerEnded] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpError, setOtpError] = useState('');
    const [otpMessage, setOtpMessage] = useState('');
    const [storetoken, setStoreToken] = useState();
    const length1 = 6;
    const [otp1, setOtp1] = useState(new Array(length1).fill(''));
    const inputs1 = useRef([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [maskedTpin, setMaskedTpin] = useState('');
    const [walletlockdata, setLockWAletData] = useState({})
    const [isPopconfirmOpen, setIsPopconfirmOpen] = useState(false);


    const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLatitude(position.coords.latitude);
                        setLongitude(position.coords.longitude);
                        setLocationError(null);
                        resolve(true);
                    },
                    (error) => {
                        setLocationError("Unable to retrieve your location");

                    }
                );
            } else {
                setLocationError("Geolocation is not supported by your browser");

            }
        });
    };


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

    console.log("walletData", walletData)

    useEffect(() => {
        fetchData();
    }, [page, count]);



    const fetchData = async () => {
        setLoading(true);
        try {
            let response;
            if (storedUserType === "Distributor") {
                response = await getDownstreamList(page, count, storedUserTypeId, filterData);
            } else {
                response = await getDownstreamList(page, count, '', filterData);
            }
            setData(response?.data?.data || []);
            setTotalCount(response?.data?.totalCount || 0);
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to fetch users');
            setData([]);
            setTotalCount(0);
        }
        setLoading(false);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage - 1);
    };

    const handleTransferClick = (user) => {
        setSelectedUser(user);
        setShowTransferModal(true);
    };

    const validateTpin = async (tpin) => {

        return { isValid: tpin === '1234' };
    };

    const handleUserClick = async (userId) => {
        console.log("userId",userId)
        if (expandedUserId === userId) {
            setExpandedUserId(null);
        } else {
            setExpandedUserId(userId);
            setLoading(true);
            try {
                const response = await getDownstreamList(page, count,  userId,);
                const updatedData = data.map(user =>
                    user._id === userId ? { ...user, subUsers: response?.data?.data || [] } : user
                );
                setData(updatedData);
                console.log("subdata",data)
            } catch (error) {
                console.error('Error fetching sub-users:', error);
                toast.error('Failed to fetch sub-users');
            }
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        setPage(0);
        fetchData();
    };


    const resetFilter = () => {
        setFilterData({
            userId: '',
            name: '',
            email: '',
            mobile: '',
            is_approved: '',
            refer_id: '' 
        });
        setPage(0);
        fetchData();
    };
    const walletShow = async () => {
        try {
            const res = await WalletsShow()
            console.log("Wallet", res)
            setWalletData(res?.data?.data);
        } catch (error) {

        }
    }
    const getDataProfile = async () => {
        try {
            const res = await Getprofile()
            setLockWAletData(res?.data?.data)

        } catch (error) {

        }
    }

    useEffect(() => {
        walletShow();
        getDataProfile();
    }, []);
    useEffect(() => {
        if (showTpinModal || showReverseTpinModal) {
            getCurrentLocation();
        }
    }, [showTpinModal, showReverseTpinModal]);

    const handleTransferAmountChange = (e) => {
        const amount = e.target.value;
        setTransferAmount(amount);
        setIsTransferValid(Number(amount) >= 0
            && Number(amount) <= Number(walletData?.main_wallet - walletlockdata?.locking_amt)
        );
    };

   
    const handleReverseTransferClick = (user) => {
        setSelectedUser(user);
        setShowReverseTransferModal(true);
    };

    const handleReverseTransferAmountChange = (e) => {
        const amount = e.target.value;
        setReverseTransferAmount(amount);

    };

    const handleReverseTransferSubmit = async () => {
        try {
            await getCurrentLocation();

            if (locationError) {
                toast.error(locationError);
                return;
            }

            const response = await fundtransferToRefer({
                transferTo: selectedUser._id,
                amount: Number(reverseTransferAmount),
                tpin: tpin,
                trans_type: "refund",
                lat: latitude,
                long: longitude
            });

            if (response.data.statusCode == "200") {
                const token = response.data.data.token;
                setStoreToken(token);
                setShowReverseTpinModal(false);
                setShowOtpModal(true);
                startOtpTimer();
            } else if (response.data.statusCode == "403") {
                setTpinError(response?.data?.message);
                toast.error(response?.data?.message);
            } else {
                toast.error(response.data.message || 'Reverse transfer failed. Please try again.');
            }
        } catch (error) {
            console.error('Error reverse transferring money:', error);
            toast.error('Reverse transfer failed. Please try again.');
        }
    };

    const startOtpTimer = () => {
        setTimeLeft(120);
        setIsTimerEnded(false);
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setIsTimerEnded(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const handleSubmitOTP = async (e) => {
        if (e) e.preventDefault();
        setOtpLoading(true);
        try {
            const otpValue = otp1.join('');

            const response = await confirmReverseTransfer({
                token: storetoken,
                otp: otpValue,
                lat: latitude,
                long: longitude
            });

            if (response.data.statusCode == "200") {
                setOtpLoading(false);
                setShowOtpModal(false);
                toast.success('Reverse transfer successful');
                fetchData();
                resetModalStates()
                walletShow();
                if (walletShowHeader) walletShowHeader();
            } else {
                setOtpError(response.data.message || 'Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error confirming reverse transfer:', error);
            setOtpError('An error occurred. Please try again.');
        }
        setOtpLoading(false);
    };
    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (isAllInputsFilled && !otpLoading) {
                handleSubmitOTP();
            } else if (index < length1 - 1 && inputs1.current[index + 1]) {
                inputs1.current[index + 1].focus();
            }
        }
        if (e.key === 'Backspace' && !otp1[index] && index > 0 && inputs1.current[index - 1]) {
            inputs1.current[index - 1].focus();
        }
    };

    const handleResendOTP = () => {
        setResendLoading(true);

        startOtpTimer();
        setResendLoading(false);
    };

    const resetModalStates = () => {
        setTransferAmount('');
        setReverseTransferAmount('');
        setTpin('');
        setMaskedTpin('');
        setTpinError('');
        setOtp1(new Array(length1).fill(''));
        setOtpError('');
        setOtpMessage('');
        setIsTransferValid(false);
        setIsPopconfirmOpen(false);
    };
    const handleTransferSubmit = async () => {
        try {
            await getCurrentLocation();

            if (locationError) {
                toast.error("Location access is required for this transaction. Please enable location services and try again.");
                return;
            }

            const response = await fundtransferToRefer({
                transferTo: selectedUser._id,
                amount: Number(transferAmount),
                tpin: tpin,
                trans_type: "transfer",
                lat: latitude,
                long: longitude
            });

            if (response.data.statusCode == "200") {
                toast.success('Money transferred successfully');
                setShowTpinModal(false);
                resetModalStates();
                fetchData();
                walletShow();
                if (walletShowHeader) walletShowHeader();
            } else if (response.data.statusCode == "403") {
                setTpinError(response?.data?.message);
                toast.error(response?.data?.message);
            } else {
                toast.error(response.data.message || 'Transfer failed. Please try again.');
            }
        } catch (error) {
            console.error('Error transferring money:', error);
            if (error.name === 'GeolocationPositionError') {
                toast.error("Unable to access location. Please enable location services and try again.");
            } else {
                toast.error('Transfer failed. Please try again.');
            }
        }
    };
    const handleCloseTransferModal = () => {
        setShowTransferModal(false);
        resetModalStates();
        // setTransferAmount('');
    };

    const handleCloseTpinModal = () => {
        setShowTpinModal(false);
        resetModalStates();
        // setTpin('');
    };

    const handleCloseReverseTransferModal = () => {
        setShowReverseTransferModal(false);
        resetModalStates();
        // setReverseTransferAmount('');
    };

    const handleCloseReverseTpinModal = () => {
        setShowReverseTpinModal(false);
        resetModalStates();
        setTpin('');
    };

    const handleCloseOtpModal = () => {
        setShowOtpModal(false);
        resetModalStates();
        // setOtp1();
    };

    const handleTransferModalKeyDown = (e) => {
        if (e.key === 'Enter' && isTransferValid) {
            e.preventDefault();
            if (Number(transferAmount) < 100) {
                toast.error('Amount must be at least 100 rupees');
            } else {
                setShowTransferModal(false);
                setShowTpinModal(true);
            }
        }
    };
    const handleTpinModalKeyDown = (e) => {
        if (e.key === 'Enter' && tpin.length === 4 && !locationError) {
            e.preventDefault();
            setIsPopconfirmOpen(true);
        }
    };
    const handleReverseTransferModalKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setShowReverseTransferModal(false);
            setShowReverseTpinModal(true);
        }
    };
    const handleReverseTpinModalKeyDown = (e) => {
        if (e.key === 'Enter' && tpin.length === 4 && !locationError) {
            e.preventDefault();
            setIsPopconfirmOpen(true);
        }
    };
    const handleReportClick = (userId) => {
        navigate(`/user-report/${userId}`);
    };
    return (
        <>
            {loading && <Loader />}
            <div className="container-fluid">
                <h1 className="h3 mb-2 text-gray-800">Downstream Users</h1>

                <Card className="shadow mb-4">
                    <Card.Header className="py-3 bg-primary text-white">
                        <h6 className="m-0 font-weight-bold">Filter</h6>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleFilterSubmit}>
                            <Row>
                            <Row>
    <Col md={3}>
        <Form.Group className="mb-3">
            <Form.Label>Refer ID</Form.Label>
            <Form.Control
                type="text"
                name="refer_id"
                value={filterData.refer_id}
                onChange={handleFilterChange}
            />
        </Form.Group>
    </Col>
    <Col md={3}>
        <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
                type="text"
                name="name"
                value={filterData.name}
                onChange={handleFilterChange}
            />
        </Form.Group>
    </Col>
    <Col md={3}>
        <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="email"
                name="email"
                value={filterData.email}
                onChange={handleFilterChange}
            />
        </Form.Group>
    </Col>
    <Col md={3}>
        <Form.Group className="mb-3">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
                type="text"
                name="mobile"
                value={filterData.mobile}
                onChange={handleFilterChange}
            />
        </Form.Group>
    </Col>
</Row>
                            </Row>
                            <Row>

                                <Col md={12} className="d-flex align-items-end justify-content-end">
                                    <Button variant="primary" type="submit" className="me-2">
                                        Apply Filter
                                    </Button>
                                    <Button variant="warning" onClick={resetFilter}>
                                        Reset
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Card.Body>
                </Card>

                {/* User List Table */}
                <Card className="shadow mb-4">
                    {/* <Card.Header className="py-3 d-flex justify-content-between align-items-center bg-primary text-white"> */}
                    {/* <h6 className="m-0 font-weight-bold">User List</h6> */}
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                        <span> {storedUserType === 'Super Distributor' ? 'Distributor' : 'Retailer'}</span>
                        {/* <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="btn btn-light"
                            table="table-to-xlsx"
                            filename="downstream_users"
                            sheet="tablexls"
                            buttonText="Download Excel"
                        /> */}
                    </div>
                    <Card.Body>
                        <div className="table-responsive">
                            {storedUserType === 'Super Distributor' ? (
                                <Table className="table-hover" id="dataTable">
                                    <thead className="bg-light">
                                        <tr>
                                            <th>S.No</th>
                                            <th>Refer ID</th>
                                            <th>Name</th>
                                            <th>Approved</th>
                                            <th>Userlist</th>
                                            <th>Transfer</th>
                                            <th>Reverse Transfer</th>
                                            <th>Wallet Balance</th>
                                            <th>Report</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.length > 0 ? data.map((user, index) => (
                                            <React.Fragment key={user._id}>
                                                <tr>
                                                    <td>{index + 1 + (page * count)}</td>
                                                    <td>{user.refer_id}</td>
                                                    <td>{user.name}</td>
                                                    <td className={user.is_approved ? 'approvedstatusindownstrip' : 'pendingstatusindownstrip'}>
                                                        {user.is_approved ? 'Approved' : 'Pending'}
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant="link"
                                                            onClick={() => handleUserClick(user._id)}
                                                            className="d-flex align-items-center"
                                                        >
                                                            Retailers
                                                            {expandedUserId === user._id ? <FaChevronUp className="ms-1" /> : <FaChevronDown className="ms-1" />}
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button variant="outline-primary" size="sm" onClick={() => handleTransferClick(user)}>
                                                            Transfer Money
                                                        </Button>
                                                    </td>
                                                    <td>
                                                        <Button variant="outline-secondary" size="sm" onClick={() => handleReverseTransferClick(user)}>
                                                            Reverse Transfer
                                                        </Button>
                                                    </td>
                                                    <td>{user?.main_wallet || 0}</td>
                                                    <td>
                                                        <Button variant="link" onClick={() => handleReportClick(user._id)}>
                                                            <FaEye className="text-primary" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                                {expandedUserId === user._id && user.subUsers && (
                                                    <tr>
                                                        <td colSpan="6" className="p-0">
                                                            <div className="bg-light p-3 rounded">
                                                                <h6 className="mb-3">Retailer List</h6>
                                                                <Table className="table-sm table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>S.No</th>
                                                                            <th>Refer Id</th>
                                                                            <th>Name</th>
                                                                            <th>Status</th>
                                                                            <th>Wallet Balance</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {user.subUsers.length > 0 ? (
                                                                            user.subUsers.map((subUser, index) => (
                                                                                <tr key={subUser._id}>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{subUser.refer_id}</td>
                                                                                    <td>{subUser.name}</td>
                                                                                    <td>
                                                                                        {subUser.is_approved ? (
                                                                                            <span className="badge bg-success">Approved</span>
                                                                                        ) : (
                                                                                            <span className="badge bg-warning text-dark">Not Approved</span>
                                                                                        )}
                                                                                    </td>
                                                                                    <td>{subUser.main_wallet || 0}</td>
                                                                                </tr>
                                                                            ))
                                                                        ) : (
                                                                            <tr>
                                                                                <td colSpan="5" className="text-center">No data available</td>
                                                                            </tr>
                                                                        )}
                                                                    </tbody>
                                                                </Table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        )) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">No data available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            ) : storedUserType === 'Distributor' ? (
                                <Table className="table-hover" id="dataTable">
                                    <thead className="bg-light">
                                        <tr>
                                            <th>S.No</th>
                                            <th>Refer ID</th>
                                            <th>Name</th>
                                            <th>Approved</th>

                                            <th>Transfer</th>
                                            <th>Reverse Transfer</th>
                                            <th>Wallet Balance</th>
                                            <th>Report</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.length > 0 ? data.map((user, index) => (
                                            <tr>
                                                <td>{index + 1 + (page * count)}</td>
                                                <td>{user.refer_id}</td>
                                                <td>{user.name}</td>
                                                <td className={user.is_approved ? 'approvedstatusindownstrip' : 'pendingstatusindownstrip'}>
                                                    {user.is_approved ? 'Approved' : 'Pending'}
                                                </td>

                                                <td>
                                                    <Button variant="outline-primary" size="sm" onClick={() => handleTransferClick(user)}>
                                                        Transfer Money
                                                    </Button>
                                                </td>
                                                <td>
                                                    <Button variant="outline-secondary" size="sm" onClick={() => handleReverseTransferClick(user)}>
                                                        Reverse Transfer
                                                    </Button>
                                                </td>
                                                <td>{user.main_wallet || 0}</td>
                                                <td>
                                                    <Button variant="link" onClick={() => handleReportClick(user._id)}>
                                                        <FaEye className="text-primary" />
                                                    </Button>
                                                </td>
                                            </tr>

                                        )) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">No data available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            ) : (
                                <div className="text-center">No records available .</div>
                            )}
                        </div>
                        {totalCount > 0 && (
                            <Pagination className="mt-3 justify-content-end">
                                <Pagination.First onClick={() => handlePageChange(1)} disabled={page === 0} />
                                <Pagination.Prev onClick={() => handlePageChange(page)} disabled={page === 0} />
                                {[...Array(Math.ceil(totalCount / count)).keys()].map((number) => (
                                    <Pagination.Item
                                        key={number + 1}
                                        active={number === page}
                                        onClick={() => handlePageChange(number + 1)}
                                    >
                                        {number + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next onClick={() => handlePageChange(page + 2)} disabled={page === Math.ceil(totalCount / count) - 1} />
                                <Pagination.Last onClick={() => handlePageChange(Math.ceil(totalCount / count))} disabled={page === Math.ceil(totalCount / count) - 1} />
                            </Pagination>
                        )}
                    </Card.Body>
                </Card>
            </div>

            <Modal style={{
                zIndex: 1050,

            }} show={showTransferModal} onHide={handleCloseTransferModal} onKeyDown={handleTransferModalKeyDown}>
                <Modal.Header closeButton className='d-flex justify-content-between'>
                    <Modal.Title>Transfer Money</Modal.Title>
                    <span id="baldiv" style={{ marginLeft: '20%' }}>
                        Balance: {Math.max(0, (walletData?.main_wallet || 0) - (walletlockdata?.locking_amt || 0))}
                    </span>

                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: '#ffffff',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Refer ID</Form.Label>
                            <Form.Control type="text" value={selectedUser?.refer_id || ''} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount (minimum 100)"
                                required    
                                value={transferAmount}
                                onChange={handleTransferAmountChange}
                            />
                            {!isTransferValid && transferAmount !== '' && (
                                <Form.Text className="text-danger">
                                    {Number(transferAmount) < 100
                                        ? 'Amount must be at least 100 rupees'
                                        : 'Insufficient balance'}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <div className='text-center'>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    if (Number(transferAmount) < 100) {
                                        toast.error('Amount must be at least 100 rupees');
                                    } else {
                                        setShowTransferModal(false);
                                        setShowTpinModal(true);
                                    }
                                }}
                                disabled={!isTransferValid}
                            >
                                Transfer
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal style={{
                zIndex: 1050,

            }} show={showTpinModal} onHide={handleCloseTpinModal} onKeyDown={handleTpinModalKeyDown}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter TPIN</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: '#ffffff',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>TPIN</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your TPIN"
                                value={tpin}
                                onChange={(e) => {
                                    const newValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                                    setTpin(newValue);
                                    setMaskedTpin('*'.repeat(newValue.length));
                                }}
                                maxLength={4}
                            />
                            {locationError && <Form.Text className="text-danger">{locationError}</Form.Text>}
                            {tpinError && <Form.Text className="text-danger">{tpinError}</Form.Text>}
                        </Form.Group>
                        <div className='text-center'>
                            <Popconfirm
                                title="Are you sure you want to transfer this money?"
                                onConfirm={handleTransferSubmit}
                                okText="Yes"
                                cancelText="No"
                                onCancel={() => setIsPopconfirmOpen(false)}

                                open={isPopconfirmOpen}
                                okButtonProps={{ disabled: tpin.length !== 4 || locationError }}
                            >
                                <Button onClick={() => setIsPopconfirmOpen(true)} variant="primary" disabled={tpin.length !== 4 || locationError}>
                                    Submit
                                </Button>
                            </Popconfirm>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>


            <Modal show={showReverseTransferModal} onHide={handleCloseReverseTransferModal} onKeyDown={handleReverseTransferModalKeyDown} style={{
                zIndex: 1050,

            }} >
                <Modal.Header closeButton className='d-flex justify-content-between'>
                    <Modal.Title>Reverse Transfer</Modal.Title>
                    <span id="baldiv" style={{ marginLeft: '20%' }}>
                        Balance: {selectedUser?.main_wallet || 0}
                    </span>
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: '#ffffff',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Refer ID</Form.Label>
                            <Form.Control type="text" value={selectedUser?.refer_id || ''} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter amount (minimum 100)"
                                required
                                value={reverseTransferAmount}
                                onChange={handleReverseTransferAmountChange}
                            />
                            {Number(reverseTransferAmount) > Number(selectedUser?.main_wallet) && (
                                <Form.Text className="text-danger">
                                    Insufficient balance
                                </Form.Text>
                            )}
                            {Number(reverseTransferAmount) < 100 && reverseTransferAmount !== '' && (
                                <Form.Text className="text-danger">
                                    Amount must be at least 100 rupees
                                </Form.Text>
                            )}
                        </Form.Group>
                        <div className='text-center'>
                            <Button
                                variant="primary"
                                onClick={() => {
                                    setShowReverseTransferModal(false);
                                    setShowReverseTpinModal(true);
                                   
                                }}
                                disabled={Number(reverseTransferAmount) > Number(selectedUser?.main_wallet) || Number(reverseTransferAmount) < 100}
                            >
                                Reverse Transfer
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showReverseTpinModal} onHide={handleCloseReverseTpinModal} onKeyDown={handleReverseTpinModalKeyDown} style={{
                zIndex: 1050,

            }}  >
                <Modal.Header closeButton>
                    <Modal.Title>Enter TPIN for Reverse Transfer</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: '#ffffff',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                }}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>TPIN</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your TPIN"
                                value={tpin}
                                onChange={(e) => {
                                    const newValue = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                                    setTpin(newValue);
                                    setMaskedTpin('*'.repeat(newValue.length));
                                }}
                                maxLength={4}
                            />
                            {locationError && <Form.Text className="text-danger">{locationError}</Form.Text>}
                            {tpinError && <Form.Text className="text-danger">{tpinError}</Form.Text>}
                        </Form.Group>
                        <div className='text-center'>
                            <Popconfirm
                                title="Are you sure you want to reverse transfer this money?"
                                onConfirm={handleReverseTransferSubmit}
                                okText="Yes"
                                cancelText="No"

                                onCancel={() => setIsPopconfirmOpen(false)}

                                open={isPopconfirmOpen}
                                okButtonProps={{ disabled: tpin.length !== 4 || locationError }}
                            >
                                <Button onClick={() => setIsPopconfirmOpen(true)} variant="primary" disabled={tpin.length !== 4 || locationError}>
                                    Submit
                                </Button>
                            </Popconfirm>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <div className={`modal fade modal-cssclasss mediaqurymodalpop ${showOtpModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document" style={{
                    zIndex: 1050,

                }} >
                    <div className="modal-content modal-content-otp">
                        <div className="modal-header text-center">
                            <h5 className="modal-title modaltitle-otp">OTP Verification</h5>
                         
                            <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseOtpModal}></button>
                        </div>
                        <div className="modal-body" style={{
                            backgroundColor: '#ffffff',
                            transform: 'translateZ(0)',
                            backfaceVisibility: 'hidden',
                        }}>
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
                                    <div className="verification-timer">Verification Code {timeLeft} <span className="resend-otp" onClick={handleResendOTP}>Resend OTP</span></div>
                                    <div className="otp-inputs">
                                        {otp1.map((value, index) => (
                                            <input
                                                key={index}
                                                type="number"
                                                maxLength="1"
                                                value={value}
                                                onChange={(e) => otpChandleChange1(index, e.target.value)}
                                                onKeyDown={(e) => {

                                                    handleOtpKeyDown(e, index);
                                                }}
                                                ref={(input) => (inputs1.current[index] = input)}
                                                className="otp-input"
                                            />
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-submit-otp"
                                        onClick={(e) => handleSubmitOTP(e)}
                                        disabled={!isAllInputsFilled || otpLoading}
                                    >
                                        {otpLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Submit OTP'}
                                    </button>
                                    {otpMessage && <div className="alert alert-success mt-3">{otpMessage}</div>}
                                    {otpError && <div className="alert alert-danger mt-3">{otpError}</div>}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            <ToastContainer />
        </>
    );
}

export default Userlist;

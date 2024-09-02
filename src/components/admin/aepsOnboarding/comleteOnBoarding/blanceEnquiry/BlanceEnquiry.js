import React, { useEffect, useState } from "react";
import Select from "react-select";
import { MdAccountBalance } from "react-icons/md";
import { aepsBankList, balanceVerify } from "../../../../../api/login/Login";
import { capturefingerprint } from "../../../../../common/fingurePrintJs/FingurePrint";
import { toast } from "react-toastify";
import AepsModalSucess from "../../../../../common/aepsModleSucess/AepsModleSucess";

function BalanceEnquiry({ active }) {
    const [modalShow, setModalShow] = useState(false);
    const [dataModal, setDataModal] = useState(null);
    const [position, setPosition] = useState({ latitude: null, longitude: null });
    const [bankData, setBankData] = useState(null);
    const [dataCapture, setDataCapture] = useState();
    const [showBanak, setShowBank] = useState();
    const [locationAttempted, setLocationAttempted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [initialValue, setInitialValue] = useState({
        accessmodetype: 'APP',
        latitude: '',
        longitude: '',
        mobilenumber: '',
        adhaarnumber: '',
        nationalbankidentification: '',
        requestremarks: 'Aeps Balance Enquiry',
        user_id: '',
        is_iris: 'NO',
        data: ''
    });

    const [errors, setErrors] = useState({
        mobilenumber: '',
        adhaarnumber: ''
    });

    const changeHandle = (e) => {
        const { name, value } = e.target;
        setInitialValue(prev => ({ ...prev, [name]: value }));
        
        if (name === 'mobilenumber') {
            if (value.length !== 10) {
                setErrors(prev => ({ ...prev, mobilenumber: 'Mobile number must be 10 digits' }));
            } else {
                setErrors(prev => ({ ...prev, mobilenumber: '' }));
            }
        }
        if (name === 'adhaarnumber') {
            if (value.length !== 12) {
                setErrors(prev => ({ ...prev, adhaarnumber: 'Aadhaar number must be 12 digits' }));
            } else {
                setErrors(prev => ({ ...prev, adhaarnumber: '' }));
            }
        }
    };

    const bankList = async () => {
        try {
            const res = await aepsBankList();
            const maped = res?.data?.data?.map((item) => ({
                ...item,
                label: item.bankName
            }));
            setBankData(maped);
        } catch (error) {
            console.error("Error fetching bank list:", error);
            toastErrorMessage("Error fetching bank list. Please try again.");
        }
    };

    const bankChange = (e) => {
        setShowBank(e);
    };

    const Capturefingerherw = () => {
        if (!locationAttempted) {
            getLocation();
            return;
        }
        
        try {
            new capturefingerprint('http://127.0.0.1:11100/rd/capture', result);
        } catch (error) {
            console.error("Error capturing fingerprint:", error);
            toastErrorMessage("Error capturing fingerprint. Please try again.");
        }
    };

    const result = (data) => {
        if (data?.errCode === '0') {
            toastSuccessMessage('Finger Capture Successfully.');
            if (data?.httpSuccess) {
                const prolog = data?.pid_data;
                var parser = new DOMParser();
                const XmlStr = prolog + "<bookz/>";
                var xmlz = parser.parseFromString(XmlStr, "application/xml");
                setDataCapture(window.btoa((new XMLSerializer()).serializeToString(xmlz)));
            }
        } else if (data?.errCode === '700') {
            toastErrorMessage('Finger Capture Not Successful.');
        }
    };

    const toastSuccessMessage = (str) => {
        toast.success(str, { position: "top-center" });
    };

    const toastErrorMessage = (str) => {
        toast.error(str, { position: "top-center" });
    };

    const submitData = async () => {
        if (!locationAttempted) {
            getLocation();
            return;
        }
        
        setIsLoading(true);
        const clone = {
            ...initialValue,
            nationalbankidentification: showBanak?.iinno,
            latitude: position.latitude,
            longitude: position.longitude,
            data: dataCapture,
            user_id: window.localStorage.getItem('userIdToken')
        };
        try {
            const res = await balanceVerify(clone);
            if (res?.data?.error) {
                toastErrorMessage(res?.data?.message);
            } else {
                setDataModal(res?.data);
                setModalShow(true);
                resetForm();
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            toastErrorMessage("Error submitting data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    const resetForm = () => {
        setInitialValue({
            accessmodetype: 'APP',
            latitude: position.latitude,
            longitude: position.longitude,
            mobilenumber: '',
            adhaarnumber: '',
            nationalbankidentification: '',
            requestremarks: 'Aeps Balance Enquiry',
            user_id: '',
            is_iris: 'NO',
            data: ''
        });
        setShowBank(null);
        setDataCapture(null);
    };

    const getLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    setPosition({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    setLocationAttempted(true);
                },
                function (error) {
                    console.error("Error getting location:", error);
                    setLocationAttempted(true);
                    toastErrorMessage("Error getting location. Please enable location services and try again.");
                }
            );
        } else {
            setLocationAttempted(true);
            toastErrorMessage("Geolocation is not supported by your browser.");
        }
    };

    useEffect(() => {
        bankList();
       
    }, []);

    return (
        <>
            <div className="card">
                <div className="card-header">
                    <span>Balance Enquiry</span>
                    <span><MdAccountBalance /></span>
                </div>
                <div className="card-body">
                    <form action="" method="post" name="frmReport" id="frmReport">
                        <input type="hidden" id="hidID" name="hidID" />
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="txtUserId">Customer Mobile <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="number"
                                    name="mobilenumber"
                                    id="account_no"
                                    className={`form-control ${errors.mobilenumber ? 'is-invalid' : ''}`}
                                    placeholder="Enter Customer Mobile"
                                    value={initialValue.mobilenumber}
                                    onChange={changeHandle}
                                />
                                {errors.mobilenumber && <div className="invalid-feedback">{errors.mobilenumber}</div>}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="txtUserId">Customer Aadhaar <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    type="number"
                                    name="adhaarnumber"
                                    id="account_no"
                                    className={`form-control ${errors.adhaarnumber ? 'is-invalid' : ''}`}
                                    placeholder="Enter Customer Aadhaar"
                                    value={initialValue.adhaarnumber}
                                    onChange={changeHandle}
                                />
                                {errors.adhaarnumber && <div className="invalid-feedback">{errors.adhaarnumber}</div>}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="txtUserId">Select Bank Name <span style={{ color: 'red' }}>*</span></label>
                                <Select
                                    value={showBanak}
                                    name="showBanak"
                                    options={bankData}
                                    className="games-dropdown-2 customsection"
                                    classNamePrefix="select"
                                    onChange={bankChange}
                                />
                            </div>
                            <div className="form-group col-md-3 ml-2" style={{ display: 'inline-grid' }}>
                                <label htmlFor="txtUserId">Scan Finger Print <span style={{ color: 'red' }}>*</span></label>
                                <button 
                                    type="button" 
                                    className="btn btn-success" 
                                    onClick={Capturefingerherw}
                                    disabled={!initialValue.mobilenumber || !initialValue.adhaarnumber || !showBanak?.iinno }
                                >
                                    Capture Finger
                                </button>
                            </div>
                            <div className="form-group col-md-12 text-center">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    disabled={!initialValue.mobilenumber || !initialValue.adhaarnumber || !showBanak?.iinno || !dataCapture || isLoading}
                                    onClick={submitData}
                                >
                                    {isLoading ? 'Processing...' : 'Proceed'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <AepsModalSucess
                show={modalShow}
                onHide={() => setModalShow(false)}
                adharPay="Balance Enquiry"
                dataModal={dataModal}
            />
        </>
    );
}

export default BalanceEnquiry;
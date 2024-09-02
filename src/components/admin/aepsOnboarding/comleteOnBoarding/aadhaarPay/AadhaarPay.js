
import Select from "react-select"
import { Link } from "react-router-dom"
import { GiCash } from "react-icons/gi";
import { useEffect, useState } from "react";
import { adhaarPay, aepsBankList } from "../../../../../api/login/Login";
import { capturefingerprint } from "../../../../../common/fingurePrintJs/FingurePrint";
import { toast } from "react-toastify";
import AepsModalSucess from "../../../../../common/aepsModleSucess/AepsModleSucess";
function AadhaarPay() {
    const [modalShow, setModalShow] = useState(false);
    const [dataModal, setDataModal] = useState(null)

    const [position, setPosition] = useState({ latitude: null, longitude: null });
    // console.log(position);
    const [bankData, setBankData] = useState(null)

    const [dataCapture, setDataCapture] = useState()

    const [amountError, setAmountError] = useState('');

    const [initialValue, setInitialValue] = useState({
        accessmodetype: 'site',
        latitude: '',
        longitude: '',
        mobilenumber: '',
        adhaarnumber: '',
        nationalbankidentification: '',
        requestremarks: 'Aeps Balance Enquiry',
        user_id: '',
        is_iris: 'NO',
        data: '',
        amount: ''
    })
    const [errors, setErrors] = useState({
        mobilenumber: '',
        adhaarnumber: '',
        amount: ''
    });
    const changeHandle = (e, str) => {
        const { name, value } = e.target;
        setInitialValue(prev => ({ ...prev, [name]: value }));
        
        // Validate fields
        let newErrors = { ...errors };

        if (name === 'mobilenumber') {
            if (value.length !== 10) {
                newErrors.mobilenumber = 'Mobile number must be 10 digits';
            } else {
                newErrors.mobilenumber = '';
            }
        }

        if (name === 'adhaarnumber') {
            if (value.length !== 12) {
                newErrors.adhaarnumber = 'Aadhaar number must be 12 digits';
            } else {
                newErrors.adhaarnumber = '';
            }
        }

        if (name === 'amount') {
            const amountValue = parseInt(value);
            if (isNaN(amountValue) || amountValue < 99 || amountValue > 10000) {
                newErrors.amount = 'Amount must be between 100 and 10000';
            } else if (amountValue % 50 !== 0) {
                newErrors.amount = 'Amount must be a multiple of 50';
            } else {
                newErrors.amount = '';
            }
        }

        setErrors(newErrors);
    }

    const bankList = async () => {
        try {
            const res = await aepsBankList()
            console.log(res?.data);
            const maped = res?.data?.data?.map((item) => {
                return { ...item, label: item.bankName }
            })

            // console.log(maped);
            setBankData(maped)
        } catch (error) {

        }

    }
    const [showBanak, setShowBank] = useState();
    const [isLoading, setIsLoading] = useState(false);
    // console.log(showBanak);

    const bankChange = (e) => {
        console.log(e);
        const clone = { ...initialValue }
        // if (name == 'bank_id') {
        const findIfac = bankData.find((item) => {
            // console.log(item);
            return item?.bankID == e.bankID
        })

        // let abc = findIfac?.ifsc_code
        // let bankName = findIfac?.bank_name

        // const clone2 = { ...clone, ifsc: abc == 'NULL' ? "" : abc, bank_name: bankName }

        // setInitialValue(clone2)

        setShowBank(e)

    }



    const Capturefingerherw = () => {
        try {
            const fingerData = new capturefingerprint('http://127.0.0.1:11100/rd/capture', result)
            // console.log(fingerData);
        } catch (error) {
            console.log(error);
        }
    }

    const result = (data) => {
        // console.log(data);
        // console.log(data.pid_data);

        const prolog = data?.pid_data;
        var parser = new DOMParser();
        const XmlStr = prolog + "<bookz/>";
        var xmlz = parser.parseFromString(XmlStr, "application/xml");
        // console.log(window.btoa((new XMLSerializer()).serializeToString(xmlz)));


        if (data?.errCode == '0') {
            toastSuccessMessage('Finger Capture Successfully.')
        }
        if (data?.errCode == '700') {
            toastSuccessMessage1('Finger Capture Not Successfully.')
        }

        if (data?.httpSuccess == true) {
            setDataCapture(window.btoa((new XMLSerializer()).serializeToString(xmlz)))
        }
    }


    const toastSuccessMessage = (str) => {
        toast.success(`${str}`, {
            position: "top-center",
        });
    };



    const toastSuccessMessage1 = (str) => {
        toast.error(`${str}`, {
            position: "top-center",
        });
    };


    const submitData = async () => {
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
            const res = await adhaarPay(clone);
            if (res?.data?.error == true) {
                toast.error(res?.data?.message);
            }
            if (res?.data?.error == false) {
                setDataModal(res?.data?.data);
                setModalShow(true);
                // Reset form after successful submission
                setInitialValue({
                    accessmodetype: 'site',
                    latitude: position.latitude,
                    longitude: position.longitude,
                    mobilenumber: '',
                    adhaarnumber: '',
                    nationalbankidentification: '',
                    requestremarks: 'Aeps Balance Enquiry',
                    user_id: '',
                    is_iris: 'NO',
                    data: '',
                    amount: ''
                });
                setShowBank(null);
                setDataCapture(null);
            }
        } catch (error) {
            console.error("Error submitting data:", error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }




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
    useEffect(() => {
        bankList()
    }, [])
    return (
        <>
           <div className="card">
                <div className="card-header">
                    <span>Aadhaar Pay</span>
                    <span><GiCash /></span>
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
                                    onChange={(e) => changeHandle(e, 'mobilenumber')} 
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
                                    onChange={(e) => changeHandle(e, 'adhaarnumber')} 
                                />
                                {errors.adhaarnumber && <div className="invalid-feedback">{errors.adhaarnumber}</div>}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="txtUserId">Amount <span style={{ color: 'red' }}>*</span></label>
                                <input 
                                    type="number" 
                                    name="amount" 
                                    id="account_no" 
                                    className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                                    placeholder="Enter Amount (100-10000, multiple of 50)" 
                                    value={initialValue.amount} 
                                    onChange={changeHandle} 
                                />
                                {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
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
                                    disabled={!initialValue.mobilenumber || !initialValue.adhaarnumber || !showBanak?.iinno || !initialValue.amount}  
                                    onClick={Capturefingerherw}
                                >
                                    Capture Finger
                                </button>
                            </div>
                            <div className="form-group col-md-12 text-center">
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    disabled={!initialValue.mobilenumber || !initialValue.adhaarnumber || !showBanak?.iinno || !dataCapture || !initialValue.amount || isLoading} 
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
                adharPay="Aadhaar Pay"
                dataModal={dataModal}
            />

        </>
    )
}
export default AadhaarPay
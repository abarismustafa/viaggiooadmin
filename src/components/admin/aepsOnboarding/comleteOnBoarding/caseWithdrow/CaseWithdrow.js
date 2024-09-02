
import Select from "react-select"
import { Link } from "react-router-dom"
import { GiCash } from "react-icons/gi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { capturefingerprint } from "../../../../../common/fingurePrintJs/FingurePrint";
import { aepsBankList, bankWithdraw, banktxnMerchantAuth } from "../../../../../api/login/Login";
import AepsModalSucess from "../../../../../common/aepsModleSucess/AepsModleSucess";
function CaseWithdrow({ active,walletShowHeader }) {
    const [modalShow, setModalShow] = useState(false);
    const [dataModal, setDataModal] = useState(null)
    const [position, setPosition] = useState({ latitude: null, longitude: null });
    // console.log(position);
    const [bankData, setBankData] = useState(null)

    const [dataCapture, setDataCapture] = useState()
    const [Capturediasable, setCapturediasable] = useState(true)

    const [banktxnId, setbanktxnId] = useState()


    const [diabaleCustomerBtn, setdiabaleCustomerBtn] = useState(true)

    const [isAmountValid, setIsAmountValid] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        amount: '',
        data: '',
        merAuthTxnId: ''
    })
    const [errors, setErrors] = useState({
        mobilenumber: '',
        adhaarnumber: '',
        amount: ''
    });

    const changeHandle = (e, str) => {
        const cloneInitail = { ...initialValue }
        const value = e.target.value
        const name = e.target.name
        
        let newErrors = { ...errors };
    
        if (name === 'mobilenumber') {
            if (value.length !== 10) {
                newErrors.mobilenumber = 'Mobile number must be 10 digits long';
            } else {
                newErrors.mobilenumber = '';
            }
        }
    
        if (name === 'adhaarnumber') {
            if (value.length !== 12) {
                newErrors.adhaarnumber = 'Aadhaar number must be 12 digits long';
            } else {
                newErrors.adhaarnumber = '';
            }
        }
    
        if (name === 'amount') {
            const amount = parseInt(value);
            const isValid = amount >= 100 && amount <= 10000 && amount % 50 === 0;
            setIsAmountValid(isValid);
            setCapturediasable(!isValid);
            if (!isValid) {
                newErrors.amount = 'Amount must be between 100 and 10000, and a multiple of 50';
            } else {
                newErrors.amount = '';
            }
        }
    
        cloneInitail[name] = value
        if ('mobilenumber' == str && value.length == 11) {
            return
        }
        if ('adhaarnumber' == str && value.length == 13) {
            return
        }
    
        setInitialValue(cloneInitail)
        setErrors(newErrors);
    
        const isMobileValid = cloneInitail.mobilenumber.length === 10;
        const isAadhaarValid = cloneInitail.adhaarnumber.length === 12;
        const isAmountValid = parseInt(cloneInitail.amount) >= 100 && parseInt(cloneInitail.amount) <= 10000 && parseInt(cloneInitail.amount) % 50 === 0;
        const isBankSelected = showBanak !== undefined;
    
        setIsFormValid(isMobileValid && isAadhaarValid && isAmountValid && isBankSelected);
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
    const [showBanak, setShowBank] = useState()
    console.log(showBanak);

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
        const isMobileValid = initialValue.mobilenumber.length === 10;
        const isAadhaarValid = initialValue.adhaarnumber.length === 12;
        const isAmountValid = initialValue.amount >= 100 && initialValue.amount <= 10000 && initialValue.amount % 50 === 0;
        setIsFormValid(isMobileValid && isAadhaarValid && isAmountValid && e !== undefined);

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



    const [reatilerInitial, setReatilerInitial] = useState({
        accessmodetype: "site",
        latitude: "",
        longitude: "",
        data: "",
        ipaddress: "",
        user_id: ""
    })


    const Capturefingerherw1 = () => {

        try {
            const fingerData = new capturefingerprint('http://127.0.0.1:11100/rd/capture', result1)
            // console.log(fingerData);
        } catch (error) {
            console.log(error);
        }
    }

    const result1 = (data) => {
        // console.log(data);
        // console.log(data.pid_data);

        const prolog = data?.pid_data;
        var parser = new DOMParser();
        const XmlStr = prolog + "<bookz/>";
        var xmlz = parser.parseFromString(XmlStr, "application/xml");
        // console.log(window.btoa((new XMLSerializer()).serializeToString(xmlz)));


        if (data?.errCode == '0') {
            toastSuccessMessage('Finger Capture Successfully.')
            setdiabaleCustomerBtn(
                false
            )
        }
        if (data?.errCode == '700') {
            toastSuccessMessage1('Finger Capture Not Successfully.')
        }

        if (data?.httpSuccess == true) {
            submitRetailer(window.btoa((new XMLSerializer()).serializeToString(xmlz)))

        }
    }


    const submitRetailer = async (fingureData) => {
        const clone = { ...reatilerInitial, latitude: position.latitude, longitude: position.longitude, data: fingureData, user_id: window.localStorage.getItem('userIdToken') }
        try {
            const res = await banktxnMerchantAuth(clone)
            if (res?.data?.error == false && res.status === 200) {
                setbanktxnId(res?.data?.data?.MerAuthTxnId)
                setdiabaleCustomerBtn(false)
            } else {
                setdiabaleCustomerBtn(true) 
                toastSuccessMessage1('Retailer authentication failed. Please try again.')
            }
        } catch (error) {
            setdiabaleCustomerBtn(true) 
            toastSuccessMessage1('An error occurred. Please try again.')
        }
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
            setCapturediasable(false)
        }
        if (data?.errCode == '700') {
            toastSuccessMessage1('Finger Capture Not Successfully.')
        }

        if (data?.httpSuccess == true) {
            setDataCapture(window.btoa((new XMLSerializer()).serializeToString(xmlz)))
        }
    }


    const submitData = async () => {
        setIsLoading(true);
        const clone = { ...initialValue, nationalbankidentification: showBanak?.iinno, latitude: position.latitude, longitude: position.longitude, data: dataCapture, merAuthTxnId: banktxnId, user_id: window.localStorage.getItem('userIdToken') }
        try {
            const res = await bankWithdraw(clone)
            if (res?.data?.error == true) {
                toastSuccessMessage1(res?.data?.message)
                
            }

            if (res?.data?.error == false) {
                setDataModal(res?.data)
                setModalShow(true)
                if (walletShowHeader) walletShowHeader();
                setInitialValue({
                    accessmodetype: 'site',
                    latitude:position.latitude,
                    longitude: position.longitude,
                    mobilenumber: '',
                    adhaarnumber: '',
                    nationalbankidentification: '',
                    requestremarks: 'Aeps Balance Enquiry',
                    user_id: '',
                    is_iris: 'NO',
                    amount: '',
                    data: '',
                    merAuthTxnId: ''
                
                });
                setShowBank(undefined);
                setCapturediasable(true);
                setdiabaleCustomerBtn(true);
            }
        } catch (error) {
            toastSuccessMessage1('An error occurred. Please try again.')
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
        const handleBeforeUnload = (event) => {
            // Run cleanup code before the component exits
            console.log("Component is exiting. Run cleanup code here.");
            // You can execute any cleanup code here
            // Make sure to use the event.returnValue property to display a prompt
            event.returnValue = ''; // This will display a prompt to the user
        };
        console.log("Component is exiting.")

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [])
    return (
        <>
            {/* <div className="PageHeading">
                <h1>Aeps OnBoarding</h1>
            </div> */}
           <div className="card">
                <div className="card-header">
                    <span>Cash Withdrawal (Min: 100, Max: 10000)</span>
                    <span>
                        <GiCash />
                    </span>
                </div>
                <div className="card-body">
                    <form action="" method="post" name="frmReport" id="frmReport">
                        <input type="hidden" id="hidID" name="hidID" />
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="txtUserId">Customer Mobile <span style={{ color: 'red' }}>*</span></label>
                                <input type="number" name="mobilenumber" id="account_no" className={`form-control ${initialValue.mobilenumber && (initialValue.mobilenumber.length === 10 ? '' : 'is-invalid')}`} placeholder="Enter Customer Mobile" value={initialValue.mobilenumber} onChange={(e) => changeHandle(e, 'mobilenumber')} maxLength="10" />
                                {errors.mobilenumber && <div className="invalid-feedback">{errors.mobilenumber}</div>}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="txtUserId">Customer Aadhaar <span style={{ color: 'red' }}>*</span></label>
                                <input type="number" name="adhaarnumber" id="account_no" className={`form-control ${initialValue.adhaarnumber && (initialValue.adhaarnumber.length === 12 ? 'is-valid' : 'is-invalid')}`} placeholder="Enter Customer Aadhaar" value={initialValue.adhaarnumber} onChange={(e) => changeHandle(e, 'adhaarnumber')} maxLength="12" />
                                {errors.adhaarnumber && <div className="invalid-feedback">{errors.adhaarnumber}</div>}
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="txtUserId">Amount <span style={{ color: 'red' }}>*</span></label>
                                <input 
                                    type="number" 
                                    name="amount" 
                                    id="account_no" 
                                    className={`form-control ${initialValue.amount && (isAmountValid ? 'is-valid' : 'is-invalid')}`}
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

                            {/* <div className="form-group col-md-6">
                                <label htmlFor="txtUserId">Retailer Finger Print <span style={{ color: 'red' }}>*</span></label>
                                <button type="button" disabled={!isAmountValid || !isFormValid} className="btn btn-success" onClick={Capturefingerherw1}>Retailer Capture Finger</button>
                            </div> */}
                            <div className="form-group col-md-6">
                                <label htmlFor="txtUserId">Customer Finger Print <span style={{ color: 'red' }}>*</span></label>
                                <button type="button" disabled={!isAmountValid || !isFormValid} className="btn btn-success" onClick={Capturefingerherw}>Customer Capture Finger</button>
                            </div>
                            <div className="form-group col-md-12 text-center ml-2">
                                <button 
                                    type="button" 
                                    disabled={!initialValue.amount || !initialValue.mobilenumber || !initialValue.adhaarnumber || !showBanak?.iinno || Capturediasable || isLoading} 
                                    className="btn btn-primary" 
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
                adharPay="Cash Withdrawal"
                dataModal={dataModal}
            />

        </>
    )
}
export default CaseWithdrow
import { useEffect, useState } from "react";
import Loader from "../../../common/loader/Loader"
import Select from "react-select";
import { aepsBankList, bankListApi, cashDeposite, cassDepositApi } from "../../../api/login/Login";
import { MdCurrencyRupee } from "react-icons/md";
import { capturefingerprint } from "../../../common/fingurePrintJs/FingurePrint";
import { ToastContainer, toast } from "react-toastify";


function CashDeposit() {
    const [loading, setLoading] = useState(false);
    const [bankData, setBankData] = useState(null)
    const [isChecked, setIsChecked] = useState(false);
    const [selected, setSelected] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [dataModal, setDataModal] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [position, setPosition] = useState({ latitude: null, longitude: null });
    // console.log(position);

    const [dataCapture, setDataCapture] = useState()

    const [errors, setErrors] = useState({
        mobilenumber: '',
        adhaarnumber: '',
        amount: ''
    });

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
            if (amount < 100 || amount > 10000 || amount % 50 !== 0) {
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
    }

    const bankList = async () => {
        try {
            const res = await cassDepositApi()
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



    const Capturefingerherw = async () => {
        try {
            const fingerData = new capturefingerprint('http://127.0.0.1:11100/rd/capture', result)
            console.log(fingerData);
        } catch (error) {
            console.log(error);
        }
    }

    const result = (data) => {
        console.log(data);
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
        setIsSubmitting(true);
        const clone = { ...initialValue, nationalbankidentification: showBanak?.iinno, latitude: position.latitude, longitude: position.longitude, data: dataCapture, user_id: window.localStorage.getItem('userIdToken') }
        console.log(clone);
        try {
            const res = await cashDeposite(clone)
            console.log(res);
            if (res?.data?.error == true) {
                toastSuccessMessage1(res?.data?.message)
            }
            if (res?.data?.error == false) {
                toastSuccessMessage(res?.data?.message)
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
            setSelected(null);
            setDataCapture(null);
            }
        } catch (error) {
            console.error(error);
            toastSuccessMessage1("An error occurred while processing your request.");
        } finally {
            setIsSubmitting(false);
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

    const handleCheckboxChange = (event) => {
        // console.log('event', event);
        setIsChecked(event.target.checked);

    };

    const amounts = [500, 1000, 1500, 2000, 2500, 3000, 5000, 10000];

    const handleSelect = (index, amount) => {
        console.log(amount);
        const clone = { ...initialValue, amount: amount }
        setInitialValue(clone)
        setSelected(index);
    };


    const handlechageDevice = (e) => {
        // console.log(e?.target?.value);

        if (e?.target?.value == 1) {
            Capturefingerherw()
        }
    }



    return (
        <>
            {loading && <Loader />}
            {/* <div className="PageHeading">
                <h1>Aeps Cash Deposit</h1>
            </div> */}

            {/* <div className="ContentArea"> */}
            <div className="card">
                <div className="card-header"><span>Aeps Cash Deposit</span></div>
                <div className="card-body">
                <form action="#" method="post" name="frmCallAction" id="frmCallAction">
    <div className="form-row">
        <div className="col-lg-6">
            <div className="form-group">
                <label htmlFor="txtNumId">Customer Mobile Number <span style={{ color: 'red' }}>*</span></label>
                <input 
                    type="number" 
                    name="mobilenumber" 
                    id="account_no"  
                    className={`form-control ${initialValue.mobilenumber && (errors.mobilenumber ? 'is-invalid' : '')}`}
                    placeholder="Enter Customer Mobile"  
                    value={initialValue.mobilenumber} 
                    onChange={(e) => changeHandle(e, 'mobilenumber')} 
                />
                {errors.mobilenumber && <div className="invalid-feedback">{errors.mobilenumber}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="txtNumId">Customer Aadhaar Number <span style={{ color: 'red' }}>*</span></label>
                <input 
                    type="number" 
                    name="adhaarnumber" 
                    id="account_no" 
                    className={`form-control ${initialValue.adhaarnumber && (errors.adhaarnumber ? 'is-invalid' : '')}`} 
                    placeholder="Enter Customer Aadhaar" 
                    value={initialValue.adhaarnumber} 
                    onChange={(e) => changeHandle(e, 'adhaarnumber')} 
                />
                {errors.adhaarnumber && <div className="invalid-feedback">{errors.adhaarnumber}</div>}
            </div>

            <div className="form-group">
                <label htmlFor="ddldb">Select bank <span style={{ color: 'red' }}>*</span></label>
                <Select
                    value={showBanak}
                    name="showBanak"
                    options={bankData}
                    className="games-dropdown-2 customsection"
                    classNamePrefix="select"
                    onChange={bankChange}
                />
            </div>

            <div className="form-group grid-sed">
                <label htmlFor="txtUserId">Scan Finger Print <span style={{ color: 'red' }}>*</span></label>
                <button 
                    type="button" 
                    className="btn btn-success" 
                    disabled={!initialValue?.adhaarnumber || !initialValue?.mobilenumber || !showBanak} 
                    onClick={Capturefingerherw}
                >
                    Capture Finger
                </button>
            </div>
        </div>

        <div className="col-lg-6">
            <label htmlFor="ddldb">Amount</label>
            <div className="form-group Amount-group">
                {amounts.map((amount, index) => (
                    <div
                        key={index}
                        className={`Amount-set ${selected === index ? 'selected' : 'first-color'}`}
                        onClick={() => handleSelect(index, amount)}
                    >
                        <p style={{ margin: '0px' }}>
                            <MdCurrencyRupee /> <span>{amount}</span>
                        </p>
                    </div>
                ))}
            </div>

            <div className="form-group">
                <label htmlFor="txtNumId">OR Enter Amount <span style={{ color: 'red' }}>*</span></label>
                <input  
                    className={`form-control ${initialValue.amount && (errors.amount ? 'is-invalid' : 'is-valid')}`}
                    id="txtNumId" 
                    name="amount" 
                    type="number" 
                    placeholder="Enter Amount multiple of Fifty" 
                    value={initialValue?.amount} 
                    onChange={changeHandle} 
                />
                {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
            </div>
        </div>

        <div className="form-group col-md-12 text-align-center">
            <label>&nbsp;</label>
            <button 
                type="button" 
                className="btn btn-primary"  
                disabled={!initialValue.adhaarnumber || !initialValue.amount || !initialValue.mobilenumber || !showBanak || errors.mobilenumber || errors.adhaarnumber || isSubmitting}  
                onClick={submitData}
            >
                {isSubmitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : 'Submit'}
            </button>
        </div>
    </div>
</form>
                </div>

            </div>
            {/* <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-success cusxel"
                            table="table-to-xlsx"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download Excel sheet" />
                        <div className="GridUi no-header-footer-grid mt-3" id="all_transaction">
                            <div id="rechargehistorytbl_wrapper" className="dataTables_wrapper">

                                <table id="rechargehistorytbl" className="table table-striped table-bordered table-hover display fixed_headers dataTable" style={{ width: 1250 }} role="grid" aria-describedby="rechargehistorytbl_info">
                                    <thead>
                                        <tr role="row">
                                            <th className="sorting_asc" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Sr No: activate to sort column descending">
                                                Sr No
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Recharge ID: activate to sort column ascending">
                                                Recharge ID
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Txn Id: activate to sort column ascending">
                                                Txn Id
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Recharge  DateTime: activate to sort column ascending">
                                                Recharge <br />
                                                DateTime</th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Company Name: activate to sort column ascending">
                                                Company Name</th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Mobile No: activate to sort column ascending">
                                                Mobile No
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Amount: activate to sort column ascending">
                                                Amount
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Debit Amount: activate to sort column ascending">
                                                Debit Amount
                                            </th>
                                            <th className="action_th sorting_disabled" rowSpan={1} colSpan={1} aria-label="Status">Status</th><th className="action_th sorting_disabled" rowSpan={1} colSpan={1} aria-label="Complain">Complain</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr className="odd"><td valign="top" colSpan={10} className="dataTables_empty">No data available in table</td></tr></tbody>

                                </table>

                            </div>
                        </div>
                    </div>
                </div> */}
            {/* </div > */}
            <ToastContainer />
        </>
    )
}
export default CashDeposit
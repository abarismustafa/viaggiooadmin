import { useEffect, useState } from "react"
import CustomerApi from "./customerApi/CustomerApi"
import NotExitCustomer from "./notExitCustomer/NotExitCustomer"
import CreateCustomer from "./createCustomer/CreateCustomer";
import { BENEFICIARYDelete, CustomerInfo, VerifyCustomer, reciptList, reciptListUpdate, sagestMobileNumber, settingBank } from "../../../api/login/Login";
import { ToastContainer, toast } from "react-toastify";
import OtpCustomer from "./createCustomer/otpCustomer/OtpCustomer";
import OtpChaeckTost from "./otpcheckTost/OtpCheckTost";
import { Button, message, Popconfirm } from 'antd';
import Loader from "../../../common/loader/Loader";
import mobileImage from '../../../asesets/adminImage/phone.jpg'

let nums = ''
function MoneyTransfer({ walletShowHeader }) {
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [modalShow3, setModalShow3] = useState(false);
    const [customerNumber, setCustomerNumber] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [isActiveCus, setIsActiveCus] = useState(false)

    const [data, setData] = useState(null)
    const [beneficiaryData, setBeneficiaryData] = useState([])
    console.log(beneficiaryData);

    const [initialCustomer, setInitialCustomer] = useState({
        mobile: '',
        api_id: ''
    })
    const [customerinformation,setCustomerInformation]=useState();

    // console.log(initialCustomer?.mobile?.length);


    const [updateNumber, setupdateNumber] = useState({
        mobile: '',
    })

    // console.log(updateNumber);

    const [suggestions, setSuggestions] = useState([]);
    const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1);

    const [maxLength, setMaxLength] = useState(10)
    const handleChangeCustomer = (e) => {

        const name = e.target.name
        const value = e.target.value
        const updateClone = { ...initialCustomer, [name]: value, api_id: initialCustomer.api_id }
        // console.log(updateClone);
        // clone[name] = value
        // var regex = /^[0-9]{11}$/;
        // if (/^\d{11}$/.test(value) || /^\d{11}-\d{16}$/.test(value)) {
        //     return
        // }

        // if (value.length <= maxLength) {
        //     console.log('oijio', value.length);
        //     setInitialCustomer(updateClone)
        // }
        if (/^\d{0,10}$/.test(value)) {
            setInitialCustomer(updateClone)
        }
        fetchSuggestions(updateClone)
    }

    // const handleChangeCustomer2 = (str) => {
    //     // SubmitCustomer()
    //     const clone = { ...initialCustomer, api_id: str }

    //     setInitialCustomer(clone);



    //     // const name = str.target.name
    //     // const value = str.target.value
    //     // const updateClone = { ...initialCustomer, [name]: value }
    //     // console.log(updateClone);

    // }
    const handleChangeCustomer2 = (bankId) => {
        setInitialCustomer(prevState => ({
          ...prevState,
          api_id: bankId
        }));
      };

    const toastSuccessMessage = (data) => {
        // console.log(data);
        toast.success(`${data}`, {
            position: "top-center",
        });
    };

    const toastSuccessMessageError = (data) => {
        // console.log(data);
        toast.error(`${data}`, {
            position: "top-center",
        });
    };

    const SubmitCustomer = async (abc) => {
        setLoading(true)
        nums = initialCustomer.mobile
        const clone = { ...initialCustomer }
        // console.log(clone);
        try {
            const res = await CustomerInfo(clone)
            console.log("res?.datae",res?.data?.data?.response?.name)
           
            setCustomerInformation(res?.data?.data?.response?.name);
      
            const resRecipt = await reciptList(clone)
            // console.log(resRecipt);
           

            setupdateNumber(clone)
            // setInitialCustomer({
            //     ...initialCustomer,
            //     mobile: ''
            // })
            setBeneficiaryData(resRecipt?.data?.data)
            // console.log(res);
            setData(res?.data?.data?.response);
            // console.log('fjidsf', res?.data?.data?.response?.customer_id);
            // setCustomerNumber(res?.data?.data)

            if (abc == 'abc') {
                SearchCustomer()
                // debugger
            } else if (res?.data?.statusCode == 200) {

                toastSuccessMessage(res?.data?.message)
                SearchCustomer()
            }

            // if (res?.data?.statusCode == 200) {
            //     toastSuccessMessage(res?.data?.message)
            //     SearchCustomer()
            // }
            if (res?.data?.statusCode == 400 || res?.data?.statusCode == 401) {
                // toastSuccessMessage(res?.data?.message)
                setIsActiveCus(false)
                setModalShow(true)

            }
            if (res?.data?.statusCode == 300) {
                toastSuccessMessageError(res?.data?.message)
                setShow(true)
            }
            if (res?.data?.statusCode == 500) {
                toastSuccessMessageError(res?.data?.message)
            }
            if (res?.data?.error == true &&  res?.data?.statusCode !==(300 || 500)) {
                toastSuccessMessageError(res?.data?.message)
            }

            setLoading(false)
        } catch (error) {

        }
    }


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            SubmitCustomer();
        }
    };


    const settingBankverify = async () => {
        try {
          const res = await settingBank();
          setSettingState(res?.data?.data?.bankVerificationCharge);
          setDataEkoPay(res?.data?.data);
          setInitialCustomer(prevState => ({
            ...prevState,
            api_id: res?.data?.data?.defaultApi
          }));
        } catch (error) {
          // Handle error
        }
      };


    const confirm = (id) => {
        deleteRecipt(id)

    };
    const cancel = (e) => {
        message.error('Cancle Successfull!');
    };

    const deleteRecipt = async (id) => {
        const clone = { customer_mobile: nums, recipient_id: id, user_id: window.localStorage.getItem('userIdToken'), api_id: initialCustomer.api_id }
        console.log('cloneclone', clone);
        try {
            const res = await BENEFICIARYDelete(clone)
            if (res?.data?.statusCode == 200) {
                toastSuccessMessage(res?.data?.message)
                message.success('Delete Successfull!');
                SubmitCustomer('abc')
            }
            if (res?.data?.statusCode == 400) {
                toastSuccessMessageError(res?.data?.message)
            }
            if (res?.data?.statusCode == 300) {
                toastSuccessMessageError(res?.data?.message)
            }
        } catch (error) {

        }
    }


    const handleKeyPress2 = (event) => {
        if (event.key === 'Enter' && focusedSuggestionIndex === -1) {
            SubmitCustomer();
        } else if (event.key === 'ArrowDown') {
            setFocusedSuggestionIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
        } else if (event.key === 'ArrowUp') {
            setFocusedSuggestionIndex((prevIndex) => (prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1));
        } else if (event.key === 'Enter' && focusedSuggestionIndex !== -1) {
            console.log(suggestions[focusedSuggestionIndex].customer_number);
            handleSuggestionClick(suggestions[focusedSuggestionIndex].customer_number);
        }
    };



    const fetchSuggestions = async (number) => {
        const clone = { ...initialCustomer }
        try {
            const res = await sagestMobileNumber(number)
            setSuggestions(res?.data?.data);
        } catch (error) {

        }
    }

    const handleSuggestionClick = (suggestion) => {
        console.log(suggestion);
        const clone = { ...initialCustomer, mobile: suggestion }
        setInitialCustomer(clone)
        setSuggestions([])
        setFocusedSuggestionIndex(-1);

    }

    // useEffect(() => {
    //     // if (initialCustomer.mobile) {
    //     fetchSuggestions()
    //     // }

    // }, [initialCustomer.mobile])
    const updateRecipetList = async () => {
        setLoading(true);
        const clone = { ...initialCustomer };
        try {
          const res = await reciptListUpdate(clone);
          setBeneficiaryData(res?.data?.data?.response?.recipient_list);
          if (res?.data?.statusCode == 200) {
            // toastSuccessMessage(res?.data?.message)
          }
        } catch (error) {
          // Handle error
        }
        setLoading(false);
      };



    const SearchCustomer = () => {
        setIsActiveCus(true)
        // setModalShow(true)
    }

    const customerCreate = () => {
        setModalShow(false)
        setModalShow2(true)
    }

    const [settingState, setSettingState] = useState(null)

    const [dataEkoPay, setDataEkoPay] = useState(null)
    console.log(dataEkoPay);


   

    useEffect(() => {
        settingBankverify()
    }, [])
    console.log("initialCustomer",initialCustomer)

    return (
        <>
            {loading && <Loader />}
            <div className="PageHeading"><h1>Domestic Money Transfer</h1></div>
            <div className="ContentArea"><div className="card">
                <div className="card-header">
                    <span>Search</span>
                    {/* <div style={{ float: 'right', color: '#1e5591', fontWeight: 600, paddingTop: 15 }}>Dhamaka Offer Limit: 62011</div> */}
                </div>
                <div className="card-body">
                {dataEkoPay?.dmtApiType && dataEkoPay.dmtApiType.length > 0 ? (
    <div className="col-lg-4">
      <div className="pay-sprint-set">
        {dataEkoPay.dmtApiType.map((bank) => (
          <div className="form-check mr-3" key={bank._id}>
            <input
              className="form-check-input"
              type="radio"
              name="api_id"
              id={`flexRadioDefault_${bank._id}`}
              defaultChecked={bank._id === dataEkoPay.defaultApi}
              onChange={() => handleChangeCustomer2(bank._id)}
            />
            <label className="form-check-label" htmlFor={`flexRadioDefault_${bank._id}`}>
              {bank.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  ) : (
    ''
  )}


                    <div className="row row-row" id="dev-search-form">
                        <div className="col-md-4 ">
                            <div className="form-group mobile-input-container">
                                <label htmlFor="txtSM">Customer Number <span id="lenofsendernumber" className="float-right" /></label>
                                <input type="text" id="txtSM" className="form-control" name="mobile" value={initialCustomer.mobile} placeholder=" Enter Customer Number" maxLength={maxLength} onKeyDown={handleKeyPress2} onChange={handleChangeCustomer} />
                                {suggestions.length > 0 && (
                                    <ul className="suggestions-list">
                                        {suggestions && suggestions.map((suggestion, index) => (
                                            <li
                                                // key={suggestion?._id}
                                                // className="suggestion-item"
                                                // onClick={() => handleSuggestionClick(suggestion.customer_number)}
                                                handleSuggestionClicky={suggestion._id}
                                                className={`suggestion-item ${index === focusedSuggestionIndex ? 'focused' : ''}`}
                                                onClick={() => handleSuggestionClick(suggestion.customer_number)}
                                            >
                                                <span>{suggestion?.customer_number}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                        </div>

                        <div className="col-md-3 pt-md-3 mt-1">
                            <button type="button" id="btnSearch" className={`btn ${initialCustomer.mobile.length !== 10 ? 'commonbotton_disable' : 'btn-success'} custom-button example-1`} disabled={initialCustomer.mobile.length !== 10} onClick={SubmitCustomer}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {isActiveCus ? <CustomerApi walletShowHeader={walletShowHeader} data={data} beneficiaryData={beneficiaryData} customerNumber={updateNumber.mobile} confirm={confirm} cancel={cancel} toastSuccessMessage={toastSuccessMessage} updateRecipetList={updateRecipetList} settingState={settingState} initialCustomer={initialCustomer} toastSuccessMessageError={toastSuccessMessageError} SubmitCustomer={SubmitCustomer} customerinformation={customerinformation} /> : ''}
            <NotExitCustomer
                show={modalShow}
                onHide={() => setModalShow(false)}
                customerCreate={customerCreate}
            />

            <CreateCustomer
                show={modalShow2}
                onHide={() => setModalShow2(false)}
                setModalShow2={setModalShow2}
                handleShow={handleShow}
                toastSuccessMessage={toastSuccessMessage}
                updateNumber={updateNumber}
                initialCustomer={initialCustomer}
                toastSuccessMessageError={toastSuccessMessageError}
            />

            <OtpChaeckTost
                setShow={setShow}
                show={show}
                handleClose={handleClose}
                setModalShow3={setModalShow3}
            />

            <OtpCustomer
                show={modalShow3}
                onHide={() => setModalShow3(false)}
                customerNumber={customerNumber}
                toastSuccessMessage={toastSuccessMessage}
                initialCustomer={initialCustomer}
            />

            <ToastContainer />
        </>
    )
}
export default MoneyTransfer
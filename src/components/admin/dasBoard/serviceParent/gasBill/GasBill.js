
import { useEffect, useState } from "react"
import { bbpsCategory, billPay, billPayment, operatorApi } from "../../../../../api/login/Login"
import Select from "react-select"
import GasBillList from "./gasBillList/GasBillList"
import { ToastContainer, toast } from "react-toastify"
import TipinModal from "../../../../../common/tipinModal/TipinModal"
import Loader from "../../../../../common/loader/Loader"
function GasBill({walletShowHeader}) {
    const [loader1, setloader1] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [bankData, setBankData] = useState(null)
    // console.log(bankData);
    const [isLoading, setIsLoading] = useState(false);
    const [showBanak, setShowBank] = useState()
    const [detailsShow, setDetailsShow] = useState(false)
    const [detailsData, setdetailsData] = useState(null)
    const [buttonChange, setButtonChange] = useState(false)
    const [payloadSend, setPayloadSend] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    // console.log(payloadSend);
    const [initialValue, setInitialValue] = useState({
        billerId: "",
        customParams: [
            {
                name: "CA Number",
                value: ''
            }
        ],
        amount: '',
        refId: '',
        billerResponse: '',
        user_id: ''
    })

    const handleChange = (e, index) => {
        const { value } = e.target;
        setInitialValue((prev) => {
            const newParams = prev.customParams.map((param, i) =>
                i === index ? { ...param, value } : param
            );
            return { ...prev, customParams: newParams };
        });
    };


    const changeHandle2 = (e) => {
        const clone = { ...initialValue }
        const value = e.target.value
        const name = e.target.name
        clone[name] = value

        setInitialValue(clone)
    }


    const bankChange = (e) => {
        console.log(e);
        setDetailsShow(null)
        setButtonChange(false)

        const clone = { ...initialValue }
        const cloneArr = [...e.customerParams]
        const maped2 = cloneArr?.map((item) => {
            // console.log(item);
            return {
                name: item.paramName,
                value: ''
            }
        })
        clone.customParams = maped2
        setInitialValue(clone)
        setShowBank(e)

    }
    const electricityOperator = async () => {
        const electricity = '667e8a8aa0cc9372aaceb000'
        try {
            const res = await operatorApi(electricity)
            // console.log(res?.data.data);
            const maped = res?.data?.data?.map((item) => {
                // console.log(item);
                return { ...item, label: item.name }
            })
            // console.log(res?.data?.data);

            setBankData(maped)
        } catch (error) {

        }
    }


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


    const ViewDtails = async () => {
        setIsLoading(true)
        const clone = { ...initialValue, billerId: showBanak?.operatorid, user_id: window.localStorage.getItem('userIdToken') }
        // console.log(clone);
        try {
            const res = await billPayment(clone)
            // console.log(res?.data?.error);
            if (res?.data?.error == true) {
                toastSuccessMessageError(res?.data?.message)
                setIsLoading(false)
            }
            if (res?.data?.error == false) {
                toastSuccessMessage(res?.data?.message)
                setdetailsData(res?.data?.data?.billerResponse)
                setPayloadSend(res?.data?.data)
                setDetailsShow(true)
                setButtonChange(true)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }
    const resetForm = () => {
        setInitialValue({
          billerId: "",
          customParams: [{ name: "CA Number", value: "" }],
          amount: "",
          refId: "",
          billerResponse: "",
          user_id: "",
        });
        setShowBank(null);
        setDetailsShow(false);
        setButtonChange(false);
        setPayloadSend(null);
        setdetailsData(null);
      };
    const paySubmit = async (tipin) => {
        setIsSubmitting(true);
        setIsLoading(true)
        const clone = { ...initialValue, tpin: tipin, billerResponse: payloadSend.billerResponse, refId: payloadSend.refId, billerId: showBanak?.operatorid, user_id: window.localStorage.getItem('userIdToken') ,
            amount:detailsData?.amount 
        }
        try {
            const res = await billPay(clone)
            if (res?.data?.error == false) {
                toastSuccessMessage(res?.data?.message)
                setloader1(false)
                if (walletShowHeader) walletShowHeader();
            }
            if (res?.data?.error == true) {
                toastSuccessMessageError(res?.data?.message)
                setloader1(false)
                // setIsLoading(false)
            }
        } catch (error) {
            // setIsLoading(false)
        }
        finally {
            setIsSubmitting(false);
            setModalShow(false);
          }
    }


    useEffect(() => {
        electricityOperator()

    }, [])
    const isViewBillDisabled = !showBanak || !initialValue.customParams[0].value;
    return (
        <>

            <div className="PageHeading">
                <h1>Gas Bills</h1>
            </div>
            <div className="ContentArea">
                <div className="card">
                    {/* <div className="card-header"><span>Filter</span></div> */}
                    <div className="card-body">

                        <input type="hidden" id="hidID" name="hidID" />
                        <div className="form-row">
                            {/* <div className="tab-pane fade active show in" id="DTH" role="tabpanel" aria-labelledby="DTHTab">
                                <div className="row"> */}
                            <div className="col-md-5 col-sm-12">
                                <h2 className="SecTitle">Gas Bills</h2>
                                <form id="frmDthrecahrge" name="frmrecahrge" method="post" className="CustomForm fl-form ng-pristine ng-valid" autoComplete="off">
                                    <input type="hidden" id="hidSubmitRecharge" name="hidSubmitRecharge" defaultValue="Success" autoComplete="off" />

                                    <div className="form-group">
                                        <div className="fl-wrap fl-wrap-select">
                                            <label htmlFor="ddlDthOperator" className="">SELECT OPERATOR <span style={{ color: 'red' }}>*</span></label>
                                            <Select
                                                // isMulti
                                                // defaultValue={showCateg}
                                                value={showBanak}
                                                name="showBanak"
                                                options={bankData}
                                                className="games-dropdown-2 customsection"
                                                classNamePrefix="select"
                                                onChange={bankChange}

                                            />
                                        </div>
                                    </div>

                                    {showBanak?.customerParams && showBanak?.customerParams?.map((item, i) => {
                                        return <div className="form-group" key={item?._id}>
                                            <div className="fl-wrap fl-wrap-input">
                                                <label htmlFor="txtDthNo" className="">{item?.paramName} <span style={{ color: 'red' }}>*</span></label>
                                                <input type="text" className="form-control fl-input" id="txtDthNo" maxLength={40} value={item.value} name="value" placeholder={`Enter ${item?.paramName}`} data-placeholder="Enter CA NUMBER" onChange={(e) => { handleChange(e, i) }} />
                                            </div>
                                        </div>
                                    })}

                                    {detailsShow ? <div className="bill-details">

                                        <div className="super-set-lic">
                                            <h5>Bill Details</h5>
                                            {detailsData?.customerName && <div className="detaills-head">
                                                <p><strong>BILL CUSTOMER NAME</strong></p>
                                                <p>{detailsData?.customerName}</p>
                                            </div>}

                                            {detailsData?.amount && <div className="detaills-head">
                                                <p><strong>BILL AMOUNT</strong></p>
                                                <p>{detailsData?.amount}</p>
                                            </div>}

                                            {detailsData?.billDate && <div className="detaills-head">
                                                <p><strong>BILL DATE</strong></p>
                                                <p>{detailsData?.billDate}</p>
                                            </div>}

                                            {detailsData?.billNumber && <div className="detaills-head">
                                                <p><strong>BILL NUMBER</strong></p>
                                                <p>{detailsData?.billNumber}</p>
                                            </div>}


                                            {/* <div className="detaills-head">
                                                <p><strong>BILL PERIOD</strong></p>
                                                <p>{detailsData?.billPeriod}</p>
                                            </div>
                                            <div className="detaills-head">
                                                <p><strong>custConvDesc</strong></p>
                                                <p>{detailsData?.custConvDesc}</p>
                                            </div>
                                            <div className="detaills-head">
                                                <p><strong>custConvFee</strong></p>
                                                <p>{detailsData?.custConvFee}</p>
                                            </div> */}

                                            {detailsData?.dueDate && <div className="detaills-head">
                                                <p><strong>DUE DATE</strong></p>
                                                <p>{detailsData?.dueDate}</p>
                                            </div>}

                                        </div>

                                        <div className="form-group">
                                            <div className="fl-wrap fl-wrap-input">
                                                <label htmlFor="txtDthAmount" className="">AMOUNT <span style={{ color: 'red' }}>*</span></label>
                                                <input type="text"  style={{ cursor: 'not-allowed', backgroundColor: '#f0f0f0' }} name="amount" className="form-control txtAmountDthRec fl-input" value={detailsData?.amount || ''} 
            placeholder="Amount" 
            readOnly /></div>
                                            
                                        </div>
                                    </div> : ''}


                                    {buttonChange ? <div className="FormButtons mt-3 text-align-center">

                                        <button type="button" className="btn btn-success" disabled={detailsData?.amount== 0} onClick={() => setModalShow(true)}>{isLoading ? <div className="loaderr"></div> : 'Proceed To Pay'}</button>
                                    </div>
                                        : <div className="FormButtons mt-3 text-align-center">
                                            <button type="button" className="btn btn-success" disabled={isViewBillDisabled}  onClick={ViewDtails}> {isLoading ? <div className="loaderr"></div> : 'View Bill'}</button>
                                        </div>}
                                </form>
                            </div>
                            <GasBillList />
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>

            <TipinModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                paySubmit={paySubmit}
                loader1={loader1}
                detailsData={initialValue}
            />
            {isSubmitting && <Loader/>}

        </>
    )
}
export default GasBill
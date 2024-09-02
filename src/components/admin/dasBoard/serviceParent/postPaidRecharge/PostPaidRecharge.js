import { useEffect, useState } from "react";
import MobilePlan from "../mobileRecharge/mobilePalan/MobilePlan"
import Select from "react-select"
import { billPay, billPayment, operatorApi } from "../../../../../api/login/Login";
import PostPaidRechargeList from "./postPaidRechargeList/PostPaidRechargeList";
import { ToastContainer, toast } from "react-toastify";
import TipinModal from "../../../../../common/tipinModal/TipinModal";
import Loader from "../../../../../common/loader/Loader";

function PostPaidRecharge({walletShowHeader}) {
    // const [showBanak, setShowBank] = useState()
    // const [bankData, setBankData] = useState(null)
    // console.log(bankData);
    // // console.log(showBanak?.bankID);

    // const bankChange = (e) => {
    //     console.log(e);
    //     // const clone = { ...initialValue }
    //     // // if (name == 'bank_id') {
    //     // const findIfac = bankData.find((item) => {
    //     //     // console.log(item);
    //     //     return item?.bankID == e.bankID
    //     // })
    //     // // console.log(findIfac);
    //     // let abc = findIfac?.ifsc_code
    //     // let bankName = findIfac?.bank_name
    //     // // console.log(findIfac, abc);
    //     // const clone2 = { ...clone, ifsc: abc == 'NULL' ? "" : abc, bank_name: bankName }
    //     // // console.log({ ...initialData, account_number: abc });
    //     // setInitialValue(clone2)

    //     setShowBank(e)

    // }



    // const postPaidrechargeOperator = async () => {
    //     const electricity = '6655db77d0ff3e6928e2c27f'
    //     try {
    //         const res = await operatorApi(electricity)
    //         console.log(res?.data.data);
    //         const maped = res?.data?.data?.map((item) => {
    //             // console.log(item);
    //             return { ...item, label: item.name }
    //         })
    //         setBankData(maped)
    //     } catch (error) {

    //     }
    // }
    // useEffect(() => {
    //     postPaidrechargeOperator()
    // }, [])
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
                name: "",
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
        // const clone = { ...initialValue }

        // const name = e.target.name
        // clone[name] = value

        // setInitialValue(clone)


    };

    const changeHandle2 = (e) => {
        const clone = { ...initialValue }
        const value = e.target.value
        const name = e.target.name
        clone[name] = value

        setInitialValue(clone)
    }




    // console.log(showBanak.customerParams);

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
    const postPaidrechargeOperator = async () => {
        const electricity = '667e8a8aa0cc9372aaceb008'
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
        const clone = { ...initialValue, billerId: showBanak?.operatorid, user_id: window.localStorage.getItem('userIdToken') }
        // console.log(clone);
        setIsLoading(true)
        try {
            const res = await billPayment(clone)
            // console.log(res?.data?.error);
            if (res?.data?.error == true) {
                toastSuccessMessageError(res?.data?.message)
                setIsLoading(false)
            }
            if (res?.data?.error == false) {
                toastSuccessMessage(res?.data?.message)
                // console.log(res?.data?.data?.billerResponse);
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
          customParams: [{ name: "", value: "" }],
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
        const clone = { ...initialValue, tpin: tipin, billerResponse: payloadSend.billerResponse, refId: payloadSend.refId, billerId: showBanak?.operatorid, user_id: window.localStorage.getItem('userIdToken') }
        try {
            const res = await billPay(clone)
            if (res?.data?.error == false) {
                toastSuccessMessage(res?.data?.message)

                setloader1(false)
                setModalShow(false)
                if (walletShowHeader) walletShowHeader();
            }
            if (res?.data?.error == true) {
                toastSuccessMessageError(res?.data?.message)
                setloader1(false)
            }
        } catch (error) {

            setloader1(false)
        }
        finally {
            setIsSubmitting(false);
            setModalShow(false);
          }
    }


    useEffect(() => {
        postPaidrechargeOperator()

    }, [])
    const isViewBillDisabled = !showBanak || !initialValue.customParams[0].value;
    return (
        <>
            <div className="PageHeading">
                <h1>Postpaid Recharge</h1>
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
                                <h2 className="SecTitle">Postpaid Recharge</h2>
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
                                                <input type="number" className="form-control fl-input" id="txtDthNo" maxLength={40} value={item.value} name="value" placeholder={`Enter ${item?.paramName}`} data-placeholder="Enter CA NUMBER" onChange={(e) => { handleChange(e, i) }} />
                                            </div>
                                        </div>
                                    })}
                                    {/* <div className="form-group">
                                        <div className="fl-wrap fl-wrap-input">
                                            <label htmlFor="txtDthAmount" className="">AMOUNT</label>
                                            <input type="text" style={{ cursor: 'text !important', backgroundColor: 'white' }} className="form-control txtAmountDthRec fl-input" id="txtDthAmount" maxLength={20} name="txtAmount" placeholder="Amount" tabIndex={3} onfocus="if (this.hasAttribute('readonly')) { this.removeAttribute('readonly');this.blur();    this.focus();  }" data-placeholder="Enter Amount" /></div><span className="numtowords_output" id="numtowords_outputDthRec" style={{ display: 'none' }} />
                                    </div> */}

                                    {detailsShow ? <div className="bill-details">

                                        <div className="super-set-lic">
                                            <h5>Bill Details</h5>
                                            <div className="detaills-head">
                                                <p><strong>BILL CUSTOMER NAME</strong></p>
                                                <p>{detailsData?.customerName}</p>
                                            </div>
                                            <div className="detaills-head">
                                                <p><strong>BILL AMOUNT</strong></p>
                                                <p>{detailsData?.amount}</p>
                                            </div>
                                            <div className="detaills-head">
                                                <p><strong>BILL DATE</strong></p>
                                                <p>{detailsData?.billDate}</p>
                                            </div>
                                            <div className="detaills-head">
                                                <p><strong>BILL NUMBER</strong></p>
                                                <p>{detailsData?.billNumber}</p>
                                            </div>
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
                                            <div className="detaills-head">
                                                <p><strong>DUE DATE</strong></p>
                                                <p>{detailsData?.dueDate}</p>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="fl-wrap fl-wrap-input">
                                                <label htmlFor="txtDthAmount" className="">AMOUNT <span style={{ color: 'red' }}>*</span></label>
                                                <input type="number" style={{ cursor: 'text !important', backgroundColor: 'white' }} name="amount" className="form-control txtAmountDthRec fl-input" value={detailsData?.amount} placeholder="Amount" onChange={changeHandle2} readOnly  /></div>
                                            {showBanak?.paymentAmountExactness && <p style={{ color: 'red' }}>Amount Must be {showBanak?.paymentAmountExactness}</p>}
                                        </div>


                                    </div> : ''}

                                    {buttonChange ? <div className="FormButtons mt-3 text-align-center">

                                        <button type="button" className="btn btn-success" disabled={detailsData?.amount == 0} onClick={() => setModalShow(true)}>{isLoading ? <div className="loaderr"></div> : 'Proceed To Pay'}</button>
                                    </div>
                                        : <div className="FormButtons mt-3 text-align-center">
                                            <button type="button" className="btn btn-success" onClick={ViewDtails} disabled={isViewBillDisabled} > {isLoading ? <div className="loaderr"></div> : 'View Bill'}</button>
                                        </div>}

                                </form>
                                <MobilePlan />
                            </div>
                            <PostPaidRechargeList />
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
                initialValue={detailsData}
            />
            {isSubmitting && <Loader/>}

        </>
    )
}
export default PostPaidRecharge
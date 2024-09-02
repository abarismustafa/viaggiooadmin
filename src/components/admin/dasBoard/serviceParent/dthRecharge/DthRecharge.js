import { ToastContainer, toast } from "react-toastify"
import DthRechargeList from "./dthRechargeList/DthRechageList"
import { useState } from "react"
import { billPay, billPayRecharge, billPayment, dthPlanDetails, dthrechargeOperators, mobilePlanDetails, operatorApi, rechargeOperators } from "../../../../../api/login/Login"
import { useEffect } from "react"
import Select from "react-select"
import Loader from "../../../../../common/loader/Loader"
import TipinModal from "../../../../../common/tipinModal/TipinModal"


function DthRecharge({walletShowHeader}) {
    // const [bankData, setBankData] = useState(null)
    // // console.log(bankData);
    // const [isLoading, setIsLoading] = useState(false);
    // const [showBanak, setShowBank] = useState()
    // const [detailsShow, setDetailsShow] = useState(false)
    // const [detailsData, setdetailsData] = useState(null)
    // const [buttonChange, setButtonChange] = useState(false)
    // const [payloadSend, setPayloadSend] = useState()
    // // console.log(payloadSend);
    // const [initialValue, setInitialValue] = useState({
    //     billerId: "",
    //     customParams: [
    //         {
    //             name: "CA Number",
    //             value: ''
    //         }
    //     ],
    //     amount: '',
    //     refId: '',
    //     billerResponse: '',
    //     user_id: ''
    // })

    // const handleChange = (e, index) => {
    //     const { value } = e.target;
    //     setInitialValue((prev) => {
    //         const newParams = prev.customParams.map((param, i) =>
    //             i === index ? { ...param, value } : param
    //         );
    //         return { ...prev, customParams: newParams };
    //     });
    // };


    // const changeHandle2 = (e) => {
    //     const clone = { ...initialValue }
    //     const value = e.target.value
    //     const name = e.target.name
    //     clone[name] = value

    //     setInitialValue(clone)
    // }




    // const bankChange = (e) => {
    //     console.log(e);

    //     const clone = { ...initialValue }
    //     const cloneArr = [...e.customerParams]
    //     const maped2 = cloneArr?.map((item) => {
    //         // console.log(item);
    //         return {
    //             name: item.paramName,
    //             value: ''
    //         }
    //     })
    //     clone.customParams = maped2
    //     setInitialValue(clone)
    //     setShowBank(e)

    // }
    // const electricityOperator = async () => {
    //     const electricity = '6655db77d0ff3e6928e2c279'
    //     try {
    //         const res = await operatorApi(electricity)
    //         // console.log(res?.data.data);
    //         const maped = res?.data?.data?.map((item) => {
    //             // console.log(item);
    //             return { ...item, label: item.name }
    //         })
    //         // console.log(res?.data?.data);

    //         setBankData(maped)
    //     } catch (error) {

    //     }
    // }


    // const toastSuccessMessage = (data) => {
    //     // console.log(data);
    //     toast.success(`${data}`, {
    //         position: "top-center",
    //     });
    // };

    // const toastSuccessMessageError = (data) => {
    //     // console.log(data);
    //     toast.error(`${data}`, {
    //         position: "top-center",
    //     });
    // };


    // const ViewDtails = async () => {
    //     setIsLoading(true)
    //     const clone = { ...initialValue, billerId: showBanak?.operatorid, user_id: window.localStorage.getItem('userIdToken') }
    //     // console.log(clone);
    //     try {
    //         const res = await billPayment(clone)
    //         // console.log(res?.data?.error);
    //         if (res?.data?.error == true) {
    //             toastSuccessMessageError(res?.data?.message)
    //             setIsLoading(false)
    //         }
    //         if (res?.data?.error == false) {
    //             toastSuccessMessage(res?.data?.message)
    //             // console.log(res?.data?.data?.billerResponse);
    //             setdetailsData(res?.data?.data?.billerResponse)
    //             setPayloadSend(res?.data?.data)
    //             setDetailsShow(true)
    //             setButtonChange(true)
    //             setIsLoading(false)
    //         }
    //     } catch (error) {

    //     }
    // }

    // const paySubmit = async () => {
    //     setIsLoading(true)
    //     const clone = { ...initialValue, billerResponse: payloadSend.billerResponse, refId: payloadSend.refId, billerId: showBanak?.operatorid, user_id: window.localStorage.getItem('userIdToken') }
    //     try {
    //         const res = await billPay(clone)
    //         if (res?.data?.error == false) {
    //             toastSuccessMessage(res?.data?.message)
    //             setIsLoading(false)
    //         }
    //         if (res?.data?.error == true) {
    //             toastSuccessMessageError(res?.data?.message)
    //             setIsLoading(false)
    //         }
    //     } catch (error) {

    //     }
    // }


    // useEffect(() => {
    //     electricityOperator()

    // }, [])
    const [loader1, setloader1] = useState(false)
    const [modalShow, setModalShow] = useState(false);

    const [loading, setLoading] = useState(false);
    const [bankData, setBankData] = useState(null)
    console.log(bankData);
    const [allOperatorData, setAllOperatorData] = useState(null)
    console.log(allOperatorData);
    const [buttonChange, setButtonChange] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const [bankData2, setBankData2] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [initialData, setInitialData] = useState({
        billNumber: '',
        amount: ''
    })

    console.log(initialData);

    const onChange = (e, str) => {
        const clone = { ...initialData }
        const value = e.target.value
        const name = e.target.name
        if (e.target.value.length == 12) {
            return
        }
        if (str == 'billNumber' && e.target.value.length == 11) {
            // planOperator(e.target.value)
            const value = e.target.value
            const name = e.target.name
            clone[name] = value
            setInitialData(clone)
            return
        } else if (str === 'billNumber' && value.length < 11) {
            setAllOperatorData(null); // Clear operator plan data when mobile number is less than 10 digits
            setShowBank(null); // Clear selected operator
            clone[name] = value;
            setInitialData(clone);
        } else {
            const value = e.target.value
            const name = e.target.name
            clone[name] = value
            setInitialData(clone)
        }

    }

    const [showBanak, setShowBank] = useState()
    const [showBanak2, setShowBank2] = useState();
    const [selectbankid,seSelectedBankId]=useState(null)
    console.log("showBanak",showBanak);
    console.log(showBanak2);

    const bankChange = (e) => {
        console.log("banklist",e);
        setAllOperatorData(null)
        setButtonChange(false)
        // const clone = { ...initialValue }
        // // if (name == 'bank_id') {
        // const findIfac = bankData.find((item) => {
        //     // console.log(item);
        //     return item?.bankID == e.bankID
        // })
        // // console.log(findIfac);
        // let abc = findIfac?.ifsc_code
        // let bankName = findIfac?.bank_name
        // // console.log(findIfac, abc);
        // const clone2 = { ...clone, ifsc: abc == 'NULL' ? "" : abc, bank_name: bankName }
        // // console.log({ ...initialData, account_number: abc });
        // setInitialValue(clone2)

        setShowBank(e)
        seSelectedBankId(e?._id)
          

    }


    const bankChange2 = (e) => {
        // console.log(e);
        // const clone = { ...initialValue }
        // // if (name == 'bank_id') {
        // const findIfac = bankData.find((item) => {
        //     // console.log(item);
        //     return item?.bankID == e.bankID
        // })
        // // console.log(findIfac);
        // let abc = findIfac?.ifsc_code
        // let bankName = findIfac?.bank_name
        // // console.log(findIfac, abc);
        // const clone2 = { ...clone, ifsc: abc == 'NULL' ? "" : abc, bank_name: bankName }
        // // console.log({ ...initialData, account_number: abc });
        // setInitialValue(clone2)

        setShowBank2(e)

    }



    const rechargeOperator = async () => {
        const electricity = '6655db77d0ff3e6928e2c284'
        try {
            const res = await dthrechargeOperators()
            // console.log(res?.data.data);
            const maped = res?.data?.data?.operators?.map((item) => {
                // console.log(item);
                return { ...item, label: item.name }
            })
            setBankData(maped)

            const maped2 = res?.data?.data?.states?.map((item) => {
                // console.log(item);
                return { ...item, label: item.name }
            })
            setBankData2(maped2)
        } catch (error) {

        }
    }

    const toastSuccessMessage = (str) => {
        toast.success(`${str}`, {
            position: "top-center",
        });
    };
    const toastErrorMessage = (str) => {
        toast.error(`${str}`, {
            position: "top-center",
        });
    };

    const planOperator = async (num) => {
        // console.log(num);
        // setLoading(true)

        const clone = { mobile: initialData?.billNumber, operator: showBanak?._id }
        try {
            const res = await dthPlanDetails(clone)
            // console.log(res);

            // setLoading(false)
            if (res?.data?.error == false) {
                setAllOperatorData(res?.data?.data)
                setButtonChange(true)
                toastSuccessMessage(res?.data?.message)
            } else {
                toastErrorMessage(res?.data?.message)
            }
        } catch (error) {
            // setLoading(false)
        }
    }


    const selectAmount = (item) => {
        const clone = { ...initialData, amount: item?.rs }
        // console.log(item);
        setInitialData(clone)
    }

    const resetForm = () => {
        setInitialData({
            billNumber:''
        });
        setShowBank(null);
        
        setButtonChange(false);
        
      };



    const submitata = async (tipin) => {
        setIsSubmitting(true);
        const clone = { ...initialData, tpin: tipin, user_id: window.localStorage.getItem('userIdToken'), rechargeId: selectbankid }
        console.log("conedata",clone)
        try {
            const res = await billPayRecharge(clone)
            // console.log(res);
            if (res.data.error == false) {
                toastSuccessMessage(res?.data?.message)
                setloader1(false)
                setModalShow(false)
                if (walletShowHeader) walletShowHeader();
                resetForm()
            } else {
                toastErrorMessage(res?.data?.message)
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




    // useEffect(() => {
    //     planOperator()
    // }, [])

    useEffect(() => {
        if (allOperatorData && bankData) {
            const defaultOperator = bankData.find((op) => {
                console.log(op);
                console.log(op.operator_code, allOperatorData.operator_code);
                return op._id === allOperatorData.operator_code
            });
            console.log(defaultOperator);
            setShowBank(defaultOperator);
        }
    }, [allOperatorData, bankData]);

    useEffect(() => {
        rechargeOperator()
    }, [])

    const isViewBillDisabled = !initialData.billNumber || !showBanak;
    return (
        <>
            {loading && <Loader />}
            <div className="PageHeading">
                <h1>DTH Recharge</h1>
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
                                <h2 className="SecTitle">DTH Recharge</h2>
                                <form id="frmDthrecahrge" name="frmrecahrge" method="post" action="#" className="CustomForm fl-form ng-pristine ng-valid" autoComplete="off">
                                    <input type="hidden" id="hidSubmitRecharge" name="hidSubmitRecharge" defaultValue="Success" autoComplete="off" />
                                    <div className="form-group">
                                        <div className="fl-wrap fl-wrap-input">
                                            <label htmlFor="txtDthNo" className="">BIL NUMBER <span style={{ color: 'red' }}>*</span></label>
                                            <input type="number" className="form-control fl-input" id="txtDthNo" name="billNumber" value={initialData?.billNumber} placeholder="ENTER BIL NUMBER" onChange={(e) => onChange(e, 'billNumber')} />
                                        </div>
                                    </div>
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
                                            {allOperatorData?.operator && <p style={{ textAlign: 'center' }}>{allOperatorData?.operator.Circle}</p>}

                                        </div>
                                    </div>
                                    {/* <div className="form-group">
                                        <div className="fl-wrap fl-wrap-select">
                                            <label htmlFor="ddlDthOperator" className="">SELECT STATE</label>
                                            <Select
                                                // isMulti
                                                // defaultValue={showCateg}
                                                value={showBanak2}
                                                name="showBanak"
                                                options={bankData2}
                                                className="games-dropdown-2 customsection"
                                                classNamePrefix="select"
                                                onChange={bankChange2}
                                            />
                                        </div>
                                    </div> */}
                                    {allOperatorData && <>
                                        <div className="set-lead">

                                            {allOperatorData?.Balance && <div className="set-details">
                                                <p>Balance : </p>
                                                <p>{allOperatorData?.Balance}</p>
                                            </div>}

                                            {allOperatorData?.name && <div className="set-details">
                                                <p>Name : </p>
                                                <p>{allOperatorData?.name}</p>
                                            </div>}


                                            {allOperatorData.City && <div className="set-details">
                                                <p>City : </p>
                                                <p>{allOperatorData.City}</p>
                                            </div>}

                                            {allOperatorData.next_recharge_date && <div className="set-details">
                                                <p>District : </p>
                                                <p>{allOperatorData.next_recharge_date}</p>
                                            </div>}

                                            {allOperatorData.monthly && <div className="set-details">
                                                <p>Monthly : </p>
                                                <p>{allOperatorData.monthly}</p>
                                            </div>}


                                            {allOperatorData.Address && <div className="set-details">
                                                <p>Address : </p>
                                                <p style={{ width: '345px' }}>{allOperatorData.Address}</p>
                                            </div>}
                                            {allOperatorData.pin_code && <div className="set-details">
                                                <p>Pin Code : </p>
                                                <p style={{ width: '345px' }}>{allOperatorData.pin_code}</p>
                                            </div>}

                                        </div>
                                        <div className="form-group">
                                            <div className="fl-wrap fl-wrap-input">
                                                <label htmlFor="txtDthAmount" className="">AMOUNT <span style={{ color: 'red' }}>*</span></label>
                                                <input type="number" className="form-control txtAmountDthRec fl-input" id="txtDthAmount" name="amount" placeholder="Amount" value={initialData?.amount} onChange={onChange} />
                                            </div>
                                            {/* <span className="numtowords_output" id="numtowords_outputDthRec" style={{ display: 'none' }} /> */}
                                        </div>
                                    </>

                                    }

                                    {buttonChange ? <div className="FormButtons mt-3 text-align-center">

                                        <button type="button" className="btn btn-success" disabled={!initialData?.amount || initialData?.amount == 0} onClick={() => setModalShow(true)}>{isLoading ? <div className="loaderr"></div> : 'Proceed To Pay'}</button>
                                    </div>
                                        : <div className="FormButtons mt-3 text-align-center">
                                            <button type="button" className="btn btn-success" disabled={isViewBillDisabled} onClick={planOperator}> {isLoading ? <div className="loaderr"></div> : 'View Bill'}</button>
                                        </div>}

                                    {/* <button type="button" className="btn" onClick={planOperator}>view plan</button>

                                    <div className="FormButtons  text-align-center">
                                        <button type="button" className="btn btn-success text-align-center" disabled={!initialData.amount || !initialData?.billNumber || !showBanak} onClick={submitata}>Submit</button>
                                    </div> */}
                                </form>
                                {/* <MobilePlan allOperatorDat={allOperatorData} selectAmount={selectAmount} /> */}
                            </div>
                            <DthRechargeList />
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>

            <TipinModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                submitata={submitata}
                loader1={loader1}
                initialData={initialData}
            />



            {/* <div className="PageHeading">
                <h1>DTH Recharge</h1>
            </div>
            <div className="ContentArea">
                <div className="card">

                    <div className="card-body">

                        <input type="hidden" id="hidID" name="hidID" />
                        <div className="form-row">

                            <div className="col-md-5 col-sm-12">
                                <h2 className="SecTitle">DTH Recharge</h2>
                                <form id="frmDthrecahrge" name="frmrecahrge" method="post" className="CustomForm fl-form ng-pristine ng-valid" autoComplete="off">
                                    <input type="hidden" id="hidSubmitRecharge" name="hidSubmitRecharge" defaultValue="Success" autoComplete="off" />

                                    <div className="form-group">
                                        <div className="fl-wrap fl-wrap-select">
                                            <label htmlFor="ddlDthOperator" className="">SELECT OPERATOR <span style={{ color: 'red' }}>*</span></label>
                                            <Select
                                             
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




                                            {detailsData?.dueDate && <div className="detaills-head">
                                                <p><strong>DUE DATE</strong></p>
                                                <p>{detailsData?.dueDate}</p>
                                            </div>}

                                        </div>

                                        <div className="form-group">
                                            <div className="fl-wrap fl-wrap-input">
                                                <label htmlFor="txtDthAmount" className="">AMOUNT <span style={{ color: 'red' }}>*</span></label>
                                                <input type="text" style={{ cursor: 'text !important', backgroundColor: 'white' }} name="amount" className="form-control txtAmountDthRec fl-input" value={initialValue.amount} placeholder="Amount" onChange={changeHandle2} /></div>
                                            {showBanak?.paymentAmountExactness && <p style={{ color: 'red' }}>Amount Must be {showBanak?.paymentAmountExactness}</p>}
                                        </div>


                                    </div> : ''}

                                    
                                    <div className="FormButtons mt-3 text-align-center">

                                        <button type="button" className="btn btn-success" onClick={paySubmit}>Submit</button>
                                    </div>


                                   
                                </form>
                            </div>
                            <DthRechargeList />
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div> */}

{isSubmitting && <Loader/>}

        </>
    )
}
export default DthRecharge

// DthRechargeList
import ResentTransition from "./resentTransition/ResentTranssition"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useEffect, useState } from "react";
import * as yup from 'yup'
import MobilePlan from "./mobilePalan/MobilePlan";
import { billPayRecharge, mobilePlanDetails, operatorApi, operatorApiRecharge, rechargeOperators } from "../../../../../api/login/Login";
import Select from "react-select"
import MobileRechargeList from "./mobileRechargeList/MobileRechargeList";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../../../../common/loader/Loader";
import TipinModal from "../../../../../common/tipinModal/TipinModal";
import InsufficientBalanceModal from "../../../../../common/tipinModal/InsufficientBalanceModal";
function MobileRecharge({walletShowHeader}) {
    const [loader1, setloader1] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bankData, setBankData] = useState(null)
    const [insufficientBalanceModal, setInsufficientBalanceModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    // console.log(bankData);
    const [allOperatorData, setAllOperatorData] = useState(null)
    console.log(allOperatorData?.operator);

    const [bankData2, setBankData2] = useState(null)


    const [initialData, setInitialData] = useState({
        billNumber: '',
        amount: ''
    })

    console.log(initialData);

    const onChange = (e, str) => {
        // const { value, name } = e.target;
        const clone = { ...initialData }
        const value = e.target.value
        const name = e.target.name
        if (e.target.value.length == 11) {
            return
        }

        if (str === 'billNumber' && value.length === 10) {
            planOperator(value);
            clone[name] = value;
            setInitialData(clone);
        } else if (str === 'billNumber' && value.length < 10) {
            setAllOperatorData(null); // Clear operator plan data when mobile number is less than 10 digits
            setShowBank(null); // Clear selected operator
            clone[name] = value;
            setInitialData(clone);
            setInitialData({
                amount: ''
            })
        } else {
            const value = e.target.value
            const name = e.target.name
            clone[name] = value
            setInitialData(clone)
        }
        // if (str == 'billNumber' && e.target.value.length == 10) {
        //     planOperator(e.target.value)
        //     const value = e.target.value
        //     const name = e.target.name
        //     clone[name] = value
        //     setInitialData(clone)
        //     return
        // }
        // const value = e.target.value
        // const name = e.target.name
        // clone[name] = value
        // setInitialData(clone)

    }

    const [showBanak, setShowBank] = useState()
    const [showBanak2, setShowBank2] = useState()
    // console.log(showBanak);

    const bankChange = (e) => {
        console.log(e);
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
            const res = await rechargeOperators()
            console.log(res?.data.data);
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

    const planOperator = async (num) => {
        // console.log(num);
        setLoading(true)
        try {
            const res = await mobilePlanDetails(num)
            // console.log(res);
            setAllOperatorData(res?.data?.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }


    const selectAmount = (item) => {
        const clone = { ...initialData, amount: item?.rs }
        // console.log(item);
        setInitialData(clone)

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
   
    const submitata = async (tipin) => {
        setIsSubmitting(true);
        const clone = { ...initialData, tpin: tipin, user_id: window.localStorage.getItem('userIdToken'), rechargeId: showBanak?._id }
        try {
            const res = await billPayRecharge(clone)
            // console.log(res);
            if (res.data.error == false) {
                toastSuccessMessage(res.data?.message)
                setShowBank(null); // Clear operator selection after successful submission
                setInitialData({ billNumber: '', amount: '' });
                setloader1(false)
                setModalShow(false)
                if (walletShowHeader) walletShowHeader();
            } else {
                toastErrorMessage(res.data?.message)
                if (res.data?.message.toLowerCase().includes('insufficient balance')) {
                    setModalShow(false)  // Close the TPIN modal
                    setErrorMessage(res.data?.message)
                    setInsufficientBalanceModal(true)  // Show the insufficient balance modal
                } else {
                    toastErrorMessage(res.data?.message)
                }
                setModalShow(false)
            }
        } catch (error) {
            setloader1(false)
            setModalShow(false)
            setErrorMessage("An error occurred. Please try again.")
            setInsufficientBalanceModal(true)
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
                console.log("opeartotorname",op);
                console.log(op.operator_code, allOperatorData.operator_code);
                return op._id === allOperatorData.operator_code
            });
            // console.log(defaultOperator);
            setShowBank(defaultOperator);
        }
    }, [allOperatorData, bankData]);

    useEffect(() => {
        rechargeOperator()
    }, [])


    return (
        <>
            {loading && <Loader />}
            <div className="PageHeading">
                <h1>Mobile Recharge</h1>
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
                                <h2 className="SecTitle">Mobile Recharge</h2>
                                <form id="frmDthrecahrge" name="frmrecahrge" method="post" action="#" className="CustomForm fl-form ng-pristine ng-valid" autoComplete="off">
                                    <input type="hidden" id="hidSubmitRecharge" name="hidSubmitRecharge" defaultValue="Success" autoComplete="off" />
                                    <div className="form-group">
                                        <div className="fl-wrap fl-wrap-input">
                                            <label htmlFor="txtDthNo" className="">MOBILE NUMBER <span style={{ color: 'red' }}>*</span></label>
                                            <input type="number" className="form-control fl-input" id="txtDthNo" name="billNumber" value={initialData?.billNumber} placeholder="Enter Mobile Number" onChange={(e) => onChange(e, 'billNumber')} />
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
                                    <div className="form-group">
                                        <div className="fl-wrap fl-wrap-input">
                                            <label htmlFor="txtDthAmount" className="">AMOUNT <span style={{ color: 'red' }}>*</span></label>
                                            <input type="number" className="form-control txtAmountDthRec fl-input" id="txtDthAmount" name="amount" placeholder="Amount" value={initialData?.amount} onChange={onChange} />
                                        </div>
                                        {/* <span className="numtowords_output" id="numtowords_outputDthRec" style={{ display: 'none' }} /> */}
                                    </div>

                                    <div className="FormButtons  text-align-center">
                                        <button type="button" className="btn btn-success text-align-center" disabled={!initialData.amount || !initialData?.billNumber || !showBanak} onClick={() => setModalShow(true)}>Proceed To Pay</button>
                                    </div>
                                </form>
                                <MobilePlan allOperatorDat={allOperatorData} selectAmount={selectAmount} />
                            </div>
                            <MobileRechargeList

                            />
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
            <InsufficientBalanceModal show={insufficientBalanceModal}
                onHide={() => setInsufficientBalanceModal(false)}
                message={errorMessage} />
{isSubmitting && <Loader/>}
        </>
    )
}
export default MobileRecharge
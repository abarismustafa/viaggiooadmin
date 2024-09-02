import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { BENEFICIARYAdd, bankListApiwithid, chargeBeneficiay, verificationBank } from "../../../../api/login/Login"
import Select from 'react-select'
import { toast } from "react-toastify"


function AddNewBeneficiary(props) {
    // console.log(props);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [bankData, setBankData] = useState(null)
    console.log(bankData);
    const [charge, setCharge] = useState(null)
    const [verifydisable, setVerifydisable] = useState(false);
    const [initialValue, setInitialValue] = useState({
        user_id: '',
        recipient_name: '',
        customer_mobile: '',
        // api_id:'',
        account_number: '',
        ifsc: '',
        bank_code: '',
        bank_id: '',
        recipient_mobile: '',
        isVerified: false
    })
    const bankidforist=props?.initialCustomer?.api_id;
    console.log("bankidforist",bankidforist)
    const bankList = async () => {
        try {
            const res = await bankListApiwithid(bankidforist)
            const maped = res?.data?.data?.map((item) => {
                return { ...item, label: item.bank_name }
            })
            setBankData(maped)
        } catch (error) {

        }

    }


    const findIfacCode = (bank_id) => {
        console.log(bank_id);
        const findIfac = bankData.find((item) => {
            return item?.bankID == bank_id
        })
        const clone = { ...initialValue, ifsc: findIfac?.ifsc_code }
        // console.log(findIfac?.ifsc_code);
        setInitialValue(clone)
        console.log(clone);
    }


    const changeHandleBeneficiary = (e) => {
        const clone = { ...initialValue }
        const value = e.target.value
        const name = e.target.name
        clone[name] = value

        setInitialValue(clone)


    }

    const [showBanak, setShowBank] = useState()
    // console.log(showBanak?.bankID);

    const bankChange = (e) => {
        console.log(e);
        const clone = { ...initialValue }
        // if (name == 'bank_id') {
        const findIfac = bankData.find((item) => {
            // console.log(item);
            return item?.bankID == e.bankID
        })
        // console.log(findIfac);
        let abc = findIfac?.ifsc_code
        let bankName = findIfac?.bank_name
        // console.log(findIfac, abc);
        const clone2 = { ...clone, ifsc: abc == 'NULL' ? "" : abc, bank_name: bankName }
        // console.log({ ...initialData, account_number: abc });
        setInitialValue(clone2)
        // return
        // }
        setShowBank(e)

    }


    const HandleSubmitBeneficiary = async () => {
        setLoading1(true)
        const clone = { ...initialValue, customer_mobile: props.customerNumber, recipient_mobile: props.customerNumber, bank_code: showBanak?.bankID, bank_id: showBanak?._id, api_id: props.initialCustomer.api_id, user_id: window.localStorage.getItem('userIdToken') }
        try {
            const res = await BENEFICIARYAdd(clone)
            if (res?.data?.statusCode == 200) {
                props.toastSuccessMessage(res?.data?.message)
                props.updateRecipetList()
                props.onHide()
            }
            if (res?.data?.statusCode == 400) {
                props.toastSuccessMessageError(res?.data?.message)
            }
            if (res?.data?.statusCode == 300) {
                props.toastSuccessMessageError(res?.data?.message)
            }
            if (res?.data?.statusCode == 500) {
                props.toastSuccessMessageError(res?.data?.message)
            }
        } catch (error) {
            console.log(error);
            alert('ss')
            props.toastSuccessMessageError(error?.data?.message)
        }
        setLoading1(false)
    }


    const toastSuccessMessage = (data) => {
        toast.error(`${data}`, {
            position: "top-center",
        });
    };


    const verifideBank = async () => {
        setLoading(true)
        const clone = { ...initialValue, name: initialValue.recipient_name, customer_mobile: props.customerNumber, ifsc: initialValue.ifsc, recipient_mobile: props.customerNumber, bankAccount: initialValue.account_number, phone: props.customerNumber, bank_id: initialValue.bank_id, user_id: window.localStorage.getItem('userIdToken') }


        try {
            const res = await verificationBank(clone)
            // console.log(res);
            if (res?.data?.statusCode == '200') {
                
                props.toastSuccessMessage(res?.data?.message)
                
                // setInitialValue({
                //     ...clone, recipient_name: res?.data?.data?.bank_account_name, isVerified: true
                // })
            }
            if (res?.data?.error == false) {
                setTimeout(() => {
                    setVerifydisable(true)
                }, 1000);
                setInitialValue({
                    ...clone, recipient_name: res?.data?.data?.bank_account_name, isVerified: true
                })
                // if (props.walletShowHeader) props.walletShowHeader();
            }
            if (res?.data?.statusCode == '401') {
                props.toastSuccessMessageError(res?.data?.message)
            }
        } catch (error) {

        }
        setLoading(false)
    }


    const chargesBeneficiary = async () => {
        try {
            const res = await chargeBeneficiay()
            setCharge(res?.data?.data);
        } catch (error) {

        }
    }


    useEffect(() => {
        bankList()

    }, [])
    useEffect(() => {
        console.log(showBanak);
        // chargesBeneficiary()
        if (!initialValue.recipient_name.trim() || !initialValue.ifsc || !initialValue.account_number || !showBanak.bankID) {
            setVerifydisable(true)
        } else {
            setVerifydisable(false)
        }
    }, [initialValue, showBanak])

    useEffect(() => {
        setInitialValue({
            recipient_name: '',
            customer_mobile: '',
            // recipient_id_type: '',
            account_number: '',
            ifsc: '',
            bank_code: '',
            bank_id: '',
            recipient_mobile: ''
        })
        setShowBank({
            showBanak: ''
        })
    }, [props])

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        ADD NEW BENEFICIARY
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <h4 className="text-align-center">ADD NEW BENEFICIARY</h4> */}
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="form-group">
                                <div className="fl-wrap fl-wrap-input">
                                    <label htmlFor="BeneficiaryName" className="fl-label">Beneficiary Name <span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" className="form-control fl-input" id="BeneficiaryName" placeholder="Beneficiary Name" name="recipient_name" value={initialValue.recipient_name} onChange={changeHandleBeneficiary} />
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-lg-6">
                            <div className="form-group">
                                <div className="fl-wrap fl-wrap-input">
                                    <label htmlFor="recipient_mobile" className="fl-label">Recipient Mobile</label>
                                    <input type="number" className="form-control fl-input" id="recipient_mobile" placeholder="Beneficiary Mobile" name="recipient_mobile" value={initialValue.recipient_mobile} onChange={changeHandleBeneficiary} />
                                </div>
                            </div>
                        </div> */}
                        {/* <div className="col-lg-6 mt-3">
                            <div classname="mb-3">
                                <label htmlfor="BeneficiaryMobile" classname="form-label">Recipient Id Type <span style={{ color: 'red' }}>*</span></label>

                               


                                <select class="form-select" aria-label="Default select example" name="recipient_id_type" onChange={changeHandleBeneficiary}>
                                    <option selected>Select Recipient Id Type</option>
                                    <option value={'acc_ifsc'}>acc ifsc</option>
                                </select>
                            </div>
                        </div> */}


                        <div className="col-lg-6 mt-3">
                            <div classname="mb-3">
                                <label htmlfor="BeneficiaryMobile" classname="form-label">Bank <span style={{ color: 'red' }}>*</span></label>

                                {/* <Select

                                    options={bankData}
                                // formatGroupLabel={formatGroupLabel}

                                /> */}


                                <Select
                                    // isMulti
                                    // defaultValue={showCateg}
                                    value={showBanak}
                                    name="showBanak"
                                    options={bankData}
                                    className="games-dropdown-2 customsection"
                                    classNamePrefix="select"
                                    onChange={bankChange}
                                    placeholder="Select Bank"

                                />


                                {/* <select class="form-select" aria-label="Default select example" name="bank_id" onChange={changeHandleBeneficiary}>
                                    <option selected>Select Bank</option>
                                    {bankData && bankData?.map((item) => {
                                        return <option value={item?.bankID}>{item?.bank_name}</option>
                                    })}
                                </select> */}
                            </div>
                        </div>




                        {/* <div className="col-lg-6">
                            <div classname="mb-3">
                                <label htmlfor="BeneficiaryMobile" classname="form-label">Do You have IFSC CODE</label>
                                <div className="d-flex align-item-center">
                                    <div className="form-check me-5">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            YES
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            NO
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div> */}
                        <div className="col-lg-6">
                            <div className="form-group">
                                <div className="fl-wrap fl-wrap-input">
                                    <label htmlFor="FSCCode" className="fl-label">IFSC Code <span style={{ color: 'red' }}>*</span></label>
                                    <input type="text" className="form-control fl-input" id="FSCCode" placeholder="Enter IFSC Code" name="ifsc" value={initialValue.ifsc} onChange={changeHandleBeneficiary} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="form-group">
                                <div className="fl-wrap fl-wrap-input">
                                    <label htmlFor="AccountNumber" className="fl-label">Account Number <span style={{ color: 'red' }}>*</span></label>
                                    <input type="number" className="form-control fl-input" id="AccountNumber" placeholder="Enter Account Number" name="account_number" value={initialValue.account_number} onChange={changeHandleBeneficiary} />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                        {!props.settingState ? (
  <p style={{ color: 'green', fontWeight: '500' }}>Account Verification Charge: ₹ 0</p>
) : (
  <p style={{ color: 'green', fontWeight: '500' }}>Account Verification Charge: ₹ {props.settingState}</p>
)}

                            <div className="addBneButton">
                                <div className="form-group text-align-center">
                                    <button type="button" disabled={verifydisable} className={`btn ${verifydisable ? 'commonbotton_disable' : 'btn-info'} `}   onClick={verifideBank}>
                                        {loading ? < div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div> : ''}
                                        Account Verification
                                    </button>
                                </div>
                                <div className="form-group text-align-center">
                                    <button type="button" disabled={!initialValue.recipient_name.trim() || !showBanak?.bankID || !initialValue.ifsc || !initialValue.account_number}  className={`btn ${!initialValue.recipient_name || !showBanak?.bankID || !initialValue.ifsc || !initialValue.account_number ? 'commonbotton_disable' : 'btn-info'} `} onClick={HandleSubmitBeneficiary}>
                                        {loading1 ? < div class="spinner-border text-primary" role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div> : ''}
                                        ADD BENEFICIARY
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer> */}
            </Modal>
        </>
    )
}
export default AddNewBeneficiary
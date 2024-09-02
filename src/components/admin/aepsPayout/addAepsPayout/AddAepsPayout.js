import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Select from 'react-select'
import { aepsAdd, aepsBankList, bankListApi, cloudImage, settingBank, verificationBank } from "../../../../api/login/Login";
import { ToastContainer, toast } from "react-toastify";




function AddAepsPayout({ onSuccess }) {
    const nanigate = useNavigate()

    const [bankData, setBankData] = useState(null)
    // console.log(bankData);
    const [profileImage, setProfileImage] = useState()
    // console.log(profileImage);
    const [verifyDisable, setVerifyDisable] = useState(true);
    const [submitDisable, setSubmitDisable] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [accountError, setAccountError] = useState('');

    const [initialValue, setInitialValue] = useState({
        user_id: "",
        ifsc: "",
        bankId: "",
        name: "",
        account_number: "",
        confirm_account_number: '',
        // type: "",
        bank_proof: "",
        mobile_number: ''
    })

    const onChange = (e) => {
        const clone = { ...initialValue }
        const value = e.target.value
        const name = e.target.name
        if (name === 'mobile_number' && (isNaN(value) || value.length > 10)) {
            return;
        }
        clone[name] = value
        setInitialValue(clone)

        if (name === 'account_number' || name === 'confirm_account_number') {
            if (clone.account_number !== clone.confirm_account_number) {
                setAccountError('Account numbers do not match');
            } else {
                setAccountError('');
            }
        }
    }




    const bankList = async () => {
        try {
            const res = await bankListApi()
            const maped = res?.data?.data?.map((item) => {
                console.log(item);
                return { ...item, label: item.bank_name }
            })
            setBankData(maped)
        } catch (error) {

        }

    }

    const [showBanak, setShowBank] = useState()
    // console.log(showBanak?._id);

    const bankChange = (e) => {
        console.log(e);
        const clone = { ...initialValue }
        // if (name == 'bank_id') {
        const findIfac = bankData.find((item) => {
            console.log(item);
            return item?.bankID == e.bankID
        })
        // console.log(findIfac);
        let abc = findIfac?.ifsc_code
        let bankName = findIfac?.bank_name
        console.log(findIfac, abc);
        const clone2 = { ...clone, ifsc: abc == 'NULL' ? "" : abc, bank_name: bankName }
        // console.log({ ...initialData, account_number: abc });
        setInitialValue(clone2)
        // return
        // }
        setShowBank(e)

    }


    const imgs = new FormData();
    const [errorMessage, setErrorMessage] = useState('');
    console.log(errorMessage);
    // const [imgss, setImgss] = useState(data?.profile)
    // console.log(imgss);
    const colodinaryImage = async (e) => {
        setProfileImage(e.target.files[0])
        imgs.append("image", e.target.files[0]);
        const allowedTypes = [
            'video/mp4',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/pdf',
            'application/x-rar-compressed',
            'application/x-zip-compressed',
            'application/zip'
        ];
        // console.log(e.target.files[0].type);
        if (e.target.files[0] && allowedTypes.includes(e.target.files[0].type)) {
            // setProfileImage(e.target.files[0])
            setErrorMessage('Invalid file type. Please select a valid file.');
        } else {
            setProfileImage(e.target.files[0])
            setErrorMessage('');
            try {
                const res = await cloudImage(imgs)


                // setTimeout(() => {
                //     setImgss(res?.data?.data?.url)
                //     if (res.data.error == false) {
                //         updateProfile(res?.data?.data?.url)
                //     }
                // }, 1000);
            } catch (error) {

            }
        }

    }

    const toastSuccessMessage = (message) => {
        toast.success(`${message}`, {
            position: "top-center",
        });
    };
    const toastErrorMessage = (message) => {
        toast.error(`${message}`, {
            position: "top-center",
        });
    };

    const [settingState, setSettingState] = useState(null)
    const settingBankverify = async () => {
        try {
            const res = await settingBank()
            setSettingState(res?.data?.data?.bankVerificationCharge);
        } catch (error) {

        }
    }





    const verifideBank = async () => {


        const clone = { name: initialValue?.name, ifsc: initialValue?.ifsc, phone: initialValue?.mobile_number, bankAccount: initialValue?.account_number, user_id: window?.localStorage.getItem("userIdToken") }
        // bankId: showBanak?._id, bank_proof: profileImage?.name,

        try {
            const res = await verificationBank(clone)
            // console.log(res);

            if (res?.data?.error == false) {
                toastSuccessMessage(res?.data?.message)
                setTimeout(() => {
                    setVerifyDisable(true)
                }, 1000);
                setIsVerified(true);
                setInitialValue({
                    ...initialValue, name: res?.data?.data?.bank_account_name, isVerified: true
                })
            } else {
                toastErrorMessage(res?.message)
            }

        } catch (error) {

        }

    }



    const submitData = async () => {
        const clone = { ...initialValue, bankId: showBanak?._id, bank_proof: profileImage?.name, user_id: window?.localStorage.getItem("userIdToken") }
        try {
            const res = await aepsAdd(clone)
            console.log(res?.data);
            if (res?.error == false) {
                toastSuccessMessage(res?.message)
                resetForm()
                if (onSuccess) {
                    onSuccess(); // Call the onSuccess function passed from the parent
                }
            } else {
                toastErrorMessage(res?.message)
            }
        } catch (error) {

        }
    }

    const resetForm = () => {
        setInitialValue({
            user_id: "",
            ifsc: "",
            bankId: "",
            name: "",
            account_number: "",
            confirm_account_number: '',
            bank_proof: "",
            mobile_number: ''
        });
        setProfileImage(null);
        setShowBank(null);
        setIsVerified(false);
        setVerifyDisable(true);
        setSubmitDisable(true);
    };

    useEffect(() => {
        const { mobile_number, name, account_number, confirm_account_number, ifsc } = initialValue;
        if (mobile_number && name && account_number && confirm_account_number && ifsc && profileImage && showBanak && !accountError) {
            setVerifyDisable(false);
        } else {
            setVerifyDisable(true);
        }
    }, [initialValue, profileImage, showBanak, accountError]);
    useEffect(() => {
        if (isVerified) {
            setSubmitDisable(false);
        } else {
            setSubmitDisable(true);
        }
    }, [isVerified]);

    useEffect(() => {
        bankList()
        settingBankverify()
    }, [])
    return (
        <>
            {/* <div className="PageHeading">
                <h1>ADD BANK</h1>
            </div> */}

            <div className="ContentArea">
                <div className="card" style={{ overflow: 'auto' }}>
                    {/* <div className="card-header"><span>ADD BANK</span></div> */}
                    <div className="card-body">

                        <form id="frmregister" name="frmregister" method="post" >

                            <table border={0} className="table">
                                <tbody>
                                    <tr>
                                        <td style={{ fontSize: 14, fontWeight: 'bold', width: 325, minWidth: 200 }}>Mobile Number: <span style={{ color: 'red' }}>*</span></td>
                                        <td align="left">
                                            <input style={{ width: 350, fontWeight: 'bold' }} type="text" className="form-control" id="txtbeneName" name="mobile_number" value={initialValue?.mobile_number} placeholder="Enter Mobile Number" onChange={onChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontSize: 14, fontWeight: 'bold', width: 325, minWidth: 200 }}>A/C Holder Name: <span style={{ color: 'red' }}>*</span></td>
                                        <td align="left">
                                            <input style={{ width: 350, fontWeight: 'bold' }} type="text" className="form-control" id="txtbeneName" name="name" value={initialValue?.name} placeholder="Enter Name" onChange={onChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontSize: 14, fontWeight: 'bold', width: 325, minWidth: 200 }}>Account Number: <span style={{ color: 'red' }}>*</span></td>
                                        <td align="left">
                                            <input style={{ width: 350, fontWeight: 'bold' }} type="text" className="form-control" id="txtAccountNumber" name="account_number" value={initialValue?.account_number} placeholder="Enter Account Number" onChange={onChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontSize: 14, fontWeight: 'bold', width: 325, minWidth: 200 }}>Confirm Account Number: <span style={{ color: 'red' }}>*</span></td>
                                        <td align="left">
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <input
                                                    style={{ width: 350, fontWeight: 'bold' }}
                                                    type="text"
                                                    className="form-control"
                                                    id="txtCAccountNumber"
                                                    name="confirm_account_number"
                                                    value={initialValue?.confirm_account_number}
                                                    placeholder="Enter Confirm AccountNumber"
                                                    onChange={onChange}
                                                    onPaste={(e) => e.preventDefault()} // Prevent pasting
                                                />
                                                {accountError && <div style={{ color: 'red', marginLeft: '10px' }}>{accountError}</div>}
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontSize: 14, fontWeight: 'bold', width: 325, minWidth: 200 }}>Select bank: <span style={{ color: 'red' }}>*</span></td>
                                        <td align="left">
                                            <Select
                                                // isMulti
                                                // defaultValue={showCateg}
                                                value={showBanak}
                                                name="showBanak"
                                                options={bankData}
                                                className="games-dropdown-2 customsection customsection-set"
                                                classNamePrefix="select"
                                                onChange={bankChange}
                                                menuPlacement="auto"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontSize: 18, fontWeight: 'bold', width: 325, minWidth: 200 }}>IFSC Code : <span style={{ color: 'red' }}>*</span></td>
                                        <td align="left">
                                            <input style={{ width: 350, fontWeight: 'bold' }} type="text" className="form-control" id="txtIfsc" name="ifsc" value={initialValue?.ifsc} placeholder="Enter IFSC" onChange={onChange} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontSize: 18, fontWeight: 'bold', width: 325, minWidth: 200 }}>Bank Proof : <span style={{ color: 'red' }}>*</span></td>
                                        <td align="left">
                                            <input style={{ width: 350, fontWeight: 'bold' }} type="file" className="form-control" id="txtIfsc" name="txtIfsc" onChange={colodinaryImage} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td align="left">
                                            {/* disabled={!initialValue?.account_number || !initialValue?.confirm_account_number || !initialValue?.mobile_number || !initialValue?.ifsc || !initialValue?.name || !profileImage || !showBanak} */}

                                            <button type="button" className="btn btn-success mr-2" onClick={verifideBank} disabled={verifyDisable}>Verify</button>
                                            <button type="button" className="btn btn-primary mr-2" onClick={submitData} disabled={submitDisable}>Submit</button>
                                            <Link to="/aeps-payout-details">
                                                <input type="button" className="btn btn-dark" defaultValue="Back" id="btnBankacc" name="btnBankacc" fdprocessedid="xtslep" /></Link>
                                            <br />
                                            <br />
                                            <p><b>Note : Account Verification Charges {settingState} Rupees Will Be Debited.</b></p>
                                            <p><b>Note : You can add maximum 5 bank accounts!. </b></p>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            <input type="hidden" id="hiddashboardurl" />
                        </form>
                    </div>

                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default AddAepsPayout
import { useEffect, useState } from "react"
import { WalletsShow, addPaymentRequest, bankListApi, bankPublic, cloudImage, trasferTo } from "../../../../api/login/Login"
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function AddPaymentRequest() {
    const [loader1, setloader1] = useState(false)
    const [profileImage, setProfileImage] = useState()
    const [imageShow, setImageShow] = useState()
    const navigate = useNavigate()
    // console.log(profileImage);
    const [bankData, setBankData] = useState(null)
    // console.log(bankData);

    const [dataTrans, setDataTrans] = useState(null)

    const [retailer, setRetailer] = useState(false)
    // 65e2f15785bfd78f9866c090
    const [distributer, setDistributer] = useState(false)
    // 65e2f1a585bfd78f9866c09b
    const [superDistributer, setsuperDistributer] = useState(false)
    // 65f3fb87a6a2a92f979b47eb

    const [adminSelect, setAdminSelect] = useState(false)
    // console.log(adminSelect);
    const [distributerSelect, setDistributerSelect] = useState(false)
    const [superDistributerSelect, setsuperDistributerSelect] = useState(false)
    const [maxLength, setMaxLength] = useState(125)
    const [errorMessage, setErrorMessage] = useState("")
    const [amountError, setAmountError] = useState('');

    const [initialData, setInitialData] = useState({
        user_id: '',
        paymentDate: '',
        bankRef: '',
        amount: '',
        bank: '',
        method: '',
        account_number: '',
        receipt_img: '',
        remark: '',
        transferTo: ''
        // image: '',
        // remark: ''
    })

    console.log(initialData);

    const { paymentDate, bankRef, amount, bank, method } = initialData

    const handleChange = (e) => {
        const clone = { ...initialData }
        const value = e.target.value
        const name = e.target.name
    
        if (name === 'remark' && value.length > maxLength) {
            setErrorMessage(`Cannot type more than ${maxLength} characters`)
            return
        } else {
            setErrorMessage("")
        }
    
        if (name === 'amount') {
            if (parseFloat(value) < 100) {
                setAmountError('Amount must be at least 100');
            } else {
                setAmountError('');
            }
        }
    
        clone[name] = value
    
        if (name === 'bank') {
            const findBankAccount = bankData.find((item) => item?.bank_name === value)
            const abc = findBankAccount?.bank_account_number
            const clone2 = { ...clone, account_number: abc }
            setInitialData(clone2)
            return
        }
        setInitialData(clone)
    }

    const getCurrentDate = () => {
        const clone = { ...initialData, paymentDate: new Date().toISOString().substr(0, 10) }
        setInitialData(clone)
    }



    const [userSelect, setUserselect] = useState({
        transferTo: ''
    })
    // console.log(userSelect.transferTo);

    const userSelectChange = (e) => {
        const clone = { ...userSelect }
        const value = e.target.value
        const name = e.target.name
        clone[name] = value
        setUserselect(clone)

        if (e.target.value == 'Admin') {
            setAdminSelect(true)
            setDistributerSelect(false)
            setsuperDistributerSelect(false)
        }
        if (e.target.value == 'distri') {
            setDistributerSelect(true)
            setAdminSelect(false)
            setsuperDistributerSelect(false)
        }
        if (e.target.value == 'Super_dis') {
            setsuperDistributerSelect(true)
            setDistributerSelect(false)
            setAdminSelect(false)
        }
    }

    const dataTarasferTo = async () => {
        try {
            const res = await trasferTo()
            setDataTrans(res?.data?.data);
        } catch (error) {

        }
    }



    const imgs = new FormData();
    const colodinaryImage = async (e) => {
        setProfileImage(e.target.files[0])
        imgs.append("image", e.target.files[0]);
        const file = e.target.files[0];
    
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/gif'
        ];
    
        if (!allowedTypes.includes(file.type)) {
            alert('Warning: Only image files are allowed.');
            return;
        }
    
        try {
            // Add a 1-second delay before making the API call
            await new Promise(resolve => setTimeout(resolve, 1000));
    
            const res = await cloudImage(imgs)
            setImageShow(res?.data?.data?.url);
            setProfileImage(res?.data?.data?.url)
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Error uploading image. Please try again.");
        }
    }

    const getFileExtension = (filename) => {
        console.log(filename);
        return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
    };


    const toastSuccessMessage = (str) => {
        toast.success(`${str}`, {
            position: "top-center"
        })
    };

    const bankListName = async () => {
        try {
            const res = await bankPublic()
            // console.log(res);
            setBankData(res?.data?.data);
        } catch (error) {

        }
    }



    const bankAcountFind = (name) => {

    }


    const checkUser = async () => {
        try {
            const res = await WalletsShow()
            // console.log(res.data.data.user_type_id);
            if (res.data.data.user_type_id == '65e2f15785bfd78f9866c090') {
                setRetailer(true)
            }
            if (res.data.data.user_type_id == '65e2f1a585bfd78f9866c09b') {
                setDistributer(true)
            }
            if (res.data.data.user_type_id == '65f3fb87a6a2a92f979b47eb') {
                setsuperDistributer(true)
            }
        } catch (error) {

        }
    }




    const submitData = async () => {
        setloader1(true)
        const clone = { ...initialData, receipt_img: profileImage, transferTo: userSelect.transferTo, user_id: window.localStorage.getItem('userIdToken') ,remark: initialData.remark }
        try {
            const res = await addPaymentRequest(clone)
            if (res?.data?.statusCode == '200') {
                toastSuccessMessage(res?.data?.message)
                setTimeout(() => {
                    if (adminSelect) {
                        navigate('/payment-request-to-company')

                    } else {
                        navigate('/payment-request-to-distributor')
                    }
                }, 1000)
            }

            // if (clone.transferTo == 'admin') {
            //     navigate('/payment-request-to-company')
            // }
            setloader1(false)
        } catch (error) {
            setloader1(false)
        }
    }

    useEffect(() => {
        bankListName()
        checkUser()
        dataTarasferTo()
        getCurrentDate()
    }, [])

 

    return (
        <>
            <div className="PageHeading"><h1>ADD Payment Request</h1></div>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>ADD Payment Request</span></div>
                    <div className="card-body">
                        <form action="" method="post" name="frmReport" id="frmReport">
                            <div className="form-row" style={{ alignItems: 'end' }}>
                                <div className="form-group col-md-3">
                                    <label htmlFor="ddldb">Select Transfer To</label>
                                    <select className="form-select" aria-label="Default select example" name="transferTo" onChange={userSelectChange}>
                                        <option selected>Select Transfer</option>
                                        {dataTrans && dataTrans?.map((item) => {
                                            return <option value={item?.value}>{item?.title}</option>
                                        })}
                                        {/* {
                                            retailer ? <>
                                                <option value={"admin"}>Admin</option>
                                                <option value={"distributor"}>Distributor</option>
                                                <option value={"super_distributor"}>Super Distributor</option>
                                            </> : ''
                                        }
                                        {
                                            distributer ? <>
                                                <option value={"admin"}>Admin</option>
                                                <option value={"super_distributor"}>Super Distributor</option>
                                            </> : ''
                                        }
                                        {
                                            superDistributer ? <>
                                                <option value={"admin"}>Admin</option>
                                            </> : ''
                                        } */}
                                    </select>
                                </div>

                                {adminSelect ? <>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="txtUserId">Payment Date : <span style={{ color: 'red' }}>*</span></label>
                                        <input className="form-control datefield" id="txtFrom" type="date" placeholder="Enter Amount" name="paymentDate" value={initialData.paymentDate} onChange={handleChange} />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="ddldb">Select Method : <span style={{ color: 'red' }}>*</span></label>
                                        <select className="form-select" aria-label="Default select example" name="method" onChange={handleChange}>
                                            <option selected>Select Method</option>
                                            <option value={"neft"}>NEFT</option>
                                            <option value={"rtgs"}>RTGS</option>
                                            <option value={"imps"}>IMPS</option>
                                            <option value={"qrpayment"}>QR Payment</option>
                                            <option value={"upipayment"}>UPI Payment</option>
                                            <option value={"cashdeposit"}>Cash Deposit</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="txtUserId">Bank Name : <span style={{ color: 'red' }}>*</span></label>
                                        <select className="form-select" aria-label="Default select example" name="bank" onChange={handleChange}>
                                            <option selected>Select Bank</option>
                                            {bankData && bankData.map((item) => {
                                                return <option value={item?.bank_name}>{item?.bank_name}</option>
                                            })}
                                            {/* <option value={"neft"}>NEFT</option>
                                        <option value={"rtgs"}>RTGS</option> */}
                                        </select>
                                    </div>

                                    <div className="form-group col-md-3">
                                        <label htmlFor="txtUserId">Account Number : <span style={{ color: 'red' }}>*</span></label>
                                        <input className="form-control datefield" id="txtFrom" type="number" placeholder="Enter Account Number" name="account_number" value={initialData?.account_number} onChange={handleChange} />
                                    </div>
                                    <div className="form-group col-md-3">
    <label htmlFor="txtUserId">Amount : <span style={{ color: 'red' }}>*</span></label>
    <input 
        className="form-control datefield" 
        id="txtFrom" 
        type="number" 
        placeholder="Enter Amount (min 100)" 
        name="amount" 
        value={initialData.amount} 
        onChange={handleChange} 
    />
 
</div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="txtUserId">Bank
                                            Reference No : <span style={{ color: 'red' }}>*</span></label>
                                        <input className="form-control datefield" id="txtFrom" type="text" placeholder="Enter Bank Ref No" name="bankRef" value={initialData.bankRef} onChange={handleChange} />
                                    </div>
                                    <div className="form-group col-md-3">
                                        <label htmlFor="txtUserId">Image : <span style={{ color: 'red' }}>*</span></label>
                                        <input className="form-control datefield" id="txtFrom" name="receipt_img" type="file" onChange={colodinaryImage} />
                                    </div>
                                    <div className="form-group col-md-3">
                                            <label htmlFor="txtUserId">Remark :</label>
                                            <textarea className="form-control" id="txtFrom" placeholder="Remark" name="remark" value={initialData.remark} onChange={handleChange} />
                                          
                                        </div>
                                    <div className="form-group col-md-3">
                                        {imageShow && <img src={`https://api.paypandabnk.com/api/cloudinary/${imageShow}`} style={{ height: '50px', width: '100px' }} alt="image" />}
                                    </div>

                                </> : ""}

                                {distributerSelect ? <>
                                    <div className="form-group col-md-3">
    <label htmlFor="txtUserId">Amount : <span style={{ color: 'red' }}>*</span></label>
    <input 
        className="form-control datefield" 
        id="txtFrom" 
        type="number" 
        placeholder="Enter Amount (min 100)" 
        name="amount" 
        value={initialData.amount} 
        onChange={handleChange} 
    />
    
</div>
                                    <div className="form-group col-md-3">
                                            <label htmlFor="txtUserId">Remark :</label>
                                            <textarea className="form-control" id="txtFrom" placeholder="Remark" name="remark" value={initialData.remark} onChange={handleChange} />
                                            
                                        </div>
                                </> : ''}

                                {superDistributerSelect ? <>
                                    <div className="form-group col-md-3">
    <label htmlFor="txtUserId">Amount : <span style={{ color: 'red' }}>*</span></label>
    <input 
        className="form-control datefield" 
        id="txtFrom" 
        type="number" 
        placeholder="Enter Amount (min 100)" 
        name="amount" 
        value={initialData.amount} 
        onChange={handleChange} 
    />

</div>
                                    <div className="form-group col-md-3">
                                            <label htmlFor="txtUserId">Remark :</label>
                                            <textarea className="form-control" id="txtFrom" placeholder="Remark" name="remark" value={initialData.remark} onChange={handleChange} />
                                           
                                        </div>
                                </> : ''}

                               
                               
                                <div className="form-group col-md-12 text-align-center">
                                    <label>&nbsp;</label>
                                    <button 
  type="button" 
  disabled={
    !userSelect.transferTo || 
    (adminSelect && (!initialData.remark || !initialData.paymentDate || !initialData.method || !initialData.bank || !initialData.account_number || !initialData.amount || !initialData.bankRef || !imageShow)) ||
    (distributerSelect && (!initialData.remark || !initialData.amount)) ||
    (superDistributerSelect && (!initialData.remark || !initialData.amount)|| parseFloat(initialData.amount) < 100)
  } 
  className={`btn ${
    !userSelect.transferTo || 
    (adminSelect && (!initialData.remark || !initialData.paymentDate || !initialData.method || !initialData.bank || !initialData.account_number || !initialData.amount || !initialData.bankRef || !imageShow)) ||
    (distributerSelect && (!initialData.remark || !initialData.amount)) ||
    (superDistributerSelect && (!initialData.remark || !initialData.amount) || parseFloat(initialData.amount) < 100)
      ? 'commonbotton_disable'
      : 'btn-primary'
  }`}
  onClick={submitData}
>
  Submit
  {loader1 && (
    <div style={{ height: "16px", width: "16px" }} className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  )}
</button>
{amountError && <div className="error-message">{amountError}</div>}
                                </div>

                              <div className="row d-flex justify-content-center">  {errorMessage && <span  style={{ color: 'red' }}>{errorMessage}</span>} </div>

                            </div>
                        </form>
                    </div>

                </div>
                <ToastContainer />
            </div>
        </>
    )
}
export default AddPaymentRequest
// in this code here is a issuw whenwe delete any benificary from beficiery list  then on click any oter beneificaryu for payment and enter tpin nothing happen  when we refresh than paymet happen why=>
//     code=>
//         function CustomerApi({ walletShowHeader, data, beneficiaryData, customerNumber, deleteRecipt, toastSuccessMessage, confirm, cancel, updateRecipetList, settingState, initialCustomer, toastSuccessMessageError, SubmitCustomer,customerinformation }) {
//             console.log(customerNumber);
//             const [modalShow, setModalShow] = useState(false);
//             const [modalShowBeneficiary, setModalShowBeneficiary] = useState(false);
        
//             const [sendMoneyData, setMoneyData] = useState(null)
        
//             const sendMoneyDelete = (id, item) => {
//                 console.log(id, item);
//                 // if (id) {
//                 //     setModalShow(true)
//                 //     setMoneyData(item)
//                 // }
//                 setModalShow(true)
//                 setMoneyData(item)
//             }
        
        
        
        
        
//             return (
//                 <>
//                     <div className="ContentArea ContentAreaa">
//                         <div className="card">
//                             <div className="card-body">
//                                 <div className="row">
        
//                                     <div className="col-lg-6">
//                                         <div className="customerApi">
//                                             <div className="customer-area">
//                                                 <span className="customerName">Customer Name :</span> <span className="cusName">{data?.name}</span>
//                                             </div>
//                                             <div className="account-area">
//                                                 <span className="accountStatus">Account Status :</span> <span className="cusName">{data?.state_desc}</span>
//                                             </div>
//                                             <div className="avialble-area">
//                                                 <span className="Avilavel-limit">Available Limit :</span> <span className="cusName">{data?.available_limit}</span>
//                                             </div>
//                                         </div>
//                                     </div>
        
//                                     <div className="col-lg-6">
//                                         <div className="Beneficiary-List">
//                                             <div className="BeneficiaryHead">
//                                                 <h6>Beneficiary List</h6>
//                                                 <p style={{ fontSize: '20px', fontWeight: '500', cursor: 'pointer' }} onClick={updateRecipetList}><LuRefreshCw /></p>
//                                                 <button type="button" className="btn btn-success" onClick={() => setModalShowBeneficiary(true)}>Add New Beneficiary</button>
//                                             </div>
        
//                                             {beneficiaryData && beneficiaryData?.map((item) => {
//                                                 // console.log(item);
        
//                                                 return <div className="banck-sec">
//                                                     <div className="back-details">
//                                                         <div className="bank-icon">
//                                                             <CiBank />
//                                                         </div>
//                                                         <div className="banckCustomer" onClick={() => sendMoneyDelete(item?.recipient_id, item)}>
//                                                             <div className="banckCustomerName">
//                                                                 {item?.recipient_name}
//                                                             </div>
//                                                             <div className="banckName">
//                                                                 {item?.bank}
//                                                             </div>
//                                                             <div className="banckId">
//                                                                 {item?.ifsc}
//                                                             </div>
//                                                             <div className="banckId">
//                                                                 {item?.account}
//                                                             </div>
//                                                         </div>
//                                                         <div className="banckCustomer-delete">
//                                                             {item?.isVerified == true ? <p style={{ color: 'green' }}>Verified <MdVerified style={{ fontSize: '22px' }} /></p> : <>
//                                                                 <p style={{ color: 'red', marginBottom: "7px" }}>UnVerified <IoIosCloseCircleOutline style={{ fontSize: '22px' }} /></p>
//                                                             </>}
        
//                                                             <Popconfirm
//                                                                 title="Delete"
//                                                                 className={`deletbtnIco ${item?.isVerified && 'deletbtnIco1'}`}
//                                                                 description="Are you sure to delete ?"
//                                                                 onConfirm={() => confirm(item?.recipient_id)}
//                                                                 onCancel={cancel}
//                                                                 okText="Yes"
        
//                                                                 cancelText="No"
//                                                             >
//                                                                 Delete
//                                                             </Popconfirm>
        
//                                                         </div>
//                                                     </div>
//                                                 </div>
        
//                                             })}
        
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <UserTransfer
//                         show={modalShow}
//                         onHide={() => setModalShow(false)}
//                         sendMoneyData={sendMoneyData}
//                         customerNumber={customerNumber}
//                         toastSuccessMessage={toastSuccessMessage}
//                         initialCustomer={initialCustomer}
//                         toastSuccessMessageError={toastSuccessMessageError}
//                         updateRecipetList={updateRecipetList}
//                         SubmitCustomer={SubmitCustomer}
//                         setModalShow={setModalShow}
//                         walletShowHeader={walletShowHeader}
//                         maxamount={data?.available_limit}
//                         customerinformation={customerinformation} 
//                     />



//                     Tin modal=>import { Popconfirm } from "antd";
// import { useEffect, useRef, useState } from "react"
// import { Button, Modal } from "react-bootstrap"
// import { FaRupeeSign } from "react-icons/fa";
// import { MdEdit } from "react-icons/md";

// function TifinPopup(props) {
//     const [pinInputDis, setpinInputDis] = useState(true)
//     const [amountError, setAmountError] = useState('');
//     const length = 4
//     const [otp, setOtp] = useState(new Array(length).fill(''));

//     const inputs = useRef([]);

//     const inputEnable = () => {
//         setpinInputDis(false)
//     }

//     const handleAmountChange = (e) => {
//         const value = e.target.value;
//         const amount = parseFloat(value);
        
//         if (isNaN(amount) || amount < 100) {
//             setAmountError('Minimum amount is 100');
//         } else if (amount > props.maxamount) {
//             setAmountError(`Maximum amount is ${props.maxamount}`);
//         } else {
//             setAmountError('');
//         }

//         props.handleAmount(e);
//     }

//     const otpChandleChange = (index, value) => {
//         if (value.length == 2) {
//             return
//         }
//         const newOtp = [...otp];
//         newOtp[index] = value;
//         setOtp(newOtp);

//         if (value && inputs.current[index + 1]) {
//             inputs.current[index + 1].focus();
//         }
//     };

//     const handleKeyDown = (index, e) => {
//         if (e.key === 'Backspace' && !otp[index] && inputs.current[index - 1]) {
//             inputs.current[index - 1].focus();
//         }
//     };

//     const confirm = (e) => {
//         props.sendMoney(otp.join(''));
//         resetOtp();
//     };

//     const cancel = (e) => {
//         // Handle cancel if needed
//     };

//     const resetOtp = () => {
//         setOtp(new Array(4).fill(''));
//     };

//     const closeButtonLastModal = () => {
//         const clone = { ...props?.initialMoney, amount: '' }
//         props?.setInitialMoney(clone)
//         setOtp(new Array(4).fill(''));
//         props.onHide()
//     }

//     const isOtpComplete = otp.every(value => value.length === 1);

//     return (
//         <Modal
//             {...props}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//             className="modal-set"
//         >
//             <Modal.Body>
//                 <div className="send-money-deatils">
//                     <div className="send-money-name">
//                         <h2>Name: </h2>
//                         <p>{props?.verifyData?.bank_account_name ? props?.verifyData?.bank_account_name : props?.sendMoneyData?.recipient_name}</p>
//                     </div>
//                     {props?.sendMoneyData?.recipient_mobile == undefined ? ' ' : <>
//                         <div className="send-money-Mobile">
//                             <h2>Mobile : </h2>
//                             <p>{props?.sendMoneyData?.recipient_mobile}</p>
//                         </div>
//                     </>}
//                     <div className="send-money-accNum">
//                         <h2>IFSC Code : </h2>
//                         <p>{props?.sendMoneyData?.ifsc}</p>
//                     </div>
//                     <div className="send-money-accNum">
//                         <h2>Account Number : </h2>
//                         <p>{props?.sendMoneyData?.account}</p>
//                     </div>
//                     <div className="send-money-bnkName">
//                         <h2>Bank Name : </h2>
//                         <p>{props?.sendMoneyData?.bank}</p>
//                     </div>
//                 </div>

//                 <div className="input-group input-group-input mb-3 mt-3">
//                     <span className="input-group-text" id="basic-addon1"><FaRupeeSign /></span>
//                     <input 
//                         type="number" 
//                         className={`form-control ${amountError ? 'is-invalid' : ''}`}
//                         placeholder={`Enter Amount (Min: 100, Max: ${props.maxamount})`}
//                         disabled={pinInputDis} 
//                         name="amount" 
//                         value={props?.initialMoney?.amount} 
//                         onChange={handleAmountChange}  
//                     />
//                     <MdEdit className="edit-co" onClick={inputEnable} />
//                 </div>
//                 {amountError && <div className="invalid-feedback d-block mb-3">{amountError}</div>}

//                 <div className="form-group form-group-cus text-align-center col-lg-12 m-0">
//                     <label htmlFor="txtCnfPassword" className="mb-3">Enter TPIN <span style={{ color: 'red' }}>*</span></label>
//                     <div className="otp-container">
//                         {otp.map((value, index) => (
//                             <input
//                                 key={index}
//                                 type="password"
//                                 pattern="\d*"
//                                 maxLength="1"
//                                 value={value}
//                                 onChange={(e) => otpChandleChange(index, e.target.value)}
//                                 onKeyDown={(e) => handleKeyDown(index, e)}
//                                 ref={(input) => (inputs.current[index] = input)}
//                                 className="otp-input2"
//                             />
//                         ))}
//                     </div>
//                     <Popconfirm
//                         title="Send"
//                         description="Are you sure to Send ?"
//                         onConfirm={confirm}
//                         onCancel={cancel}
//                         okText="Yes"
//                         cancelText="No"
//                     >
//                         <button 
//                             type="button" 
//                             disabled={!isOtpComplete || amountError || !props?.initialMoney?.amount} 
//                             className={`btn ${!isOtpComplete || amountError || !props?.initialMoney?.amount ? 'commonbotton_disable' : 'btn-success'} mt-2 mb-2`}
//                         >
//                             PAY
//                             {props?.loading3 ? <div className="spinner-border text-primary" role="status">
//                                 <span className="visually-hidden">Loading...</span>
//                             </div> : ''}
//                         </button>
//                     </Popconfirm>

//                     <Button onClick={closeButtonLastModal}>Close</Button>
//                 </div>
//             </Modal.Body>
//         </Modal>
//     )
// }

// export default TifinPopup</>






// <th className="sorting">Transaction Dispute</th>

// <td valign="top" className="dataTables_empty">
//                                                     <Link className="btn btn-primary" to={`/add-ticket/${item?._id}`} state={{ item, serviceId: '65f9484a26eb74e182c640fc' }}>Dispute</Link>
//                                                 </td>
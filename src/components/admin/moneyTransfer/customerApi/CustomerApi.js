
import { CiBank } from "react-icons/ci";
import UserTransfer from "../userTransfer/UserTransfer";
import { Link } from "react-router-dom";
import { useState } from "react";
import AddNewBeneficiary from "../addNewBeneficiary/AddNewBeneficiary";
import { MdDelete } from "react-icons/md";
import { Button, message, Popconfirm } from 'antd';
import { MdVerified } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LuRefreshCw } from "react-icons/lu";
function CustomerApi({ walletShowHeader, data, beneficiaryData, customerNumber, deleteRecipt, toastSuccessMessage, confirm, cancel, updateRecipetList, settingState, initialCustomer, toastSuccessMessageError, SubmitCustomer,customerinformation }) {
    console.log(customerNumber);
    console.log("customerinformation",customerinformation)
    const [modalShow, setModalShow] = useState(false);
    const [modalShowBeneficiary, setModalShowBeneficiary] = useState(false);

    const [sendMoneyData, setMoneyData] = useState(null)

    const sendMoneyDelete = (id, item) => {
        console.log(id, item);
        // if (id) {
        //     setModalShow(true)
        //     setMoneyData(item)
        // }
        setModalShow(true)
        setMoneyData(item)
    }





    return (
        <>
            <div className="ContentArea ContentAreaa">
                <div className="card">
                    <div className="card-body">
                        <div className="row">

                            <div className="col-lg-6">
                                <div className="customerApi">
                                    <div className="customer-area">
                                        <span className="customerName">Customer Name :</span> <span className="cusName">{data?.name}</span>
                                    </div>
                                    <div className="account-area">
                                        <span className="accountStatus">Account Status :</span> <span className="cusName">{data?.state_desc}</span>
                                    </div>
                                    <div className="avialble-area">
                                        <span className="Avilavel-limit">Available Limit :</span> <span className="cusName">{data?.available_limit}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                            <div className="Beneficiary-List">
    <div className="BeneficiaryHead">
        <h6>Beneficiary List</h6>
        <p style={{ fontSize: '20px', fontWeight: '500', cursor: 'pointer' }} onClick={updateRecipetList}><LuRefreshCw /></p>
        <button type="button" className="btn btn-success" onClick={() => setModalShowBeneficiary(true)}>Add New Beneficiary</button>
    </div>

    {Array.isArray(beneficiaryData) && beneficiaryData.map((item) => {
        return (
            <div className="banck-sec" key={item.recipient_id}>
                <div className="back-details">
                    <div className="bank-icon">
                        <CiBank />
                    </div>
                    <div className="banckCustomer" onClick={() => sendMoneyDelete(item.recipient_id, item)}>
                        <div className="banckCustomerName">{item.recipient_name}</div>
                        <div className="banckName">{item.bank}</div>
                        <div className="banckId">{item.ifsc}</div>
                        <div className="banckId">{item.account}</div>
                    </div>
                    <div className="banckCustomer-delete">
                        {item.isVerified ? (
                            <p style={{ color: 'green' }}>Verified <MdVerified style={{ fontSize: '22px' }} /></p>
                        ) : (
                            <p style={{ color: 'red', marginBottom: "7px" }}>UnVerified <IoIosCloseCircleOutline style={{ fontSize: '22px' }} /></p>
                        )}
                        <Popconfirm
                            title="Delete"
                            className={`deletbtnIco ${item.isVerified && 'deletbtnIco1'}`}
                            description="Are you sure to delete?"
                            onConfirm={() => confirm(item.recipient_id)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            Delete
                        </Popconfirm>
                    </div>
                </div>
            </div>
        );
    })}
</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UserTransfer
                show={modalShow}
                onHide={() => setModalShow(false)}
                sendMoneyData={sendMoneyData}
                customerNumber={customerNumber}
                toastSuccessMessage={toastSuccessMessage}
                initialCustomer={initialCustomer}
                toastSuccessMessageError={toastSuccessMessageError}
                updateRecipetList={updateRecipetList}
                SubmitCustomer={SubmitCustomer}
                setModalShow={setModalShow}
                walletShowHeader={walletShowHeader}
                maxamount={data?.available_limit}
                customerinformation={customerinformation} 
            />
            <AddNewBeneficiary
                show={modalShowBeneficiary}
                onHide={() => setModalShowBeneficiary(false)}
                toastSuccessMessage={toastSuccessMessage}
                customerNumber={customerNumber}
                updateRecipetList={updateRecipetList}
                settingState={settingState}
                initialCustomer={initialCustomer}
                toastSuccessMessageError={toastSuccessMessageError}
                walletShowHeader={walletShowHeader}
            />
        </>
    )
}
export default CustomerApi
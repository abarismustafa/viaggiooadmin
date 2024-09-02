import { Link } from "react-router-dom"
import Loader from "../../../common/loader/Loader"
import { useEffect, useState } from "react";
import { bankListApi, payoutAccountEnquiry, payoutBankDelete, payoutBenefiaries, userValidate } from "../../../api/login/Login";
import { MdDelete } from "react-icons/md";
import AepsPinModal from "./aepsPinModal/AepsPinModal";
import { ToastContainer, toast } from "react-toastify";
import { Popconfirm } from 'antd';
import { Modal, Button } from 'react-bootstrap';
import AepsPinModalNew from "./aepsPinModal/AepsPinModalNew";
import AddAepsPayout from "./addAepsPayout/AddAepsPayout";
import "./AepsPayout.css"

function AepsPayout() {
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [data, setData] = useState(null)
    // console.log(data);
    const [walletData, setWalletData] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null);
    const [amountError, setAmountError] = useState('');
    const [showAddPayoutModal, setShowAddPayoutModal] = useState(false);
    console.log(selectedItem);

    const [initialValue, setInitialValue] = useState({
        user_id: '',
        amount: '',
        transId: '',
        paymentMode: 'NE',
        tpin: '',
        bank_name: '',
        account_holder_name: '',
        ifsc_code: '',
        mobile_number: '',
        account_number: ''
    })
    const handlePayButtonClick = (item) => {
        setSelectedItem(item);
        setInitialValue({
            ...initialValue,
            bank_name: item.bank_name,
            account_holder_name: item.bank_account_name,
            ifsc_code: item.bank_ifsc,
            mobile_number: item.mobile_number,
            account_number: item.bank_account_number
        });
        setShowForm(true);
    }

    // console.log(initialValue);
    const validateAmount = (value) => {
        const numValue = Number(value);
        if (isNaN(numValue) || numValue < 100 || numValue > 100000) {
            setAmountError('Amount must be between 100 and 100,000');
        } else {
            setAmountError('');
        }
    }

    const handleChangeSet = (e) => {
        const clone = { ...initialValue }
        const value = e.target.value
        const name = e.target.name
        clone[name] = value
        setInitialValue(clone)
    
        if (name === 'amount') {
            validateAmount(value);
        }
    }

    const aepsPayoutList = async () => {
        setLoading(true)
        try {
            const res = await payoutBenefiaries()
            setData(res?.data?.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
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
const handleopenForm=()=>{
    setShowForm(true);
}
const handleCloseForm=()=>{
    setShowForm(false);
    setInitialValue('');
}
    const enquiryStatus = async (id) => {
        try {
            const res = await payoutAccountEnquiry(id)
            // console.log(res?.data);
            if (res?.data?.error == false) {
                toastSuccessMessage(res?.data?.message)
                aepsPayoutList()
            } else {
                toastErrorMessage(res?.data?.message)
            }
        } catch (error) {

        }
    }

    const deletePayoutDelete = async (id) => {
        try {
            const res = await payoutBankDelete(id)
            if (res?.data?.error == false) {
                toastSuccessMessage(res?.data?.data?.message)
                aepsPayoutList()
            } else {
                toastErrorMessage(res?.data?.data?.message)
            }
        } catch (error) {

        }
    }
    const confirm = (id) => {
        console.log(id);
        deletePayoutDelete(id)
    }

    const changeRadioObject = (e, item) => {
        setSelectedItem(item);
    }

    useEffect(() => {
        if (data && data.length > 0) {
            setSelectedItem(data[0]); // Select the first item by default
        }
    }, [data]);

    const aepsWallet = async () => {
        try {
            const res = await userValidate()
            setWalletData(res?.data)
        } catch (error) {

        }
    }

    const handleChangeChanel = (str) => {
        const clone = { ...initialValue, paymentMode: str }
        setInitialValue(clone);
    }

    const handleSumitPayemt = () => {
        const clone = { ...initialValue }
        // console.log(clone);
    }

    useEffect(() => {
        aepsPayoutList()
        aepsWallet()
    }, [])

    return (
        <>
            {loading && <Loader />}
            <div className="PageHeading">
                <h1>AEPS Payout Details</h1>
            </div>

            <div className="ContentArea">
                <div className="card">
                    <div className="card-header">AEPS Payout Details<span style={{ color: 'red' }}> <Button onClick={() => setShowAddPayoutModal(true)} class="btn btn-success">Add Payout Account</Button> </span></div>
                    <div className="card-body">
                        <div id="myTable_wrapper" className="dataTables_wrapper no-footer">

                            <div id="myTable_processing" className="dataTables_processing" style={{ display: 'none' }}>Processing...</div>
                            <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed" role="grid" aria-describedby="myTable_info" >
                                <thead>
                                    <tr role="row">
                                        <th className="sorting" >Select</th>
                                        <th className="sorting">
                                            Asix Benefiary ID
                                        </th>
                                        <th className="sorting">
                                            Account Holder Name
                                        </th>
                                        <th className="sorting">
                                            Mobile No
                                        </th>
                                        <th className="sorting" >
                                            Account No
                                        </th>
                                        <th className="sorting" >Bank</th>
                                        <th className="sorting" >IFSC Code</th>
                                        <th className="sorting" >Current Status</th>
                                        {/* <th className="sorting" >Is Primary</th> */}
                                        <th className="sorting" >Action</th>
                                        <th className="sorting">Settle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data?.map((item, index) => {
                                        return <tr key={item?._id} className={item === selectedItem ? 'selected-row' : ''}>
                                            <td valign="top" className={item === selectedItem ? 'selected-row' : ''}>
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="flexRadioDefault"
                                                        checked={item === selectedItem}
                                                        onChange={(e) => changeRadioObject(e, item)}
                                                    />
                                                    {/* <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                        Default radio
                                                    </label> */}
                                                </div>
                                            </td>
                                            <td valign="top" >{item?.Axis_bene_id}</td>
                                            <td valign="top" >{item?.bank_account_name}</td>
                                            <td valign="top" >{item?.mobile_number}</td>
                                            <td valign="top" >{item?.bank_account_number}</td>
                                            <td valign="top" >{item?.bank_name}</td>
                                            <td valign="top" >{item?.bank_ifsc}</td>
                                            {item?.status == 1 ? < td valign="top" ><button type="button" class="btn btn-warning" onClick={() => enquiryStatus(item?._id)}>Pending</button></td> : ''}
                                            {item?.status == 2 ? < td valign="top" ><button type="button" class="btn btn-success" onClick={() => enquiryStatus(item?._id)}>Approved</button></td> : ''}
                                            {item?.status == 3 ? < td valign="top" ><button type="button" class="btn btn-danger" onClick={() => enquiryStatus(item?._id)}>Failed</button></td> : ''}
                                            {/* <td valign="top" className="dataTables_empty">{item?.isPrimary == false ? 'No' : 'Yes'}</td> */}

                                            <td valign="top" >
                                                <div className="delete-icon">
                                                    <Popconfirm
                                                        title="Delete"
                                                        description="Are you sure to delete ?"
                                                        okText="Yes"
                                                        cancelText="No"
                                                        onConfirm={() => confirm(item?._id)}
                                                    >
                                                        <MdDelete />
                                                    </Popconfirm>
                                                    {/* <Popconfirm
                                                        title="Delete"
                                                        className={`deletbtnIco ${item?.isVerified && 'deletbtnIco1'}`}
                                                        description="Are you sure to delete ?"
                                                        onConfirm={() => confirm(item?.recipient_id)}
                                                        onCancel={cancel}
                                                        okText="Yes"

                                                        cancelText="No"
                                                    >

                                                    </Popconfirm> */}

                                                </div>
                                            </td>
                                            <td valign="top">
                                            <button 
  type="button" 

  onClick={() => handlePayButtonClick(item)} 
  className={`btn btn-primary ${item?.status !== 2 ? 'disabled' : ''}`} 
>
Settle
</button>

                                            </td>
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>
                        <Modal show={showForm} onHide={handleCloseForm} size="lg" tyle={{
            zIndex: 1050,
           
          }} >
      <Modal.Header closeButton>
        <Modal.Title>Settled Details</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{
    backgroundColor: '#ffffff',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
  }}>
                        <form action="" method="post" name="frmReport" id="frmReport">
                            <input type="hidden" id="hidID" name="hidID" />
                            <div className="form-row" style={{ alignItems: 'end' }}>
                                {/* <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Min Amount</label>
                                    <input type="number" name="min_amt" id="account_no" className="form-control" value={filterInitial.min_amt} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Max Amount</label>

                                    <input type="number" name="max_amt" id="account_no" className="form-control" value={filterInitial.max_amt} onChange={handleChange} />
                                </div> */}

                                <div className="form-group col-sm-12 col-md-4">
                                    <label htmlFor="txtUserId">AEPS Blance <span style={{ color: 'red' }}>*</span></label>
                                    <input type="number" disabled name="start_date" value={walletData?.aeps_wallet} id="account_no" className="form-control" />
                                </div>
                              
                                <div className="form-group col-sm-12 col-md-4">
                                    <label htmlFor="txtUserId">Amount to be Settled <span style={{ color: 'red' }}>*</span></label>
                                    <input type="number" placeholder="Enter 100 - 1,00,000" name="amount" value={initialValue?.amount} id="account_no"  className={`form-control ${amountError ? 'is-invalid' : ''}`}  onChange={handleChangeSet} />
                                    
                                </div>
                                <div className="form-group col-sm-12 col-md-4">
                                    <label htmlFor="txtUserId">Payment Mode <span style={{ color: 'red' }}>*</span></label>
                                    <div className="set-head-mate" style={{justifyContent:'flex-start'}}>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="channel" defaultChecked id="NEFT" onChange={(e) => handleChangeChanel('NE')} />
                                            <label className="form-check-label" htmlFor="NEFT">
                                                NEFT
                                            </label>
                                        </div>
                                        <div className="form-check mr-3 ml-2">
                                            <input className="form-check-input" type="radio" name="channel" id="IMPS" onChange={(e) => handleChangeChanel('PA')} />
                                            <label className="form-check-label" htmlFor="IMPS">
                                                IMPS
                                            </label>
                                        </div>
                                        {/* <div className="form-check mr-3">
                                            <input className="form-check-input" type="radio" name="channel" id="RTGS" onChange={(e) => handleChangeChanel('RT')} />
                                            <label className="form-check-label" htmlFor="RTGS">
                                                RTGS
                                            </label>
                                        </div>
                                        <div className="form-check mr-3">
                                            <input className="form-check-input" type="radio" name="channel" id="FundTransfer" onChange={(e) => handleChangeChanel('FT')} />
                                            <label className="form-check-label" htmlFor="FundTransfer">
                                                Fund Transfer
                                            </label>
                                        </div>
                                        <div className="form-check mr-3">
                                            <input className="form-check-input" type="radio" name="channel" id="CorporateCheques" onChange={(e) => handleChangeChanel('CC')} />
                                            <label className="form-check-label" htmlFor="CorporateCheques">
                                                Corporate Cheques
                                            </label>
                                        </div>
                                        <div className="form-check mr-3">
                                            <input className="form-check-input" type="radio" name="channel" id="DD" onChange={(e) => handleChangeChanel('DD')} />
                                            <label className="form-check-label" htmlFor="DD">
                                                Demand Draft
                                            </label>
                                        </div> */}
                                    </div>

                                </div>
                                <div className="form-group col-sm-12 col-md-4">
                                        <label htmlFor="txtUserId">Bank Name</label>
                                        <input type="text" name="bank_name" value={initialValue.bank_name} className="form-control" readOnly />
                                    </div>
                                    <div className="form-group col-sm-12 col-md-4">
                                        <label htmlFor="txtUserId">Account Holder Name</label>
                                        <input type="text" name="account_holder_name" value={initialValue.account_holder_name} className="form-control" readOnly />
                                    </div>
                                    <div className="form-group col-sm-12 col-md-4">
                                        <label htmlFor="txtUserId">IFSC Code</label>
                                        <input type="text" name="ifsc_code" value={initialValue.ifsc_code} className="form-control" readOnly />
                                    </div>
                                    <div className="form-group col-sm-12 col-md-4">
                                        <label htmlFor="txtUserId">Mobile Number</label>
                                        <input type="text" name="mobile_number" value={initialValue.mobile_number} className="form-control" readOnly />
                                    </div>
                                    <div className="form-group col-sm-12 col-md-4">
                                        <label htmlFor="txtUserId">Account Number</label>
                                        <input type="text" name="account_number" value={initialValue.account_number} className="form-control" readOnly />
                                    </div>
                               
                            </div>
                        </form>
                        </Modal.Body>
      <Modal.Footer>
      {amountError && <div className="error-message">{amountError}</div>}
        <Button variant="secondary" onClick={handleCloseForm}>
          Close
        </Button>
        <Button variant="primary" disabled={!initialValue?.amount || amountError}  onClick={() => {
    setShowForm(false);
    setModalShow(true);
  }}>
          Proceed
        </Button>
      </Modal.Footer>
    </Modal>
                    </div>
                </div>
                {/* <AepsPinModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    handleSumitPayemt={handleSumitPayemt}
                    initialValue={initialValue}
                    selectedItem={selectedItem}
                    toastSuccessMessage={toastSuccessMessage}
                    toastErrorMessage={toastErrorMessage}
                   
                /> */}
                <AepsPinModalNew
                 show={modalShow}
                 onHide={() => {
                    setModalShow(false);
                    setInitialValue('');
                  }}
                 handleSumitPayemt={handleSumitPayemt}
                 initialValue={initialValue}
                 selectedItem={selectedItem}
                 toastSuccessMessage={toastSuccessMessage}
                 toastErrorMessage={toastErrorMessage}

                />
            </div>
            <Modal 
  show={showAddPayoutModal} 
  onHide={() => setShowAddPayoutModal(false)}
  size="lg"
  centered
  className="aeps-payout-modal"
>
  <Modal.Header closeButton>
    <Modal.Title>Add Payout Account</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <AddAepsPayout
      onSuccess={() => {
        setShowAddPayoutModal(false);
        aepsPayoutList(); 
      }} 
    />
  </Modal.Body>
</Modal>
    
            <ToastContainer />
        </>
    )
}
export default AepsPayout
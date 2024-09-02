import { Button, Modal } from "react-bootstrap"

import '../../common/aepsModleSucess/aepsModel.css'
import succees from '../../asesets/logo/accepted.gif'
import { useNavigate } from "react-router-dom";
function AepsModalSucess(props) {
    // console.log("props?.dataModal",props?.dataModal)
    const navigate = useNavigate();

  const handleClick = () => {
    navigate("/aeps-OnBoarded");
  };
    return (
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                style={{
                    zIndex: 1050,
                   
                  }} 


            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props?.adharPay}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body  style={{
    backgroundColor: '#ffffff',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
  }}>
                    <div>
                        {/* <div id="successMessage" class="success-message">
                            <div>
                                <div class="icon blink">&#10003;</div>
                                <p>Transaction Successful!</p>
                            </div>
                        </div> */}

                        {/* blanceEnquiry */}
                        <div className="success-messagee">
                            <img src={succees} alt="" />
                        </div>
                        {props?.dataModal?.message == 'AEPS Balance Enquiry Success' ? <div className="mt-3">
                            <div className="headList">
                                <p className="size-change">Available Balance : </p>
                                <p className="colo-change">{props?.dataModal?.data?.balanceamount}</p>
                            </div>
                            <div className="headList">
                                <p className="size-change">Bank Name : </p>
                                <p className="colo-change">{props?.dataModal?.data?.bank_name}</p>
                            </div>
                            <div className="headList">
                                <p className="size-change">Bank Ref. No : </p>
                                <p className="colo-change">{props?.dataModal?.data?.bank_rrn}</p>
                            </div>
                            <div className="headList">
                                <p className="size-change">Aadhaar No : </p>
                                <p className="colo-change">xxxx-xxxx-{props?.dataModal?.data?.lastAadhar}</p>
                            </div>
                        </div> : ''}

                        {/* caseWithdrow */}

                        {props?.dataModal?.message == 'AEPS Transaction Success' ? <div className="mt-3">
                            <div className="headList">
                                <p className="size-change">Amount : </p>
                                <p className="colo-change">{props?.dataModal?.data?.amount}</p>
                            </div>
                            {/* <div className="headList">
                                <p className="size-change">Available Balance : </p>
                                <p className="colo-change">{props?.balanceamount}</p>
                            </div> */}
                            <div className="headList">
                                <p className="size-change">Bank Name : </p>
                                <p className="colo-change">{props?.dataModal?.data?.bank_name}</p>
                            </div>
                            <div className="headList">
                                <p className="size-change">Bank Ref. No : </p>
                                <p className="colo-change">{props?.dataModal?.data?.bank_rrn}</p>
                            </div>
                            <div className="headList">
                                <p className="size-change">transaction ID : </p>
                                <p className="colo-change">{props?.dataModal?.data?.txn_id}</p>
                            </div>
                            {/* <div className="headList">
                                <p className="size-change">transaction ID : </p>
                                <p className="colo-change">{props?.dataModal?.iin}</p>
                            </div> */}
                        </div> : ''}


                        {/* miniStatement */}

                        <div className="">
    <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed" id="myTable" role="grid" aria-describedby="myTable_info" >
        <thead>
            <tr role="row">
                <th className="sorting">Date</th>
                <th className="sorting">Amount</th>
                <th className="sorting">Transaction Type</th>
                <th className="sorting">Narration</th>
            </tr>
        </thead>
        <tbody>
            {props?.dataModal && props?.dataModal?.data?.ministatement?.map((item) => {
                const formattedDate = item?.date ? 
                `${item.date.slice(0, 2)}-${item.date.slice(2, 4)}-20${item.date.slice(4, 6)}` 
                : '';

               
                const txnType = item?.txnType === "DR" ? "Debit" : 
                                item?.txnType === "CR" ? "Credit" : 
                                item?.txnType;

                return (
                    <tr className="odd" key={item?._id}>
                        <td valign="top" className="dataTables_empty">{formattedDate}</td>
                        <td valign="top" className="dataTables_empty">
                            {item?.amount}
                        </td>
                        <td valign="top" className="dataTables_empty">{txnType}</td>
                        <td valign="top" className="dataTables_empty">{item?.narration}</td>
                    </tr>
                );
            })}
        </tbody>
    </table>
</div>


                        {/* addharPay */}
                        {props?.dataModal?.message == 'AEPS Transaction Successsewff' ? <div className="mt-3">
                            <div className="headList">
                                <p className="size-change">Amount : </p>
                                <p className="colo-change">{props?.dataModal?.data?.amount}</p>
                            </div>
                            {/* <div className="headList">
                                <p className="size-change">Available Balance : </p>
                                <p className="colo-change">{props?.balanceamount}</p>
                            </div> */}
                            <div className="headList">
                                <p className="size-change">Bank Name : </p>
                                <p className="colo-change">{props?.dataModal?.data?.bank_name}</p>
                            </div>
                            <div className="headList">
                                <p className="size-change">Bank Ref. No : </p>
                                <p className="colo-change">{props?.dataModal?.data?.bank_rrn}</p>
                            </div>
                            <div className="headList">
                                <p className="size-change">transaction ID : </p>
                                <p className="colo-change">{props?.dataModal?.data?.txn_id}</p>
                            </div>
                            {/* <div className="headList">
                                <p className="size-change">transaction ID : </p>
                                <p className="colo-change">{props?.dataModal?.iin}</p>
                            </div> */}
                        </div> : ''}

                        <div className="btn-section-success">
                            <p>
                                Want to make CashWithdrawal ?
                            </p>
                            <div className="btn-set">
                                <button type="button" className="btn btn-success btn-success-2" onClick={props.onHide}>OK</button>
                                <button type="button" className="btn btn-success" onClick={props.onHide}>NO</button>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button onClick={props.onHide}>Close</Button> */}
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default AepsModalSucess
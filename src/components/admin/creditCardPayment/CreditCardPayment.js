

function CreditCardPayment() {
    return (
        <>
            <div className="PageHeading">
                <h1>Credit Card Bill Payment</h1>
            </div>
            <div className="ContentArea">
                <div className="card" style={{ overflow: 'auto' }}>
                    <div className="card-header"><span>Credit Card Bill Payment</span><div style={{ float: 'right', paddingTop: 15, fontSize: 16, color: 'red' }}>Total Withdrawal Limit : 62011.</div></div>
                    <div className="card-body">

                        <form id="frmregister" name="frmregister" method="post" action="https://m.masterpay.pro/Retailer/creditcard_bill_payment_new?idgs=5fd242d0e26724908e5b5c45c61c1e4123dacd2af102b2cec1a737744d925405a7724fbce8c4eedcf8ed2c06f5b4ff780e22c20035d4e985973275e1bb73ec168WYMKMHnyQmW4C9A2BtDHDHfYaciwUjSfUjqTMz1VVs-" autoComplete="off">
                            <input type="hidden" id="hidaction" name="hidformaction" />
                            <input type="hidden" id="hidn_lat" defaultValue={0} />
                            <input type="hidden" id="hidn_lng" defaultValue={0} />
                            <input type="hidden" id="demo_geo" defaultValue />
                            <input type="hidden" id="hidbankname" name="hidbankname" />
                            <input type="hidden" id="hidbankifsc" name="hidbankifsc" />
                            <input type="hidden" id="hidreference_id" name="hidreference_id" />
                            <div className="row mb-3">
                                <div className="col-md-3 font-weight-bold">Customer Mobile:</div>
                                <div className="col-md-9">
                                    <input style={{ width: 300, height: 50, fontSize: 25, fontWeight: 'bold' }} type="text" className="form-control example-1" id="txtMobileNumber" maxLength={10} name="txtMobileNumber" placeholder="Enter Mobile Number" tabIndex={1} autoComplete="off" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-3 font-weight-bold">Card Bank:</div>
                                <div className="col-md-9">
                                    <select id="ddlbank" name="ddlbank" className="form-control example-1" style={{ width: 300, height: 50, fontSize: 25, fontWeight: 'bold' }} onchange="javascript:setssf456ifsctasdf654otxt();" tabIndex={2} >
                                        <option value>Please Select Bank</option>
                                        <option value={23} ifsc="AUBL0CCARDS">AU Small Finance Bank Credit Card</option>
                                        <option value={9} ifsc="UTIB0000400">Axis Bank Credit Card</option>
                                        <option value={18} ifsc="BARB0COLABA">Bank of Baroda Credit Card</option>
                                        <option value={17} ifsc="BKID0000101">Bank of India Credit Card</option>
                                        <option value={19} ifsc="MAHB0001977">Bank of Maharashtra Credit Card</option>
                                        <option value={14} ifsc="CNRB0001912">Canara Bank Credit Card</option>
                                        <option value={3} ifsc="CITI0000003">Citi Bank Credit Card</option>
                                        <option value={27} ifsc="DBSS0IN0811">DBS Bank Credit Card</option>
                                        <option value={30} ifsc="FDRL0000001">FEDERAL BANK Credit Card</option>
                                        <option value={4} ifsc="HDFC0000128">HDFC Bank Credit Card</option>
                                        <option value={5} ifsc="HSBC0400002">HSBC Credit Card</option>
                                        <option value={6} ifsc="ICIC0000103">ICICI Bank Credit Card</option>
                                        <option value={15} ifsc="IBKL0NEFT01">IDBI Bank Credit Card</option>
                                        <option value={21} ifsc="IDFB0010225">IDFC First Bank Credit Card</option>
                                        <option value={13} ifsc="INDB0000018">IndusInd Bank Credit Card</option>
                                        <option value={7} ifsc="KKBK0000958">Kotak Mahindra Bank Credit Card</option>
                                        <option value={29} ifsc="FDRL0007002">One Card Credit Card</option>
                                        <option value={22} ifsc="PUNB0645400">Punjab National Bank Credit Card</option>
                                        <option value={12} ifsc="RATN0CRCARD">RBL Bank Credit Card</option>
                                        <option value={8} ifsc="SCBL0036001">Standard Chartered Credit Card</option>
                                        <option value={1} ifsc="SBIN00CARDS">State Bank Credit Card</option>
                                        <option value={31} ifsc="UBIN0551945">Union Bank Of India Credit Card</option>
                                        <option value={2} ifsc="YESB0CMSNOC">Yes Bank Credit Card</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-3 font-weight-bold">Card Number:</div>
                                <div className="col-md-9">
                                    <input style={{ width: 300, height: 50, fontWeight: 'bold' }} type="text" className="form-control example-1" id="txtAccountNumber" maxLength={19} name="txtAccountNo" placeholder="Enter Card Number" tabIndex={3} autoComplete="off" fdprocessedid="nmugbh" />
                                </div>
                            </div>
                            <div className="row mb-3 devextradetails" id="devextradetails-1">
                                <div className="col-md-3 font-weight-bold">Card Owner Name:</div>
                                <div className="col-md-9">
                                    <input style={{ width: 300, height: 50, fontWeight: 'bold' }} type="text" className="form-control example-1" id="txtName" maxLength={40} name="txtbeneName" placeholder="Enter Name" tabIndex={4} autoComplete="off" fdprocessedid="3dsnsg" />
                                </div>
                            </div>
                            <div className="row mb-3 devextradetails" id="devextradetails-2">
                                <div className="col-md-3 font-weight-bold">Bill Amount:</div>
                                <div className="col-md-9">
                                    <input type="text" name="txtAmount" id="txtAmount" className="form-control example-1" maxLength={6} style={{ width: 300, height: 50, fontWeight: 'bold' }} placeholder="Enter Amount" ondrop="return false;" onpaste="return false;" tabIndex={5} autoComplete="off" fdprocessedid="jf4bo" /><br /> <span id="numtowords_output"> Nine Lakh Eighty Nine Thousand One Hundred and Ninety Seven </span>
                                </div>
                            </div>
                            <div className="row mb-3 __dev-hide devextradetails" id="devextradetails-3">
                                <div className="col-md-3 font-weight-bold">Due Date:</div>
                                <div className="col-md-9">
                                    <input type="text" name="txtDueDate" id="txtDueDate" className="form-control example-1" readOnly style={{ width: 300, height: 50, fontWeight: 'bold' }} ondrop="return false;" onpaste="return false;" autoComplete="off" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-3 font-weight-bold">Tpin:</div>
                                <div className="col-md-9">
                                    <input type="password" name="txtTpin" id="txtTpin" className="form-control example-1" maxLength={4} placeholder="Enter Tpin" style={{ width: 300, height: 50, fontWeight: 'bold', cursor: 'text !important', backgroundColor: 'white' }} tabIndex={6} autoComplete="off" fdprocessedid="ki3lqw" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-3">&nbsp;</div>
                                <div className="col-md-9">
                                    <input type="button" className="btn btn-success example-1 custom-button" defaultValue="Submit" id="btnReg" name="btnReg" tabIndex={7} onclick="javascript:return asdf8ssd8doyblccbillpayment65as65sd('submit');" fdprocessedid="hyq2ed" />
                                    <input type="button" className="btn btn-warning example-1 custom-button" defaultValue="Fetch Bill" id="btnFetch" name="btnFetch" tabIndex={7} onclick="javascript:return asdf8ssd8doyblccbillpayment65as65sd('fetch');" />
                                    <input type="button" className="btn btn-primary example-1 custom-button" defaultValue="Cancel" id="btnCancel" name="btnCancel" tabIndex={8} onclick="javascript:asdf8ssd8docalncelyblccbillpayment65as65sd();" fdprocessedid="3f9hti" />
                                </div>
                            </div>
                            <input type="hidden" id="hiddashboardurl" defaultValue="https://m.masterpay.pro/Retailer/creditcard_bill_payment_new?crypt=82eb1616ab0e6bd4d764b4743a60359165c34425cfbd3239376b49ceed954b5e52bcb66a7da9bac4e579fb9d35a6531b82c93a9512b20cb9d0d5b648116b7700XIdmCEopyJ2fGh6BRJIs~fB1IoUa3DO0DjbARhfy7R4-" />
                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}
export default CreditCardPayment
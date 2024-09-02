
function PaytmWallet() {
    return (
        <>
            <div className="PageHeading">
                <h1>Online wallet Topup</h1>
            </div>
            <div className="ContentArea">
                {/* <div className="card">

                </div> */}
                <div className="row">
                    <div className="col-md-6 col-sm-16">
                        <div className="card mt-4 top-border-card" style={{ borderColor: '#63a2c7' }}>
                            <div className="card-header">
                                <span>Online wallet Topup</span><br />
                            </div>
                            <div className="card-body">
                                <span style={{ color: '#1e5591', fontWeight: 'bold' }}>You can not enter amount more than 50000!</span><br /><br />
                                <div className="well" style={{ display: 'none' }}>
                                </div>
                                <form method="post">
                                    <table className="table table-bordered" width="100%">
                                        <tbody><tr style={{ display: 'none' }}>
                                            <td>
                                                <label style={{ fontSize: 18, marginTop: 8 }}>ORDER_ID</label>
                                            </td>
                                            <td>
                                                <input className="form-control" id="ORDER_ID" tabIndex={1} maxLength={20} size={20} name="ORDER_ID" autoComplete="off" defaultValue="ORDWEBgrIjNy0Bmy5nTmZ" />
                                            </td>
                                        </tr>
                                            <tr style={{ display: 'none' }}>
                                                <td>
                                                    <label style={{ fontSize: 18, marginTop: 8 }}>CUSTID</label>
                                                </td>
                                                <td>
                                                    <input className="form-control" id="CUST_ID" tabIndex={2} maxLength={12} size={12} name="CUST_ID" autoComplete="off" defaultValue="CUST001" />
                                                </td>
                                            </tr>
                                            <tr style={{ display: 'none' }}>
                                                <td>
                                                    <label style={{ fontSize: 18, marginTop: 8 }}>INDUSTRY_TYPE_ID</label>
                                                </td>
                                                <td>
                                                    <input className="form-control" id="INDUSTRY_TYPE_ID" tabIndex={4} maxLength={12} size={12} name="INDUSTRY_TYPE_ID" autoComplete="off" defaultValue="Retail" />
                                                </td>
                                            </tr>
                                            <tr style={{ display: 'none' }}>
                                                <td>
                                                    <label style={{ fontSize: 18, marginTop: 8 }}>Channel</label>
                                                </td>
                                                <td>
                                                    <input className="form-control" id="CHANNEL_ID" tabIndex={4} maxLength={12} size={12} name="CHANNEL_ID" autoComplete="off" defaultValue="WEB" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <label style={{ fontSize: 18, marginTop: 8 }}>Amount</label>
                                                </td>
                                                <td>
                                                    <input className="form-control" title="TXN_AMOUNT" tabIndex={10} type="text" name="TXN_AMOUNT" id="TXN_AMOUNT" onchange="chkVal(this.value);" onkeypress="return isNumberKey(event)" required fdprocessedid="kecj0k" /><br /><span id="numtowords_output" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} style={{ textAlign: 'center' }}>
                                                    <input defaultValue="Pay" type="button" className="btn btn-success" style={{ fontSize: 15 }} fdprocessedid="9iantb" />
                                                </td>
                                            </tr>
                                            {/* <tbody>
                                                      <tr>
                                                          <th>S.No</th>
                                                          <th>Label</th>
                                                          <th>Value</th>
                                                      </tr>
                                                      <tr>
                                                          <td>1</td>
                                                          <td><label style="font-size:18px;margin-top:8px;">ORDER_ID::*</label></td>
                                                          <td><input class="form-control" id="ORDER_ID" tabindex="1" maxlength="20" size="20"
                                                              name="ORDER_ID" autocomplete="off"
                                                              value="">
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td>2</td>
                                                          <td><label style="font-size:18px;margin-top:8px;">CUSTID ::*</label></td>
                                                          <td><input class="form-control" id="CUST_ID" tabindex="2" maxlength="12" size="12" name="CUST_ID" autocomplete="off" value="CUST001"></td>
                                                      </tr>
                                                      <tr>
                                                          <td>3</td>
                                                          <td><label style="font-size:18px;margin-top:8px;">INDUSTRY_TYPE_ID ::*</label></td>
                                                          <td><input class="form-control" id="INDUSTRY_TYPE_ID" tabindex="4" maxlength="12" size="12" name="INDUSTRY_TYPE_ID" autocomplete="off" value="Retail"></td>
                                                      </tr>
                                                      <tr>
                                                          <td>4</td>
                                                          <td><label style="font-size:18px;margin-top:8px;">Channel ::*</label></td>
                                                          <td><input class="form-control" id="CHANNEL_ID" tabindex="4" maxlength="12"
                                                              size="12" name="CHANNEL_ID" autocomplete="off" value="WEB">
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td>5</td>
                                                          <td><label style="font-size:18px;margin-top:8px;">txnAmount*</label></td>
                                                          <td><input class="form-control" title="TXN_AMOUNT" tabindex="10"
                                                              type="text" name="TXN_AMOUNT"
                                                              value="1">
                                                          </td>
                                                      </tr>
                                                      <tr>
                                                          <td></td>
                                                          <td></td>
                                                          <td><input class="form-control" value="CheckOut" type="submit" onclick=""></td>
                                                      </tr>
                                                  </tbody> */}
                                        </tbody></table>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-16">
                        <div className="card mt-4 top-border-card" style={{ borderColor: '#63a2c7' }}>
                            <div className="card-header">
                                <span>Charges</span><br />
                            </div>
                            <div className="card-body">
                                <div className="paytm-charges">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <h3>Paytm Wallet</h3>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="chrg-row">
                                                <h5>2% + GST</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 					 */}
            </div>

        </>
    )
}
export default PaytmWallet
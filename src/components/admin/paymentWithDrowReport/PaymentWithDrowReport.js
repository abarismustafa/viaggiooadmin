

function PaymentWithDrowReport() {
    return (
        <>
            <div className="PageHeading">
                <h1>PAYMENT WITHDRAWAL REPORT</h1>
            </div>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Filter</span></div>
                    <div className="card-body">
                        <form action="" method="post" name="frmCallAction" id="frmCallAction">
                            <input type="hidden" id="hidID" name="hidID" />
                            <div className="form-row" style={{ alignItems: 'end' }}>
                                <div className="form-group col-md-2">
                                    <label htmlFor="txtFrom">From Date</label>
                                    <input className="form-control datefield" id="txtFrom" name="txtFrom" type="date" style={{ cursor: 'pointer' }} />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="txtTo">To Date</label>
                                    <input className="form-control datefield" id="txtTo" name="txtTo" type="date" style={{ cursor: 'pointer' }} />
                                </div>
                                <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <button type="button" className="btn btn-primary" >Submit</button>
                                </div>
                            </div>
                        </form></div>
                    <form id="frmexport" name="frmexport" action="" method="get">
                        <input type="hidden" id="hidfrm" name="from" />
                        <input type="hidden" id="hidto" name="to" />
                        <input type="hidden" id="hiddb" name="db" />
                    </form>
                </div>
                <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <div className="GridUi no-header-footer-grid" id="all_transaction">
                            <table id="rechargehistorytbl" className="table table-striped table-bordered table-hover display fixed_headers" style={{ width: 1130 }}>
                                <thead>
                                    <tr>
                                        <th>Sr<br />No</th>
                                        <th>ID</th>
                                        <th>DateTime</th>
                                        <th>Mobile</th>
                                        <th>Account</th>
                                        <th>Amount</th>
                                        <th>Charge</th>
                                        <th>Bank Ref No</th>
                                        <th>Status</th>
                                        <th>Mode</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default PaymentWithDrowReport
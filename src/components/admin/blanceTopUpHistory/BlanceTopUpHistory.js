
function BlanceTopUpHistory() {
    return (
        <>
            <div className="PageHeading">
                <h1>Balance Topup History</h1>
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
                                    <label htmlFor="ddldb">Data</label>
                                    <select id="ddldb" name="ddldb" className="form-control" >
                                        <option value="LIVE">LIVE</option>
                                        <option value="ARCHIVE">ARCHIVE</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <button className="btn btn-primary">Submit</button>
                                </div>
                                <div className="form-group col-md-4">
                                    <label>&nbsp;</label>
                                    <button type="reset" className="btn btn-secondary" fdprocessedid="ghnvfu">Live Data Date : 2023-11-25</button>
                                </div>
                            </div>
                        </form></div>
                </div>
                <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <div className="GridUi no-header-footer-grid" id="all_transaction">
                            <table id="rechargehistorytbl" className="table table-striped table-bordered table-hover display fixed_headers" style={{ width: 1250 }}>
                                <thead>
                                    <tr>
                                        <th>Payment Date</th>
                                        <th>Payment Id</th>
                                        <th>Transaction type</th>
                                        <th>Fund From</th>
                                        <th>Before Balance</th>
                                        <th>Credit Amount</th>
                                        <th>Debit Amount</th>
                                        <th>Balance</th>
                                        <th>Remark</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                                <tfoot>
                                    <tr><th />
                                        <th />
                                        <th />
                                        <th />
                                        <th />
                                        <th>0</th>
                                        <th>0</th>
                                        <th />
                                        <th />
                                    </tr></tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default BlanceTopUpHistory
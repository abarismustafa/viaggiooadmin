
function PaymentGateWay() {
    return (
        <>
            <div className="PageHeading">
                <h1>Payment Gateway Report</h1>
            </div>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header" style={{}}><span>Filter</span></div>
                    <div className="card-body" style={{}}>
                        <form method="post" name="frmBillReport" id="frmBillReport">
                            <input type="hidden" id="hidID" name="hidID" />
                            <div className="form-row" style={{ alignItems: "end" }}>
                                <div className="form-group col-md-2">
                                    <label htmlFor="txtFrom">From Date</label>
                                    <input className="form-control datefield" id="txtFrom" name="txtFrom" type="date" style={{ cursor: 'pointer' }} />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="txtTo">To Date</label>
                                    <input className="form-control datefield" id="txtTo" name="txtTo" type="date" style={{ cursor: 'pointer' }} />
                                </div>
                                <div className="form-group col-md-2" style={{ display: 'none' }}>
                                    <label htmlFor="ddlstatus">Status:</label>
                                    <select id="ddlstatus" name="ddlstatus" className="form-control">
                                        <option value="ALL">ALL</option>
                                        <option value="SUCCESS">SUCCESS</option>
                                        <option value="PENDING">PENDING</option>
                                        <option value="FAILURE">FAILURE</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <input type="button" name="btnCommSearch" id="btnCommSearch" defaultValue="Search" className="btn btn-primary" />
                                </div>
                                <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <input type="button" id="btnExport" name="btnExport" defaultValue="Export" className="btn btn-secondary" />
                                </div>
                            </div>
                        </form></div>
                    <form id="frmexport" name="frmexport" action="https://m.masterpay.pro/Retailer/pg_report_rz/dataexport" method="POST">
                        <input type="hidden" id="hidfrm" name="from" />
                        <input type="hidden" id="hidto" name="to" />
                        <input type="hidden" id="hidstatus" name="status" />
                    </form>
                </div>
                <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <div className="well" style={{ display: 'none' }}>
                        </div>
                        <div className="well" id="errMsgWell" style={{ display: 'none' }}><font id="errMsg" /></div>
                        <div className="GridUi no-header-footer-grid" id="all_transaction">
                            <div id="tblepos_pending_transaction_wrapper" className="dataTables_wrapper no-footer"><div className="d-flex  justify-content-between align-items-center">
                            <div className="dataTables_length" id="myTable_length">
                                <label>Show <select name="myTable_length" aria-controls="myTable" className fdprocessedid="srx8j"><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option><option value={100}>100</option></select> entries</label>
                            </div>
                                <div className="form-group col-md-2">
                                    <label >
                                        Search:
                                    </label>
                                    <input className="form-control datefield" id="txtFrom" name="txtFrom" type="text" style={{ cursor: 'pointer' }} />
                                </div>
                            </div><div id="tblepos_pending_transaction_processing" className="dataTables_processing" style={{ display: 'none' }}>Processing...</div><table id="tblepos_pending_transaction" className="table table-striped table-bordered table-hover display fixed_headers dataTable no-footer" role="grid" aria-describedby="tblepos_pending_transaction_info" style={{ width: 1130 }}>
                                <thead>
                                    <tr role="row"><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '30.4px' }}>Sr No</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '72.4px' }}>Payment ID</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '50.4px' }}>Order ID</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '54.4px' }}>Card Type</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '96.4px' }}>Card Last Number</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '72.4px' }}>Txn Amount</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '83.4px' }}>Credit Amount</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '73.4px' }}>Txn Charges</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '73.4px' }}>Wallet Status</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '60.4px' }}>Txn Status</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '49.4px' }}>Txn Date</th></tr>
                                </thead>
                                <tbody>
                                    <tr className="odd"><td valign="top" colSpan={11} className="dataTables_empty">No data available in table</td></tr></tbody>
                            </table>
                                {/* <div className="dataTables_info" id="tblepos_pending_transaction_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div><div className="dataTables_paginate paging_simple_numbers" id="tblepos_pending_transaction_paginate"><a className="paginate_button previous disabled" aria-controls="tblepos_pending_transaction" data-dt-idx={0} tabIndex={0} id="tblepos_pending_transaction_previous">Previous</a><span /><a className="paginate_button next disabled" aria-controls="tblepos_pending_transaction" data-dt-idx={1} tabIndex={0} id="tblepos_pending_transaction_next">Next</a></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default PaymentGateWay
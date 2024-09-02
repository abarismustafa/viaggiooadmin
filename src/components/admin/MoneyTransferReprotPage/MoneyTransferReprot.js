
function MoneyTransferReprot() {
    return (
        <>
            <div className="PageHeading">
                <h1>Indo-Nepal Money Transfer 2_0: Report</h1>
            </div>
            <div className="ContentArea">
                <div className="card">

                    <div className="card-header"><span>Money transfer Report</span></div>
                    <div className="card-body">
                        <div className="form-row" style={{ alignItems: 'end' }}>
                            <div className="form-group col-md-2">
                                <label htmlFor="from_date">From Date</label>
                                <input className="form-control datefield" id="from_date" name="from_date" type="date" placeholder="From Date" />
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="to_date">To Date</label>
                                <input className="form-control datefield" id="to_date" name="to_date" type="date" placeholder="To Date" />
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="data">Data</label>
                                <select className="form-control" id="data" name="data" fdprocessedid="x2w7p">
                                    <option value="Live">Live</option>
                                    <option value="Archive">Archive</option>
                                </select>
                            </div>
                            <div className="form-group col-md-2">
                                <label>&nbsp;</label>
                                <input type="button" defaultValue="Submit" id="indo_report_submit_id" className="btn btn-primary" fdprocessedid="laoxm" />
                            </div>
                        </div>
                        <div className="card mt-4" style={{ overflow: 'auto' }}>
                        </div>
                        <div id="myTable_wrapper" className="dataTables_wrapper no-footer">
                            <div className="d-flex  justify-content-between align-items-center">
                            <div className="dataTables_length" id="myTable_length">
                                <label>Show <select name="myTable_length" aria-controls="myTable" className fdprocessedid="srx8j"><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option><option value={100}>100</option></select> entries</label>
                            </div>
                                <div className="form-group col-md-2">
                                    <label >
                                        Search:
                                    </label>
                                    <input className="form-control datefield" id="txtFrom" name="txtFrom" type="text" style={{ cursor: 'pointer' }} />
                                </div>
                            </div>
                                    <div id="myTable_processing" className="dataTables_processing" style={{ display: 'none' }}>Processing...</div><table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed" id="myTable" role="grid" aria-describedby="myTable_info" >
                            <thead>
                                <tr role="row"><th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '41.4px' }} aria-label="Sr No: activate to sort column ascending">Sr No</th><th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '78.4px' }} aria-label="Date Time: activate to sort column ascending">Date Time</th><th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '67.4px' }} aria-label="Remitter: activate to sort column ascending">Remitter</th><th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '62.4px' }} aria-label="Amount: activate to sort column ascending">Amount</th><th className="sorting_asc" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '118.4px' }} aria-label="Payable Charge: activate to sort column descending" aria-sort="ascending">Payable Charge</th><th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '107.4px' }} aria-label="Debit Amount: activate to sort column ascending">Debit Amount</th><th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '112.4px' }} aria-label="Credit Amount: activate to sort column ascending">Credit Amount</th><th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '145.4px' }} aria-label="Transaction Datails: activate to sort column ascending">Transaction Datails</th><th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '49.4px' }} aria-label="Status: activate to sort column ascending">Status</th><th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: 0, display: 'none' }} aria-label="Mode: activate to sort column ascending">Mode</th><th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: 0, display: 'none' }} aria-label="Account No: activate to sort column ascending">Account No</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: 0, display: 'none' }} aria-label="Print">Print</th></tr>
                            </thead>
                            <tbody>
                                <tr className="odd"><td valign="top" colSpan={9} className="dataTables_empty">No data available in table</td></tr></tbody>
                        </table>
                            {/* <div className="dataTables_info" id="myTable_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div><div className="dataTables_paginate paging_simple_numbers" id="myTable_paginate"><a className="paginate_button previous disabled" aria-controls="myTable" data-dt-idx={0} tabIndex={0} id="myTable_previous">Previous</a><span /><a className="paginate_button next disabled" aria-controls="myTable" data-dt-idx={1} tabIndex={0} id="myTable_next">Next</a></div> */}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default MoneyTransferReprot
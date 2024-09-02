
function FastTagReport() {
    return (
        <>
            <div className="PageHeading">
                <h1>Agent List</h1>
            </div>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Fastag Recharges</span></div>
                    {/* <div class="card-header"><span>Filter</span></div> */}
                    <div className="card-body">
                        <div className="form-row" style={{ alignItems: 'end' }}>
                            <div className="form-group col-md-3">
                                <label htmlFor="rep_from_date">From Date</label>
                                <input className="form-control datefield" id="rep_from_date" name="rep_from_date" type="date" placeholder="From Date" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="rep_to_date">To Date</label>
                                <input className="form-control datefield" id="rep_to_date" name="rep_to_date" type="date" placeholder="To Date" />
                            </div>
                            <div className="form-group col-md-3">
                                <label>&nbsp;</label>
                                <input type="button" defaultValue="Submit" id="fastag_filter_submit_id" className="btn btn-primary" fdprocessedid="gzu62n" />
                            </div>
                            <div className="form-group col-md-3">
                                <label>&nbsp;</label>
                                <button type="button" id="btnExport" className="btn btn-secondary" fdprocessedid="aifbcw">Export To Excel</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mt-4" style={{ overflow: 'auto' }}>
                    <div className="card-body">
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
                                    <tr role="row"><th className="sorting_asc" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '66.4px' }} aria-sort="ascending" aria-label="Sr No: activate to sort column descending">Sr No</th><th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '60.4px' }} aria-label="Date: activate to sort column ascending">Date</th><th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '169.4px' }} aria-label="Company Name: activate to sort column ascending">Company Name</th><th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '171.4px' }} aria-label="Vehicle Number: activate to sort column ascending">Vehicle Number</th><th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '181.4px' }} aria-label="Customer Mobile: activate to sort column ascending">Customer Mobile</th><th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">Bill Amount</th><th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '76.4px' }} aria-label="Status: activate to sort column ascending">Status</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: 0, display: 'none' }} aria-label="Transaction Number">Transaction Number</th></tr>
                                </thead>
                                <tbody>
                                    <tr className="odd"><td valign="top" colSpan={7} className="dataTables_empty">No data available in table</td></tr></tbody>
                            </table>
                            {/* <div className="dataTables_info" id="myTable_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div><div className="dataTables_paginate paging_simple_numbers" id="myTable_paginate"><a className="paginate_button previous disabled" aria-controls="myTable" data-dt-idx={0} tabIndex={0} id="myTable_previous">Previous</a><span /><a className="paginate_button next disabled" aria-controls="myTable" data-dt-idx={1} tabIndex={0} id="myTable_next">Next</a></div> */}
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>


        </>
    )
}
export default FastTagReport
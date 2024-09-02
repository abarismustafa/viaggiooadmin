
function ComplainList() {
    return (
        <>
            <div className="PageHeading">
                <h1>Complain List</h1>
            </div>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Filter</span></div>
                    <div className="card-body">
                        <form action="" id="searchComplain" name="searchComplain" method="post">
                            <input type="hidden" id="hidID" name="hidID" />
                            <div className="form-row" style={{ alignItems: 'end' }}>
                                <div className="form-group col-md-2">
                                    <label htmlFor="txtFrom">Recharge Id</label>
                                    <input type="text" id="txtSearch" name="txtSearch" className="form-control" placeholder="Recharge Id" />
                                </div>
                                <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <input type="submit" id="btnSearch" name="btnSearch" defaultValue="Search" className="btn btn-primary" />
                                </div>
                            </div>
                        </form></div>
                </div>
                <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <div className="GridUi no-header-footer-grid" id="all_transaction">
                            <div id="complainTblv_wrapper" className="dataTables_wrapper no-footer"><div className="dataTables_length" id="complainTblv_length"><label>Show <select name="complainTblv_length" aria-controls="complainTblv" className><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option><option value={100}>100</option></select> entries</label></div><div id="complainTblv_filter" className="dataTables_filter"><label>Search:<input type="search" className placeholder aria-controls="complainTblv" /></label></div><div id="complainTblv_processing" className="dataTables_processing" style={{ display: 'none' }}>Processing...</div><table id="complainTblv" className="table table-striped table-bordered table-hover display fixed_headers dataTable no-footer" style={{ width: '100%' }} role="grid" aria-describedby="complainTblv_info">
                                <thead>
                                    <tr role="row"><th className="sorting_desc" tabIndex={0} aria-controls="complainTblv" rowSpan={1} colSpan={1} style={{ width: '70.4px' }} aria-sort="descending" aria-label="Complain Id: activate to sort column ascending">Complain Id</th><th className="sorting" tabIndex={0} aria-controls="complainTblv" rowSpan={1} colSpan={1} style={{ width: '71.4px' }} aria-label="Recharge ID: activate to sort column ascending">Recharge ID</th><th className="sorting" tabIndex={0} aria-controls="complainTblv" rowSpan={1} colSpan={1} style={{ width: '77.4px' }} aria-label="Recharge Date: activate to sort column ascending">Recharge Date</th><th className="action_th sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '45.4px' }} aria-label="Mobile">Mobile</th><th className="action_th sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '55.4px' }} aria-label="Amount">Amount</th><th className="action_th sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '59.4px' }} aria-label="Message">Message</th><th className="action_th sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '77.4px' }} aria-label="Message Details">Message Details</th><th className="action_th sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '88.4px' }} aria-label="Response Message">Response Message</th><th className="action_th sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '77.4px' }} aria-label="Complain Date">Complain Date</th><th className="action_th sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '49.4px' }} aria-label="Solve Date">Solve Date</th><th className="action_th sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '43.4px' }} aria-label="Status">Status</th></tr>
                                </thead>
                                <tbody>
                                    <tr className="odd"><td valign="top" colSpan={11} className="dataTables_empty">No data available in table</td></tr></tbody>
                            </table>
                                {/* <div className="dataTables_info" id="complainTblv_info" role="status" aria-live="polite">
                                    Showing 0 to 0 of 0 entries
                                </div>
                                <div className="dataTables_paginate paging_simple_numbers" id="complainTblv_paginate">
                                    <a className="paginate_button previous disabled" aria-controls="complainTblv" data-dt-idx={0} tabIndex={0} id="complainTblv_previous">
                                        Previous
                                    </a>
                                    <span />
                                    <a className="paginate_button next disabled" aria-controls="complainTblv" data-dt-idx={1} tabIndex={0} id="complainTblv_next">
                                        Next
                                    </a>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default ComplainList
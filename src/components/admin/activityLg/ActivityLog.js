

const ActivityLog = () => {
    return (
        <>
            <div className="PageHeading"><h1>ACTIVITY LOGS</h1></div>


            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Filter</span></div>
                    <div className="card-body">
                        <form action="" method="post" name="frmReport" id="frmReport">
                            <div className="form-row" style={{ alignItems: 'end' }}>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtFrom">From Date</label>
                                    <input className="form-control datefield" id="txtFrom" name="txtFrom" type="date" style={{ cursor: 'pointer' }} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtTo">To Date</label>
                                    <input className="form-control datefield" id="txtTo" name="txtTo" type="date" style={{ cursor: 'pointer' }} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>&nbsp;</label>
                                    <input type="submit" name="btnSearch" id="btnSearch" defaultValue="Search" className="btn btn-primary" title="Click to search." fdprocessedid="h4pz8" />
                                </div>

                            </div>
                        </form>
                    </div>

                </div>
                <div className="card mt-4" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <div id="myTable_wrapper" className="dataTables_wrapper no-footer">

                            <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed" id="myTable" role="grid" aria-describedby="myTable_info" >
                                <thead>
                                    <tr role="row">
                                        <th className="sorting_asc" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '66.4px' }} aria-sort="ascending" aria-label="Sr No: activate to sort column descending">
                                            Sr No
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '60.4px' }} aria-label="Date: activate to sort column ascending">
                                            Date
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '169.4px' }} aria-label="Company Name: activate to sort column ascending">
                                            User
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '171.4px' }} aria-label="Vehicle Number: activate to sort column ascending">
                                            Activity
                                        </th>

                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                                            Amount
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '76.4px' }} aria-label="Status: activate to sort column ascending">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="odd"><td valign="top" colSpan={7} className="dataTables_empty text-align-center">No data available in table</td></tr></tbody>
                            </table>
                            {/* <div className="dataTables_info" id="myTable_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div><div className="dataTables_paginate paging_simple_numbers" id="myTable_paginate"><a className="paginate_button previous disabled" aria-controls="myTable" data-dt-idx={0} tabIndex={0} id="myTable_previous">Previous</a><span /><a className="paginate_button next disabled" aria-controls="myTable" data-dt-idx={1} tabIndex={0} id="myTable_next">Next</a></div> */}
                        </div>
                        {/* </div> */}
                    </div>
                </div>
                {/* <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="message">Record Not Found.</div>
                </div> */}
            </div>
        </>
    )
}

export default ActivityLog
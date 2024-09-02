import ReactHTMLTableToExcel from 'react-html-table-to-excel';
function AepsTezReport() {
    return (
        <>
            <div className="PageHeading">
                <h1>Aeps Tez Report</h1>
            </div>

            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Filter</span></div>
                    <div className="card-body">
                        <form method="post" name="frmBillReport" id="frmBillReport">
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
                                    <label>Data :</label>
                                    <select id="ddldb" name="ddldb" className="form-control" style={{ width: 100 }}>
                                        <option value="LIVE">LIVE</option>
                                        <option value="ARCHIVE">ARCHIVE</option>
                                    </select>
                                </div>
                                {/* <div class="form-group col-md-2">
                                  <label for="ddlstatus">Status:</label>
                                  <select id="ddlstatus" name="ddlstatus" class="form-control">
                                      <option value="ALL">ALL</option>
                                      <option value="Success">SUCCESS</option>
                                      <option value="Pending">PENDING</option>
                                      <option value="Failure">FAILURE</option>
                                  </select>
                              </div> */}
                                <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <input type="button" name="btnCommSearch" id="btnCommSearch" defaultValue="Search" className="btn btn-primary" title="Click to search." fdprocessedid="t2y9jzh" />
                                </div>
                                {/* <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <input type="button" id="btnExport" name="btnExport" defaultValue="Export" className="btn btn-secondary" onclick="startexoprt()" fdprocessedid="r3sxd8" />
                                </div> */}
                            </div>
                        </form></div>

                </div>
                <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <div className="GridUi no-header-footer-grid" id="all_transaction">
                            <div id="tblaeps_paytm_report_wrapper" className="dataTables_wrapper no-footer">
                                <div className="d-flex  justify-content-between align-items-center">
                                    <div className="dataTables_length" id="myTable_length">
                                        <label>Show <select name="myTable_length" aria-controls="myTable" className fdprocessedid="srx8j"><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option><option value={100}>100</option></select> entries</label>
                                    </div>
                                    <div>
                                        <ReactHTMLTableToExcel
                                            id="test-table-xls-button"
                                            className="download-table-xls-button btn btn-success cusxel"
                                            table="table-to-xlsx"
                                            filename="tablexls"
                                            sheet="tablexls"
                                            buttonText="Download Excel sheet" />
                                    </div>
                                    <div className="form-group col-md-2">
                                        <label >
                                            Search:
                                        </label>
                                        <input className="form-control datefield" id="txtFrom" name="txtFrom" type="text" style={{ cursor: 'pointer' }} />
                                    </div>
                                </div>
                                <div id="tblaeps_paytm_report_processing" className="dataTables_processing" style={{ display: 'none' }}>Processing...</div>
                                <table id="table-to-xlsx" className="table table-striped table-bordered table-hover display fixed_headers dataTable no-footer" style={{ width: 1855 }} role="grid" aria-describedby="tblaeps_paytm_report_info">
                                    <thead>
                                        <tr role="row">
                                            <th className="sorting" tabIndex={0} aria-controls="tblaeps_paytm_report" rowSpan={1} colSpan={1} style={{ width: '74.4px' }} aria-label="Sr No: activate to sort column ascending">
                                                Sr No
                                            </th>
                                            <th className="sorting_desc" tabIndex={0} aria-controls="tblaeps_paytm_report" rowSpan={1} colSpan={1} style={{ width: '109.4px' }} aria-sort="descending" aria-label="Txn Date: activate to sort column ascending">
                                                Txn Date
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="tblaeps_paytm_report" rowSpan={1} colSpan={1} style={{ width: '128.4px' }} aria-label="Request Id: activate to sort column ascending">
                                                Request Id
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="tblaeps_paytm_report" rowSpan={1} colSpan={1} style={{ width: '103.4px' }} aria-label="Order Id: activate to sort column ascending">
                                                Order Id
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="tblaeps_paytm_report" rowSpan={1} colSpan={1} style={{ width: '126.4px' }} aria-label="Aadhar No: activate to sort column ascending">
                                                Aadhar No
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="tblaeps_paytm_report" rowSpan={1} colSpan={1} style={{ width: '226.4px' }} aria-label="Depositor Mobile No: activate to sort column ascending">
                                                Depositor Mobile No
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="tblaeps_paytm_report" rowSpan={1} colSpan={1} style={{ width: '136.4px' }} aria-label="Bank Name: activate to sort column ascending">
                                                Bank Name
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="tblaeps_paytm_report" rowSpan={1} colSpan={1} style={{ width: '143.4px' }} aria-label="Txn Amount: activate to sort column ascending">
                                                Txn Amount
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="tblaeps_paytm_report" rowSpan={1} colSpan={1} style={{ width: '211.4px' }} aria-label="Response Message: activate to sort column ascending">
                                                Response Message
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="tblaeps_paytm_report" rowSpan={1} colSpan={1} style={{ width: '84.4px' }} aria-label="Status: activate to sort column ascending">
                                                Status
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="tblaeps_paytm_report" rowSpan={1} colSpan={1} style={{ width: '97.4px' }} aria-label="Receipt: activate to sort column ascending">
                                                Receipt
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="odd">
                                            <td valign="top" className="dataTables_empty">
                                                1
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                2-2-2024
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                1
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                2
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                45353453454
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                983453455
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                SBI
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                200
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                yes
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                Pending
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                yes
                                            </td>
                                        </tr>
                                        <tr className="odd">
                                            <td valign="top" className="dataTables_empty">
                                                2
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                3-2-2024
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                2
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                2
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                45353453454
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                983453455
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                BOI
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                2000
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                yes
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                Pending
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                yes
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* <div className="dataTables_info" id="tblaeps_paytm_report_info" role="status" aria-live="polite">Showing 1 to 10 of 10 entries</div><div className="dataTables_paginate paging_simple_numbers" id="tblaeps_paytm_report_paginate"><a className="paginate_button previous disabled" aria-controls="tblaeps_paytm_report" data-dt-idx={0} tabIndex={0} id="tblaeps_paytm_report_previous">Previous</a><span><a className="paginate_button current" aria-controls="tblaeps_paytm_report" data-dt-idx={1} tabIndex={0}>1</a></span><a className="paginate_button next disabled" aria-controls="tblaeps_paytm_report" data-dt-idx={2} tabIndex={0} id="tblaeps_paytm_report_next">Next</a></div> */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default AepsTezReport
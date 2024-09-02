import ReactHTMLTableToExcel from 'react-html-table-to-excel';
function InsurancedekhoReport() {
    return (
        <>
            <div className="PageHeading">
                <h1>InsuranceDekho Report</h1>
            </div>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Filter</span></div>
                    <div className="card-body">
                        <form action="" method="post" name="frmReport" id="frmReport">
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
                                    <label htmlFor="txtUserId">Request/Ref. Id</label>
                                    <input type="text" name="txtSearch" id="txtSearch" className="form-control" maxLength={50} placeholder="Request/Ref. Id" />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="ddldb">Data</label>
                                    <select id="ddldb" name="ddldb" className="form-control">
                                        <option value="LIVE">LIVE</option>
                                        <option value="ARCHIVE">ARCHIVE</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <input type="submit" name="btnSearch" id="btnSearch" defaultValue="Search" className="btn btn-primary" title="Click to search." />
                                </div>
                            </div>
                        </form></div>
                </div>
                <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <div className="GridUi no-header-footer-grid" id="all_transaction">
                            <div id="tblaeps_fingpay_report_wrapper" className="dataTables_wrapper no-footer"><div className="d-flex  justify-content-between align-items-center">
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
                            </div><div id="tblaeps_fingpay_report_processing" className="dataTables_processing" style={{ display: 'none' }}>Processing...</div>
                                <table id="table-to-xlsx" className="table table-striped table-bordered table-hover display fixed_headers dataTable no-footer" style={{ width: 1854 }} role="grid" aria-describedby="tblaeps_fingpay_report_info">
                                    <thead>
                                        <tr role="row"><th className="sorting" tabIndex={0} aria-controls="tblaeps_fingpay_report" rowSpan={1} colSpan={1} style={{ width: '84.4px' }} aria-label="Sr No: activate to sort column ascending">
                                            Sr No
                                        </th>
                                            <th className="sorting_desc" tabIndex={0} aria-controls="tblaeps_fingpay_report" rowSpan={1} colSpan={1} style={{ width: '122.4px' }} aria-sort="descending" aria-label="Txn Date: activate to sort column ascending">
                                                Txn Date
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="tblaeps_fingpay_report" rowSpan={1} colSpan={1} style={{ width: '182.4px' }} aria-label="Transaction Id: activate to sort column ascending">Transaction Id</th><th className="sorting" tabIndex={0} aria-controls="tblaeps_fingpay_report" rowSpan={1} colSpan={1} style={{ width: '141.4px' }} aria-label="Aadhar No: activate to sort column ascending">Aadhar No</th><th className="sorting" tabIndex={0} aria-controls="tblaeps_fingpay_report" rowSpan={1} colSpan={1} style={{ width: '136.4px' }} aria-label="Mobile No: activate to sort column ascending">Mobile No</th><th className="sorting" tabIndex={0} aria-controls="tblaeps_fingpay_report" rowSpan={1} colSpan={1} style={{ width: '159.4px' }} aria-label="Txn Amount: activate to sort column ascending">Txn Amount</th><th className="sorting" tabIndex={0} aria-controls="tblaeps_fingpay_report" rowSpan={1} colSpan={1} style={{ width: '152.4px' }} aria-label="Bank Name: activate to sort column ascending">Bank Name</th><th className="sorting" tabIndex={0} aria-controls="tblaeps_fingpay_report" rowSpan={1} colSpan={1} style={{ width: '135.4px' }} aria-label="Bank RRN: activate to sort column ascending">Bank RRN</th><th className="sorting" tabIndex={0} aria-controls="tblaeps_fingpay_report" rowSpan={1} colSpan={1} style={{ width: '95.4px' }} aria-label="Status: activate to sort column ascending">Status</th><th className="sorting" tabIndex={0} aria-controls="tblaeps_fingpay_report" rowSpan={1} colSpan={1} style={{ width: '121.4px' }} aria-label="Message: activate to sort column ascending">Message</th><th className="sorting" tabIndex={0} aria-controls="tblaeps_fingpay_report" rowSpan={1} colSpan={1} style={{ width: '109.4px' }} aria-label="Receipt: activate to sort column ascending">Receipt</th></tr>
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
                                                45353453454
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                45353453454
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                9834
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                SBI
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                200
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                Pending
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                yes
                                            </td>

                                            <td valign="top" className="dataTables_empty">
                                                yes
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* <div className="dataTables_info" id="tblaeps_fingpay_report_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div><div className="dataTables_paginate paging_simple_numbers" id="tblaeps_fingpay_report_paginate"><a className="paginate_button previous disabled" aria-controls="tblaeps_fingpay_report" data-dt-idx={0} tabIndex={0} id="tblaeps_fingpay_report_previous">Previous</a><span /><a className="paginate_button next disabled" aria-controls="tblaeps_fingpay_report" data-dt-idx={1} tabIndex={0} id="tblaeps_fingpay_report_next">Next</a></div> */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="message">Record Not Found.</div>
                </div> */}
            </div>


        </>
    )
}
export default InsurancedekhoReport
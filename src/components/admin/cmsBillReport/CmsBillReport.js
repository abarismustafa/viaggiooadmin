import ReactHTMLTableToExcel from 'react-html-table-to-excel';
function CmsBillReport() {
    return (
        <>
            <div className="PageHeading">
                <h1>CMS Bill Report</h1>
            </div>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Filter</span></div>
                    <div className="card-body">
                        <form method="post" name="frmBillReport" id="frmBillReport">
                            <input type="hidden" id="hidID" name="hidID" />
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label htmlFor="txtFrom">From Date</label>
                                    <input className="form-control datefield" id="txtFrom" name="txtFrom" type="date" style={{ cursor: 'pointer' }} />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="txtTo">To Date</label>
                                    <input className="form-control datefield" id="txtTo" name="txtTo" type="date" style={{ cursor: 'pointer' }} />
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
                                    <input type="button" name="btnCommSearch" id="btnCommSearch" defaultValue="Search" className="btn btn-primary" title="Click to search." fdprocessedid="u3b59" />
                                </div>
                                <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <input type="button" id="btnExport" name="btnExport" defaultValue="Export" className="btn btn-secondary" onclick="startexoprt()" fdprocessedid="2xov4n" />
                                </div>
                            </div>
                        </form></div>
                    <form id="frmexport" name="frmexport" action="https://m.masterpay.pro/Retailer/cms_bill_report/dataexport" method="POST">
                        <input type="hidden" id="hidfrm" name="from" />
                        <input type="hidden" id="hidto" name="to" />
                        {/* <input type="hidden" id="hidstatus" name="status"> */}
                    </form>
                </div>
                <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <div className="GridUi no-header-footer-grid" id="all_transaction">
                            <div id="tblcms_report_wrapper" className="dataTables_wrapper no-footer"><div className="d-flex  justify-content-between align-items-center">
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
                            </div><div id="tblcms_report_processing" className="dataTables_processing" style={{ display: 'none' }}>Processing...</div>
                                <table id="table-to-xlsx" className="table table-striped table-bordered table-hover display fixed_headers dataTable no-footer" style={{ width: 1854 }} role="grid" aria-describedby="tblcms_report_info">
                                    <thead>
                                        <tr role="row"><th className="sorting" tabIndex={0} aria-controls="tblcms_report" rowSpan={1} colSpan={1} style={{ width: '59.4px' }} aria-label="Sr No: activate to sort column ascending">Sr No</th><th className="sorting_desc" tabIndex={0} aria-controls="tblcms_report" rowSpan={1} colSpan={1} style={{ width: '115.4px' }} aria-sort="descending" aria-label="Biller Name: activate to sort column ascending">Biller Name</th><th className="sorting" tabIndex={0} aria-controls="tblcms_report" rowSpan={1} colSpan={1} style={{ width: '162.4px' }} aria-label="Customer Mobile: activate to sort column ascending">Customer Mobile</th><th className="sorting" tabIndex={0} aria-controls="tblcms_report" rowSpan={1} colSpan={1} style={{ width: '127.4px' }} aria-label="PartnerTxnId: activate to sort column ascending">PartnerTxnId</th><th className="sorting" tabIndex={0} aria-controls="tblcms_report" rowSpan={1} colSpan={1} style={{ width: '68.4px' }} aria-label="Txn ID: activate to sort column ascending">Txn ID</th><th className="sorting" tabIndex={0} aria-controls="tblcms_report" rowSpan={1} colSpan={1} style={{ width: '120.4px' }} aria-label="Txn Amount: activate to sort column ascending">Txn Amount</th><th className="sorting" tabIndex={0} aria-controls="tblcms_report" rowSpan={1} colSpan={1} style={{ width: '137.4px' }} aria-label="Debit Amount: activate to sort column ascending">Debit Amount</th><th className="sorting" tabIndex={0} aria-controls="tblcms_report" rowSpan={1} colSpan={1} style={{ width: '237.4px' }} aria-label="Retailer Commission (CR): activate to sort column ascending">Retailer Commission (CR)</th><th className="sorting" tabIndex={0} aria-controls="tblcms_report" rowSpan={1} colSpan={1} style={{ width: '105.4px' }} aria-label="Txn Status: activate to sort column ascending">Txn Status</th><th className="sorting" tabIndex={0} aria-controls="tblcms_report" rowSpan={1} colSpan={1} style={{ width: '98.4px' }} aria-label="Refunded: activate to sort column ascending">Refunded</th><th className="sorting" tabIndex={0} aria-controls="tblcms_report" rowSpan={1} colSpan={1} style={{ width: '90.4px' }} aria-label="Txn Date: activate to sort column ascending">Txn Date</th><th className="sorting" tabIndex={0} aria-controls="tblcms_report" rowSpan={1} colSpan={1} style={{ width: '80.4px' }} aria-label="Receipt: activate to sort column ascending">Receipt</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr className="odd">
                                            <td valign="top" className="dataTables_empty">
                                                1
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                Pay Panda
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                9845648568
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                2
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                45353453454
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                9834
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                6544
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                200
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                yes
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                No
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                20-08-2022
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                Yes
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* <div className="dataTables_info" id="tblcms_report_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div><div className="dataTables_paginate paging_simple_numbers" id="tblcms_report_paginate"><a className="paginate_button previous disabled" aria-controls="tblcms_report" data-dt-idx={0} tabIndex={0} id="tblcms_report_previous">Previous</a><span /><a className="paginate_button next disabled" aria-controls="tblcms_report" data-dt-idx={1} tabIndex={0} id="tblcms_report_next">Next</a></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default CmsBillReport
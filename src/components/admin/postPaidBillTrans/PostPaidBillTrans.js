import ReactHTMLTableToExcel from 'react-html-table-to-excel';
function PostPaidBillTrans() {
    return (
        <>
            <div classname="PageHeading">
                <h1>Postpaid Bill Transaction</h1>
            </div>

            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Filter</span></div>
                    <div className="card-body">
                        <form action method="post" name="frmCallAction" id="frmCallAction">
                            <table cellSpacing={10} cellPadding={3}>
                                {/* <div class="form-group" >
                              <label>From Date:</label>
                              <div class="input-group date">
                                  <div class="input-group-addon">
                                      <i class="fa fa-calendar"></i>
                                  </div>
                                  <input type="text" class="form-control pull-right" id="datepicker" value="">
                              </div>
                          </div> */}
                                <tbody><tr>
                                    <td style={{ paddingRight: 10 }}>
                                        <label>From Date</label>
                                        <input type="date" name="sdate" id="sdate" className="form-control datefield" />
                                    </td>
                                    <td style={{ paddingRight: 10 }}>
                                        <label>To Date</label>
                                        <input type="date" name="edate" id="edate" className="form-control datefield" />
                                    </td>
                                    <td style={{ paddingRight: 10 }}>
                                        <label>Status</label>
                                        <select className="form-control " style={{ width: 150 }} id="status" name="status" >
                                            <option value="ALL">All</option>
                                            <option value="PENDING">Pending</option>
                                            <option value="SUCCESS">Success</option>
                                            <option value="FAILURE">Failure</option>
                                        </select>
                                    </td>
                                    <td valign="bottom">
                                        <button type="button" id="btn_payu_tranaction" name="btn_payu_tranaction" className="btn btn-primary" fdprocessedid="zssfa"><span>Search</span></button>
                                        <input type="button" id="btnExport" name="btnExport" defaultValue="Export" className="btn btn-success ms-3" onclick="startexoprt()" fdprocessedid="uxvgyr" />
                                    </td>
                                </tr>
                                </tbody></table>
                        </form>
                        <form id="frmexport" name="frmexport" action="#" method="get">
                            <input type="hidden" id="export_sdate" name="export_sdate" defaultValue />
                            <input type="hidden" id="export_edate" name="export_edate" defaultValue />
                            <input type="hidden" id="export_status" name="export_status" defaultValue />
                        </form>
                    </div>
                </div>
                <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <div className="GridUi no-header-footer-grid" id="all_transaction">
                            <div id="tbl_postpaid_transction_wrapper" className="dataTables_wrapper no-footer">
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
                                <div id="tbl_postpaid_transction_processing" className="dataTables_processing" style={{ display: 'none' }}>Processing...</div>
                                <table id="table-to-xlsx" className="table table-striped table-bordered table-hover display fixed_headers dataTable no-footer" style={{ width: 1854 }} role="grid" aria-describedby="tbl_postpaid_transction_info">
                                    <thead>
                                        <tr role="row"><th className="action_th sorting_disabled" width="10px;" rowSpan={1} colSpan={1} style={{ width: '141.4px' }} aria-label="Sr.No">Sr.No</th><th className="action_th sorting_desc" width="5px;" rowSpan={1} colSpan={1} style={{ width: '189.4px' }} aria-label="Request Id">Request Id</th><th className="action_th sorting_disabled" width="5px;" rowSpan={1} colSpan={1} style={{ width: '150.4px' }} aria-label="Biller Name">Biller Name</th><th className="action_th sorting_disabled" width="5px;" rowSpan={1} colSpan={1} style={{ width: '213.4px' }} aria-label="Customer Number">Customer Number</th><th className="action_th sorting_disabled" width="5px;" rowSpan={1} colSpan={1} style={{ width: '186.4px' }} aria-label="Txn Amount">Txn Amount</th><th className="action_th sorting_disabled" width="5px;" rowSpan={1} colSpan={1} style={{ width: '141.4px' }} aria-label="Txn RefId">Txn RefId</th><th className="action_th sorting_disabled" width="5px;" rowSpan={1} colSpan={1} style={{ width: '201.4px' }} aria-label="Approval Ref No">Approval Ref No</th><th className="action_th sorting_disabled" width="5px;" rowSpan={1} colSpan={1} style={{ width: '159.4px' }} aria-label="Status">Status</th><th className="action_th sorting_disabled" width="5px;" rowSpan={1} colSpan={1} style={{ width: '132.4px' }} aria-label="Add Date">Add Date</th></tr>
                                    </thead>
                                    <tbody>
                                        <tr className="odd">
                                            <td valign="top" className="dataTables_empty">
                                                1
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                1
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                PayPanda
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
                                                983453455
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                20-03-2024
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                {/* <div className="dataTables_info" id="tbl_postpaid_transction_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div><div className="dataTables_paginate paging_simple_numbers" id="tbl_postpaid_transction_paginate"><a className="paginate_button previous disabled" aria-controls="tbl_postpaid_transction" data-dt-idx={0} tabIndex={0} id="tbl_postpaid_transction_previous">Previous</a><span /><a className="paginate_button next disabled" aria-controls="tbl_postpaid_transction" data-dt-idx={1} tabIndex={0} id="tbl_postpaid_transction_next">Next</a></div> */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}
export default PostPaidBillTrans
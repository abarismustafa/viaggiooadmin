
function RupayCardReport() {
    return (
        <>
            <div className="PageHeading">
                <h1>Rupay Card Report</h1>
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
                                {/* <div class="form-group col-md-2" style="display:none;">
                                  <label>Data :</label>
                                  <select id="ddldb" name="ddldb" class="form-control" style="width: 100px">
                                      <option value="LIVE">LIVE</option>
                                      <option value="ARCHIVE">ARCHIVE</option>
                                  </select>
                              </div> */}
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
                                    <input type="button" name="btnCommSearch" id="btnCommSearch" defaultValue="Search" className="btn btn-primary" title="Click to search." fdprocessedid="3jdik5" />
                                </div>
                                {/* <div class="form-group col-md-2">
                                  <label>&nbsp;</label>
                                  <input type="button" id="btnExport" name="btnExport" value="Export" class="btn btn-secondary" onClick="startexoprt()">
                              </div> */}
                            </div>
                        </form></div>
                    <form id="frmexport" name="frmexport" action="https://m.masterpay.pro/Retailer/Aeps_paytm_report/dataexport" method="POST">
                        <input type="hidden" id="hidfrm" name="from" />
                        <input type="hidden" id="hidto" name="to" />
                        <input type="hidden" id="hidddldb" name="ddldb" />
                        {/* <input type="hidden" id="hidstatus" name="status"> */}
                    </form>
                </div>
                {/* <div className="modal fade card-gift-atm show" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content ">
                            <button type="button" className="close atm-close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            <div className="card-group atm-card">
                                <div className="card">
                                    <div className="name" id="cardNameModel">SHOUNAK DAS</div>
                                   
                                    <div className="number"><span id="cardNoModel"> 1234 5678 9012 3456</span></div>
                                    <div className="from">
                                        <div className="mr-4">
                                            <small className>Expiry Date :</small><br />
                                            <strong id="cardExpiryModel">10/19</strong>
                                        </div>
                                        <div className="mr-5"><small>CVV :</small><br /><strong id="cardcvvModel">1019</strong></div>
                                    </div>
                                    <div className="amunt "><small>Balance : </small><b id="cardBalance" /></div>
                                    <div className="ring" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <div className="GridUi no-header-footer-grid" id="all_transaction">
                            <div id="tblaquapay_card_report_wrapper" className="dataTables_wrapper no-footer"><div className="d-flex  justify-content-between align-items-center">
                            <div className="dataTables_length" id="myTable_length">
                                <label>Show <select name="myTable_length" aria-controls="myTable" className fdprocessedid="srx8j"><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option><option value={100}>100</option></select> entries</label>
                            </div>
                                <div className="form-group col-md-2">
                                    <label >
                                        Search:
                                    </label>
                                    <input className="form-control datefield" id="txtFrom" name="txtFrom" type="text" style={{ cursor: 'pointer' }} />
                                </div>
                            </div><div id="tblaquapay_card_report_processing" className="dataTables_processing" style={{ display: 'none' }}>Processing...</div><table id="tblaquapay_card_report" className="table table-striped table-bordered table-hover display fixed_headers dataTable no-footer" style={{ width: 1856 }} role="grid" aria-describedby="tblaquapay_card_report_info">
                                <thead>
                                    <tr role="row"><th className="sorting" tabIndex={0} aria-controls="tblaquapay_card_report" rowSpan={1} colSpan={1} style={{ width: '97.4px' }} aria-label="Sr No: activate to sort column ascending">Sr No</th><th className="sorting_desc" tabIndex={0} aria-controls="tblaquapay_card_report" rowSpan={1} colSpan={1} style={{ width: '153.4px' }} aria-sort="descending" aria-label="Card Type: activate to sort column ascending">Card Type</th><th className="sorting" tabIndex={0} aria-controls="tblaquapay_card_report" rowSpan={1} colSpan={1} style={{ width: '179.4px' }} aria-label="User Details: activate to sort column ascending">User Details</th><th className="sorting" tabIndex={0} aria-controls="tblaquapay_card_report" rowSpan={1} colSpan={1} style={{ width: '181.4px' }} aria-label="Card Details: activate to sort column ascending">Card Details</th><th className="sorting" tabIndex={0} aria-controls="tblaquapay_card_report" rowSpan={1} colSpan={1} style={{ width: '180.4px' }} aria-label="Txn Amount: activate to sort column ascending">Txn Amount</th><th className="sorting" tabIndex={0} aria-controls="tblaquapay_card_report" rowSpan={1} colSpan={1} style={{ width: '204.4px' }} aria-label="Debit Amount: activate to sort column ascending">Debit Amount</th><th className="sorting" tabIndex={0} aria-controls="tblaquapay_card_report" rowSpan={1} colSpan={1} style={{ width: '109.4px' }} aria-label="Status: activate to sort column ascending">Status</th><th className="sorting" tabIndex={0} aria-controls="tblaquapay_card_report" rowSpan={1} colSpan={1} style={{ width: '91.4px' }} aria-label="View: activate to sort column ascending">View</th><th className="sorting" tabIndex={0} aria-controls="tblaquapay_card_report" rowSpan={1} colSpan={1} style={{ width: '137.4px' }} aria-label="Message: activate to sort column ascending">Message</th><th className="sorting" tabIndex={0} aria-controls="tblaquapay_card_report" rowSpan={1} colSpan={1} style={{ width: '145.4px' }} aria-label="Add Date: activate to sort column ascending">Add Date</th></tr>
                                </thead>
                                <tbody>
                                    <tr className="odd"><td valign="top" colSpan={10} className="dataTables_empty">No data available in table</td></tr></tbody>
                            </table>
                                {/* <div className="dataTables_info" id="tblaquapay_card_report_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div><div className="dataTables_paginate paging_simple_numbers" id="tblaquapay_card_report_paginate"><a className="paginate_button previous disabled" aria-controls="tblaquapay_card_report" data-dt-idx={0} tabIndex={0} id="tblaquapay_card_report_previous">Previous</a><span /><a className="paginate_button next disabled" aria-controls="tblaquapay_card_report" data-dt-idx={1} tabIndex={0} id="tblaquapay_card_report_next">Next</a></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default RupayCardReport
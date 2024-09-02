
function TurboPaymentRequest() {

    return (
        <>
            <div className="PageHeading">
                <h1>Turbo E Payment Request </h1>
            </div>
            <div className="ContentArea">
                {/* <div class="card p-2 mb-3 rounded">
              <div class="text-danger">
                  <p class="mb-1"><strong>Pay Attention:</strong>If you will accept payment by today On Demand Settlement charges will be applied.</p>
                  <p class="mb-0"><strong>ध्यान दें:</strong> यदि आपको आज तक भुगतान प्राप्त हो जाता है तो ऑन डिमांड सेटलमेंट चार्जर लागू किया जाएगा।</p>
              </div>
          </div> */}
                <div className="card p-2 mb-3 rounded">
                    <div className="text-danger">
                        <p className="mb-1" style={{ color: '#1e5591' }}><strong>Pay Attention:</strong> Amount will be credited to your wallet by the tomorrow at 11am.</p>
                        {/* <p class="mb-0"><strong>ध्यान दें:</strong> ऑन डिमांड सेटलमेंट चार्ज सुबह 9:00 बजे से शाम 6:00 बजे तक फ्री रहेगा।</p> */}
                    </div>
                </div>
                <div className="card">
                    <div className="card-header" style={{ display: 'none' }}><span>Filter</span></div>
                    <div className="card-body" style={{ display: 'none' }}>
                        <form method="post" name="frmBillReport" id="frmBillReport">
                            <input type="hidden" id="hidID" name="hidID" />
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label htmlFor="txtFrom">From Date</label>
                                    <input className="form-control datefield" defaultValue id="txtFrom" name="txtFrom" type="text" style={{ cursor: 'pointer' }} readOnly="readonly" placeholder="Select Date" />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="txtTo">To Date</label>
                                    <input className="form-control datefield" id="txtTo" defaultValue name="txtTo" type="text" style={{ cursor: 'pointer' }} readOnly="readonly" placeholder="Select Date" />
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
                                    <input type="button" name="btnCommSearch" id="btnCommSearch" defaultValue="Search" className="btn btn-primary" title="Click to search." />
                                </div>
                                <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <input type="button" id="btnExport" name="btnExport" defaultValue="Export" className="btn btn-secondary" onclick="startexoprt()" />
                                </div>
                            </div>
                        </form></div>
                    {/* <form id="frmexport" name="frmexport" action="https://m.masterpay.pro/Retailer/turbo_payment_request/dataexport" method="POST">
                  <input type="hidden" id="hidfrm" name="from">
                      <input type="hidden" id="hidto" name="to">
                          <input type="hidden" id="hidstatus" name="status">
                          </form> */}
                </div>
                <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <div className="well" style={{ display: 'none' }}>
                        </div>
                        <div className="well" id="errMsgWell" style={{ display: 'none' }}><font id="errMsg" /></div>
                        <div className="GridUi no-header-footer-grid" id="all_transaction">
                            <span><button className="btn btn-primary" id="btnRefresh" style={{ marginBottom: 10 }} fdprocessedid="0hm0e">Refresh</button></span>
                            <div id="tblturbo_payment_request_wrapper" className="dataTables_wrapper no-footer"><div className="d-flex  justify-content-between align-items-center">
                            <div className="dataTables_length" id="myTable_length">
                                <label>Show <select name="myTable_length" aria-controls="myTable" className fdprocessedid="srx8j"><option value={10}>10</option><option value={25}>25</option><option value={50}>50</option><option value={100}>100</option></select> entries</label>
                            </div>
                                <div className="form-group col-md-2">
                                    <label >
                                        Search:
                                    </label>
                                    <input className="form-control datefield" id="txtFrom" name="txtFrom" type="text" style={{ cursor: 'pointer' }} />
                                </div>
                            </div><div id="tblturbo_payment_request_processing" className="dataTables_processing" style={{ display: 'none' }}>Processing...</div><table id="tblturbo_payment_request" className="table table-striped table-bordered table-hover display fixed_headers no-footer dataTable" style={{ width: 1856 }} role="grid" aria-describedby="tblturbo_payment_request_info">
                                <thead>
                                    <tr role="row"><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '95.4px' }}>Sr No</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '225.4px' }}>Payment Action</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '178.4px' }}>Txn Amount</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '203.4px' }}>Payment Date</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '187.4px' }}>Reference ID</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '79.4px' }}>UTR</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '88.4px' }}>Type</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '214.4px' }}>Remitter Name</th><th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: '245.4px' }}>Remitter Account</th></tr>
                                </thead>
                                <tbody>
                                    <tr className="odd"><td valign="top" colSpan={9} className="dataTables_empty">No data available in table</td></tr></tbody>
                            </table>
                                {/* <div className="dataTables_info" id="tblturbo_payment_request_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div><div className="dataTables_paginate paging_simple_numbers" id="tblturbo_payment_request_paginate"><a className="paginate_button previous disabled" aria-controls="tblturbo_payment_request" data-dt-idx={0} tabIndex={0} id="tblturbo_payment_request_previous">Previous</a><span /><a className="paginate_button next disabled" aria-controls="tblturbo_payment_request" data-dt-idx={1} tabIndex={0} id="tblturbo_payment_request_next">Next</a></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default TurboPaymentRequest
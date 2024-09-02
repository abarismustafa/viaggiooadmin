import ReactHTMLTableToExcel from 'react-html-table-to-excel';
function SearchRechargeHistory() {
    return (
        <>
            <div className="PageHeading">
                <h1>Search Recharge Report</h1>
            </div>

            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Filter</span></div>
                    <div className="card-body">
                        <form action="# " method="post" name="frmCallAction" id="frmCallAction">
                            <input type="hidden" id="hidID" name="hidID" />
                            <div className="form-row" style={{ alignItems: 'end' }}>
                                <div className="form-group col-md-2">
                                    <label htmlFor="txtNumId">Mobile Number</label>
                                    <input className="form-control" id="txtNumId" name="txtNumId" type="number" placeholder="Mobile No" />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="ddldb">Data</label>
                                    <select id="ddldb" name="ddldb" className="form-control" >
                                        <option value="LIVE" selected>LIVE</option>
                                        <option value="ARCHIVE">ARCHIVE</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <input type="submit" id="btnSearch" name="btnSearch" defaultValue="Search" className="btn btn-primary" fdprocessedid="zyyh5n" />
                                </div>
                                <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <input type="button" id="btnExport" name="btnExport" defaultValue="Export" className="btn btn-secondary" onclick="startexoprt()" fdprocessedid="bywwad" />
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
                <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-success cusxel"
                            table="table-to-xlsx"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download Excel sheet" />
                        <div className="GridUi no-header-footer-grid mt-3" id="all_transaction">
                            <div id="rechargehistorytbl_wrapper" className="dataTables_wrapper">

                                <table id="rechargehistorytbl" className="table table-striped table-bordered table-hover display fixed_headers dataTable" style={{ width: 1250 }} role="grid" aria-describedby="rechargehistorytbl_info">
                                    <thead>
                                        <tr role="row">
                                            <th className="sorting_asc" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Sr No: activate to sort column descending">
                                                Sr No
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Recharge ID: activate to sort column ascending">
                                                Recharge ID
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Txn Id: activate to sort column ascending">
                                                Txn Id
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Recharge  DateTime: activate to sort column ascending">
                                                Recharge <br />
                                                DateTime</th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Company Name: activate to sort column ascending">
                                                Company Name</th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Mobile No: activate to sort column ascending">
                                                Mobile No
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Amount: activate to sort column ascending">
                                                Amount
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Debit Amount: activate to sort column ascending">
                                                Debit Amount
                                            </th>
                                            <th className="action_th sorting_disabled" rowSpan={1} colSpan={1} aria-label="Status">Status</th><th className="action_th sorting_disabled" rowSpan={1} colSpan={1} aria-label="Complain">Complain</th></tr>
                                    </thead>
                                    <tbody>
                                        {/* <tr className="odd"><td valign="top" colSpan={10} className="dataTables_empty">{(i + 1) + (page * count)}</td></tr> */}
                                        <tr className="odd"><td valign="top" colSpan={10} className="dataTables_empty">No data available in table</td></tr>
                                        </tbody>
                                    {/* <tfoot>
                                    <tr><th rowSpan={1} colSpan={1} /><th rowSpan={1} colSpan={1} /><th rowSpan={1} colSpan={1} /><th rowSpan={1} colSpan={1} /><th rowSpan={1} colSpan={1} /><th rowSpan={1} colSpan={1}>Total :</th><th rowSpan={1} colSpan={1}>0</th><th rowSpan={1} colSpan={1}>0</th><th rowSpan={1} colSpan={1} /><th rowSpan={1} colSpan={1} /></tr>
                                </tfoot> */}
                                </table>
                                {/* <div className="dataTables_info" id="rechargehistorytbl_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div><div className="dataTables_paginate paging_simple_numbers" id="rechargehistorytbl_paginate"><a className="paginate_button previous disabled" aria-controls="rechargehistorytbl" data-dt-idx={0} tabIndex={0} id="rechargehistorytbl_previous">Previous</a><span /><a className="paginate_button next disabled" aria-controls="rechargehistorytbl" data-dt-idx={1} tabIndex={0} id="rechargehistorytbl_next">Next</a></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default SearchRechargeHistory

function BankList() {
    return (
        <>
            <div className="PageHeading">
                <h1>Bank List</h1>
            </div>

            <div className="ContentArea">
                <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <div className="GridUi no-header-footer-grid" id="all_transaction">
                            <table id="rechargehistorytbl" className="table table-striped table-bordered table-hover display fixed_headers" style={{ width: 1100 }}>
                                <thead>
                                    <tr>
                                        <th>Sr No</th>
                                        <th>Bank Name</th>
                                        <th>Branch Name</th>
                                        <th>Account Number</th>
                                        <th>IFSC Code</th>
                                    </tr>
                                </thead>
                                <tbody><tr className="row1">
                                    <td>1</td>
                                    <td>Bank of India</td>
                                    <td>Vapi Gujarat</td>
                                    <td>290620110000778
                                    </td>
                                    <td>BKID0002906</td>
                                </tr>
                                    <tr className="row2">
                                        <td>2</td>
                                        <td>ICICI Bank Ltd.</td>
                                        <td>Palace Road, Rajkot Gujarat</td>
                                        <td>138305500448
                                        </td>
                                        <td>ICIC0001383</td>
                                    </tr>
                                    <tr className="row1">
                                        <td>3</td>
                                        <td>State Bank of India</td>
                                        <td>University Road, Rajkot Gujarat</td>
                                        <td>33833357971
                                        </td>
                                        <td>SBIN0060390</td>
                                    </tr>
                                    <tr className="row2">
                                        <td>4</td>
                                        <td>Axis Bank Ltd.</td>
                                        <td>govandi, mumbai branch</td>
                                        <td>918020066492188
                                        </td>
                                        <td>UTIB0002933</td>
                                    </tr>
                                </tbody></table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default BankList
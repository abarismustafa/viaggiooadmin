

function BillPaymentReport() {
    return (
        <>
            <div className="PageHeading">
                <h1>Bill Payment Report</h1>
            </div>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Filter</span></div>
                    <div className="card-body">
                        <form action="" method="post" name="frmReport" id="frmReport">
                            <input type="hidden" id="hidID" name="hidID" />
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label htmlFor="txtFrom">From Date</label>
                                    <input className="form-control datefield" defaultValue="2023-11-27" id="txtFrom" name="txtFrom" type="text" style={{ cursor: 'pointer' }} readOnly="readonly" placeholder="Select Date" />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="txtTo">To Date</label>
                                    <input className="form-control datefield" id="txtTo" defaultValue="2023-11-27" name="txtTo" type="text" style={{ cursor: 'pointer' }} readOnly="readonly" placeholder="Select Date" />
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
                                    <input type="submit" id="btnSearch" name="btnSearch" defaultValue="Search" className="btn btn-primary" />
                                </div>
                            </div>
                        </form></div>
                </div>
                <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <div className="message">Record Not Found.</div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default BillPaymentReport
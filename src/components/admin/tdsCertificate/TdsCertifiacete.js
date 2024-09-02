
function TdsCertificate() {
    return (
        <>
            <div className="PageHeading">
                <h1>Transaction Password</h1>
            </div>
            <div className="ContentArea">
            <div className="card mt-4" style={{ overflow: 'auto' }}>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="width33">Period</th>
                                <th className="width33">Download Certificate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td colSpan={3}><center>No records found!</center></td></tr></tbody>
                    </table>
                </div>
            </div>
            </div>

        </>
    )
}
export default TdsCertificate
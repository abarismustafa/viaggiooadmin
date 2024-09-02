

function ResentTransition() {
    return (
        <>
            <div className="col-md-7 col-sm-12 mobileTopSpacing ng-scope" ng-controller="mobileCtrl">
                <h2 className="SecTitle">Recent Transaction<p className="all-pm-0 float-right"><i className="fa fa-refresh" ng-click="updateMobile()" /></p></h2>
                <div className="GridUi no-header-footer-grid">
                    <table className="DataTableGrid display responsive dataTable" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Mobile no.</th>
                                <th>Operator</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* ngRepeat: mobileRec in mobileRecharges */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default ResentTransition
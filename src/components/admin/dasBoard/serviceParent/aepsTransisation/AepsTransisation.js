
import { Link } from 'react-router-dom'
import aeps1 from '../../../../../asesets/adminImage/AEPS-Logo.png'

import aepsLogo from '../../../../../asesets/adminImage/pngtree-letter-e-logo-png-image_3976626.png'
function AepsTransisation() {
    return (
        <>
            <div className="tab-pane fade active show in" id="AEPS" role="tabpanel" aria-labelledby="AEPSTab">
                <div className="row">
                    <div className="col-md-5 col-sm-12">
                        <h2 className="SecTitle custom-ttl">AEPS</h2>
                        <div className="aeps-block">
                            <div className="aeps-logo"><img src={aeps1} alt="AEPS" /></div>
                            <p className="mt-2">Click below button to proceed for AEPS:</p>
                            <form id="frmaesps" action="" method="POST" target="_blank" autoComplete="off" className="ng-pristine ng-valid">
                                <input type="hidden" id="paramaepspl" name="params" />
                            </form>


                            <div className="d-flex align-items-stretch justify-content-between AEPS-buttons">
                                <Link to="/admin/Aeps_paytm/checkPaytm" className="card  d-flex flex-column align-items-center  mr-1" style={{ position: 'relative', padding: '8px 10px' }}  >
                                    <i className="icon">
                                        <img src={aepsLogo} alt="" style={{ width: '30px', height: '30x' }} />
                                    </i>
                                    AEPS <br />
                                    (Tez)<br />
                                    <span className="new-service-blinking mt-1" style={{ display: 'block', fontSize: 8, color: '#ffffff', padding: '2px 3px' }}> No KYC Required</span></Link>
                                <Link to='/admin/aepsfino/useronboard' style={{ padding: '8px 10px' }} className="card  d-flex flex-column  align-items-center mr-1" ><i className="icon">
                                    <img src={aepsLogo} alt="" style={{ width: '30px', height: '30x' }} />
                                </i>AEPS (Xpress)</Link></div>
                        </div>
                    </div>
                    <div className="col-md-7 col-sm-12 mobileTopSpacing ng-scope" ng-controller="aepsCtrl">
                        <h2 className="SecTitle">Recent Transaction<p className="all-pm-0 float-right"><i className="fa fa-refresh" ng-click="updateAeps()" /></p></h2>
                        <div className="GridUi no-header-footer-grid">
                            <table className="DataTableGrid display responsive dataTable" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Mobile No.</th>
                                        <th>PAN</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* ngRepeat: aepsRec in aepsRecharges */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default AepsTransisation
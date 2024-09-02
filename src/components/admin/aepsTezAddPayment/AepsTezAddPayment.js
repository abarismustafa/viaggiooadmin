

function AepsTezAddPayment() {
    return (
        <>
            <div className="PageHeading withimg">
                <h1>Users OnBoard : Master Pay</h1>
            </div>
            <div className="ContentArea">
                <div className="card" style={{ marginBottom: 5 }}>
                    <div className="well" style={{ display: 'none' }}>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <form name="frm-paytm-kyc" method="post" action="" id="frm-paytm-kyc" style={{ marginTop: 0 }}>
                                    <div className="form-group">
                                        <label htmlFor="wap_state">Select State</label>
                                        <select className="form-control" name="wap_state" id="wap_state" >
                                            <option value>Select State Name</option>
                                            <option value={1}>
                                                Andaman and Nicobar Islands ( AN )                       </option>
                                            <option value={29}>
                                                Odisha ( OR )                       </option>
                                            <option value={31}>
                                                Pondicherry ( PY )                       </option>
                                            <option value={32}>
                                                Punjab ( PB )                       </option>
                                            <option value={33}>
                                                Rajasthan ( RJ )                       </option>
                                            <option value={34}>
                                                Sikkim ( SK )                       </option>
                                            <option value={35}>
                                                Tamil Nadu ( TN )                       </option>
                                            <option value={36}>
                                                Telangana ( TG )                       </option>
                                            <option value={37}>
                                                Tripura ( TR )                       </option>
                                            <option value={38}>
                                                Uttar Pradesh ( UP )                       </option>
                                            <option value={39}>
                                                Uttarakhand ( UK )                       </option>
                                            <option value={41}>
                                                West Bengal ( WB )                       </option>
                                        </select><input type="hidden" name="hidStateCode" id="hidStateCode" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="wap_city">Select City</label>
                                        <select className="form-control" name="wap_city" id="wap_city" required="required" fdprocessedid="07g0g">
                                            <option value>Select City Name</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="wap_pincode">Enter Pincode</label>
                                        <input className="form-control" name="wap_pincode" id="wap_pincode" minLength={6} maxLength={6} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="wap_address">Enter Address</label>
                                        <textarea className="form-control" name="wap_address" id="wap_address" minLength={18} />
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary" type="submit" fdprocessedid="wje4u">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
export default AepsTezAddPayment
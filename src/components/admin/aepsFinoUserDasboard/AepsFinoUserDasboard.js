
function AepsFinoUserDasboard() {
    return (
        <>
            <div className="PageHeading">
                <h1>Aeps Fino</h1>
            </div>

            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>User Onboard</span><span style={{ color: 'blue' }}>(Please enter details as per your aadhaar card)</span></div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-5">
                                <form name="userOnboard" data-toggle="validator" method="post" id="userOnboard" action="" style={{ marginTop: 0 }}>
                                    <input type="hidden" id="rdsname" defaultValue /><input type="hidden" id="rdsstatus" defaultValue />
                                    <div className="form-group">
                                        <label htmlFor="user_pan"><strong>Pan Number</strong></label>
                                        <input type="text" defaultValue="MUSTAFA123456H" name="user_pan" id="user_pan" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="user_mobile"><strong>Mobile Number</strong></label>
                                        <input type="text" defaultValue={4343424243} name="user_mobile" id="user_mobile" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="user_name"><strong>Name</strong></label>
                                        <input type="text" id="user_name" name="user_name" className="form-control" maxLength={50} autoComplete="off" tabIndex={1} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="user_state"><strong>State</strong></label>
                                        <select name="user_state" id="user_state" autoComplete="off" tabIndex={2} required className="form-control">
                                            <option value>Please select</option>
                                        </select>

                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="user_city"><strong>City</strong></label>
                                        <select name="user_city" id="user_city" autoComplete="off" tabIndex={3} required className="form-control">
                                            <option value>Please select</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="user_pincode"><strong>Pincode</strong></label>
                                        <input type="text" id="user_pincode" name="user_pincode" className="form-control" maxLength={6} autoComplete="off" tabIndex={4} required />
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary" tabIndex={5}>Submit</button>
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
export default AepsFinoUserDasboard
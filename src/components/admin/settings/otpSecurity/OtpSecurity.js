
function OtpSecurity() {
    return (
        <>
            <div className="PageHeading">
                <h1>OTP Security</h1>
            </div>
            <div className="ContentArea">
            <div className="card">
                <div className="card-header"><span>Login OTP</span></div>
                <div className="card-body">
                    <form method="post" action="" onsubmit="javascript:return actionService();" autoComplete="off">

                        <div className="form-row">
                            <div className="col-md-4">
                                <div className="col-md-12 form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="txtLoginOTP">Start Service</label>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input type="radio" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="txtLoginOTP">Stop Service</label>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input type="radio" name="txtLoginOTP" id="txtLoginOTP" />
                                    </div>
                                </div>
                                <div className="FormButtons mt-2">
                                    <button type="submit" name="btnsave" value="Save" className="btn btn-primary" fdprocessedid="ketvqp">Submit</button>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <p className="terms_to_off">With 2FA (2 Factor Authentication) an extra layer of security is added to your account.</p>
                                <p className="terms_to_off">We are sending you a One-Time-Password ("OTP"), which you confirm
                                    by entering the OTP to confirm your identity, while using our Platform.</p>
                                <p className="terms_to_off">OTP is sent to your registered mobile number to verify your identity and
                                    for maintaining your account security.</p>
                                <p className="terms_to_off">Hence, we would advice to opt for the two-factor authentication –<br />
                                    1) Login Password<br />
                                    2) OTP (received on your registered mobile number).</p>
                                <p className="terms_to_off">
                                    If, you do not opt for the second step - OTP authentication, then you will
                                    be solely liable for any security breach. “MasterPay” does not accept any
                                    responsibility for any loss caused due to unauthorised access to your
                                    account. Do not share your login credentials or OTP with anyone.
                                    MasterPay never asks for your login credentials or OTP.</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </div>

        </>
    )
}
export default OtpSecurity
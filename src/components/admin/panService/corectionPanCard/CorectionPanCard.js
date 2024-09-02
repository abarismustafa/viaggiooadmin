
function CorectionPanCard() {
    return (
        <>
            <div className="PageHeading">
                <h1>Pan Services</h1>
            </div>
            <div className="ContentArea">
                <div className="card">

                    <div className="card-header"><span>Correction Pan Card</span></div>
                    <div className="card-body">
                        <form action="" method="post" name="frmReport" id="frmReport">
                            <input type="hidden" id="hidID" name="hidID" />
                            <div className="form-row" style={{ alignItems: 'end' }}>
                                <div className="col-lg-6">
                                    <div className="form-row" style={{ alignItems: 'end' }}>

                                        <div className="form-group col-lg-12">
                                            <label htmlFor="txtUserId">PAN Number <span style={{ color: 'red' }}>*</span></label>

                                            <input type="text" name="end_date" id="account_no" className="form-control" placeholder='Enter PAN Numbe' />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label htmlFor="txtUserId">Aadhaar(Only for Individual) <span style={{ color: 'red' }}>*</span></label>

                                            <input type="number" name="end_date" id="account_no" className="form-control" placeholder='Enter Aadhaar(Only for Individual)' />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="txtUserId">Date of Birth <span style={{ color: 'red' }}>*</span></label>

                                            <input type="date" name="end_date" id="account_no" className="form-control" placeholder='Enter Middle Name' />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label htmlFor="txtUserId">GSTN (Optional) </label>

                                            <input type="text" name="end_date" id="account_no" className="form-control" placeholder='Enter GSTN (Optional)' />
                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-row" style={{ alignItems: 'end' }}>

                                        <div className="form-group col-lg-12">
                                            <h3>Instructions:</h3>
                                            <p>1. This facility can be availed by those PAN holders whose latest PAN application was processed through Protean (formerly NSDL e-Governance Infrastructure Limited) or have obtained PAN using ‘Instant e-PAN’ facility on e-filling portal of ITD.</p>
                                            <p>2. Click here to download e-PAN card free of cost (For PANs allotted/changes confirmed by ITD in last 30 days).</p>
                                            <p>3. Charges for Reprint of PAN card:
                                                • For dispatch of PAN card within India(inclusive of taxes) -
                                                Rs 50.00
                                                • For dispatch of PAN card outside India(inclusive of taxes) -
                                                Rs 959.00</p>
                                            <p>4. PAN card will be dispatched to the communication address as per the latest details available with Income Tax Department.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-md-12">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.
                                        </label>
                                    </div>

                                </div>
                                <div className="form-group col-md-12 text-align-center">
                                    <label>&nbsp;</label>
                                    <button type="button" className="btn btn-primary mr-3" >
                                        Submit

                                    </button>
                                    {/* <button type="button" className="btn btn-warning" >Reset</button> */}
                                </div>

                            </div>
                        </form>
                    </div>

                </div >


            </div >
        </>
    )
}
export default CorectionPanCard
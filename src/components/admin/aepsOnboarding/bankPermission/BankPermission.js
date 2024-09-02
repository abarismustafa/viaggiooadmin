

function BankPermission({ bank2, bank3 }) {
    return (
        <>
            {/* <div className="PageHeading">
                <h1>Aeps OnBoarding</h1>
            </div> */}
            <div className="ContentArea"><div className="card">
                <div className="card-header">
                    {/* <span>Search</span> */}
                    {bank2 && <p className="alert alert-2 py-1 px-2 d-inline-block"><b>Note :</b> <strong>{bank2}</strong> </p>}
                    {bank3 && <p className="alert alert-2 py-1 px-2 d-inline-block"><b>Note :</b> <strong>{bank3}</strong> </p>}
                </div>
                <div className="checked">
                    <button type="button" className="btn btn-success">Check</button>
                </div>
            </div>
            </div >
        </>
    )
}
export default BankPermission
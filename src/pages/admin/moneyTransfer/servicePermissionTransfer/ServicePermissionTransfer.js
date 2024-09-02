

function ServicePermissionTransfer({ activeMessage, buyMessage }) {
    return (
        <>
            <div className="PageHeading"><h1>Domestic Money Transfer</h1></div>
            <div className="ContentArea"><div className="card">
                <div className="card-header">
                    {/* <span>Search</span> */}
                    {activeMessage && <p className="alert alert-2 py-1 px-2 d-inline-block"><b>Note :</b> <strong>{activeMessage}</strong> </p>}
                    {buyMessage && <p className="alert alert-2 py-1 px-2 d-inline-block"><b>Note :</b> <strong>{buyMessage}</strong> </p>}
                </div>
            </div >
            </div >
        </>
    )
}
export default ServicePermissionTransfer
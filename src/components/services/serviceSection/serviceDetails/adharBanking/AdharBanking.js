import adhar from '../../../../../asesets/service/adhar-banking.svg'
function AdharBanking() {
    return (
        <>
            <div id="AEPSBanking" className="List uk-scrollspy-inview uk-animation-slide-bottom" style={{ backgroundColor: 'rgba(235, 202, 217, 0.7)' }}>
                <div className="Wrapper">
                    <div className="ListInner">
                        <div className="images">
                            <img src={adhar} alt="img" />
                        </div>
                        <div className="Content">
                            <div className="Title">
                                <h3>Aadhaar Banking (AEPS)</h3>
                                <p>Banking Services made easy – anytime, anywhere</p>
                            </div>
                            <div className="Text">
                                <p className="mb-4">Now, withdrawing cash from your bank account has become safe and easier than never before. The Customers do not need to visit Bank branches or ATMs for basic banking functions like cash withdrawal or balance enquiry. They just need to visit their nearest MasterPay Retail store! MasterPay Retailer can provide their customers with Aadhaar Banking service through AEPS(Aadhaar Enabled Payment System) powered digital banking service.</p>
                                <p>Through MasterPay’s Aadhaar Banking Service, the Retailers can help their Customers to conduct banking transactions with their Aadhaar number and  finger authentication.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default AdharBanking
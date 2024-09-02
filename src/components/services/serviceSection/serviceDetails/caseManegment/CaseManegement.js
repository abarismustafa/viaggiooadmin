import caseMan from '../../../../../asesets/service/CMS.svg'
function CaseManegement() {
    return (
        <>
            <div id="CMServices" className="List uk-scrollspy-inview uk-animation-slide-bottom" style={{ backgroundColor: 'rgba(247, 229, 217, 0.7)' }}>
                <div className="Wrapper">
                    <div className="ListInner">
                        <div className="images">
                            <img src={caseMan} alt="img" />
                        </div>
                        <div className="Content">
                            <div className="Title">
                                <h3>Cash Management Services (CMS)</h3>
                                <p>Cash Management Services made simple and easy</p>
                            </div>
                            <div className="Text">
                                <p className="mb-4">Now, payments of EMIs, cash drops of E-commerce companies, Hyperlocal delivery companies, etc. have been made easy, convenient and simpler. MasterPay retailer can provide these services to their customers without any hassles.</p>
                                <p>Customers do not need to search any bank or the company’s branches, Customers just need to visit their nearest MasterPay Retail store! MasterPay Retailer can provide their customers with CMS facility anytime of the day.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default CaseManegement
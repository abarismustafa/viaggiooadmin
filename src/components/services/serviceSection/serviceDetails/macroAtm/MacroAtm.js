
import micro from '../../../../../asesets/service/insurance.svg'
function MacroAtm() {
    return (
        <>
            <div id="MicroATM" className="List uk-scrollspy-inview uk-animation-slide-bottom" style={{ backgroundColor: 'rgb(249, 217, 217)' }}>
                <div className="Wrapper">
                    <div className="ListInner">
                        <div className="images">
                            <img src={micro} alt="img" />
                        </div>
                        <div className="Content">
                            <div className="Title">
                                <h3>MICRO ATMs</h3>
                                <p>Banking Services made easy – anytime, anywhere</p>
                            </div>
                            <div className="Text">
                                <p className="mb-4">Now, withdrawing cash from your bank account has become safe and easier than never before. The Customers do not need to visit Bank branches or ATMs for basic banking functions like cash withdrawal or balance enquiry. They just need to visit their nearest MasterPay Retail store! MasterPay Retailers can provide their customers with Micro ATM Services at his Store with ease and convenience.</p>
                                <p>Through MasterPay’s MATM Service, the Retailers can help their Customers to conduct banking transactions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default MacroAtm

import bill from '../../../../../asesets/service/bill-payment.svg'
function BillPayment() {
    return (
        <>
            <div id="BillPayment" className="List uk-scrollspy-inview uk-animation-slide-bottom" style={{ backgroundColor: 'rgba(246, 214, 214, 0.7)' }}>
                <div className="Wrapper">
                    <div className="ListInner">
                        <div className="images">
                            <img src={bill} alt="img" />
                        </div>
                        <div className="Content">
                            <div className="Title">
                                <h3>Bill Payments</h3>
                                <p>Bill Payments made simple and easy</p>
                            </div>
                            <div className="Text">
                                <p className="mb-4">Utility Bill Payments being a day to day requirement, a MasterPay retailer can provide Utility Bill Payment services of all the Operators in India to their customers without any hassles.</p>
                                <p>Customers can just walk in  and get their electricity, water, gas, mobile, etc. bills paid easily in a secure way using the services provided at MasterPay Retail store. While MasterPay retailers get to provide their customers with more services; they also earn an extra income by rendering these services.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default BillPayment
import img from '../../../../../asesets/service.svg'
function TransferMoney() {
    return (
        <>
            <div id="DMTransfer" className="List uk-scrollspy-inview uk-animation-slide-bottom" style={{ backgroundColor: 'rgba(186, 228, 244, 0.7)' }}>
                <div className="Wrapper">
                    <div className="ListInner">
                        <div className="images">
                            <img src={img} alt="img" />
                        </div>
                        <div className="Content">
                            <div className="Title">
                                <h3>Domestic Money Transfer</h3>
                                <p>Money Transfers made Simple, Swift and Safe- anytime, anywhere</p>
                            </div>
                            <div className="Text">
                                <p className="mb-4">Now, transferring money has become safe, easier and simple than never before. The Customers do not need to visit Bank branches for transferring money, they just need to visit their nearest MasterPay Retail store! MasterPay Retailer can meet the remittance need of migrants, unbanked and underbanked population of India with Money Transfer facility anytime of the day.
                                </p>
                                <p>Through MasterPay’s Money Transfer Service, the Retailers can help their Customers to transfer money to any bank account in India, instantly at anytime, anywhere even after banking hours and on bank holidays.The sender do not need to have a bank account to transfer money to his near and dear ones, he just needs to pay a minimal transaction fee to the Retailer to execute the transaction.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default TransferMoney
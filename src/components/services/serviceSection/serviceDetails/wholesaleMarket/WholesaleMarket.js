import whole from '../../../../../asesets/service/wholesale-market.svg'
function WholesaleMarket() {
    return (
        <>
            <div id="WhilesaleMarket" className="List uk-scrollspy-inview uk-animation-slide-bottom" style={{ backgroundColor: 'rgb(210, 226, 248)' }}>
                <div className="Wrapper">
                    <div className="ListInner">
                        <div className="images">
                            <img src={whole} alt="img" />
                        </div>
                        <div className="Content">
                            <div className="Title">
                                <h3>Wholesale Market</h3>
                                <p>Selling made simple and easy</p>
                            </div>
                            <div className="Text">
                                <p className="mb-4">Become a Vendor, start selling on MasterPay – your next big sales channel. Multiply your customers, increase your income with MasterPay.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default WholesaleMarket
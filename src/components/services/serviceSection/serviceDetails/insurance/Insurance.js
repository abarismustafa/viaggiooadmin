

import insurence from '../../../../../asesets/service/wholesale-market.svg'
function Insurance() {
    return (
        <>
            <div id="Insurance" className="List uk-scrollspy-inview uk-animation-slide-bottom" style={{ backgroundColor: 'rgb(230, 221, 244)' }}>
                <div className="Wrapper">
                    <div className="ListInner">
                        <div className="images">
                            <img src={insurence} alt="img" />
                        </div>
                        <div className="Content">
                            <div className="Title">
                                <h3>Insurance</h3>
                                <p>Best Plans from Leading Insurers</p>
                            </div>
                            <div className="Text">
                                <p className="mb-4">With less than 3% of India currently insured, you have the opportunity to make a real difference
                                    while also enjoying financial rewards. Earn respect and financial success by becoming a part of our
                                    mission to provide reliable insurance coverage for all.</p>
                                <p>Introducing a variety of budget-friendly general insurance plans, tailored to your needs. Among our
                                    offerings is comprehensive bike and motor insurance, ensuring that you and your vehicle stay
                                    protected without breaking the bank. Take a step towards safeguarding your valuable assets and
                                    enjoy peace of mind while you're on the road. Explore our range today!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Insurance
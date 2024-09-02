import BannerFoot from "../../common/bannerFoot/BannerFoot"



function RefundCancilation() {
    return (
        <>
            <BannerFoot />
            <section className="ContainerMain">
                <div className="Wrapper cms-content">
                    <h1 uk-scrollspy="cls: uk-animation-slide-bottom; repeat: false" style={{}} className="uk-scrollspy-inview uk-animation-slide-bottom">REFUND &amp; CANCELLATION POLICY</h1>
                    <p>Once a value is debited from your payment instrument/bank account and you have received the same value in your LB Enterprise Id, there is no cancellation or refund permitted for such transaction. However, if in a transaction performed by You on the LB Enterprise Platform, an amount has been charged to Your card or bank account and a value is not delivered within 24 hours of the completion of the transaction, then You shall inform us by sending an e mail to our customer services e mail address mentioned on the ‘Contact Us’ page on the LB Enterprise Platform. Please include in the e-mail the following details – value, transaction date and order number. LB Enterprise will investigate the incident and, if it is found that money was indeed charged to Your card or bank account without delivery of the value, then You will be refunded the amount within 21 working days from the date of receipt of Your e mail. All refunds will be credited to the instrument that was charged. </p>
                </div>
            </section>

        </>
    )
}
export default RefundCancilation
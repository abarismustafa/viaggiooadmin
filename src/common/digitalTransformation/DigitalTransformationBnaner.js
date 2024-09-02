

import banner from '../../asesets/banner/services-banner.png'
function DigitalTranceformationBanner() {
    return (
        <>
            <section className="BannerMain">
                <div className="BannerInner" style={{ backgroundImage: `url(${banner})` }}>
                    <div className="Title" uk-scrollspy="cls: uk-animation-slide-bottom; target: h2; repeat: false">
                        <h2 style={{}} className="uk-scrollspy-inview uk-animation-slide-bottom">DIGITAL TRANSFORMATION</h2>
                        <p style={{}} className="uk-scrollspy-inview uk-animation-slide-bottom">Live Your Idea With Digital Innovation</p>
                    </div>
                </div>
            </section>

        </>
    )
}
export default DigitalTranceformationBanner
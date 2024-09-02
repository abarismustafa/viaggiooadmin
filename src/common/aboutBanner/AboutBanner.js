
import aboutBanner from '../../asesets/banner/about_banner.png'
function AboutBanner() {
    return (
        <>
            <section className="BannerMain">
                <div className="BannerInner" style={{ backgroundImage: `url(${aboutBanner})` }}>
                    <div className="Title" uk-scrollspy="cls: uk-animation-slide-bottom; target: h2; repeat: false">
                        <h2 style={{}} className="uk-scrollspy-inview uk-animation-slide-bottom">Who We are</h2>
                        <p uk-scrollspy="cls: uk-animation-slide-bottom; repeat: false" style={{}} className="uk-scrollspy-inview uk-animation-slide-bottom">Leverage Possibilities And Opportunities</p>
                    </div>
                </div>
            </section>

        </>
    )

}
export default AboutBanner
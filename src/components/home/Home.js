import AdvSection from "./advSection/AdvSection"
import AwordWiningSection from "./awordWiningSection/AwordWiningSection"
import Banner from "./banner/Banner"
import DigitalDostSection from "./digitalDostSection/DigitalDostSection"
import OurPartnersSection from "./ourPartnersSection/OurPartnersSection"
import ServiceSection from "./serviceSection/ServiceSection"
import SignUpSection from "./signnUpSec/signUpSection"

function Home() {
    return (
        <>
            <Banner />
            <AdvSection />
            <ServiceSection />
            <AwordWiningSection />
            <DigitalDostSection />
            <OurPartnersSection />
            <SignUpSection />
        </>
    )
}
export default Home
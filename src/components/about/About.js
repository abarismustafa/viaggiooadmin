import AboutBanner from "../../common/aboutBanner/AboutBanner"
import OurPartnersSection from "../home/ourPartnersSection/OurPartnersSection"
import AboutContent from "./aboutContent/AboutContent"
import OurScoorCard from "./ourScroreCard/OurScroreCard"
import OurValuePurpose from "./ourValuePurpose/OurValuePurpose"

function About() {
    return (
        <>
            <AboutBanner />
            <AboutContent />
            <OurValuePurpose />
            <OurScoorCard />
            {/* <OurPartnersSection /> */}
        </>
    )
}
export default About
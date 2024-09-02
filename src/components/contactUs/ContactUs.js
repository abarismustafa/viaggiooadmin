import OurPartnersSection from "../home/ourPartnersSection/OurPartnersSection"
import ContactBanner from "./conatctBanner/ConatctBanner"
import ContactForm from "./contactForm/ContactForm"
import LocationMap from "./location/LocationMap"

function ContactUs() {
    return (
        <>
            <ContactBanner />
            <ContactForm />
            <LocationMap />
            <OurPartnersSection />
        </>
    )
}
export default ContactUs
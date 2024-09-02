import ServiceSectionHeader from "./serverceSectionHeader/ServiceSectionHeader"
import ServiceSlider from "./serviceSlider/ServiceSlider"

function ServiceSection() {
    return (
        <>
            <section className="ServiceSection">
                <ServiceSectionHeader />
                <ServiceSlider />
            </section>
        </>
    )
}
export default ServiceSection
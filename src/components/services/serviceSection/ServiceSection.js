import ServiceDetails from "./serviceDetails/SeviceDetails"
import ServiceWrapper from "./serviceWrapper/ServiceWrapper"

function ServiceSection() {
    return (
        <>
            <section className="ServiceSection pb-0">
                <ServiceWrapper />
                <div className="ServicesDetails">
                    <ServiceDetails />
                </div>
            </section>
        </>
    )
}
export default ServiceSection
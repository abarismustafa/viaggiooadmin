import BannerFoot from "../../common/bannerFoot/BannerFoot"

function GrivencePolicy() {
    return (
        <>
            <BannerFoot />
            <section className="ContainerMain">
                <div className="Wrapper cms-content">
                    <h1 uk-scrollspy="cls: uk-animation-slide-bottom; repeat: false" style={{}} className="uk-scrollspy-inview uk-animation-slide-bottom">Grievance Redressal Policy</h1>
                    <h3>Objectives and Scope</h3>
                    <p>Champion Software Technologies Ltd. is committed towards its customers and has put together the undermentioned Grievance Redressal Policy for an effective resolution of all complaints received by LB Enterprise.</p>
                    <p>This policy outlines a structured grievance redressal mechanism available to customers and external partners for escalating their complaints to obtain a resolution. This policy covers all the products/services offered by LB Enterprise. It aims to improve customer experience and service delivery by an effective resolution of customer complaints through proper channelized approach, review mechanism and prompt resolution of all customer grievances. LB Enterprise strives to provide best-in-class service delivery and has a dedicated customer care team that operates 24X7 for addressing such complaints.</p>
                    <h3>Redressal Matrix</h3>
                    <div className="table-responsive-md">
                        <table className="tableui table" width="100%" cellPadding={0} cellSpacing={0}>
                            <thead>
                                <tr>
                                    <td>Type</td>
                                    <td>Name &amp; Contact Details</td>
                                    <td>Remarks</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="nowrap">Level 1</td>
                                    <td>
                                        <strong>LB Enterprise Customer Care</strong><br />
                                        +91 8459006 006<br />
                                        <a href="mailto:customercare@championsofttech.com">
                                            customercare@championsofttech.com
                                        </a>
                                    </td>
                                    <td>LB Enterprise Customer Care team will acknowledge the grievance/complaint with a
                                        ticket number and an expected resolution time on the receipt of complaint. If a
                                        case needs extra time, LB Enterprise will inform the same along with reasons to the
                                        customer</td>
                                </tr>
                                <tr>
                                    <td className="nowrap">Level 2</td>
                                    <td>
                                        <strong>Mr. Milan Solanki</strong><br />
                                        Head – Customer Experience<br />
                                        <a href="mailto:milan.solanki@championsofttech.com">
                                            milan.solanki@championsofttech.com
                                        </a>
                                    </td>
                                    <td>In case Level 1 resolution is not satisfactory, customer can escalate the same
                                        to Customer experience head along with original ticket number mandatorily. First
                                        response – 2 business days. Final response – as per complaint type</td>
                                </tr>
                                <tr>
                                    <td className="nowrap">Level 3</td>
                                    <td>
                                        <strong>Mr. Manish Punjani</strong><br />
                                        Grievance Officer<br />
                                        <a href="mailto:grievance@championsofttech.com">
                                            grievance@championsofttech.com
                                        </a>
                                    </td>
                                    <td>In case Level 2 resolution is not satisfactory, customer can escalate the same
                                        to Grievance Team along with original ticket number mandatorily. First response
                                        – 2 business days. Final response – as per complaint type</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}
export default GrivencePolicy
import { Nav, Tab, Tabs } from "react-bootstrap"
import BlanceEnquiry from "../../../../components/admin/aepsOnboarding/comleteOnBoarding/blanceEnquiry/BlanceEnquiry";
import { useState } from "react";
import CashDeposit from "../../../../components/admin/cashDiposit/CashDeposit";

function CasDepositTab() {
    const [active, setActive] = useState(true)
    console.log(active);
    return (
        <>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>AEPS Services</span></div>
                    <div className="row p-4">
                        <div className="col-lg-12">
                            <div className="aeps-tab-section">
                                <Tabs
                                    defaultActiveKey="Cash Deposit"
                                    id="uncontrolled-tab-example"
                                    className="mb-3"
                                    onSelect={() => { setActive(false) }}
                                >
                                    <Tab eventKey="Cash Deposit" title="Cash Deposit " onChange={() => { setActive(false) }}>
                                        <CashDeposit active={active} />
                                    </Tab>
                                    <Tab eventKey="Blance Enquiry" title="Balance Enquiry" onChange={() => { setActive(false) }}>
                                        <BlanceEnquiry active={active} />
                                    </Tab>
                                    {/* <Tab eventKey="Mini Statement" title="Mini Statement">
                                        <MiniStatement /> 
                                    </Tab>
                                    <Tab eventKey="Aadhaar Pay" title="Aadhaar Pay">
                                        <AadhaarPay />
                                    </Tab> */}
                                </Tabs>
                            </div>
                        </div>

                    </div>
                </div>

            </div >
        </>
    )
}
export default CasDepositTab
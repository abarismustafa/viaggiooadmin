import { Nav, Tab, Tabs } from "react-bootstrap"
import { Link } from "react-router-dom"
import BlanceEnquiry from "./blanceEnquiry/BlanceEnquiry"
import CaseWithdrow from "./caseWithdrow/CaseWithdrow"
import MiniStatement from "./miniStatement/MiniStatement"
import AadhaarPay from "./aadhaarPay/AadhaarPay"
import { useState } from "react"
import { IoHome } from "react-icons/io5";


function CompleteOnBoarding({
    balanceEnquiryPermission,
    cashWithdrawalPermission,
    miniStatementPermission,
    aadhaarPayPermission,
    walletShowHeader
  }) {
    console.log('CompleteOnBoarding Props:', {
        balanceEnquiryPermission,
        cashWithdrawalPermission,
        miniStatementPermission,
        aadhaarPayPermission
      });
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
                                    defaultActiveKey="Balance Enquiry"
                                    id="uncontrolled-tab-example"
                                    className="mb-3"
                                    onSelect={() => { setActive(false) }}
                                >
                                       {balanceEnquiryPermission && (
                    <Tab eventKey="Balance Enquiry" title="Balance Enquiry " onChange={() => { setActive(false) }}>
                      <BlanceEnquiry active={active} />
                    </Tab>
                  )}
               <Tab eventKey="Cash Withdrawal" title="Cash Withdrawal" onChange={() => { setActive(false) }}>
  <CaseWithdrow active={active} walletShowHeader={walletShowHeader} />
</Tab>

                  {miniStatementPermission && (
                    <Tab eventKey="Mini Statement" title="Mini Statement">
                      <MiniStatement />
                    </Tab>
                  )}
                  <Tab eventKey="Aadhaar Pay" title="Aadhaar Pay">
  <AadhaarPay />
</Tab>
                </Tabs>
                            </div>
                        </div>
                        {/* <div className="col-lg-3">
                            <Link to="/balance-enquiry" className="linkSection1">
                                <div className="linkSection">
                                    Balance Enquiry
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-3">
                            <Link to="/cash-withdrawal" className="linkSection1">
                                <div className="linkSection">
                                    Cash Withdrawal
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-3">
                            <Link to="/mini-statement" className="linkSection1">
                                <div className="linkSection">
                                    Mini Statement
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-3">
                            <Link to="/aadhaar-pay" className="linkSection1">
                                <div className="linkSection">
                                    Aadhaar Pay
                                </div>
                            </Link>
                        </div> */}
                    </div>
                </div>

            </div >
        </>
    )
}
export default CompleteOnBoarding
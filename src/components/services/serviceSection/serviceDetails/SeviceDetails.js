import OurPartnersSection from "../../../home/ourPartnersSection/OurPartnersSection"
import SignUpSection from "../../../home/signnUpSec/signUpSection"
import MobileDthRecharge from "./MobileDthRechage/MobileDthRecharge"
import AdharBanking from "./adharBanking/AdharBanking"
import BillPayment from "./billPayment/BillPayment"
import BusTicket from "./busTicket/BusTicket"
import CaseManegement from "./caseManegment/CaseManegement"
import FlightTicket from "./flightTicket/FlightTicket"
import Insurance from "./insurance/Insurance"
import MacroAtm from "./macroAtm/MacroAtm"
import TransferMoney from "./transferMoney/TransferMoney"
import WholesaleMarket from "./wholesaleMarket/WholesaleMarket"


function ServiceDetails() {
    return (
        <>
            <TransferMoney />
            <AdharBanking />
            <MacroAtm />
            <CaseManegement />
            <MobileDthRecharge />
            <BillPayment />
            <BusTicket />
            <FlightTicket />
            <WholesaleMarket />
            <Insurance />
            <OurPartnersSection />
            <SignUpSection />

        </>
    )
}
export default ServiceDetails
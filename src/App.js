
import { Navigate, Route, Routes } from 'react-router-dom';
import './asesets/main.css'
import './asesets/css/bootstap2.css'
import './asesets/css/caltmine.css'
import './asesets/css/fontAwesom.css'
// import './asesets/css/mixin.scss'

import './asesets/css/customAdmin.css'
import './asesets/css/selectMin.css'
import './asesets/css/responsive.css'
import "react-toastify/dist/ReactToastify.css";



import Header from './common/header/Header';
import Footer from './common/footer/Footer';
import HomePage from './pages/home';
import ContactUsPage from './pages/contactUs';
import ServicesPage from './pages/services';
import AboutPage from './pages/about';
import PrivacyPolicyPage from './pages/privacyPolicy';
import TermConditionPage from './pages/termCondition';
import GrievancePolicyPage from './pages/grivencePolicy';
import RefundCancilationPage from './pages/refundCancilation';
import DasRightSectionPage from './pages/admin/daseBoardRightSection/DasBoardRightSection';
import { useEffect, useState } from 'react';
import PaytmWalletPage from './pages/admin/paytmWallet';
import DasBoardPage from './pages/admin/dasBoard';
import MobileDthRecharge from './components/services/serviceSection/serviceDetails/MobileDthRechage/MobileDthRecharge';
import ServiceParent from './components/admin/dasBoard/serviceParent/ServiceParent';
import MobileRecharge from './components/admin/dasBoard/serviceParent/mobileRecharge/MobileRecharge';
import DthRecharge from './components/admin/dasBoard/serviceParent/dthRecharge/DthRecharge';
import PostPaidRecharge from './components/admin/dasBoard/serviceParent/postPaidRecharge/PostPaidRecharge';
import MoneyTransferPage from './pages/admin/moneyTransfer/MoneyTransfer';
import AdharPayPage from './pages/admin/adharPay/AdharPay';
import YblDtmPage from './pages/admin/yblDtm';
import CreditCardPaymentPage from './pages/admin/creditCardPayment';
import ElectricityBill from './components/admin/dasBoard/serviceParent/electricityBill/ElectricityBill';
import FastTagRecharge from './components/admin/fastTagRecharge/FastTagRecharge';
import GasBill from './components/admin/dasBoard/serviceParent/gasBill/GasBill';
import LandLineBills from './components/admin/dasBoard/serviceParent/landLineBill/LandLineBill';
import AepsPayoutPage from './pages/admin/aepsPayout';
import AddAepsPayout from './components/admin/aepsPayout/addAepsPayout/AddAepsPayout';
import ComplainListPage from './pages/admin/complainList';
import RechargeHistoryPage from './pages/admin/rechargeHistory';
import SearchRechargeHistoryPage from './pages/admin/searchRechargeHistory';
import MoneyTransferReprotPage from './pages/admin/moneyTrasferReport';
import FastTagPage from './pages/admin/fastagReport';
import DmtReportPage from './pages/admin/dmtReport';
import DtmReportSearchPage from './pages/admin/dtmReportSearch';
import DmtKycReportPage from './pages/admin/dmtKycReport';
import CreditBilPaymentPage from './pages/admin/creditBillPayment';
import AepsReportPage from './pages/admin/aepsReport';
import AepsTezreportPage from './pages/admin/aepsTezReport';
import AdharPayReportPage from './pages/admin/adharPayReport';
import AepsIcicReportPage from './pages/admin/aepsICICReport';
import AepsTransisation from './components/admin/dasBoard/serviceParent/aepsTransisation/AepsTransisation';
import AepsTezAddPaymentPage from './pages/admin/aepsTezAddPayment';
import AepsFinoUserDasBoardPage from './pages/admin/aepsFinoUserDasboard';
import InsurancedekhoReportPage from './pages/admin/insurancedekhoReport';
import BillPaymentReportPage from './pages/admin/billPaymentReport';
import AccountReportPage from './pages/admin/accountReport';
import BlanceTopUpHistoryPage from './pages/admin/blanceTopUpHistory';
import BankListPage from './pages/admin/bankList';
import PaymentWithDrowReportPage from './pages/admin/paymentWithDrowReport';
import CmsBillReportPage from './pages/admin/cmsBillReport';
import PostPaidBillTransPage from './pages/admin/postPaidBillTrans';
import TurboPaymentRequestPage from './pages/admin/turboPaymentRequest';
import PaymentGateWayPage from './pages/admin/paymentGateWay';
import RupayCardReportPage from './pages/admin/rupayCardReport';
import AepsDevicePage from './pages/admin/aepsDeviceDrivers';
// ---------------------------------------------------
import PasswordChagePage from './pages/admin/settings/passwordChage';
import CreatePinPage from './pages/admin/settings/createPin/CreatePinPage';
import OtpSecurityPage from './pages/admin/settings/otpSecurity';
import TdsCertificatePage from './pages/admin/tdsCertificate';
import MerchantLoginAreaPage from './pages/merchantLoginArea/Index';
import SinUpMerchantPage from './pages/merchantLoginArea/sinupMerchant';
import CompeleteRegister from './pages/merchantLoginArea/compeleteRegister';
import "react-toastify/dist/ReactToastify.css";
import Shipping_Address from './pages/admin/shipping_Address';
import FormBillAdd from './pages/admin/shipping_Address/FormBillAdd';
import BillingAddress from './pages/admin/billingAddress';
import ProfilePage from './pages/admin/profilePage';
import WalletReportPage from './pages/admin/walletReport';
import PaymentRequestViewPage from './pages/admin/payment/paymentRequestView/PaymentRequestView';
import AddPaymentRequestPage from './pages/admin/payment/addPaymentRequest';
import PaymentRequestPage from './pages/admin/payment/paymentRequest';
import PaymentRequestByMemberPage from './pages/admin/payment/paymentRequestByMember';
import DaseboardCheckPage from './pages/admin/daseboardCheck';
import ActivityLogPage from './pages/admin/activityLg';
import DtmReportDetails from './components/admin/dtmReportSearch/dtmReportDetails/DtmReportsDetails';
import DeclearPage from './common/declearPage/DeclearPage';
import AepsWalletsPage from './pages/admin/aepsWallets';
import TransactionReportPage from './pages/admin/tranactionReports';
import AepsWalletsTrasferPage from './pages/admin/aepsWalletTransfer';
import QucickDhanPage from './pages/admin/quickDhan';
import CompanyBankDetailsPage from './pages/admin/companyBankdetails';
import AepsOnBoardingPage from './pages/admin/aepsOnboarding';
import PrivateRoute from './pages/privateRoute/PrivateRoute';
import BlanceEnquiry from './components/admin/aepsOnboarding/comleteOnBoarding/blanceEnquiry/BlanceEnquiry';
import CaseWithdrow from './components/admin/aepsOnboarding/comleteOnBoarding/caseWithdrow/CaseWithdrow';
import MiniStatement from './components/admin/aepsOnboarding/comleteOnBoarding/miniStatement/MiniStatement';
import AadhaarPay from './components/admin/aepsOnboarding/comleteOnBoarding/aadhaarPay/AadhaarPay';
import OpenDisputPage from './pages/admin/disput/openDisput';
import ClossingDisputPage from './pages/admin/disput/clossingDisput';
import AddTicketPage from './pages/admin/disput/AddTicket';
import ListTicketsPage from './pages/admin/disput/listTickets';
import ListTicketUser from './components/admin/disput/listTickets/listTicketUser/ListTicketUser';
import PackageListPage from './pages/admin/package/packagelist';
import TdsCertificate from './components/admin/tdsCertificate/TdsCertifiacete';
import TdsCertificatee from './components/admin/tdsCentificate/TdsCertificate';
import IdCard from './components/admin/idCard/IdCard';
import Certificate from './components/admin/cartificate/cartificate';
import BcAuthorization from './components/admin/bcAuthorizse/tCertificate';
import BoardBand from './components/admin/dasBoard/serviceParent/boardBand/BoardBand';
import WaterBill from './components/admin/dasBoard/serviceParent/water/WaterBill';
import PackageDetails from './components/admin/package/packageDetails/PackageDetails';
import Commission from './components/admin/commission/Commission';
import Balance from './components/admin/balance/Balance';
import Status from './components/admin/status/Status';
import PackageHistory from './components/admin/package/packageHistory/PackageHistory';
import AirtelCmsPage from './pages/admin/airtelCms';
import CashDepositPage from './pages/admin/cashDiposit';
import QuickDhanPage from './pages/admin/quickDhann';
import AirtelCmsReportPage from './pages/admin/airtelCmsReport';

import Loan from './components/loan/Loan';
import Loanform1 from './components/loan/Loanform1';

import { getToken } from 'firebase/messaging';
import { messaging } from './firebase';
import { getNotiToken } from './components/admin/notificationSide/NotificationSide';

import Invoice from './components/admin/package/packageDetails/Invoice';
import AepsDipositPurchge from './pages/admin/cashDiposit/aepsDipositPurchage/AepsDipositPurchage';
import { UserPermissionAeps, UserPermissionAeps2, WalletsShow } from './api/login/Login';
import PanServicesPage from './pages/admin/panService';
import NewPanCard from './components/admin/panService/newPanCard/NewPanCard';
import CorectionPanCard from './components/admin/panService/corectionPanCard/CorectionPanCard';
import BusPage from './pages/admin/Bus/Index';
import Userlist from './pages/admin/userlist/Userlist';
import { UserWalletData } from './hooks/UserwalletData';
import UserReport from './pages/admin/userlist/Userreport';
import Earningreport from './pages/admin/userlist/Earningreport';
import InvoiceBill from './pages/admin/userlist/Invoice';
import ServiceOperatorList from './components/admin/package/packageDetails/Bbpslist';
// import ServiceSlider from './pages/admin/userlist/ServiceSlider';
import ServiceSlidernew from './pages/admin/userlist/ServiceSlider';
import BPBSService from './pages/admin/userlist/BPBSService';
import LedgerReport from './pages/admin/userlist/LedgerReport';
import BusinessReport from './pages/admin/userlist/BusinessReport';
import AepsInvoice from './pages/admin/userlist/AepsInvoice';
import PayoutInvoice from './pages/admin/userlist/Payoutinvoice';
import CmsInvoice from './pages/admin/userlist/CmdInvoice';
import FlightTicketListPage from './pages/admin/flightTicketList/FlightTicketList';
import BussTicketListPage from './pages/admin/bussTicketList';
import HotalDetails from './components/hotalDetails/HotalDetails';
import ViaggioHotelBookingListPage from './pages/viaggioHotelBookingList';
import HotelGroupRequestListPage from './pages/viaggioWebPages/hotelGroupRequestListPage';
import MyBookingCalenderListPage from './pages/viaggioWebPages/myBookingCalenderListPage';
import MyAmendmentsListPage from './pages/viaggioWebPages/myAmendmentsListPage';
import MyCancellationPage from './pages/viaggioWebPages/myCancellationsPage';
import MyRefundsPage from './pages/viaggioWebPages/myRefundsPage';

function App() {
  const [isLogin, setislogin] = useState(window.localStorage.getItem('login'))
  const [walletData, setWalletData] = useState()

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    window.localStorage.setItem('login', false)
  }, [])


  const [position, setPosition] = useState({ latitude: null, longitude: null });

  // console.log('position', position);
  const [tokenNoti, setokenNoti] = useState()


  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BPmnN4enu6SLX6ASW7dctK6Q0j3GnTUhL5ZRi16I6RDqGav4khN2JIHmdKcL4eTqwRBu-PWmaUa1G-Oaor7AcF4"
      });
      setokenNoti(token)
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }




  useEffect(() => {
    requestPermission();
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert('Geolocation is not available in your browser.')
    }
  }, []);
  console.log("position", position)

  const [dthRecharge, setdthRecharge] = useState(false)

  const [dthactiveMessage, setdthactiveMessage] = useState()
  const [dthbuyMessage, setdthbuyMessage] = useState()

  const dthPermission = async () => {
    const idDth = '13'
    try {
      const res = await UserPermissionAeps2(idDth)
      // console.log(res);
      if (res?.data?.data?.is_active == false) {
        setdthactiveMessage('Please Admin Side Active User')
      }
      if (res?.data?.data?.is_active == true) {
        if (res?.data?.data?.is_buy == false) {
          setdthbuyMessage('Please Purchase')
        }
      }

      if (res?.data?.data?.is_active == true && res?.data?.data?.is_buy == true) {
        setdthRecharge(true)
      }
    } catch (error) {

    }
  }

  const [mobileRecharge, setmobileRecharge] = useState(false)

  const [moblileactiveMessage, setmoblileactiveMessage] = useState()
  const [mobilebuyMessage, setmobilebuyMessage] = useState()



  const mobileRechargePermission = async () => {
    const idMobile = '33'
    try {
      const res = await UserPermissionAeps2(idMobile)
      // console.log(res);
      if (res?.data?.data?.is_active == false) {
        setmoblileactiveMessage('Please Admin Side Active User')
      }
      if (res?.data?.data?.is_active == true) {
        if (res?.data?.data?.is_buy == false) {
          setmobilebuyMessage('Please Purchase')
        }
      }

      if (res?.data?.data?.is_active == true && res?.data?.data?.is_buy == true) {
        setmobileRecharge(true)
      }
    } catch (error) {

    }
  }

  const [pospaidmobileRecharge, setpospaidmobileRecharge] = useState(false)
  const [moblilepospaidactiveMessage, setmoblilepospaidactiveMessage] = useState()
  const [mobilePospaidbuyMessage, setmobilePospaidbuyMessage] = useState()

  const mobileRechargePospaidPermission = async () => {
    const idMobile = '10'
    try {
      const res = await UserPermissionAeps2(idMobile)
      // console.log(res);
      if (res?.data?.data?.is_active == false) {
        setmoblilepospaidactiveMessage('Please Admin Side Active User')
      }
      if (res?.data?.data?.is_active == true) {
        if (res?.data?.data?.is_buy == false) {
          setmobilePospaidbuyMessage('Please Purchase')
        }
      }

      if (res?.data?.data?.is_active == true && res?.data?.data?.is_buy == true) {
        setpospaidmobileRecharge(true)
      }
    } catch (error) {

    }
  }


  const [electricityRecharge, setelectricityRecharge] = useState(false)
  const [electricityactiveMessage, setelectricityactiveMessage] = useState()
  const [electricitybuyMessage, setelectricitybuyMessage] = useState()

  const electricityPermission = async () => {
    const idMobile = '18'
    try {
      const res = await UserPermissionAeps2(idMobile)
      // console.log(res);
      if (res?.data?.data?.is_active == false) {
        setelectricityactiveMessage('Please Admin Side Active User')
      }
      if (res?.data?.data?.is_active == true) {
        if (res?.data?.data?.is_buy == false) {
          setelectricitybuyMessage('Please Purchase')
        }
      }

      if (res?.data?.data?.is_active == true && res?.data?.data?.is_buy == true) {
        setelectricityRecharge(true)
      }
    } catch (error) {

    }
  }


  const [gasRecharge, setgasRecharge] = useState(false)
  const [gasactiveMessage, setgasactiveMessage] = useState()
  const [gasbuyMessage, setgasbuyMessage] = useState()

  const gasPermission = async () => {
    const idMobile = '11'
    try {
      const res = await UserPermissionAeps2(idMobile)
      // console.log(res);
      if (res?.data?.data?.is_active == false) {
        setgasactiveMessage('Please Admin Side Active User')
      }
      if (res?.data?.data?.is_active == true) {
        if (res?.data?.data?.is_buy == false) {
          setgasbuyMessage('Please Purchase')
        }
      }
      if (res?.data?.data?.is_active == true && res?.data?.data?.is_buy == true) {
        setgasRecharge(true)
      }
    } catch (error) {

    }
  }

  const [fastagRecharge, setfastagRecharge] = useState(false)
  const [fastagactiveMessage, setfastagactiveMessage] = useState()
  const [fastagbuyMessage, setfastagbuyMessage] = useState()

  const fastagPermission = async () => {
    const idMobile = '9'
    try {
      const res = await UserPermissionAeps2(idMobile)
      // console.log(res);
      if (res?.data?.data?.is_active == false) {
        setfastagactiveMessage('Please Admin Side Active User')
      }
      if (res?.data?.data?.is_active == true) {
        if (res?.data?.data?.is_buy == false) {
          setfastagbuyMessage('Please Purchase')
        }
      }
      if (res?.data?.data?.is_active == true && res?.data?.data?.is_buy == true) {
        setfastagRecharge(true)
      }
    } catch (error) {

    }
  }

  const [boardbandRecharge, setboardbandRecharge] = useState(false)
  const [boardbandactiveMessage, setboardbandactiveMessage] = useState()
  const [boardbandbuyMessage, setboardbandbuyMessage] = useState()

  const bordBandPermission = async () => {
    const idMobile = '5'
    try {
      const res = await UserPermissionAeps2(idMobile)
      // console.log(res);
      if (res?.data?.data?.is_active == false) {
        setboardbandactiveMessage('Please Admin Side Active User')
      }
      if (res?.data?.data?.is_active == true) {
        if (res?.data?.data?.is_buy == false) {
          setboardbandbuyMessage('Please Purchase')
        }
      }
      if (res?.data?.data?.is_active == true && res?.data?.data?.is_buy == true) {
        setboardbandRecharge(true)
      }
    } catch (error) {

    }
  }

  const [landlineRecharge, setlandlineRecharge] = useState(false)
  const [landlineactiveMessage, setlandlineactiveMessage] = useState()
  const [landlinebuyMessage, setlandlinebuyMessage] = useState()

  const landLinePermission = async () => {
    const idMobile = '12'
    try {
      const res = await UserPermissionAeps2(idMobile)
      // console.log(res);
      if (res?.data?.data?.is_active == false) {
        setlandlineactiveMessage('Please Admin Side Active User')
      }
      if (res?.data?.data?.is_active == true) {
        if (res?.data?.data?.is_buy == false) {
          setlandlinebuyMessage('Please Purchase')
        }
      }
      if (res?.data?.data?.is_active == true && res?.data?.data?.is_buy == true) {
        setlandlineRecharge(true)
      }
    } catch (error) {

    }
  }


  const [waterRecharge, setwaterRecharge] = useState(false)
  const [wateractiveMessage, setwateractiveMessage] = useState()
  const [waterbuyMessage, setwaterbuyMessage] = useState()

  const waterPermission = async () => {
    const idMobile = '28'
    try {
      const res = await UserPermissionAeps2(idMobile)
      // console.log(res);
      if (res?.data?.data?.is_active == false) {
        setwateractiveMessage('Please Admin Side Active User')
      }
      if (res?.data?.data?.is_active == true) {
        if (res?.data?.data?.is_buy == false) {
          setwaterbuyMessage('Please Purchase')
        }
      }
      if (res?.data?.data?.is_active == true && res?.data?.data?.is_buy == true) {
        setwaterRecharge(true)
      }
    } catch (error) {

    }
  }

  const [creditCartRecharge, setcreditCartRecharge] = useState(false)
  const [creaditCartctiveMessage, setcreaditCartctiveMessage] = useState()
  const [creaditCartbuyMessage, setcreaditCartbuyMessage] = useState()

  const creditCartPermission = async () => {
    const idMobile = '19'
    try {
      const res = await UserPermissionAeps2(idMobile)
      // console.log(res);
      if (res?.data?.data?.is_active == false) {
        setcreaditCartctiveMessage('Please Admin Side Active User')
      }
      if (res?.data?.data?.is_active == true) {
        if (res?.data?.data?.is_buy == false) {
          setcreaditCartbuyMessage('Please Purchase')
        }
      }
      if (res?.data?.data?.is_active == true && res?.data?.data?.is_buy == true) {
        setcreditCartRecharge(true)
      }
    } catch (error) {

    }
  }


  const [addPayout, setaddPayout] = useState(false)
  const [addPayoutactiveMessage, setaddPayoutactiveMessage] = useState()
  const [addPayoutbuyMessage, setaddPayoutbuyMessage] = useState()

  const addPayoutPermission = async () => {
    const idMobile = '206'
    try {
      const res = await UserPermissionAeps2(idMobile)
      // console.log(res);
      if (res?.data?.data?.is_active == false) {
        setaddPayoutactiveMessage('Please Admin Side Active User')
      }
      if (res?.data?.data?.is_active == true) {
        if (res?.data?.data?.is_buy == false) {
          setaddPayoutbuyMessage('Please Purchase')
        }
      }
      if (res?.data?.data?.is_active == true && res?.data?.data?.is_buy == true) {
        setaddPayout(true)
      }
    } catch (error) {

    }
  }







  const walletShowHeader = async () => {
    try {
      const res = await WalletsShow()
      setWalletData(res?.data?.data);
    } catch (error) {

    }
  }

  useEffect(() => {
    dthPermission()
    mobileRechargePermission()
    mobileRechargePospaidPermission()
    electricityPermission()
    gasPermission()
    fastagPermission()
    bordBandPermission()
    landLinePermission()
    waterPermission()
    creditCartPermission()
    addPayoutPermission()
    walletShowHeader()
  }, [])

  return (
    <>
      {/* {isLogin == 'false' && <Header setislogin={setislogin} />} */}
      {/* <Header /> */}



      <Routes>
        {/* <Route path='/' element={<Navigate to="/home" />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/contact-us' element={<ContactUsPage />} />
        <Route path='/services' element={<ServicesPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/privacy-policy/:id' element={<PrivacyPolicyPage />} />
        <Route path='/terms-conditions/:id' element={<TermConditionPage />} />
        <Route path='/grievance-redressal-policy/:id' element={<GrievancePolicyPage />} />
        <Route path='/refund-and-cancellation-policy/:id' element={<RefundCancilationPage />} /> */}
        <Route path='login-area' element={<MerchantLoginAreaPage />} />
        <Route path='Signup' element={<SinUpMerchantPage position={position} />} />
        <Route path="/" element={<Navigate to="/login-area" />} />
        <Route path='/login-area' element={<MerchantLoginAreaPage />} />
        <Route path='/registrationComplete' element={<CompeleteRegister />} />
        <Route path='/is_self_declare' element={<DeclearPage />} />

        <Route path='/' element={<PrivateRoute tokenNoti={tokenNoti} walletData={walletData} />}>
          {/* <Route path="" element={<DasBoardPage />} > */}
          <Route path='/Dashboard' element={<DaseboardCheckPage walletData={walletData} />} />
          {/* <Route path='mobile-reacharge' element={<MobileRecharge />} /> */}
          {/* <Route path='dth-reacharge' element={<DthRecharge />} />
            <Route path='postpaid-recharge' element={<PostPaidRecharge />} />
            <Route path='electricity-bills' element={<ElectricityBill />} />
            <Route path='fastag-recharge' element={<FastTagRecharge />} />
            <Route path='gas-bills' element={<GasBill />} />
            <Route path='landline-bills' element={<LandLineBills />} />
            <Route path='aeps-transaction' element={<AepsTransisation />} /> */}
          {/* </Route> */}
          {/* <Route path='Retailer/Paytm_wallet' element={<PaytmWalletPage />} />
          // <Route path='money-transfer' element={<MoneyTransferPage walletShowHeader={walletShowHeader} />} />
          <Route path='aadhar-pay' element={<AdharPayPage />} />
          <Route path='ybl_home' element={<YblDtmPage />} />
          <Route path='creditcard_bill_payment' element={<CreditCardPaymentPage />} />
          <Route path='aeps-payout-details' element={<AepsPayoutPage />} /> */}
          {/* <Route path='add-aeps-payout-account' element={<AddAepsPayout />} /> */}
          {/* <Route path='add-aeps-payout-account' element={addPayout ? <AddAepsPayout /> : <AepsDipositPurchge activeMessage={addPayoutactiveMessage} buyMessage={addPayoutbuyMessage} head={"ADD BANK"} />} />
          <Route path='complain-list' element={<ComplainListPage />} />
          <Route path='aesp-device-drivers' element={<AepsDevicePage />} />
          <Route path='recharge_history' element={<RechargeHistoryPage />} />
          <Route path='search_recharge_history' element={<SearchRechargeHistoryPage />} />
          <Route path='money_transfer_Reprot' element={<MoneyTransferReprotPage />} />
          <Route path='wallet-report' element={<WalletReportPage />} />
          <Route path='fastag_report' element={<FastTagPage />} />
          <Route path='dmt_report' element={<DmtReportPage />} />
          <Route path='dmt_report_search' element={<DtmReportSearchPage />} />
          <Route path='deatils/:id' element={<DtmReportDetails />} />
          <Route path='dmtkyc_report' element={<DmtKycReportPage />} />

          <Route path='Aeps_report' element={<AepsReportPage />} />
          <Route path='aeps_paytm_report' element={<AepsTezreportPage />} />
          <Route path='aadhaarpay_pay_report' element={<AdharPayReportPage />} />
          <Route path='aeps_icici_report' element={<AepsIcicReportPage />} />
          <Route path='Aeps_paytm/checkPaytm' element={<AepsTezAddPaymentPage />} />
          <Route path='aepsfino/useronboard' element={<AepsFinoUserDasBoardPage />} />
          <Route path='insurancedekho_report' element={<InsurancedekhoReportPage />} />
          <Route path='bill_report' element={<BillPaymentReportPage />} />
          <Route path='accountreport' element={<AccountReportPage />} />
          <Route path='topuphistory' element={<BlanceTopUpHistoryPage />} />
          <Route path='list_bank' element={<BankListPage />} />
          <Route path='Aeps_payout_report' element={<PaymentWithDrowReportPage />} />
          <Route path='Cms_bill_report' element={<CmsBillReportPage />} />
          <Route path='postpaid_bill_transaction' element={<PostPaidBillTransPage />} />
          <Route path='Turbo_payment_request' element={<TurboPaymentRequestPage />} />
          <Route path='Pg_report_rz' element={<PaymentGateWayPage />} />
          <Route path='Aquapay_gift_cards_report' element={<RupayCardReportPage />} />
          <Route path='payment-request-to-company' element={<PaymentRequestViewPage />} />
          <Route path='add-payment-request' element={<AddPaymentRequestPage />} />
          <Route path='payment-request-to-distributor' element={<PaymentRequestPage />} />
          <Route path='payment-request-to-distributor/super-distributor-history' element={<PaymentRequestByMemberPage />} /> */}

          {/* <Route path="" element={<ServiceParent />} ></Route> */}
          {/* <Route path='change_password' element={<PasswordChagePage />} />
          <Route path='shipping_Address' element={<Shipping_Address />} />
          <Route path='billing_Address' element={<BillingAddress />} />
          <Route path='shipping_AddressaForm' element={<FormBillAdd ship={'Shipping'} type='Shipping' />} />
          <Route path='/admin/shipping_AddressaForm/:id' element={<FormBillAdd ship={'Shipping'} type='Shipping' />} />
          <Route path='billing_AddressaForm' element={<FormBillAdd ship={'billing'} type='Billing' />} />
          <Route path='/admin/billing_AddressaForm/:id' element={<FormBillAdd ship={'billing'} type='Billing' />} />
          <Route path='change_txnpassword' element={<CreatePinPage />} />
          <Route path='Retailer_authentication' element={<OtpSecurityPage />} />
          <Route path='tds_certificate' element={<TdsCertificatePage />} />
          <Route path='profile' element={<ProfilePage />} />

          <Route path='activity-logs' element={<ActivityLogPage />} />
          <Route path='aeps-wallet' element={<AepsWalletsPage />} />
          <Route path='aeps-transaction-report' element={<TransactionReportPage />} />
          <Route path='aeps-wallet-transfer' element={<AepsWalletsTrasferPage />} />
          <Route path='quick-dhan-report' element={<QucickDhanPage />} />
          <Route path='company-bank-details' element={<CompanyBankDetailsPage />} />
          <Route path='aeps-OnBoarded' element={<AepsOnBoardingPage walletShowHeader={walletShowHeader} />} />
          <Route path='open-dispute' element={<OpenDisputPage />} />
          <Route path='clossing-Dispute' element={<ClossingDisputPage />} />
          <Route path='add-ticket/:id' element={<AddTicketPage />} />
          <Route path='add-ticket' element={<AddTicketPage />} />
          <Route path='list-tickets' element={<ListTicketsPage />} />
          <Route path='list-ticket-user/:id' element={<ListTicketUser />} />
          <Route path='package-list' element={<PackageListPage />} />
          <Route path='loan' element={<Loan />} />
          <Route path='package-details/:id' element={<PackageDetails walletShowHeader={walletShowHeader} walletData2={walletData} />} />
          <Route path='package-history' element={<PackageHistory />} /> */}
          {/* <Route path='balance-enquiry' element={<BlanceEnquiry />} />
          <Route path='cash-withdrawal' element={<CaseWithdrow />} />
          <Route path='mini-statement' element={<MiniStatement />} />
          <Route path='aadhaar-pay' element={<AadhaarPay />} /> */}

          {/* <Route path='dth-reacharge' element={dthRecharge ? <DthRecharge walletShowHeader={walletShowHeader} /> : <AepsDipositPurchge activeMessage={dthactiveMessage} buyMessage={dthbuyMessage} head={"DTH Recharge"} />} />
          <Route path='mobile-reacharge' element={mobileRecharge ? <MobileRecharge walletShowHeader={walletShowHeader} /> : <AepsDipositPurchge activeMessage={moblileactiveMessage} buyMessage={mobilebuyMessage} head={"Mobile Recharge"} />} />

          <Route path='postpaid-recharge' element={pospaidmobileRecharge ? <PostPaidRecharge walletShowHeader={walletShowHeader} /> : <AepsDipositPurchge activeMessage={moblilepospaidactiveMessage} buyMessage={mobilePospaidbuyMessage} head={"Post Paid Recharge"} />} />
          <Route path='electricity-bills' element={electricityRecharge ? <ElectricityBill walletShowHeader={walletShowHeader} /> : <AepsDipositPurchge activeMessage={electricityactiveMessage} buyMessage={electricitybuyMessage} head={"Electricity Bill Recharge"} />} />
          <Route path='gas-bills' element={gasRecharge ? <GasBill walletShowHeader={walletShowHeader} /> : <AepsDipositPurchge activeMessage={gasactiveMessage} buyMessage={gasbuyMessage} head={"Gas Bill"} />} />
          <Route path='fastag-recharge' element={fastagRecharge ? <FastTagRecharge walletShowHeader={walletShowHeader} /> : <AepsDipositPurchge activeMessage={fastagactiveMessage} buyMessage={fastagbuyMessage} head={"Fastag Recharge Bill"} />} />
          <Route path='Boardband' element={boardbandRecharge ? <BoardBand walletShowHeader={walletShowHeader} /> : <AepsDipositPurchge activeMessage={boardbandactiveMessage} buyMessage={boardbandbuyMessage} head={"BoardBand  Bill"} />} />
          <Route path='landline-bills' element={landlineRecharge ? <LandLineBills walletShowHeader={walletShowHeader} /> : <AepsDipositPurchge activeMessage={landlineactiveMessage} buyMessage={landlinebuyMessage} head={"Land Line Bill"} />} />
          <Route path='water-bills' element={waterRecharge ? <WaterBill walletShowHeader={walletShowHeader} /> : <AepsDipositPurchge activeMessage={wateractiveMessage} buyMessage={waterbuyMessage} head={"Water Bill"} />} />
          <Route path='ccbill_payment_report' element={creditCartRecharge ? <CreditBilPaymentPage walletShowHeader={walletShowHeader} /> : <AepsDipositPurchge activeMessage={creaditCartctiveMessage} buyMessage={creaditCartbuyMessage} head={"Card Bill Payement"} />} /> */}
          {/* <Route path='electricity-bills' element={<ElectricityBill />} /> */}

          {/* <Route path='TDS-Certificate' element={<TdsCertificatee />} />
          <Route path='id-card' element={<IdCard />} />
          <Route path='certificate' element={<Certificate />} />
          <Route path='bc-authorization' element={<BcAuthorization />} />
          <Route path='commission' element={<Commission />} />
          <Route path='balance' element={<Balance />} />
          <Route path='status' element={<Status />} />

          <Route path='airtel-cms' element={<AirtelCmsPage walletShowHeader={walletShowHeader} />} />
          <Route path='aeps-cash-deposit' element={<CashDepositPage />} />
          <Route path='quick-dhan' element={<QuickDhanPage />} />
          <Route path='airtel-cms-report' element={<AirtelCmsReportPage />} />
          <Route path='pan-service' element={<PanServicesPage />} />
          <Route path='new-pan' element={<NewPanCard />} />
          <Route path='corection-pan-card' element={<CorectionPanCard />} />
          <Route path='bus' element={<BusPage />} />
          <Route path='flight_ticket_list' element={<FlightTicketListPage />} />
          <Route path='Bus_ticket_list' element={<BussTicketListPage />} />
          <Route path='hotal_details' element={<HotalDetails />} />

          <Route path='loan-form' element={<Loanform1 />} />
          <Route path='invoice' element={<Invoice />} />
          <Route path="network" element={<Userlist walletShowHeader={walletShowHeader} />} />
          <Route path="/user-report/:userId" element={<UserReport />} />
          <Route path="earning-report" element={<Earningreport />} />
          <Route path="/bill-invoice/:id" element={<InvoiceBill />} />
          <Route path="/cms-invoice/6680005b29363ecd060746d3" element={<CmsInvoice />} /> */}
          {/* <Route path="/bbslistoperator" element={<ServiceOperatorList />} /> */}
          {/* <Route path="/bbservices" element={<BPBSService />} />
          <Route path="/slider" element={<ServiceSlidernew />} /> */}
          {/* <Route
            path="/ledger-report"
            element={<LedgerReport />}
          />
          <Route
            path="/service-report"
            element={<BusinessReport />}
          />
          <Route
            path="/aeps-invoice/:id"
            element={<AepsInvoice />}
          />
          <Route path="/payout-invoice/:id" element={<PayoutInvoice />} /> */}


          <Route path="/hotel/my-bookings" element={<ViaggioHotelBookingListPage />} />
          <Route path="/hotel/group-requests" element={<HotelGroupRequestListPage />} />
          <Route path="/hotel/my-booking-calender" element={<MyBookingCalenderListPage />} />
          <Route path="/hotel/my-amendments" element={<MyAmendmentsListPage />} />
          <Route path="/hotel/hotel-cancellations" element={<MyCancellationPage />} />
          <Route path="/hotel/hotel-refunds" element={<MyRefundsPage />} />
          
          
        

        </Route>
        {/* <Route /> */}
      </Routes>
      {/* {isLogin == 'false' && <Footer />} */}
      {/* <div className='LayoutMain'>
      </div> */}
    </>
  );
}

export default App;

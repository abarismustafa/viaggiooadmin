import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { userValidate } from "../../../api/login/Login"
import { MdOutlineNotificationsActive } from "react-icons/md";
import paymentIcon from "../../../asesets/adminImage/hand-money-rupee-coin-icon.svg";
import { MdOutlineDisplaySettings } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { TbCircleNumber8 } from "react-icons/tb";
import { IoCashOutline } from "react-icons/io5";
import { MdOutlineQuickreply } from "react-icons/md";
import { IoIosCash } from "react-icons/io";
import { LiaServicestack } from "react-icons/lia";
import { FaMoneyCheckAlt } from "react-icons/fa";


function AsideAdmin({ isActive, overlayClick, handleMenuClick, clickoVer, tokenNoti }) {
    // console.log(isActive);
    const navigate = useNavigate()
    const [report, setReport] = useState(false)
    const [payment, setPayment] = useState(false)
    const [setting, setSetting] = useState(false)
    const logoutPage = () => {
        window.localStorage.setItem('login', false)
        navigate('/home')
        window.location.reload()
    }


    const logOut = () => {
        window.localStorage.removeItem('userToken')
        window.localStorage.removeItem('userIdToken')
        window.localStorage.removeItem('openMenu')
        // window.location.reload()
        navigate('/login-area')
    }
    const [retailer, setretailer] = useState(false)
    const [distributer, setDistributer] = useState(false)
    const [superdistributer, setsuperDistributer] = useState(false)

    const valdateApi = async () => {
        try {
            const res = await userValidate()
            console.log(res.data);
            if (res.data.user_type_id?._id == '65e2f15785bfd78f9866c090') {
                setretailer(true);
            } if (res.data.user_type_id?._id == '65f3fb87a6a2a92f979b47eb') {
                setsuperDistributer(true)
            }

            if (res.data.user_type_id?._id == '65e2f1a585bfd78f9866c09b') {
                setDistributer(true)
            }

        } catch (error) {

        }
    }
    useEffect(() => {
        valdateApi()
    }, [])


    const [allAside, setAllAside] = useState({
        report: false,
        payment: false,
        setting: false,
        disput: false,
        disput: false,
        services: false,
        loan: false,
        network: false,
        earning:false

    });

    const changAllAside = (e) => {
        handleMenuClick(e)
        const clone = { ...allAside };
        for (const iterator in clone) {
            clone[iterator] = false;
        }
        setAllAside(clone);
    }

    const changeOpen = (val, str) => {
        const clone = { ...allAside };
        for (const iterator in clone) {
            if (iterator == str) {
                clone[str] = val;
                window.localStorage.setItem('openMenu', str)
            } else {
                clone[iterator] = false;
            }
        }
        setAllAside(clone);
    };

    useEffect(() => {
        const obj = {
            report: false,
            payment: false,
            setting: false,
            disput: false,
            package: false,
            services: false,
            loan: false,
            network: false,
            earning:false
        }
        const target = window.localStorage.getItem('openMenu')
        if (!window.localStorage.getItem('openMenu')) {
            setAllAside({
                report: false,
                payment: false,
                setting: false,
                disput: false,
                package: false,
                services: false,
                loan: false,
                network: false,
                earning:false
            })
        } else {

            for (const iterator in obj) {
                if (iterator == target) {
                    obj[target] = true;
                } else {
                    obj[iterator] = false;
                }
            }
            setAllAside(obj);
        }
    }, [])


    const [aepsOpen, setAepsOpen] = useState(false);

    const handleaepsopen = (e) => {
        e.preventDefault();
        setAepsOpen(!aepsOpen);
    };
    const storedUserType = localStorage.getItem('userType');
    return (
        <>
            <aside className={`SidebarMain mCustomScrollbar _mCS_1 mCS-autoHide sidebar ${isActive ? 'hide-sidebar' : ''}`} id="aside" >
                {/* className="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside" */}
                <div id="mCSB_1" className="mCustomScrollBox mCS-minimal-dark mCSB_vertical mCSB_outside" style={{ maxHeight: 'none' }} tabIndex={0}><div id="mCSB_1_container" className="mCSB_container" style={{ position: 'relative', top: 0, left: 0 }} dir="ltr">
                    <div className="MenuItem">
                        <div className="card-header card-header-header" onClick={(e) => { changAllAside(e) }}>
                            <NavLink to="/Dashboard">
                                <i>
                                    <svg x={0} y={0} viewBox="0 0 17 17">
                                        <path d="M9.444,17.000 L9.444,7.555 L17.000,7.555 L17.000,17.000 L9.444,17.000 ZM9.444,-0.000 L17.000,-0.000 L17.000,5.667 L9.444,5.667 L9.444,-0.000 ZM-0.000,11.333 L7.555,11.333 L7.555,17.000 L-0.000,17.000 L-0.000,11.333 ZM-0.000,-0.000 L7.555,-0.000 L7.555,9.444 L-0.000,9.444 L-0.000,-0.000 Z" />
                                    </svg>
                                </i>
                                <span>Dashboard</span>
                            </NavLink>
                        </div>

                    </div>

                    {/* <div className="MenuItem ">
                            <div className="card-header card-header-header" onClick={(e) => { changAllAside(e) }}>
                                <NavLink to="money-transfer">
                                    <i>
                                        <svg viewBox="0 0 384 428.8">
                                            <path d="M302.6,214.2c0.1-61.9-50.1-112.2-112-112.3C128.6,101.9,78.3,152,78.3,214s50.1,112.2,112,112.3c33.2,0,64.7-14.6,86-40 C293.2,266,302.5,240.5,302.6,214.2z M380.3,38.8L336,0v14.4c0,4.4-3.6,8-8,8H56c-30.9,0-56,25.1-56,56v200h32v-184c0-22.1,17.9-40,40-40h256c4.4,0,8,3.6,8,8 v20.7L380.3,38.8z M384,150.4h-32v184c0,22.1-17.9,40-40,40H56c-4.4,0-8-3.6-8-8v-20.7L3.7,390L48,428.8v-14.4c0-4.4,3.6-8,8-8h272 c30.9,0,56-25.1,56-56V150.4z M234.9,158H200c6.1,4.9,10.6,11.8,11.8,21.6h23.1v10.6h-22.8c-2.1,21.6-19.3,35.3-46.3,36.2 c16.5,17.1,34.5,38.7,52.3,60.5h-20.3c-16.5-19.9-31.9-38.3-51.8-59.4v-13.1h11.6c22.8,0,35.1-9.5,36.6-24.1h-48.2v-10.6h47.6 c-3-12.3-14.2-18.4-32.6-18.4h-15v-13.8h89.1V158z" />
                                        </svg>
                                    </i>
                                    <span>Money Transfer</span>
                                </NavLink>
                            </div>
                        </div>

                        <div className="MenuItem ">
                            <div className="card-header card-header-header" onClick={(e) => { changAllAside(e) }}>
                                <NavLink to="airtel-cms">
                                    <TbCircleNumber8 style={{ width: '16px', height: '22px', marginRight: '10px' }} />
                                    <span>Airtel CMS</span>
                                </NavLink>
                            </div>
                        </div>

                        <div className="MenuItem ">
                            <div className="card-header card-header-header" onClick={(e) => { changAllAside(e) }}>
                                <NavLink to="aeps-cash-deposit">
                                    <IoCashOutline style={{ width: '16px', height: '22px', marginRight: '10px' }} />
                                    <span>AEPS Cash Deposit</span>
                                </NavLink>
                            </div>
                        </div>
                        <div className="MenuItem ">
                            <div className="card-header card-header-header" onClick={(e) => { changAllAside(e) }}>
                                <NavLink to="quick-dhan">
                                    <MdOutlineQuickreply style={{ width: '16px', height: '22px', marginRight: '10px' }} />
                                    <span>Quick Dhan</span>
                                </NavLink>
                            </div>
                        </div>
                        <div className="MenuItem ">
                            <div className="card-header card-header-header" onClick={(e) => { changAllAside(e) }}>
                                <NavLink to="aeps-payout">
                                    <IoIosCash style={{ width: '16px', height: '22px', marginRight: '10px' }} />
                                    <span>AEPS Payout</span>
                                </NavLink>
                            </div>
                        </div> */}
                         {storedUserType === 'Super Distributor' || storedUserType === 'Distributor' ? (
  <></>
) : (
  <>
    <div className="MenuItem ">
      <div className="card-header collapsed" id="headingSettings" data-toggle="collapse" data-target="#collapseSettings" aria-expanded="false" aria-controls="collapseSettings">
        <Link href="#" onClick={() => { changeOpen(!allAside.services, "services"); }}>
          <LiaServicestack style={{ width: '16px', height: '22px', marginRight: '10px' }} />
          <span>Services</span>
          <i className="ic">
            <svg x={0} y={0} viewBox="0 0 7 11">
              <path d="M6.783,6.060 L2.231,10.803 C1.941,11.104 1.472,11.104 1.182,10.803 C0.893,10.501 0.893,10.012 1.182,9.710 L5.210,5.514 L1.182,1.317 C0.893,1.015 0.893,0.526 1.182,0.224 C1.472,-0.077 1.941,-0.077 2.231,0.224 L6.783,4.967 C6.928,5.118 7.000,5.316 7.000,5.514 C7.000,5.711 6.927,5.909 6.783,6.060 Z" />
            </svg>
          </i>
        </Link>
      </div>
      <div id="collapseSettings" className={`SubmenuItems collapse ${allAside.services ? "mm-show" : "extra"}`} aria-labelledby="headingSettings" data-parent="#accordion">
        <ul>
          <li onClick={handleMenuClick}>
            <NavLink to="money-transfer">Money Transfer</NavLink>
          </li>
          <li onClick={handleMenuClick}>
            <NavLink to="airtel-cms">Airtel CMS</NavLink>
          </li>
          <li onClick={handleMenuClick}>
            <NavLink to="quick-dhan">Quick Dhan</NavLink>
          </li>
          {/* <li onClick={handleMenuClick}>
            <NavLink to="add-aeps-payout-account">Add Aeps Payout</NavLink>
          </li> */}
          {/* <li onClick={handleMenuClick}>
            <NavLink to="aeps-payout-details">Aeps Payout Details</NavLink>
          </li> */}
          <li>
            <a href="#" onClick={handleaepsopen}>AEPS <i class="fas fa-chevron-right ml-2"></i> </a>
            <ul className={aepsOpen ? "" : "d-none"}>
              <li onClick={handleMenuClick}>
                <NavLink to="aeps-OnBoarded">AEPS Cash Withdrawal</NavLink>
              </li>
              <li onClick={handleMenuClick}>
                <NavLink to="aeps-cash-deposit">AEPS Cash Deposit</NavLink>
              </li>
              <li onClick={handleMenuClick}>
            <NavLink to="aeps-payout-details">Aeps Payout Details</NavLink>
          </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </>
)}

                    {storedUserType === 'Super Distributor' || storedUserType === 'Distributor' ? (
    
                    <div className="MenuItem ">
                        <div className="card-header collapsed" id="headingSettings" data-toggle="collapse" data-target="#collapseSettings" aria-expanded="false" aria-controls="collapseSettings">
                            <Link href="#" onClick={() => { changeOpen(!allAside.network, "network"); }}>
                            <MdOutlineDisplaySettings style={{ width: '16px', height: '22px', marginRight: '10px' }} />
                                <span>Network</span>
                                <i className="ic">
                                        <svg x={0} y={0} viewBox="0 0 7 11">
                                            <path d="M6.783,6.060 L2.231,10.803 C1.941,11.104 1.472,11.104 1.182,10.803 C0.893,10.501 0.893,10.012 1.182,9.710 L5.210,5.514 L1.182,1.317 C0.893,1.015 0.893,0.526 1.182,0.224 C1.472,-0.077 1.941,-0.077 2.231,0.224 L6.783,4.967 C6.928,5.118 7.000,5.316 7.000,5.514 C7.000,5.711 6.927,5.909 6.783,6.060 Z" />
                                        </svg>
                                    </i>
                            </Link>
                        </div>
                        <div id="collapseSettings" className={`SubmenuItems collapse ${allAside.network ? "mm-show" : "extra"}`} aria-labelledby="headingSettings" data-parent="#accordion">
                            <ul>
                                <li onClick={handleMenuClick}>
                                    <NavLink to="network">Downstream</NavLink>
                                </li>
                                <li onClick={handleMenuClick}>
                                    <NavLink to="earning-report">Earning Report</NavLink>
                                </li>
                              

                            </ul>
                        </div>
                        
                    </div>
                     ) : (
                        <>
                        </>
                     )}
                    {/* <div className="MenuItem">
                        <div className="card-header collapsed" id="headingLoan" data-toggle="collapse" data-target="#collapseLoan" aria-expanded="false" aria-controls="collapseLoan">
                            <Link href="#" onClick={() => { changeOpen(!allAside.loan, "loan"); }}>
                                <FaMoneyCheckAlt style={{ width: '16px', height: '22px', marginRight: '10px' }} />
                                <span>Finance Services</span>
                                <i className="ic">
                                    <svg x={0} y={0} viewBox="0 0 7 11">
                                        <path d="M6.783,6.060 L2.231,10.803 C1.941,11.104 1.472,11.104 1.182,10.803 C0.893,10.501 0.893,10.012 1.182,9.710 L5.210,5.514 L1.182,1.317 C0.893,1.015 0.893,0.526 1.182,0.224 C1.472,-0.077 1.941,-0.077 2.231,0.224 L6.783,4.967 C6.928,5.118 7.000,5.316 7.000,5.514 C7.000,5.711 6.927,5.909 6.783,6.060 Z" />
                                    </svg>
                                </i>
                            </Link>
                        </div>
                        <div id="collapseLoan" className={`SubmenuItems collapse ${allAside.loan ? "mm-show" : "extra"}`} aria-labelledby="headingLoan" data-parent="#accordion">
                            <ul>
                                <li onClick={handleMenuClick}>
                                    <NavLink to="loan">Loan</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div> */}

                    {/* <div className="MenuItem ">
                        <div className="card-header">
                            <Link to="aeps-payout-account">
                                <i>
                                    <svg viewBox="0 0 384 428.8">
                                        <path d="M302.6,214.2c0.1-61.9-50.1-112.2-112-112.3C128.6,101.9,78.3,152,78.3,214s50.1,112.2,112,112.3c33.2,0,64.7-14.6,86-40 C293.2,266,302.5,240.5,302.6,214.2z M380.3,38.8L336,0v14.4c0,4.4-3.6,8-8,8H56c-30.9,0-56,25.1-56,56v200h32v-184c0-22.1,17.9-40,40-40h256c4.4,0,8,3.6,8,8 v20.7L380.3,38.8z M384,150.4h-32v184c0,22.1-17.9,40-40,40H56c-4.4,0-8-3.6-8-8v-20.7L3.7,390L48,428.8v-14.4c0-4.4,3.6-8,8-8h272 c30.9,0,56-25.1,56-56V150.4z M234.9,158H200c6.1,4.9,10.6,11.8,11.8,21.6h23.1v10.6h-22.8c-2.1,21.6-19.3,35.3-46.3,36.2 c16.5,17.1,34.5,38.7,52.3,60.5h-20.3c-16.5-19.9-31.9-38.3-51.8-59.4v-13.1h11.6c22.8,0,35.1-9.5,36.6-24.1h-48.2v-10.6h47.6 c-3-12.3-14.2-18.4-32.6-18.4h-15v-13.8h89.1V158z" />
                                    </svg>
                                </i>
                                <span>AEPS PAYOUT</span>
                            </Link>
                        </div>
                    </div> */}
                     {storedUserType === 'Super Distributor' || storedUserType === 'Distributor' ? (
  <></>
) : (
    <>
                    <div className="MenuItem ">
                        <div className="card-header collapsed" id="headingOne" >
                            <Link to="#" onClick={() => { changeOpen(!allAside.report, "report"); }}>
                                <i>
                                    <svg x={0} y={0} viewBox="0 0 512 512">
                                        <path d="M 77.109375 401.664062 L 55.164062 401.664062 C 24.746094 401.664062 0 426.414062 0 456.832031 L 0 497 C 0 505.285156 6.714844 512 15 512 L 79.691406 512 C 78.023438 507.304688 77.109375 502.257812 77.109375 497 Z M 77.109375 401.664062 M 184.21875 321.332031 L 162.277344 321.332031 C 131.859375 321.332031 107.109375 346.082031 107.109375 376.5 L 107.109375 497 C 107.109375 505.285156 113.824219 512 122.109375 512 L 186.800781 512 C 185.136719 507.304688 184.21875 502.257812 184.21875 497 Z M 184.21875 321.332031 M 509.054688 150.671875 L 401.941406 6.070312 C 399.109375 2.253906 394.640625 0 389.886719 0 C 385.132812 0 380.660156 2.253906 377.832031 6.070312 L 270.722656 150.671875 C 267.351562 155.222656 266.832031 161.289062 269.378906 166.347656 C 271.929688 171.40625 277.109375 174.601562 282.777344 174.601562 L 321.332031 174.601562 L 321.332031 497 C 321.332031 505.285156 328.046875 512 336.332031 512 L 443.441406 512 C 451.726562 512 458.441406 505.285156 458.441406 497 L 458.441406 174.601562 L 497 174.601562 C 502.664062 174.601562 507.847656 171.40625 510.394531 166.347656 C 512.945312 161.289062 512.425781 155.222656 509.054688 150.671875 Z M 509.054688 150.671875 M 291.332031 241 L 269.386719 241 C 238.96875 241 214.21875 265.746094 214.21875 296.164062 L 214.21875 497 C 214.21875 505.285156 220.9375 512 229.21875 512 L 293.910156 512 C 292.246094 507.304688 291.332031 502.257812 291.332031 497 Z M 291.332031 241" />
                                    </svg>
                                </i>
                                <span>Report</span>
                                <i className="ic">
                                    <svg x={0} y={0} viewBox="0 0 7 11">
                                        <path d="M6.783,6.060 L2.231,10.803 C1.941,11.104 1.472,11.104 1.182,10.803 C0.893,10.501 0.893,10.012 1.182,9.710 L5.210,5.514 L1.182,1.317 C0.893,1.015 0.893,0.526 1.182,0.224 C1.472,-0.077 1.941,-0.077 2.231,0.224 L6.783,4.967 C6.928,5.118 7.000,5.316 7.000,5.514 C7.000,5.711 6.927,5.909 6.783,6.060 Z" />
                                    </svg>
                                </i>
                            </Link>
                        </div>
                        <div id="collapseOne" className={`SubmenuItems collapse ${allAside.report ? "mm-show" : "extra"}`} >
                            <ul>
                                <li onClick={handleMenuClick}>
                                    <NavLink to="wallet-report">Wallet Ledger Report</NavLink>
                                </li>
                                {/* <li onClick={handleMenuClick}>
                                    <NavLink to="recharge_history">Recharge Report</NavLink>
                                </li>
                                <li onClick={handleMenuClick}>
                                    <NavLink to="search_recharge_history">Search Recharge Transaction</NavLink>
                                </li> */}

                                {storedUserType === 'Super Distributor' || storedUserType === 'Distributor' ? (
  <></>
) : (
    <>
                                <li onClick={handleMenuClick}>
                                    <NavLink to="aeps-wallet">AEPS Wallet Report</NavLink>
                                </li>
                                </>
                               
                            )}


                                {/* <li>
                                    <NavLink to="money_transfer_Reprot">Indo-Nepal Money Transfer</NavLink>
                                </li>
                                <li>
                                    <NavLink to="fastag_report">Fastag Report</NavLink> 1 /
                                </li>
                                <li>
                                    <NavLink to="dmt_report">DMT Report</NavLink>
                                </li> */}
                                {/* ------ */}
                                <li onClick={handleMenuClick}>
                                    <NavLink to="dmt_report_search">DMT Report</NavLink>
                                </li>

                                <li onClick={handleMenuClick}>
                                    <NavLink to="aeps-transaction-report">AEPS Transaction Report</NavLink>
                                </li>

                                <li onClick={handleMenuClick}>
                                    <NavLink to="aadhaarpay_pay_report">Aadhaar Pay Report</NavLink>
                                </li>
                                {/* <li onClick={handleMenuClick}>
                                    <NavLink to="quick-dhan-report">Quick Dhan Report</NavLink>
                                </li> */}

                                <li onClick={handleMenuClick}>
                                    <NavLink to="airtel-cms-report">Airtel CMS Report</NavLink>
                                </li>

                                <li onClick={handleMenuClick}>
                                    <NavLink to="Aeps_report">AEPS Payout Report</NavLink>
                                </li>






                                {/* --- */}

                                {/* <li>
                                    <Link to="dmtkyc_report">DMT-KYC Report</Link>//2
                                </li>
                                <li>
                                    <Link to="ccbill_payment_report">CC Bill Payment Report</Link>//3
                                </li>
                                <li>
                                    <Link to="Aeps_fino_report">AEPS (Xpress) Report</Link>//4
                                </li>
                                <li>
                                    <Link to="aeps_paytm_report">AEPS (Tez) Report</Link>//5
                                </li>
                                <li>
                                    <Link to="aeps_icici_report">AEPS (ICICI) Report</Link>
                                </li>
                               
                                <li>
                                    <Link to="insurancedekho_report">InsuranceDekho Report</Link>
                                </li>
                                <li>
                                    <Link to="bill_report">Bill Payment History</Link>//6
                                </li>
                                <li>
                                    <Link to="accountreport">Account Report</Link>//7
                                </li>
                                <li>
                                    <Link to="topuphistory">Balance Topup History</Link>//8
                                </li>
                                <li>
                                    <Link to="list_bank">Bank List</Link>//9
                                </li>
                                <li>
                                    <Link to="Aeps_payout_report">Aeps &amp; Epos Payout Report</Link>//10
                                </li>

                                <li>
                                    <Link to="Cms_bill_report">CMS Bill Report</Link>//11
                                </li>


                                <li>
                                    <Link to="postpaid_bill_transaction">Postpaid bill Transction</Link>//12
                                </li>

                                <li>
                                    <Link to="Turbo_payment_request">Turbo E-Loan Request</Link>
                                </li>
                                <li>
                                    <Link to="Pg_report_rz">Payment Gateway Report</Link>//13
                                </li>
                                <li>
                                    <Link to="Aquapay_gift_cards_report">Rupay Gift Card Transaction Report</Link> //14
                                </li> */}
                            </ul>
                        </div>
                    </div>
                    </>
)}
                    <div className="MenuItem ">
                        <div className="card-header collapsed" id="headingSettings" data-toggle="collapse" data-target="#collapseSettings" aria-expanded="false" aria-controls="collapseSettings">
                            <Link href="#" onClick={() => { changeOpen(!allAside.payment, "payment"); }}>
                                <img src={paymentIcon} alt="" style={{ width: '16px', height: '22px', marginRight: '10px' }} />
                                <span>Payments</span>
                                <i className="ic">
                                    <svg x={0} y={0} viewBox="0 0 7 11">
                                        <path d="M6.783,6.060 L2.231,10.803 C1.941,11.104 1.472,11.104 1.182,10.803 C0.893,10.501 0.893,10.012 1.182,9.710 L5.210,5.514 L1.182,1.317 C0.893,1.015 0.893,0.526 1.182,0.224 C1.472,-0.077 1.941,-0.077 2.231,0.224 L6.783,4.967 C6.928,5.118 7.000,5.316 7.000,5.514 C7.000,5.711 6.927,5.909 6.783,6.060 Z" />
                                    </svg>
                                </i>
                            </Link>
                        </div>
                        <div id="collapseSettings" className={`SubmenuItems collapse ${allAside.payment ? "mm-show" : "extra"}`} aria-labelledby="headingSettings" data-parent="#accordion">
                            <ul>
                                {/* <li onClick={handleMenuClick}>
                                    <NavLink to="company-bank-details">Company Bank Details</NavLink>
                                </li>
                                <li onClick={handleMenuClick}>
                                    <NavLink to="add-payment-request">Add Payment Request</NavLink>
                                </li>
                                <li onClick={handleMenuClick}>
                                    <NavLink to="payment-request-to-company">Payment request to company </NavLink>
                                </li > */}

                                {/* {distributer && <><li onClick={handleMenuClick}>
                                    <NavLink to="payment-request-by-member">Payment Requested By Member</NavLink>
                                </li>
                                </>} */}


                                {retailer &&
                                    <>
                                        {/* <li onClick={handleMenuClick}>
                                            <NavLink to="payment-request-by-member">Payment Requested By Member</NavLink>
                                        </li> */}

                                        <li onClick={handleMenuClick}>
                                            <NavLink to="company-bank-details">Company Bank Details</NavLink>
                                        </li>
                                        <li onClick={handleMenuClick}>
                                            <NavLink to="add-payment-request">Add Payment Request</NavLink>
                                        </li>
                                        <li onClick={handleMenuClick}>
                                            <NavLink to="payment-request-to-company">Payment request to company </NavLink>
                                        </li >
                                        <li onClick={handleMenuClick}>
                                            <NavLink to="payment-request-to-distributor">Payment request to Distributor / Super distributor history</NavLink>
                                        </li>
                                    </>}
                                {distributer && <>
                                    <li onClick={handleMenuClick}>
                                        <NavLink to="company-bank-details">Company Bank Details</NavLink>
                                    </li>
                                    <li onClick={handleMenuClick}>
                                        <NavLink to="add-payment-request">Add Payment Request</NavLink>
                                    </li>
                                    <li onClick={handleMenuClick}>
                                        <NavLink to="payment-request-to-company">Payment request to company </NavLink>
                                    </li >
                                    <li onClick={handleMenuClick}>
                                        <NavLink to="payment-request-to-distributor">Payment request to  Super distributor history</NavLink>
                                    </li>
                                    <li onClick={handleMenuClick}>
                                        <NavLink to="payment-request-to-distributor/super-distributor-history">Payment Requested By Member</NavLink>
                                    </li>
                                </>}


                                {superdistributer && <>
                                    {/* <li onClick={handleMenuClick}>
                                        <NavLink to="payment-request-to-distributor">Payment request to Distributor / Super distributor history</NavLink>
                                    </li> */}
                                    <li onClick={handleMenuClick}>
                                        <NavLink to="company-bank-details">Company Bank Details</NavLink>
                                    </li>
                                    <li onClick={handleMenuClick}>
                                        <NavLink to="add-payment-request">Add Payment Request</NavLink>
                                    </li>
                                    <li onClick={handleMenuClick}>
                                        <NavLink to="payment-request-to-company">Payment request to company </NavLink>
                                    </li >
                                    <li onClick={handleMenuClick}>
                                        <NavLink to="payment-request-to-distributor/super-distributor-history">Payment Requested By Member</NavLink>
                                    </li>
                                </>}
                                {storedUserType === 'Super Distributor' || storedUserType === 'Distributor' ? (
  <></>
) : (
    <>

                                <li onClick={handleMenuClick}>
                                    <NavLink to="aeps-wallet-transfer">AEPS Wallet Transfer</NavLink>
                                </li>
                                </>
)}

                            </ul>
                        </div>
                    </div>

                    {storedUserType === 'Super Distributor' || storedUserType === 'Distributor' ? (
  <></>
) : (
    <>
                    <div className="MenuItem ">
                        <div className="card-header collapsed" id="headingSettings" data-toggle="collapse" data-target="#collapseSettings" aria-expanded="false" aria-controls="collapseSettings">
                            <Link href="#" onClick={() => { changeOpen(!allAside.package, "package"); }}>
                                {/* <img src={paymentIcon} alt="" style={{ width: '16px', height: '22px', marginRight: '10px' }} /> */}
                                <FiPackage style={{ width: '16px', height: '22px', marginRight: '10px' }} />
                                <span>Package</span>
                                <i className="ic">
                                    <svg x={0} y={0} viewBox="0 0 7 11">
                                        <path d="M6.783,6.060 L2.231,10.803 C1.941,11.104 1.472,11.104 1.182,10.803 C0.893,10.501 0.893,10.012 1.182,9.710 L5.210,5.514 L1.182,1.317 C0.893,1.015 0.893,0.526 1.182,0.224 C1.472,-0.077 1.941,-0.077 2.231,0.224 L6.783,4.967 C6.928,5.118 7.000,5.316 7.000,5.514 C7.000,5.711 6.927,5.909 6.783,6.060 Z" />
                                    </svg>
                                </i>
                            </Link>
                        </div>
                        <div id="collapseSettings" className={`SubmenuItems collapse ${allAside.package ? "mm-show" : "extra"}`} aria-labelledby="headingSettings" data-parent="#accordion">
                            <ul>
                                <li onClick={handleMenuClick}>
                                    <NavLink to="package-list">Package List</NavLink>
                                </li>
                                <li onClick={handleMenuClick}>
                                    <NavLink to="package-history">Package History</NavLink>
                                </li>
                                {/*
                                <li onClick={handleMenuClick}>
                                    <NavLink to="payment-request-to-company">Payment request to company </NavLink>
                                </li > */}
                            </ul>
                        </div>
                    </div>
                    </>
)}
                    {storedUserType === 'Super Distributor' || storedUserType === 'Distributor' ? (
  <></>
) : (
    <>
                    <div className="MenuItem ">
                        <div className="card-header card-header-header" onClick={(e) => { changAllAside(e) }}>
                            <NavLink to="pan-service">
                                <i>
                                    <svg viewBox="0 0 384 428.8">
                                        <path d="M302.6,214.2c0.1-61.9-50.1-112.2-112-112.3C128.6,101.9,78.3,152,78.3,214s50.1,112.2,112,112.3c33.2,0,64.7-14.6,86-40 C293.2,266,302.5,240.5,302.6,214.2z M380.3,38.8L336,0v14.4c0,4.4-3.6,8-8,8H56c-30.9,0-56,25.1-56,56v200h32v-184c0-22.1,17.9-40,40-40h256c4.4,0,8,3.6,8,8 v20.7L380.3,38.8z M384,150.4h-32v184c0,22.1-17.9,40-40,40H56c-4.4,0-8-3.6-8-8v-20.7L3.7,390L48,428.8v-14.4c0-4.4,3.6-8,8-8h272 c30.9,0,56-25.1,56-56V150.4z M234.9,158H200c6.1,4.9,10.6,11.8,11.8,21.6h23.1v10.6h-22.8c-2.1,21.6-19.3,35.3-46.3,36.2 c16.5,17.1,34.5,38.7,52.3,60.5h-20.3c-16.5-19.9-31.9-38.3-51.8-59.4v-13.1h11.6c22.8,0,35.1-9.5,36.6-24.1h-48.2v-10.6h47.6 c-3-12.3-14.2-18.4-32.6-18.4h-15v-13.8h89.1V158z" />
                                    </svg>
                                </i>
                                <span>Pan Services</span>
                            </NavLink>
                        </div>
                    </div>
                    </>
)}

                    <div className="MenuItem ">
                        <div className="card-header collapsed headingSettings-2" id="headingSettings" data-toggle="collapse" data-target="#collapseSettings" aria-expanded="false" aria-controls="collapseSettings">
                            <Link href="#" onClick={() => { changeOpen(!allAside.disput, "disput"); }}>
                                <MdOutlineDisplaySettings />
                                <span>Help & Support</span>
                                <i className="ic">
                                    <svg x={0} y={0} viewBox="0 0 7 11">
                                        <path d="M6.783,6.060 L2.231,10.803 C1.941,11.104 1.472,11.104 1.182,10.803 C0.893,10.501 0.893,10.012 1.182,9.710 L5.210,5.514 L1.182,1.317 C0.893,1.015 0.893,0.526 1.182,0.224 C1.472,-0.077 1.941,-0.077 2.231,0.224 L6.783,4.967 C6.928,5.118 7.000,5.316 7.000,5.514 C7.000,5.711 6.927,5.909 6.783,6.060 Z" />
                                    </svg>
                                </i>
                            </Link>
                        </div>
                        <div id="collapseSettings" className={`SubmenuItems collapse ${allAside.disput ? "mm-show" : "extra"}`} aria-labelledby="headingSettings" data-parent="#accordion">
                            <ul>
                                <li onClick={handleMenuClick}>
                                    <NavLink to="add-ticket">Add Ticket</NavLink>
                                </li>
                                <li onClick={handleMenuClick}>
                                    <NavLink to="list-tickets">List Tickets</NavLink>
                                </li>
                                <li onClick={handleMenuClick}>
                                    <NavLink to="open-dispute">Pending Tickets</NavLink>
                                </li>
                                <li onClick={handleMenuClick}>
                                    <NavLink to="clossing-Dispute">Closed Tickets</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* <div className="MenuItem ">
                        <div className="card-header">
                            <Link to="complain-list">
                                <i>
                                    <svg x={0} y={0} viewBox="0 0 22 16">
                                        <path d="M19.421,12.936 L19.421,15.705 L16.464,13.810 C15.899,13.890 15.357,13.928 14.867,13.928 C10.892,13.928 7.778,12.022 7.778,9.590 C7.778,7.158 10.892,5.252 14.867,5.252 C18.842,5.252 21.999,7.158 21.999,9.590 C21.999,10.911 21.065,12.115 19.421,12.936 ZM12.289,8.970 L11.000,8.970 L11.000,10.210 L12.289,10.210 L12.289,8.970 ZM15.511,8.970 L14.222,8.970 L14.222,10.210 L15.511,10.210 L15.511,8.970 ZM18.776,8.970 L17.488,8.970 L17.488,10.210 L18.776,10.210 L18.776,8.970 ZM11.000,4.013 L9.711,4.013 L9.711,5.156 C7.968,6.040 6.790,7.369 6.542,8.950 C6.234,8.931 5.915,8.900 5.579,8.852 L2.622,10.748 L2.622,7.978 C0.977,7.157 0.001,5.953 0.001,4.632 C0.001,2.200 3.158,0.295 7.133,0.295 C10.773,0.295 13.661,1.899 14.127,4.036 C12.991,4.096 11.945,4.307 11.000,4.620 L11.000,4.013 ZM4.555,4.013 L3.266,4.013 L3.266,5.252 L4.555,5.252 L4.555,4.013 ZM7.778,4.013 L6.489,4.013 L6.489,5.252 L7.778,5.252 L7.778,4.013 Z" />
                                    </svg>
                                </i>
                                <span>Complain</span>
                            </Link>
                        </div>
                    </div> */}
                    <div className="MenuItem ">
                        <div className="card-header collapsed" id="headingSettings" data-toggle="collapse" data-target="#collapseSettings" aria-expanded="false" aria-controls="collapseSettings">
                            <Link href="#" onClick={() => { changeOpen(!allAside.setting, "setting"); }}>
                                <i>
                                    <svg x={0} y={0} viewBox="0 0 16 16" className="sm-svg default-svg">
                                        <path d="M15.920,7.112 C15.895,6.887 15.633,6.718 15.407,6.718 C14.675,6.718 14.026,6.287 13.753,5.621 C13.475,4.940 13.655,4.144 14.200,3.643 C14.372,3.486 14.392,3.223 14.248,3.040 C13.874,2.564 13.448,2.133 12.983,1.760 C12.801,1.614 12.534,1.634 12.377,1.809 C11.901,2.337 11.046,2.534 10.385,2.257 C9.698,1.968 9.264,1.270 9.307,0.521 C9.320,0.285 9.149,0.081 8.915,0.053 C8.318,-0.016 7.716,-0.018 7.118,0.048 C6.887,0.074 6.715,0.274 6.723,0.506 C6.749,1.248 6.310,1.934 5.629,2.213 C4.977,2.480 4.128,2.286 3.653,1.762 C3.496,1.590 3.233,1.569 3.050,1.711 C2.572,2.088 2.136,2.518 1.758,2.991 C1.611,3.175 1.633,3.441 1.806,3.599 C2.362,4.103 2.541,4.905 2.253,5.595 C1.977,6.253 1.295,6.676 0.515,6.676 C0.262,6.668 0.082,6.839 0.054,7.069 C-0.016,7.670 -0.017,8.283 0.050,8.889 C0.076,9.114 0.345,9.282 0.574,9.282 C1.269,9.264 1.937,9.695 2.217,10.378 C2.496,11.060 2.317,11.855 1.770,12.356 C1.600,12.514 1.578,12.776 1.722,12.959 C2.093,13.433 2.519,13.863 2.985,14.240 C3.168,14.387 3.434,14.367 3.593,14.191 C4.071,13.662 4.926,13.466 5.584,13.743 C6.273,14.032 6.706,14.730 6.664,15.479 C6.650,15.715 6.823,15.920 7.056,15.946 C7.361,15.982 7.668,16.000 7.976,16.000 C8.268,16.000 8.560,15.984 8.852,15.951 C9.084,15.926 9.255,15.726 9.248,15.493 C9.221,14.752 9.660,14.066 10.340,13.787 C10.997,13.518 11.843,13.715 12.318,14.238 C12.475,14.410 12.736,14.431 12.920,14.288 C13.398,13.913 13.832,13.483 14.212,13.009 C14.359,12.825 14.339,12.559 14.164,12.401 C13.609,11.897 13.428,11.094 13.717,10.405 C13.988,9.756 14.645,9.321 15.351,9.321 L15.449,9.323 C15.678,9.342 15.889,9.165 15.917,8.931 C15.987,8.329 15.988,7.718 15.920,7.112 ZM7.998,10.685 C6.529,10.685 5.335,9.488 5.335,8.017 C5.335,6.545 6.529,5.348 7.998,5.348 C9.467,5.348 10.661,6.545 10.661,8.017 C10.661,9.488 9.467,10.685 7.998,10.685 Z" />
                                    </svg>
                                </i>
                                <span>Settings</span>
                                <i className="ic">
                                    <svg x={0} y={0} viewBox="0 0 7 11">
                                        <path d="M6.783,6.060 L2.231,10.803 C1.941,11.104 1.472,11.104 1.182,10.803 C0.893,10.501 0.893,10.012 1.182,9.710 L5.210,5.514 L1.182,1.317 C0.893,1.015 0.893,0.526 1.182,0.224 C1.472,-0.077 1.941,-0.077 2.231,0.224 L6.783,4.967 C6.928,5.118 7.000,5.316 7.000,5.514 C7.000,5.711 6.927,5.909 6.783,6.060 Z" />
                                    </svg>
                                </i>
                            </Link>
                        </div>
                        <div id="collapseSettings" className={`SubmenuItems collapse ${allAside.setting ? "mm-show" : "extra"}`} aria-labelledby="headingSettings" data-parent="#accordion">
                            <ul>
                                {/* <li onClick={handleMenuClick}>
                                    <Link to="shipping_Address">Shipping Address</Link>
                                </li> */}
                                <li onClick={handleMenuClick}>
                                    <NavLink to="billing_Address">Billing Address</NavLink>
                                </li>

                                <li onClick={handleMenuClick}>
                                    <NavLink to="change_password">Password Change</NavLink>
                                </li>
                                <li onClick={handleMenuClick}>
                                    <NavLink to="change_txnpassword">Change Tpin</NavLink>
                                </li>
                                {/* <li>
                                    <Link to="Retailer_authentication">OTP Security</Link>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="MenuItem ">
                        {/* <div className="card-header">
                            <Link to="activity-logs">

                                <MdOutlineNotificationsActive className="mr-2" />

                                <span>Activity Log</span>
                            </Link>
                        </div> */}
                    </div>
                    {/* <div className="MenuItem ">
                        <div className="card-header">
                            <Link to="aesp-device-drivers">
                                <i>
                                    <svg x="0px" y="0px" viewBox="0 0 685.2 869.2">
                                        <path d="M431.3,350.6c-2.8-50.4-39.2-71.8-78-74.4c-38.8-2.5-96.7,0-127.6,55.7c-30.9,55.7-43.1,138.2-41.4,161 c1.6,22.8,7.3,75.6,85.4,79.7c78,4.1,97.5,0,100.8-2.4c3.3-2.4,22.6-23.4,24.4-56.1H267.1c0,0-38.2-0.8-19.5-63.4 c0,0,133.2,0.4,137.4,0c4.2-0.4,13.6-1.8,25.2-16.3C421.7,419.9,434.1,401,431.3,350.6z M371.6,396.5H263.5 c11.8-38.2,18.5-61.4,74.8-61.8C394.8,334.5,371.6,396.5,371.6,396.5z M110.9,453.5c-10.4,0-20.3,8.4-22.1,18.9c-1.8,10.5,5.2,18.9,15.6,18.9s20.3-8.4,22.1-18.9 C128.3,461.9,121.4,453.5,110.9,453.5z M410.1,819.2c-2.4-9.6-12.7-14.1-23-10c-37.5,14.8-75.9,22.3-114.2,22.3c-116.1,0-207.4-69.5-232.5-177.1 c-2.2-9.7-12.5-14.3-22.8-10.4S0.7,658.8,3,668.4c27.7,118.7,129.7,200.7,263.5,200.7c43.4,0,86.9-8.5,129.4-25.2 C406.2,839.9,412.5,828.8,410.1,819.2z M35.3,453.5c-10.4,0-20.4,8.5-22.1,18.9L0.3,548c-1.8,10.4,5.2,18.9,15.6,18.9s20.4-8.5,22.1-18.9L51,472.4 C52.8,461.9,45.8,453.5,35.3,453.5z M309,35.3c-2.4-9.6-12.7-14.1-23-10.1C158.2,75.6,61.3,191.8,39.1,321.2l-12.9,75.6c-1.8,10.5,5.2,18.9,15.6,18.9 s20.4-8.4,22.1-18.9l13-75.6C96.4,207,182,104.5,294.7,60C305,56,311.4,44.9,309,35.3z M631.9,500.7c-10.4,0-20.4,8.4-22.1,18.9l-4.8,28.3c-14.5,84.9-65.8,164.6-140.6,218.7c-9.2,6.6-12.4,18.5-7.1,26.6 c5.3,8.1,17,9.2,26.2,2.6c84.8-61.3,142.9-151.6,159.4-247.9l4.8-28.3C649.4,509.2,642.4,500.7,631.9,500.7z M536.1,25.2c-8.9-4.1-20.8,0.5-26.5,10.1c-5.7,9.6-3.1,20.7,5.8,24.7C659.8,125.9,652,271.9,641.9,331.6 c-0.3,1.9-0.6,3.4-0.7,4.8l-14.4,84.1l0,0.1c-1.8,10.4,5.2,18.8,15.7,18.8c10.4,0,20.4-8.5,22.2-19l14.5-85 C702.7,197.8,658.2,80.9,536.1,25.2z M609.4,271.8c-1.1-31.5-8.5-61.1-22-87.8c-4.4-8.6-15.7-10.9-25.4-5.1s-13.9,17.6-9.6,26.2 c11.4,22.6,17.7,47.6,18.6,74.3c0.3,9,7.1,15.1,15.9,15.1c1.3,0,2.6-0.1,3.9-0.4C601.5,292,609.8,282,609.4,271.8z M532.5,117.6c-85.9-65.7-218.8-53-316,30c-81.5,69.6-94,135.5-104,188.5c-6.5,34.2,3-17.6-10.7,60.7 c-1.8,10.5,5.2,18.9,15.7,18.9s20.3-8.4,22.1-18.9l8.1-47c11.4-57.8,17.3-112.5,91-175.5c82.3-70.3,194.7-81,267.4-25.4 c7.7,5.8,19.8,3.6,27.1-5.1C540.4,135.2,540.1,123.4,532.5,117.6z M433.5,725.3c-4.4-8.6-15.7-10.9-25.4-5.1c-38.9,23.6-80.4,35.6-120.4,35.8C180.7,756.5,92.4,671.9,113.6,548 c1.8-10.4-5.2-18.9-15.6-18.9s-20.4,8.4-22.1,18.9c-24.5,143.4,75.3,245.7,204.9,245.7c48.6,0,98.2-14.8,143.2-42 C433.6,745.8,437.8,734,433.5,725.3z M585.5,330.6c-10.4,0-20.4,8.5-22.1,18.9l-34,198.4c-7.1,41.6-26.3,81.7-55.4,116.1c-7.3,8.6-7.1,20.4,0.6,26.2 c7.6,5.8,19.8,3.6,27.1-5.1c34.5-40.7,57.1-88.2,65.5-137.3l34-198.4C602.9,339.1,595.9,330.6,585.5,330.6z M471.3,559.9c-9.8-2.1-21,4.5-24.8,14.7c-9.5,25.3-26,48.4-47.5,66.9c-8.6,7.4-10.7,19.3-4.6,26.7 c6.1,7.4,18.1,7.4,26.7,0c27.7-23.7,48.9-53.4,61.1-86C486.1,572,481.2,562,471.3,559.9z M389.4,151.2c-22.9,0-45.9,4.5-68.5,13.4c-10.3,4.1-16.7,15.2-14.3,24.8c2.4,9.6,12.8,14.1,23,10 c17.5-6.9,35.4-10.4,53.2-10.4c72.9,0,122.1,59.3,109.6,132.3l-29.1,170.1l0,0.2c-1.8,10.4,5.2,18.9,15.7,18.9 s20.4-8.5,22.1-18.9l0-0.2l29.1-170.1C546.5,227.4,483.2,151.2,389.4,151.2z M447.9,1.7c-21.3-2.2-43.7-2.2-65.7,0c-10.6,1-19.7,10.3-20.4,20.7c-0.7,10.4,7.3,17.9,17.8,16.9c19.4-2,39.3-2,58,0 c0.7,0.1,1.3,0.1,1.9,0.1c9.6,0,19-7.2,21.7-17C464.1,12,458.1,2.7,447.9,1.7z" />
                                    </svg>
                                </i>
                                <span>AEPS Device Drivers</span>
                            </Link>
                        </div>
                    </div> */}
                    <div className="MenuItem ">
                        {/* <div className="card-header">
                            <Link to="tds_certificate">
                                <i>
                                    <svg viewBox="0 0 426.48 426.48">
                                        <path d="M113.345,100.813h106.666c5.521,0,10-4.479,10-10c0-5.523-4.479-10-10-10H113.345c-5.523,0-10,4.477-10,10 C103.345,96.336,107.822,100.813,113.345,100.813z M113.345,150.146h145.334c5.521,0,10-4.477,10-10c0-5.522-4.479-10-10-10H113.345c-5.523,0-10,4.478-10,10 C103.345,145.67,107.822,150.146,113.345,150.146z M72.769,30h226.486v156.773c3.947,1.141,7.336,2.849,10.107,4.403c4.688-2.63,11.135-5.714,19.092-5.714 c0.27,0,0.533,0.023,0.801,0.03V30c0-16.568-13.432-30-30-30H72.769c-16.568,0-30,13.432-30,30v334.293c0,16.568,13.432,30,30,30 h181.666v-30H72.769V30z M375.425,260.988c-2.232-1.988-4.768-4.242-5.322-5.954c-0.607-1.872,0.1-5.155,0.779-8.332 c1.07-4.979,2.283-10.621-0.797-14.853c-3.105-4.271-8.883-4.856-13.979-5.373c-3.057-0.312-6.52-0.661-8.066-1.789 c-1.512-1.1-2.895-4.254-4.115-7.036c-2.074-4.725-4.422-10.079-9.51-11.73c-0.936-0.304-1.932-0.458-2.959-0.458 c-3.895,0-7.633,2.17-11.246,4.27c-2.852,1.656-5.801,3.368-7.846,3.368c-2.047,0-4.994-1.712-7.848-3.368 c-3.613-2.1-7.352-4.27-11.246-4.27c-1.027,0-2.021,0.154-2.959,0.458c-5.086,1.651-7.438,7.006-9.512,11.73 c-1.221,2.782-2.604,5.938-4.113,7.036c-1.551,1.128-5.014,1.479-8.066,1.789c-5.096,0.517-10.873,1.103-13.98,5.373 c-3.08,4.23-1.867,9.873-0.797,14.853c0.682,3.177,1.389,6.461,0.779,8.333c-0.555,1.711-3.088,3.965-5.322,5.953 c-3.885,3.456-8.287,7.373-8.287,12.809c0,5.435,4.402,9.352,8.287,12.808c2.234,1.987,4.768,4.241,5.324,5.954 c0.606,1.871-0.098,5.156-0.781,8.332c-1.07,4.979-2.283,10.621,0.797,14.853c3.107,4.271,8.885,4.856,13.98,5.374 c3.055,0.311,6.518,0.66,8.066,1.788c1.512,1.101,2.895,4.254,4.115,7.037c2.072,4.724,4.424,10.077,9.51,11.729 c0.938,0.305,1.934,0.457,2.961,0.457c3.893,0,7.631-2.17,11.244-4.269c2.852-1.656,5.801-3.369,7.848-3.369 c2.045,0,4.994,1.712,7.846,3.369c3.613,2.099,7.352,4.269,11.246,4.269c1.027,0,2.023-0.154,2.961-0.457 c5.084-1.652,7.434-7.007,9.506-11.73c1.223-2.782,2.605-5.938,4.117-7.036c1.549-1.128,5.012-1.479,8.066-1.789 c5.098-0.517,10.873-1.103,13.979-5.373c3.08-4.231,1.867-9.874,0.797-14.853c-0.682-3.176-1.389-6.461-0.777-8.332 c0.555-1.713,3.088-3.967,5.32-5.955c3.887-3.455,8.287-7.372,8.287-12.807C383.712,268.361,379.31,264.444,375.425,260.988z M312.362,299.766c-14.344,0-25.971-11.627-25.971-25.971c0-14.343,11.627-25.97,25.971-25.97 c14.342,0,25.969,11.627,25.969,25.97C338.331,288.139,326.704,299.766,312.362,299.766z M336.765,348.909c-1.697,0.552-3.484,0.831-5.311,0.831c-5.945,0-11.004-2.938-15.068-5.299 c-1.152-0.67-2.945-1.71-4.023-2.18c-1.08,0.47-2.871,1.511-4.025,2.18c-4.062,2.359-9.123,5.299-15.064,5.299l0,0 c-1.828,0-3.615-0.279-5.314-0.83c-5.02-1.63-8.229-5.049-10.521-8.729v82.188c0,1.631,0.965,3.106,2.457,3.763 c1.49,0.655,3.23,0.365,4.434-0.737l28.037-25.781l28.035,25.781c0.771,0.712,1.77,1.085,2.783,1.085 c0.557,0,1.119-0.114,1.648-0.348c1.494-0.655,2.457-2.132,2.457-3.763v-82.228C344.989,343.809,341.741,347.295,336.765,348.909z " />
                                    </svg>
                                </i>
                                <span>TDS Certificate</span>
                            </Link>
                        </div> */}
                        {/* <div className="MenuItem">
                            <div className="card-header">
                                <div className="new-label">
                                    <span>New</span>
                                </div>
                                <a href="#" target="_blank">
                                    <i>
                                        <svg x={0} y={0} viewBox="0 0 17 17">
                                            <path d="M9.444,17.000 L9.444,7.555 L17.000,7.555 L17.000,17.000 L9.444,17.000 ZM9.444,-0.000 L17.000,-0.000 L17.000,5.667 L9.444,5.667 L9.444,-0.000 ZM-0.000,11.333 L7.555,11.333 L7.555,17.000 L-0.000,17.000 L-0.000,11.333 ZM-0.000,-0.000 L7.555,-0.000 L7.555,9.444 L-0.000,9.444 L-0.000,-0.000 Z" />
                                        </svg>
                                    </i>
                                    <span>Whatsapp</span>
                                </a>
                            </div>
                        </div> */}
                    </div>
                    {/* <div className="MenuItem">
                        <div className="card-header">

                            <a href="#">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" space="preserve" width="60px" height="60px" version="1.1" style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }} viewBox="0 0 60 60" xlink="http://www.w3.org/1999/xlink">
                                        <defs>
                                            <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\n                                            .fil2 {fill:#555555}\n                                            .fil1 {fill:#D16666}\n                                            .fil0 {fill:#D16666}\n                                            .fil3 {fill:white}\n\n                                        " }} />
                                        </defs>
                                        <g id="Layer_x0020_1">
                                            <metadata id="CorelCorpID_0Corel-Layer" />
                                            <path className="fil0" d="M33.25 10.29c4.02,0 7.28,3.26 7.28,7.28 0,4.02 -3.26,7.28 -7.28,7.28 -4.02,0 -7.28,-3.26 -7.28,-7.28 0,-4.02 3.26,-7.28 7.28,-7.28z" />
                                            <path className="fil1" d="M35.41 26.21l-0.52 0.12c-0.2,0.03 -0.36,0.15 -0.47,0.3 -0.1,0.15 -0.15,0.35 -0.11,0.54 0.01,0.1 0.05,0.18 0.1,0.26 0.05,0.08 0.12,0.15 0.19,0.2 0.08,0.05 0.17,0.1 0.26,0.12 0.09,0.02 0.19,0.02 0.29,0l0.63 -0.14c0.19,-0.04 0.35,-0.17 0.44,-0.32 0.09,-0.16 0.13,-0.36 0.08,-0.55l0 -0.02c-0.05,-0.18 -0.17,-0.34 -0.33,-0.43 -0.16,-0.09 -0.35,-0.13 -0.54,-0.08l-0.02 0z" />
                                            <path className="fil1" d="M41.83 14.6c0.03,0.07 0.06,0.14 0.11,0.2 0.04,0.06 0.1,0.12 0.16,0.16 0.09,0.06 0.2,0.11 0.31,0.12 0.11,0.02 0.23,0.01 0.34,-0.03 0.19,-0.06 0.34,-0.19 0.42,-0.36 0.08,-0.16 0.1,-0.35 0.04,-0.54l-0.22 -0.61c-0.08,-0.18 -0.22,-0.33 -0.39,-0.4 -0.17,-0.07 -0.37,-0.08 -0.55,0l-0.02 0c-0.18,0.08 -0.31,0.22 -0.38,0.38 -0.07,0.17 -0.08,0.37 -0.01,0.56l0.19 0.52z" />
                                            <path className="fil1" d="M38.24 24.97l-0.48 0.3c-0.17,0.1 -0.28,0.26 -0.33,0.43 -0.04,0.18 -0.02,0.38 0.08,0.55l0.09 0.13 0.12 0.1c0.11,0.08 0.25,0.13 0.38,0.13 0.13,0.01 0.27,-0.02 0.39,-0.09l0.55 -0.34c0.17,-0.11 0.27,-0.28 0.31,-0.46 0.03,-0.17 0,-0.36 -0.1,-0.53l-0.01 -0.01c-0.11,-0.17 -0.28,-0.28 -0.45,-0.31 -0.18,-0.04 -0.37,-0.01 -0.53,0.09l-0.02 0.01z" />
                                            <path className="fil1" d="M43.73 17.03c-0.01,-0.2 -0.09,-0.38 -0.23,-0.51 -0.13,-0.12 -0.32,-0.2 -0.52,-0.19 -0.2,0.01 -0.38,0.1 -0.5,0.23 -0.13,0.14 -0.2,0.33 -0.19,0.52l0 0.55c0,0.13 0.03,0.25 0.08,0.34 0.05,0.11 0.13,0.21 0.23,0.27 0.05,0.04 0.12,0.08 0.19,0.1 0.06,0.02 0.14,0.03 0.21,0.03 0.2,0.01 0.38,-0.07 0.51,-0.2 0.14,-0.12 0.22,-0.31 0.23,-0.5l-0.01 -0.64z" />
                                            <path className="fil1" d="M41.49 22.72c-0.16,-0.12 -0.35,-0.16 -0.53,-0.14 -0.19,0.03 -0.36,0.13 -0.48,0.29l-0.34 0.43c-0.14,0.15 -0.19,0.34 -0.18,0.52 0.02,0.19 0.1,0.37 0.25,0.5l0.06 0.04c0.15,0.1 0.33,0.15 0.51,0.12 0.17,-0.02 0.33,-0.1 0.46,-0.24l0.4 -0.5c0.12,-0.16 0.16,-0.36 0.13,-0.54 -0.02,-0.18 -0.12,-0.36 -0.28,-0.48z" />
                                            <path className="fil1" d="M42.79 19.65c-0.19,-0.05 -0.39,-0.03 -0.56,0.05 -0.16,0.09 -0.29,0.24 -0.35,0.43l-0.18 0.52c-0.06,0.15 -0.06,0.32 -0.02,0.47 0.05,0.15 0.14,0.28 0.27,0.38l0.17 0.08c0.18,0.07 0.38,0.06 0.55,-0.01 0.17,-0.08 0.31,-0.22 0.38,-0.4l0.21 -0.61c0.06,-0.19 0.04,-0.39 -0.05,-0.55 -0.08,-0.16 -0.23,-0.3 -0.42,-0.36z" />
                                            <path className="fil1" d="M31.65 26.33c-0.39,-0.06 -0.77,-0.16 -1.14,-0.28 -0.37,-0.11 -0.73,-0.26 -1.09,-0.42 -0.34,-0.18 -0.62,-0.32 -0.95,-0.52l-0.43 -0.28c-2.04,-1.44 -3.3,-3.57 -3.7,-5.85 -0.39,-2.28 0.08,-4.72 1.52,-6.75 0.3,-0.44 0.64,-0.84 1.01,-1.21 0.38,-0.37 0.78,-0.71 1.21,-1.01l0.03 -0.02c1.5,-1.03 3.28,-1.58 5.07,-1.59 1.75,-0.02 3.53,0.48 5.08,1.51l0.11 0.08 -0.74 1.07c-0.04,0.05 -0.06,0.1 -0.07,0.14l0.01 0.05 0.04 0.03 0.15 0.01 2.98 -0.27c0.08,-0.03 0.15,-0.08 0.2,-0.14 0.04,-0.06 0.06,-0.14 0.05,-0.23l-0.79 -2.89c-0.01,-0.06 -0.04,-0.1 -0.06,-0.13l-0.04 -0.03 -0.06 0.01c-0.03,0.02 -0.07,0.06 -0.1,0.11l-0.74 1.07 -0.11 -0.07c-1.12,-0.75 -2.37,-1.28 -3.66,-1.55 -1.29,-0.28 -2.63,-0.3 -3.97,-0.07 -0.28,0.05 -0.56,0.1 -0.83,0.18 -1.17,0.3 -2.25,0.78 -3.22,1.43 -0.97,0.65 -1.84,1.47 -2.56,2.43 -0.13,0.17 -0.31,0.42 -0.42,0.61 -0.59,0.92 -1.03,1.91 -1.31,2.95 -0.28,1.03 -0.4,2.11 -0.35,3.19 0,0.41 0.08,0.93 0.14,1.34 0.19,1.08 0.54,2.11 1.03,3.05 0.5,0.96 1.14,1.83 1.91,2.59l0.01 0.01c0.21,0.21 0.43,0.41 0.65,0.6 0.22,0.18 0.46,0.36 0.7,0.53 0.63,0.44 1.3,0.81 2,1.11 0.69,0.29 1.42,0.5 2.18,0.64 0.2,0.03 0.39,-0.01 0.54,-0.12 0.15,-0.1 0.27,-0.27 0.3,-0.46 0.04,-0.2 -0.01,-0.4 -0.12,-0.55 -0.1,-0.15 -0.27,-0.26 -0.46,-0.3z" />
                                            <path className="fil2" d="M46.94 42.34l2.5 -2.98c1.71,-2.12 3.38,-4.3 4.48,-5.69 0.67,-0.81 0.96,-1.82 0.88,-2.8 -0.08,-0.98 -0.54,-1.93 -1.35,-2.62l-0.02 -0.01c-0.8,-0.67 -1.8,-0.96 -2.78,-0.88 -0.97,0.07 -1.93,0.52 -2.61,1.32 -1.88,2.11 -4.19,4.32 -6.19,6.36l-0.15 -0.19c-0.37,-0.45 -0.83,-0.81 -1.34,-1.06 -0.51,-0.24 -1.07,-0.38 -1.66,-0.38 -1.16,0 -11.22,0.08 -11.43,-0.01 -0.8,-0.33 -1.62,-0.59 -2.45,-0.75 -0.84,-0.17 -1.7,-0.25 -2.57,-0.25 -2.45,0 -4.74,0.57 -6.69,1.68 -1.9,1.07 -3.49,2.65 -4.6,4.71l-0.07 0.14 -0.16 -0.03c-0.45,-0.09 -0.92,-0.06 -1.36,0.08 -0.43,0.13 -0.83,0.37 -1.17,0.71l-4.84 4.85c-0.15,0.16 -0.23,0.36 -0.23,0.56 0,0.21 0.07,0.42 0.23,0.57l11.43 11.52c0.16,0.15 0.36,0.24 0.56,0.24 0.21,0 0.41,-0.08 0.57,-0.23l4.94 -4.87c0.38,-0.38 0.63,-0.86 0.75,-1.36 0.12,-0.52 0.09,-1.07 -0.08,-1.57l-0.05 -0.13 1.16 -1.12c0.31,-0.3 0.67,-0.53 1.05,-0.68 0.38,-0.16 0.8,-0.24 1.22,-0.24l13.54 0c1.17,0 2.31,-0.22 3.37,-0.65 1.05,-0.43 2.03,-1.07 2.87,-1.88 0.65,-0.59 1.42,-1.41 2.25,-2.36z" />
                                            <path className="fil3" d="M36.36 14.75c-0.04,-0.05 -0.1,-0.07 -0.16,-0.07l-1.21 0c-0.08,-0.39 -0.23,-0.73 -0.46,-1.02l1.65 0c0.07,0 0.12,-0.02 0.17,-0.06 0.04,-0.04 0.06,-0.1 0.06,-0.16l0 -0.72c0,-0.07 -0.02,-0.12 -0.06,-0.17 -0.05,-0.04 -0.1,-0.06 -0.17,-0.06l-5.88 0c-0.07,0 -0.12,0.02 -0.17,0.06 -0.04,0.05 -0.06,0.1 -0.06,0.17l0 0.94c0,0.06 0.02,0.11 0.07,0.16 0.04,0.04 0.1,0.06 0.16,0.06l1.02 0c1,0 1.63,0.27 1.9,0.8l-2.92 0c-0.07,0 -0.12,0.02 -0.17,0.07 -0.04,0.04 -0.06,0.09 -0.06,0.16l0 0.72c0,0.07 0.02,0.12 0.06,0.16 0.05,0.05 0.1,0.07 0.17,0.07l3.02 0c-0.11,0.38 -0.35,0.68 -0.73,0.88 -0.38,0.2 -0.88,0.31 -1.5,0.31l-0.79 0c-0.06,0 -0.12,0.02 -0.16,0.06 -0.05,0.05 -0.07,0.1 -0.07,0.16l0 0.9c0,0.06 0.02,0.11 0.06,0.16 0.91,0.96 2.08,2.31 3.53,4.04 0.04,0.05 0.1,0.08 0.17,0.08l1.38 0c0.1,0 0.17,-0.04 0.21,-0.13 0.05,-0.08 0.04,-0.16 -0.03,-0.24 -1.38,-1.69 -2.46,-2.95 -3.25,-3.79 0.8,-0.09 1.46,-0.35 1.96,-0.78 0.49,-0.42 0.8,-0.97 0.91,-1.65l1.19 0c0.06,0 0.12,-0.02 0.16,-0.07 0.04,-0.04 0.06,-0.09 0.06,-0.16l0 -0.72c0,-0.07 -0.02,-0.12 -0.06,-0.16z" />
                                        </g>
                                    </svg>
                                </i>
                                <div style={{ flex: 2, position: 'relative', display: 'flex', flexDirection: 'row' }}>
                                    <span>Pre Approved Business Loan</span>

                                </div>
                            </a>
                        </div>
                    </div> */}

                    {/* <div className="MenuItem">
                        <div className="card-header" onClick={handleMenuClick}>
                            <a href="#" onClick={logOut}>
                                <i>
                                    <svg x={0} y={0} viewBox="0 0 20 22">
                                        <path d="M10.000,22.000 C4.477,22.000 -0.000,17.486 -0.000,11.916 C-0.000,7.871 2.385,4.266 5.998,2.673 C6.458,2.470 6.994,2.681 7.196,3.145 C7.397,3.609 7.187,4.150 6.727,4.352 C3.770,5.656 1.818,8.606 1.818,11.916 C1.818,16.473 5.481,20.167 10.000,20.167 C14.518,20.167 18.182,16.473 18.182,11.916 C18.182,8.605 16.229,5.655 13.271,4.352 C12.811,4.150 12.601,3.609 12.802,3.146 C13.003,2.682 13.539,2.470 13.999,2.672 C17.614,4.265 20.000,7.870 20.000,11.916 C20.000,17.485 15.522,22.000 10.000,22.000 ZM10.000,10.083 C9.498,10.083 9.090,9.673 9.090,9.167 L9.090,0.917 C9.090,0.410 9.498,-0.000 10.000,-0.000 C10.502,-0.000 10.909,0.410 10.909,0.917 L10.909,9.167 C10.909,9.673 10.502,10.083 10.000,10.083 Z" />
                                    </svg>
                                </i>
                                <span >Logout</span>
                            </a>
                        </div>
                    </div> */}
                </div></div > <div id="mCSB_1_scrollbar_vertical" className="mCSB_scrollTools mCSB_1_scrollbar mCS-minimal-dark mCSB_scrollTools_vertical" style={{ display: 'block' }}><div className="mCSB_draggerContainer"><div id="mCSB_1_dragger_vertical" className="mCSB_dragger" style={{ position: 'absolute', minHeight: 50, height: 154, top: 0, display: 'block', maxHeight: '291.6px' }}><div className="mCSB_dragger_bar" style={{ lineHeight: 50 }} /></div><div className="mCSB_draggerRail" /></div></div></aside >
            <div id="myDIV" onClick={clickoVer}></div>
        </>
    )
}
export default AsideAdmin


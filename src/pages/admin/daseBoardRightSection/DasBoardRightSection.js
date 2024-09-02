import { Outlet, useNavigate } from "react-router-dom"
import AsideAdmin from "../../../components/admin/asideAdmin/AsideAdmin"
import DasBoardRightSection from "../../../components/admin/dasboardRightSection/DasBoardRightSection"
import AdminHeader from "../../../common/adminHeader/AdminHeader"
import AdminRightHeader from "../../../common/adminHeader/adminRightHeader/AdminRightHeader"
import ServiceParent from "../../../components/admin/dasBoard/serviceParent/ServiceParent"
import { useEffect, useRef, useState } from "react"
import RightSideBarSettings from "../../../components/admin/rightSidebarSetting/RightSidebarSetting"

function DasRightSectionPage({ tokenNoti, walletData }) {
    // const navigate = useNavigate()
    // useEffect(() => {
    //     navigate('/admin/mobile-reacharge')
    // }, [])

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        // console.log('dff');
        setIsActive(current => !current);
        var element = document.getElementById("myDIV");
        element.classList.add("overlay");
    };

    const overlayClick = () => {
        setIsActive(current => !current);

        var element = document.getElementById("myDIV");
        element.classList.remove("overlay");
    }

    const ref = useRef(null);
    useEffect(() => {
        // console.log('width', ref.current ? ref.current.offsetWidth : 0);
        if (ref.current.offsetWidth <= 426) {
            setIsActive(current => !current);
        }
        var element = document.getElementById("myDIV");
        element.classList.remove("overlay");
    }, [ref?.current]);



    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleMenuClick = () => {
        if (window.innerWidth <= 768) {
            setIsSidebarOpen(false);
        }
    };



    const [toggle, setToggle] = useState(false);


    const profileOn = () => {
        setToggle(!toggle);
        if (!toggle) {
            var element = document.getElementById("myDIV");
            element.classList.add("overlay2");
            console.log(element);
        }

    };

    const profileOf = () => {
        setToggle(false)
        var element = document.getElementById("myDIV");
        element.classList.remove("overlay2");

    }

    const clickoVer = () => {
        setToggle(false)
        var element = document.getElementById("myDIV");
        element.classList.remove("overlay2");
    }


    return (
        <>
            {/* <DasBoardRightSection /> */}
            <div className="LayoutMain" ref={ref} id="abcd dadas" >
                <AdminHeader walletData={walletData} handleClick={handleClick} toggleSidebar={toggleSidebar} profileOn={profileOn} profileOf={profileOf} toggle={toggle} tokenNoti={tokenNoti} />
                <div className={`BodyArea ${isSidebarOpen ? 'sidebar-open' : ''}`} id="abcd">
                    <AsideAdmin isActive={isActive} overlayClick={overlayClick} handleMenuClick={handleMenuClick} clickoVer={clickoVer} />
                    <div className="ContainerMain">
                        {/* <AdminRightHeader /> */}
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>

            <div className="sidebar-right">
                {["end"].map((placement, idx) => (
                    <RightSideBarSettings key={idx} placement={placement} name={placement} />
                ))}
            </div>
        </>
    )
}
export default DasRightSectionPage
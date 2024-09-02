import { Outlet } from "react-router-dom"
import BannerSlide from "./bannerSlider/BannerSlider"
// import NavLink from "./serviceParent/navLink/NavLink"
import TopServices from "./topService/TopService"
import ServiceParent from "./serviceParent/ServiceParent"
import NavLink from "./serviceParent/navLink/NavLink"

function DasBoard() {
    return (
        <>
            {/* <BannerSlide />
            <TopServices /> */}
            <div className="card-body m-3">
                <div className="card overflow-hidden">
                    <NavLink />
                    <Outlet></Outlet>
                </div>
            </div>

            {/* <ServiceParent /> */}

        </>
    )
}
export default DasBoard
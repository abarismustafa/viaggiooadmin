import { Navigate, Outlet } from "react-router-dom"
import DasRightSectionPage from "../admin/daseBoardRightSection/DasBoardRightSection"


function PrivateRoute({ component: component, tokenNoti, walletData }) {
    const token = window.localStorage.getItem('userIdToken')
    return token ? <DasRightSectionPage tokenNoti={tokenNoti} walletData={walletData} /> : <Navigate to='/login-area' />
}
export default PrivateRoute
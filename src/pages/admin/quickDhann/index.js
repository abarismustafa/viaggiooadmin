import { useEffect, useState } from "react"
import QuickDhann from "../../../components/admin/quickDhann/QuickDhann"
import { UserPermissionAeps2 } from "../../../api/login/Login"
import AepsDipositPurchge from "../cashDiposit/aepsDipositPurchage/AepsDipositPurchage"


function QuickDhanPage() {

    const [quickDhan, setquickDhan] = useState(false)
    const [quickDhanactiveMessage, setquickDhanactiveMessage] = useState()
    const [quickDhanbuyMessage, setquickDhanbuyMessage] = useState()

    const quickDhanPermission = async () => {
        const idMobile = '36'
        try {
            const res = await UserPermissionAeps2(idMobile)
            // console.log(res);
            if (res?.data?.data?.is_active == false) {
                setquickDhanactiveMessage('Please Admin Side Active User')
            }
            if (res?.data?.data?.is_active == true) {
                if (res?.data?.data?.is_buy == false) {
                    setquickDhanbuyMessage('Please Purchase')
                }
            }
            if (res?.data?.data?.is_active == true && res?.data?.data?.is_buy == true) {
                setquickDhan(true)
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        quickDhanPermission()
    }, [])
    return (
        <>

            {quickDhan ? <QuickDhann /> : <AepsDipositPurchge activeMessage={quickDhanactiveMessage} buyMessage={quickDhanbuyMessage} head={"Quick Dhan"} />}
            {/* <QuickDhann /> */}
        </>
    )
}
export default QuickDhanPage
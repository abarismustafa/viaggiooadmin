import { useEffect, useState } from "react"
import { UserPermissionAeps2 } from "../../../api/login/Login"
import AirtelCms from "../../../components/admin/airtelCms/Airtelcms"
import AepsDipositPurchge from "../cashDiposit/aepsDipositPurchage/AepsDipositPurchage"


function AirtelCmsPage({walletShowHeader}) {
    const [airltelCms, setairltelCms] = useState(false)
    const [airltelCmsactiveMessage, setairltelCmsactiveMessage] = useState()
    const [airltelCmsabuyMessage, setairltelCmsabuyMessage] = useState()

    const airtelCmsPermission = async () => {
        const idMobile = '35'
        try {
            const res = await UserPermissionAeps2(idMobile)
            // console.log(res);
            if (res?.data?.data?.is_active == false) {
                setairltelCmsactiveMessage('Please Admin Side Active User')
            }
            if (res?.data?.data?.is_active == true) {
                if (res?.data?.data?.is_buy == false) {
                    setairltelCmsabuyMessage('Please Purchase')
                }
            }
            if (res?.data?.data?.is_active == true && res?.data?.data?.is_buy == true) {
                setairltelCms(true)
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        airtelCmsPermission()
    }, [])
    return (
        <>
            {airltelCms ? <AirtelCms /> : <AepsDipositPurchge activeMessage={airltelCmsactiveMessage} buyMessage={airltelCmsabuyMessage} head={"Airtel CMS"} />}
            {/* <AirtelCms /> */}
        </>
    )
}
export default AirtelCmsPage
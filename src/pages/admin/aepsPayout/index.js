import { useEffect, useState } from "react"
import AepsPayout from "../../../components/admin/aepsPayout/AepsPayout"
import AepsDipositPurchge from "../cashDiposit/aepsDipositPurchage/AepsDipositPurchage"
import { UserPermissionAeps2 } from "../../../api/login/Login"
import Aepspayoutcomingsoon from "../../../components/admin/quickDhann/Aepspayoutcomingsoon"

function AepsPayoutPage() {

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

    useEffect(() => {
        addPayoutPermission()
    }, [])
    return (
        <>
            <AepsPayout />

            {/* {addPayout ? <AepsPayout /> : <AepsDipositPurchge activeMessage={addPayoutactiveMessage} buyMessage={addPayoutbuyMessage} head={"AEPS Payout Details"} />} */}
            {/* <Aepspayoutcomingsoon/> */}
            </>
    )
}
export default AepsPayoutPage
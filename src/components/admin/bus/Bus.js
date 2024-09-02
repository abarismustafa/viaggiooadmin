import AsideBus from "./AsideBus"
import RightBus from "./RightBus"
import Searchable from "./Serchable"

function Bus() {
    return (
        <>
            <div className="PageHeading">
                <h1>Bus Services</h1>
            </div>

            <div className="ContentArea">
                <div className="card">
                    {/* <div className="card-header"><span>Filter</span></div> */}
                    <div className="card-body">
                        <form action="" method="post" name="frmReport" id="frmReport">
                            <input type="hidden" id="hidID" name="hidID" />
                            <Searchable />
                            <div className="form-row">

                                <AsideBus />
                                <RightBus />
                            </div>
                        </form>
                    </div>

                </div>


            </div>
        </>
    )
}
export default Bus
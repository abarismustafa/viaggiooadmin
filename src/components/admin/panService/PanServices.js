
import '../panService/pan.css'
import img1 from '../../../asesets/service/pan.webp'
import { RiProfileLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
function PanService() {
    return (
        <>
            <div className="PageHeading">
                <h1>Pan Services</h1>
            </div>

            <div className="ContentArea">
                <div className="card">

                    {/* <div className="card-header"><span>Filter</span></div> */}
                    <div className="card-body">
                        <form action="" method="post" name="frmReport" id="frmReport">
                            <input type="hidden" id="hidID" name="hidID" />
                            <div className="form-row" style={{ alignItems: 'end' }}>
                                <div className="col-lg-6">

                                    <div className="box">
                                        <Link to="/new-pan">
                                            <div className="icon">
                                                <RiProfileLine />
                                            </div>
                                            <div className="name">NEW PAN</div>
                                        </Link>
                                    </div>


                                </div>
                                <div className="col-lg-6">
                                    <div className="box">
                                        <Link to="/corection-pan-card">
                                            <div className="icon">
                                                <RiProfileLine />
                                            </div>
                                            <div className="name">CORRECTION PAN</div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>


            </div>
        </>
    )
}
export default PanService
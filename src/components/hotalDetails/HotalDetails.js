import HotalRight from "./hotalRight/HotalRight"
import '../hotalDetails/hotalRight/hotal.css'
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import HotalLeft from "./hotalRight/HotalLeft";
import HeadRoom from "./hotalRight/headRome";
import RoomDetailsCat from "./hotalRight/RoomDetailsCat";
import Overview from "./hotalRight/overView";
import LocationHotal from "./hotalRight/LocaionHotal";

function HotalDetails() {
    return (
        <>
            <div className="PageHeading">
                <h1>Hotal Services Details</h1>
            </div>

            <div className="ContentArea">
                <div className="card">

                    {/* <div className="card-header"><span>Filter</span></div> */}
                    <div className="card-body">
                        <form action="" method="post" name="frmReport" id="frmReport">
                            <div className="form-row" >
                                <div className="col-lg-12">
                                    <div className="hotal-head">
                                        <h4>Orion Hotel By Balaji Hospitality, Goa <span><FaStar /> <FaStar /> <FaStar /> <FaStar /></span></h4>
                                        <p><span><FaLocationDot /> </span> SM 101 NOVA CIDADE COMMERCIAL COMPLEX ALTO PORVORIM GOA 403507</p>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <HotalRight />
                                </div>
                                <div className="col-lg-4">
                                    <HotalLeft />
                                </div>
                                <div className="col-lg-12">
                                    <div className="room-all">
                                        <HeadRoom />
                                    </div>
                                    <RoomDetailsCat />
                                </div>
                                <div className="col-lg-12">
                                    <Overview />
                                </div>
                                <div className="col-lg-12">
                                    <LocationHotal />
                                </div>
                            </div>
                        </form>
                    </div>

                </div>


            </div>
        </>
    )
}
export default HotalDetails
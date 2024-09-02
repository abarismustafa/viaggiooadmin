
import SlideImg from "./slideImg";
import hotal1 from '../../../asesets/travel/hotal-1.webp'
import hotal2 from '../../../asesets/travel/hotal-2.webp'
function HotalRight() {
    return (
        <>
            <div className="hotal-right">

                <div className="row">

                    <div className="col-lg-9">
                        <SlideImg />
                    </div>
                    <div className="col-lg-3">
                        <div className="row">

                            <div className="col-lg-12">
                                <div className="height-fix mb-1">
                                    <img src={hotal1} alt="" />
                                </div>
                            </div>
                            <div className="col-lg-12 mb-1">
                                <div className="height-fix">
                                    <img src={hotal2} alt="" />
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="height-fix">
                                    <img src={hotal1} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HotalRight
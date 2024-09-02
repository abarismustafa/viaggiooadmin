
import { FaUser } from "react-icons/fa";
import { MdBedroomChild } from "react-icons/md";
function HotalLeft() {
    return (
        <>
            <div className="card-set">
                <div className="card-head">
                    <h6>Executive Twin</h6>
                    <div className="set-category">
                        <p className="start-price">Price Starts at</p>
                        <p className="guest-set"><span><FaUser /></span> 2 x Guests</p>
                    </div>
                    <div className="set-category set-category-2">
                        <p className="false-price">₹ 3920/-</p>
                        <p><span><MdBedroomChild /></span> 1 x Rooms</p>
                    </div>


                    <p className="true-price">₹ 2899/-</p>
                    <p className="tax-set">+551 taxes & fees</p>
                    <p className="room-set">1 room <span>per night</span></p>

                    <button className="btn btn-bllue">Continue to Book</button>
                </div>

                <div className="set-check">
                    <div>
                        <p>Check-In :  <span></span>2 PM (AFTERNOON)</p>
                        <p>Check-Out :  <span></span>12 PM (MORNING)</p>
                    </div>
                </div>

            </div>
        </>
    )
}
export default HotalLeft
import img from '../../../asesets/travel/hotal-3.avif'
import { LuBedDouble } from "react-icons/lu";
import { TbSquareLetterS } from "react-icons/tb";
function RoomDetailsCat() {
    return (
        <>
            <div className="row mt-3">
                <div className="col-lg-4">
                    <div className="left-side-detsils">
                        <div className="left-side-detsils-heas">
                            Rooms
                        </div>
                        <div className="content-setlest">
                            <div className="image">
                                <img src={img} alt="" />
                            </div>
                            <h5>Executive  Twin</h5>
                            <div className='res-res-details'>
                                <p><span><TbSquareLetterS /></span> 361 sq.ft</p>
                                <p><span><LuBedDouble /></span> Twin Bed</p>

                            </div>
                            <div className='res-res-details'>
                                <p>Air Conditioning</p>
                                <p>CCTV</p>
                            </div>
                            <a href="#">More Details....</a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className='room-detailss'>
                        <div className="left-side-detsils-heas">
                            Rooms Details
                        </div>
                        <div className='contect-room-setted'>
                            <div className='contect-room-setted-set'>
                                <div className='inner-details'>
                                    <h4>Room Only</h4>
                                    <p>This tariff cannot be cancelled with zer... <a href="#">View Cancellation Policies</a></p>
                                </div>
                                <div className='inner-details-2'>
                                    <p>Per Night</p>
                                    <p>₹ 3920</p>
                                    <h2>₹ 2899</h2>
                                    <button className="btn btn-blluee">Book Now</button>
                                </div>
                            </div>

                            <div className='demaonf'>
                                <div className='inner-details'>
                                    <h4>Room with Breakfast</h4>
                                    <p>This tariff cannot be cancelled with zer... <a href="#">View Cancellation Policies</a></p>
                                </div>
                                <div className='inner-details-2'>
                                    <p>Per Night</p>
                                    <p>₹ 3920</p>
                                    <h2>₹ 3135</h2>
                                    <button className="btn btn-blluee">Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default RoomDetailsCat
import '../bus/bus.css'
import img1 from '../../../asesets/travel/steering.png'
import { useState } from 'react'
function RightBus() {

    const [boarding, setBoarding] = useState(false)
    const [activeTab, setActiveTab] = useState('boarding');

    const [cancle, setcancle] = useState(false)
    const [selectSeat, setSelectSeat] = useState(false)
    const toggleBoarding = () => {
        setBoarding(!boarding);
        setcancle(false);
        setSelectSeat(false)
    };

    const toggleCancle = () => {
        setcancle(!cancle);
        setBoarding(false);
        setSelectSeat(false)
    };


    const toggleSelectSeat = () => {
        setBoarding(false);
        setcancle(false);
        setSelectSeat(!selectSeat)
    };



    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <>
            <div className="col-lg-9">
                <div className="heading-02">
                    <h3>We have got 336 results</h3>
                    <div className="right-sorting-wrap">
                        <label>Operator</label>
                        <label>Departure</label>
                        <label>Total Duration</label>
                        <label>Arrival</label>
                        <label>Rating</label>
                        <label>Price</label>
                        <label>Select Seats</label>
                    </div>
                </div>

                <div className='details-set'>
                    <div className='set-headd'>
                        <div className='operator-set'>
                            <label>PAL BUS(Patel Travels</label>
                            <p>Bharat Benz AC Sleeper</p>
                        </div>
                        <div className='operator-set'>
                            <label>00:15</label>
                        </div>
                        <div className='operator-set'>
                            <label>05h 05m</label>
                        </div>
                        <div className='operator-set'>
                            <label>05:20</label>
                        </div>
                        <div className='operator-set'>
                            <label>2</label>
                        </div>
                        <div className='operator-set'>
                            <label>₹ 1000</label>
                            <p>22 Seats Left</p>

                        </div>
                        <div className='operator-set'>
                            <button type='button' className='btn btn-warning' onClick={toggleSelectSeat}>Select Seat</button>
                        </div>
                    </div>
                    <div className='but-sec'>
                        <div className='operator-sett'>
                            <p className='set-p' onClick={toggleBoarding}>
                                <a href="#">
                                    Boarding/Dropping Points
                                </a>
                            </p>
                        </div>
                        <div className='operator-sett'>
                            <p className='set-p' onClick={toggleCancle}>
                                <a href="#">
                                    Cancellation
                                </a>
                            </p>
                        </div>
                    </div>

                    {boarding && <div className='form-row'>

                        <div className='col-lg-6'>
                            <div className='boarding-set'>
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0 Boarding_table">
                                        <thead>
                                            <tr>
                                                <th className="text-center" colSpan={2}>Boarding Points</th>
                                            </tr>
                                            <tr>
                                                <th>Address</th>
                                                <th>Depart Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Kashmiri gate, Metro Gate no 3, 9518617366</td>
                                                <td>00:15</td>
                                            </tr>
                                            <tr>
                                                <td>Karol bagh, near hanuman murti, 9518617366</td>
                                                <td>00:30</td>
                                            </tr>
                                            <tr>
                                                <td>Pal bus (Patel Travels), Dhaula kuan, HP Petrol Pump, 9518617366</td>
                                                <td>00:50</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='boarding-set'>
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0 Boarding_table">
                                        <thead>
                                            <tr>
                                                <th className="text-center" colSpan={2}>Dropping Points</th>
                                            </tr>
                                            <tr>
                                                <th>Address</th>
                                                <th>Depart Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Amity university</td>
                                                <td>04:35</td>
                                            </tr>
                                            <tr>
                                                <td>Nims</td>
                                                <td>00:30</td>
                                            </tr>
                                            <tr>
                                                <td>Polo Victory</td>
                                                <td>00:50</td>
                                            </tr>
                                            <tr>
                                                <td>Sindhi camp bus stand,polovictory cinema</td>
                                                <td>00:50</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>




                            </div>
                        </div>
                    </div>}
                    {cancle && <div className='form-row'>
                        <div className='col-lg-12'>
                            <div className="table-responsive">
                                <table className="table table-bordered mb-0 Boarding_table">
                                    <thead>
                                        <tr>
                                            <th className="text-center" colSpan="2">Cancellation Detail</th>
                                        </tr>
                                        <tr>
                                            <th>Cancellation Time</th>
                                            <th>Refund Percent</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>B/W 0-48 Hrs of Bus Boarding Time</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>Above 48 Hrs of Bus Boarding Time</td>
                                            <td>0</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>}



                    {selectSeat && <div className='form-row'>
                        <div className='col-lg-6'>
                            <div className="Seat-left-wrap">
                                <div className="seat-lower-wrap">
                                    <h5>Lower Deck</h5>
                                    <div className="lower-deck-wrap">
                                        <div className="lower-deck-topwrap">
                                            <img alt src={img1} />
                                        </div>
                                        {/* Seats */}
                                        <div className="lower-deck-bottomwrap">
                                            <div className="lowerdeck-seat-wrap">
                                                <span rel="tooltip" className="Sleeper_V" title="Seat No. : L7 | Fare : INR 1155.0" />
                                                <span rel="tooltip" className="Sleeper_V" title />
                                                <span rel="tooltip" className="Sleeper_V" title />
                                                {/* More seats here */}
                                            </div>
                                            <div className="lowerdeck-seat-wrap">
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title="Seat No. : L6 | Fare : INR 1155.0"
                                                >

                                                </span>
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title=""
                                                ></span>

                                            </div>

                                            {/* More rows of seats */}
                                            <div className="lowerdeck-seat-wrap">{/**/}{/**/}<span rel="tooltip" className="Seating_blank occupied" title />{/**/}</div>
                                            <div className="lowerdeck-seat-wrap">
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title=""
                                                ></span>
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title=""
                                                ></span>
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title=""
                                                ></span>

                                            </div>
                                        </div>




                                    </div>
                                </div>
                                <div className="seat-lower-wrap">
                                    <h5>Upper Deck</h5>
                                    <div className="lower-deck-wrap">
                                        <div className="lower-deck-topwrap">
                                            {/* <img alt src="assets/img/steering.png" /> */}
                                        </div>
                                        {/* Seats */}
                                        <div className="lower-deck-bottomwrap">
                                            <div className="lowerdeck-seat-wrap">
                                                <span rel="tooltip" className="Sleeper_V" title="Seat No. : L7 | Fare : INR 1155.0" />
                                                <span rel="tooltip" className="Sleeper_V" title />
                                                <span rel="tooltip" className="Sleeper_V" title />
                                                {/* More seats here */}
                                            </div>
                                            <div className="lowerdeck-seat-wrap">
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title="Seat No. : L6 | Fare : INR 1155.0"
                                                >

                                                </span>
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title=""
                                                ></span>

                                            </div>

                                            {/* More rows of seats */}
                                            <div className="lowerdeck-seat-wrap">{/**/}{/**/}<span rel="tooltip" className="Seating_blank occupied" title />{/**/}</div>
                                            <div className="lowerdeck-seat-wrap">
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title=""
                                                ></span>
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title=""
                                                ></span>
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title=""
                                                ></span>

                                            </div>
                                        </div>




                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='col-lg-6'>
                            <div className="Seat-right-wrap">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === 'boarding' ? 'active' : ''}`}
                                            onClick={() => handleTabClick('boarding')}
                                        >
                                            Boarding Point
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === 'dropping' ? 'active' : ''}`}
                                            onClick={() => handleTabClick('dropping')}
                                        >
                                            Dropping Point
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    {activeTab === 'boarding' && (
                                        <div className="table-responsive">
                                            <table className="table table-bordered mb-0 Boarding_table">
                                                <thead>
                                                    <tr>
                                                        <th width="10%"></th>
                                                        <th width="25%">Boarding Point</th>
                                                        <th>Address</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="boardingTime" type="radio" />
                                                        </td>
                                                        <td>04:35</td>
                                                        <td>
                                                            Amity University
                                                            <p></p>
                                                            <p>Amity University</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="boardingTime" type="radio" />
                                                        </td>
                                                        <td>04:45</td>
                                                        <td>
                                                            Nims
                                                            <p></p>
                                                            <p>Nims</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="boardingTime" type="radio" />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Polo Victory
                                                            <p></p>
                                                            <p>Polo Victory</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="boardingTime" type="radio" />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Railway Station
                                                            <p></p>
                                                            <p>Railway Station</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="boardingTime" type="radio" />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Sindhi Camp Bus Stand, Polo Victory Cinema
                                                            <p></p>
                                                            <p>Sindhi Camp Bus Stand, Polo Victory Cinema</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                    {activeTab === 'dropping' && (
                                        <div className="table-responsive">
                                            <table className="table table-bordered mb-0 Boarding_table">
                                                <thead>
                                                    <tr>
                                                        <th width="10%"></th>
                                                        <th width="25%">Dropping Time</th>
                                                        <th>Address</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="droppingTime" type="radio" />
                                                        </td>
                                                        <td>04:35</td>
                                                        <td>
                                                            Amity University
                                                            <p></p>
                                                            <p>Amity University</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="droppingTime" type="radio" />
                                                        </td>
                                                        <td>04:45</td>
                                                        <td>
                                                            Nims
                                                            <p></p>
                                                            <p>Nims</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="droppingTime" type="radio" />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Polo Victory
                                                            <p></p>
                                                            <p>Polo Victory</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="droppingTime" type="radio" />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Railway Station
                                                            <p></p>
                                                            <p>Railway Station</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="droppingTime" type="radio" />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Sindhi Camp Bus Stand, Polo Victory Cinema
                                                            <p></p>
                                                            <p>Sindhi Camp Bus Stand, Polo Victory Cinema</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* <div className='col-lg-6'>
                            <div className="Seat-right-wrap">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link">Boarding Point</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active">Dropping Point</a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div>
                                        <div className="table-responsive">
                                            <table className="table table-bordered mb-0 Boarding_table">
                                                <thead>
                                                    <tr>
                                                        <th width="10%"></th>
                                                        <th width="25%">Boarding Point</th>
                                                        <th>Address</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input
                                                                name="debordTime"
                                                                type="radio"

                                                            />
                                                        </td>
                                                        <td>04:35</td>
                                                        <td>
                                                            Amity University
                                                            <p></p>
                                                            <p>Amity University</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input
                                                                name="debordTime"
                                                                type="radio"

                                                            />
                                                        </td>
                                                        <td>04:45</td>
                                                        <td>
                                                            Nims
                                                            <p></p>
                                                            <p>Nims</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input
                                                                name="debordTime"
                                                                type="radio"

                                                            />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Polo Victory
                                                            <p></p>
                                                            <p>Polo Victory</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input
                                                                name="debordTime"
                                                                type="radio"

                                                            />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Railway Station
                                                            <p></p>
                                                            <p>Railway Station</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input
                                                                name="debordTime"
                                                                type="radio"
                                                                className="ng-untouched ng-pristine ng-valid"
                                                            />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Sindhi Camp Bus Stand, Polo Victory Cinema
                                                            <p></p>
                                                            <p>Sindhi Camp Bus Stand, Polo Victory Cinema</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-content" id="myTabContent">
                                    <div>
                                        <div className="table-responsive">
                                            <table className="table table-bordered mb-0 Boarding_table">
                                                <thead>
                                                    <tr>
                                                        <th width="10%"></th>
                                                        <th width="25%">Dropping Time</th>
                                                        <th>Address</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input
                                                                name="debordTime"
                                                                type="radio"

                                                            />
                                                        </td>
                                                        <td>04:35</td>
                                                        <td>
                                                            Amity University
                                                            <p></p>
                                                            <p>Amity University</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input
                                                                name="debordTime"
                                                                type="radio"

                                                            />
                                                        </td>
                                                        <td>04:45</td>
                                                        <td>
                                                            Nims
                                                            <p></p>
                                                            <p>Nims</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input
                                                                name="debordTime"
                                                                type="radio"

                                                            />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Polo Victory
                                                            <p></p>
                                                            <p>Polo Victory</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input
                                                                name="debordTime"
                                                                type="radio"

                                                            />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Railway Station
                                                            <p></p>
                                                            <p>Railway Station</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input
                                                                name="debordTime"
                                                                type="radio"
                                                                className="ng-untouched ng-pristine ng-valid"
                                                            />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Sindhi Camp Bus Stand, Polo Victory Cinema
                                                            <p></p>
                                                            <p>Sindhi Camp Bus Stand, Polo Victory Cinema</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div> */}
                    </div>}



                </div>

                <div className='details-set'>
                    <div className='set-headd'>
                        <div className='operator-set'>
                            <label>PAL BUS(Patel Travels</label>
                            <p>Bharat Benz AC Sleeper</p>
                        </div>
                        <div className='operator-set'>
                            <label>00:15</label>
                        </div>
                        <div className='operator-set'>
                            <label>05h 05m</label>
                        </div>
                        <div className='operator-set'>
                            <label>05:20</label>
                        </div>
                        <div className='operator-set'>
                            <label>2</label>
                        </div>
                        <div className='operator-set'>
                            <label>₹ 1000</label>
                            <p>22 Seats Left</p>

                        </div>
                        <div className='operator-set'>
                            <button type='button' className='btn btn-warning' onClick={toggleSelectSeat}>Select Seat</button>
                        </div>
                    </div>
                    <div className='but-sec'>
                        <div className='operator-sett'>
                            <p className='set-p' onClick={toggleBoarding}>
                                <a href="#">
                                    Boarding/Dropping Points
                                </a>
                            </p>
                        </div>
                        <div className='operator-sett'>
                            <p className='set-p' onClick={toggleCancle}>
                                <a href="#">
                                    Cancellation
                                </a>
                            </p>
                        </div>
                    </div>

                    {boarding && <div className='form-row'>

                        <div className='col-lg-6'>
                            <div className='boarding-set'>
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0 Boarding_table">
                                        <thead>
                                            <tr>
                                                <th className="text-center" colSpan={2}>Boarding Points</th>
                                            </tr>
                                            <tr>
                                                <th>Address</th>
                                                <th>Depart Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Kashmiri gate, Metro Gate no 3, 9518617366</td>
                                                <td>00:15</td>
                                            </tr>
                                            <tr>
                                                <td>Karol bagh, near hanuman murti, 9518617366</td>
                                                <td>00:30</td>
                                            </tr>
                                            <tr>
                                                <td>Pal bus (Patel Travels), Dhaula kuan, HP Petrol Pump, 9518617366</td>
                                                <td>00:50</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className='boarding-set'>
                                <div className="table-responsive">
                                    <table className="table table-bordered mb-0 Boarding_table">
                                        <thead>
                                            <tr>
                                                <th className="text-center" colSpan={2}>Dropping Points</th>
                                            </tr>
                                            <tr>
                                                <th>Address</th>
                                                <th>Depart Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Amity university</td>
                                                <td>04:35</td>
                                            </tr>
                                            <tr>
                                                <td>Nims</td>
                                                <td>00:30</td>
                                            </tr>
                                            <tr>
                                                <td>Polo Victory</td>
                                                <td>00:50</td>
                                            </tr>
                                            <tr>
                                                <td>Sindhi camp bus stand,polovictory cinema</td>
                                                <td>00:50</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>




                            </div>
                        </div>
                    </div>}
                    {cancle && <div className='form-row'>
                        <div className='col-lg-12'>
                            <div className="table-responsive">
                                <table className="table table-bordered mb-0 Boarding_table">
                                    <thead>
                                        <tr>
                                            <th className="text-center" colSpan="2">Cancellation Detail</th>
                                        </tr>
                                        <tr>
                                            <th>Cancellation Time</th>
                                            <th>Refund Percent</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>B/W 0-48 Hrs of Bus Boarding Time</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>Above 48 Hrs of Bus Boarding Time</td>
                                            <td>0</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>}



                    {selectSeat && <div className='form-row'>
                        <div className='col-lg-6'>
                            <div className="Seat-left-wrap">
                                <div className="seat-lower-wrap">
                                    <h5>Lower Deck</h5>
                                    <div className="lower-deck-wrap">
                                        <div className="lower-deck-topwrap">
                                            <img alt src={img1} />
                                        </div>
                                        {/* Seats */}
                                        <div className="lower-deck-bottomwrap">
                                            <div className="lowerdeck-seat-wrap">
                                                <span rel="tooltip" className="Sleeper_V" title="Seat No. : L7 | Fare : INR 1155.0" />
                                                <span rel="tooltip" className="Sleeper_V" title />
                                                <span rel="tooltip" className="Sleeper_V" title />
                                                {/* More seats here */}
                                            </div>
                                            <div className="lowerdeck-seat-wrap">
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title="Seat No. : L6 | Fare : INR 1155.0"
                                                >

                                                </span>
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title=""
                                                ></span>

                                            </div>

                                            {/* More rows of seats */}
                                            <div className="lowerdeck-seat-wrap">{/**/}{/**/}<span rel="tooltip" className="Seating_blank occupied" title />{/**/}</div>
                                            <div className="lowerdeck-seat-wrap">
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title=""
                                                ></span>
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title=""
                                                ></span>
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title=""
                                                ></span>

                                            </div>
                                        </div>




                                    </div>
                                </div>
                                <div className="seat-lower-wrap">
                                    <h5>Upper Deck</h5>
                                    <div className="lower-deck-wrap">
                                        <div className="lower-deck-topwrap">
                                            {/* <img alt src="assets/img/steering.png" /> */}
                                        </div>
                                        {/* Seats */}
                                        <div className="lower-deck-bottomwrap">
                                            <div className="lowerdeck-seat-wrap">
                                                <span rel="tooltip" className="Sleeper_V" title="Seat No. : L7 | Fare : INR 1155.0" />
                                                <span rel="tooltip" className="Sleeper_V" title />
                                                <span rel="tooltip" className="Sleeper_V" title />
                                                {/* More seats here */}
                                            </div>
                                            <div className="lowerdeck-seat-wrap">
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title="Seat No. : L6 | Fare : INR 1155.0"
                                                >

                                                </span>
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title=""
                                                ></span>

                                            </div>

                                            {/* More rows of seats */}
                                            <div className="lowerdeck-seat-wrap">{/**/}{/**/}<span rel="tooltip" className="Seating_blank occupied" title />{/**/}</div>
                                            <div className="lowerdeck-seat-wrap">
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title=""
                                                ></span>
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title=""
                                                ></span>
                                                <span
                                                    rel="tooltip"
                                                    className="Sleeper_V"
                                                    title=""
                                                ></span>

                                            </div>
                                        </div>




                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='col-lg-6'>
                            <div className="Seat-right-wrap">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === 'boarding' ? 'active' : ''}`}
                                            onClick={() => handleTabClick('boarding')}
                                        >
                                            Boarding Point
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className={`nav-link ${activeTab === 'dropping' ? 'active' : ''}`}
                                            onClick={() => handleTabClick('dropping')}
                                        >
                                            Dropping Point
                                        </a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    {activeTab === 'boarding' && (
                                        <div className="table-responsive">
                                            <table className="table table-bordered mb-0 Boarding_table">
                                                <thead>
                                                    <tr>
                                                        <th width="10%"></th>
                                                        <th width="25%">Boarding Point</th>
                                                        <th>Address</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="boardingTime" type="radio" />
                                                        </td>
                                                        <td>04:35</td>
                                                        <td>
                                                            Amity University
                                                            <p></p>
                                                            <p>Amity University</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="boardingTime" type="radio" />
                                                        </td>
                                                        <td>04:45</td>
                                                        <td>
                                                            Nims
                                                            <p></p>
                                                            <p>Nims</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="boardingTime" type="radio" />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Polo Victory
                                                            <p></p>
                                                            <p>Polo Victory</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="boardingTime" type="radio" />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Railway Station
                                                            <p></p>
                                                            <p>Railway Station</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="boardingTime" type="radio" />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Sindhi Camp Bus Stand, Polo Victory Cinema
                                                            <p></p>
                                                            <p>Sindhi Camp Bus Stand, Polo Victory Cinema</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                    {activeTab === 'dropping' && (
                                        <div className="table-responsive">
                                            <table className="table table-bordered mb-0 Boarding_table">
                                                <thead>
                                                    <tr>
                                                        <th width="10%"></th>
                                                        <th width="25%">Dropping Time</th>
                                                        <th>Address</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="droppingTime" type="radio" />
                                                        </td>
                                                        <td>04:35</td>
                                                        <td>
                                                            Amity University
                                                            <p></p>
                                                            <p>Amity University</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="droppingTime" type="radio" />
                                                        </td>
                                                        <td>04:45</td>
                                                        <td>
                                                            Nims
                                                            <p></p>
                                                            <p>Nims</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="droppingTime" type="radio" />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Polo Victory
                                                            <p></p>
                                                            <p>Polo Victory</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="droppingTime" type="radio" />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Railway Station
                                                            <p></p>
                                                            <p>Railway Station</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <input name="droppingTime" type="radio" />
                                                        </td>
                                                        <td>05:20</td>
                                                        <td>
                                                            Sindhi Camp Bus Stand, Polo Victory Cinema
                                                            <p></p>
                                                            <p>Sindhi Camp Bus Stand, Polo Victory Cinema</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>}



                </div>


            </div>
        </>
    )
}
export default RightBus
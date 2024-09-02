import '../bus/bus.css'
import img1 from '../../../asesets/travel/time-icon01.png'
import img2 from '../../../asesets/travel/time-icon02.png'
import img3 from '../../../asesets/travel/time-icon04.png'
import img4 from '../../../asesets/travel/time-icon03.png'


import set1 from '../../../asesets/travel/icon-seater.png'
import set2 from '../../../asesets/travel/icon-sleeper.png'
import set3 from '../../../asesets/travel/icon-ac.png'
import set4 from '../../../asesets/travel/icon-nonac.png'

import bus from '../../../asesets/travel/photo-1544620347-c4fd4a3d5957-jpeg-250x250.webp'
import { useState } from 'react'




function AsideBus() {
    const [selectedItem, setSelectedItem] = useState(null); // State to track selected item

    // Event handler to update selected item
    const handleItemClick = (index) => {
        setSelectedItem(index);
    };
    return (
        <>
            <div className="col-lg-3">
                <div className="filter-set">
                    <div>
                        <div className="heading-02">Filters</div>

                        <div className="heading-02-wrap">
                            <h4>Departure Time</h4>
                            <ul>
                                <li onClick={() => handleItemClick(1)} style={{ backgroundColor: selectedItem === 1 ? '#f7c02c' : '#f4f0f0' }}>
                                    <img src={img1} alt="Before 6 am" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">Before 6 am</label>
                                </li>
                                <li onClick={() => handleItemClick(2)} style={{ backgroundColor: selectedItem === 2 ? '#f7c02c' : '#f4f0f0' }}>
                                    <img src={img2} alt="6 am to 12 pm" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">6 am to 12 pm</label>
                                </li>
                                <li onClick={() => handleItemClick(3)} style={{ backgroundColor: selectedItem === 3 ? '#f7c02c' : '#f4f0f0' }}>
                                    <img src={img3} alt="12 pm to 6 pm" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">12 pm to 6 pm</label>
                                </li>
                                <li onClick={() => handleItemClick(4)} style={{ backgroundColor: selectedItem === 4 ? '#f7c02c' : '#f4f0f0' }}>
                                    <img src={img4} alt="After 6 pm" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">After 6 pm</label>
                                </li>
                            </ul>
                        </div>

                        <div className="heading-02-wrap">
                            <h4>Arrival Time</h4>
                            <ul>
                                <li onClick={() => handleItemClick(5)} style={{ backgroundColor: selectedItem === 5 ? '#f7c02c' : '#f4f0f0' }}>
                                    <img src={img1} alt="Before 6 am" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">Before 6 am</label>
                                </li>
                                <li onClick={() => handleItemClick(6)} style={{ backgroundColor: selectedItem === 6 ? '#f7c02c' : '#f4f0f0' }}>
                                    <img src={img2} alt="6 am to 12 pm" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">6 am to 12 pm</label>
                                </li>
                                <li onClick={() => handleItemClick(7)} style={{ backgroundColor: selectedItem === 7 ? '#f7c02c' : '#f4f0f0' }}>
                                    <img src={img3} alt="12 pm to 6 pm" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">12 pm to 6 pm</label>
                                </li>
                                <li onClick={() => handleItemClick(8)} style={{ backgroundColor: selectedItem === 8 ? '#f7c02c' : '#f4f0f0' }}>
                                    <img src={img3} alt="After 6 pm" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">After 6 pm</label>
                                </li>
                            </ul>
                        </div>

                        <div className="heading-02-wrap">
                            <h4>Bus Type</h4>
                            <ul>
                                <li onClick={() => handleItemClick(9)} style={{ backgroundColor: selectedItem === 9 ? '#f7c02c' : '#f4f0f0' }}>
                                    <img src={set1} alt="Seater" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">Seater</label>
                                </li>
                                <li onClick={() => handleItemClick(10)} style={{ backgroundColor: selectedItem === 10 ? '#f7c02c' : '#f4f0f0' }}>
                                    <img src={set2} alt="Sleeper" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">Sleeper</label>
                                </li>
                                <li onClick={() => handleItemClick(11)} style={{ backgroundColor: selectedItem === 11 ? '#f7c02c' : '#f4f0f0' }}>
                                    <img src={set3} alt="AC" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">AC</label>
                                </li>
                                <li onClick={() => handleItemClick(12)} style={{ backgroundColor: selectedItem === 12 ? '#f7c02c' : '#f4f0f0' }}>
                                    <img src={set4} alt="Non-AC" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">Non-AC</label>
                                </li>
                            </ul>
                        </div>

                        <div id="my"></div>

                        <div className="heading-02">
                            <a href="#" target="_blank">
                                <img src={bus} style={{ width: '100%' }} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AsideBus
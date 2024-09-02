import React from "react";
import "../balance/balance.css"
import { FiUpload } from "react-icons/fi";

export default function Balance() {
    return (
        <div className="wrapper">
            <div className="filter_wrapper">
                <h1>Balance Certificate</h1>
                <div>
                    <ul className="btns">
                        <li>
                            <button className="eng">Download Balance Certificate English</button>
                            <button className="hind">Download Balance Certificate Hindi</button>
                        </li>
                        <li>
                            <button className="upload"><FiUpload /> Upload Balance Certificate</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
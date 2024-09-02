import React from "react";
import "../status/status.css"
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const person = [
    { id: "0", title: "Ams" },
    { id: "1", title: "Supper" },
    { id: "2", title: "Partner" },
    { id: "3", title: "Distributor" },
    { id: "4", title: "self" },
]

export default function Status() {
    const [select, Setselect] = useState(false)
    const open = () => {
        Setselect(true)
    }
    console.log(select);
    const [option, setoption] = useState("select")

    const OptionEvent = (text) => {
        setoption(text)
        Setselect(!select)
    }
    return (
        <div className="wrapper">
            <div className="filter_wrapper">
                <h1>VIP Subscription Plan</h1>
                <div className="subscribe">
                    <p>Subscribe to VIP plan and earn never before a commission up to Rs 15* per transaction, applicable for both AePS & M-ATM. Also get the first 15 settlements free in a month.</p>
                    <p>Below-mentioned is the complete transaction slab.</p>
                    <ul className="table">
                        <li>
                            <ul className="cols">
                                <li className="title">Rank</li>
                                <li className="title">Transaction Slab</li>
                                <li className="title">MATM Commission (In Rs.)</li>
                                <li className="title">AePS Commission (In Rs.)</li>
                            </ul>
                        </li>
                        <li>
                            <ul className="cols">
                                <li>1</li>
                                <li >0 - 499</li>
                                <li >0.50</li>
                                <li >0.50</li>
                            </ul>
                        </li>
                        <li>
                            <ul className="cols">
                                <li>2</li>
                                <li >500 - 999</li>
                                <li >2</li>
                                <li >2</li>
                            </ul>
                        </li>
                        <li>
                            <ul className="cols">
                                <li>3</li>
                                <li >1000 - 1499</li>
                                <li >2.25</li>
                                <li >2.25</li>
                            </ul>
                        </li>
                        <li>
                            <ul className="cols">
                                <li>4</li>
                                <li >1500 - 1999</li>
                                <li >2.5</li>
                                <li >2.5</li>
                            </ul>
                        </li>
                    </ul>
                    <h2 className="plans">Subscription Plans</h2>
                    <div className="s_plan">
                        <div>
                            <input type="radio" name="plan" />
                            <label>1 MONTH (RS. 500 + GST /-)</label>
                        </div>
                        <div>
                            <input type="radio" name="plan" />
                            <label>3 MONTH (RS. 1400 + GST /-)</label>
                        </div>
                        <div>
                            <input type="radio" name="plan" />
                            <label>6 MONTH (RS. 2700 + GST /-)</label>
                        </div>
                    </div>
                    <div className="terms">
                        <h4>Terms & Conditions</h4>
                        <ul>
                            <li>The Validity of the subscription is applicable for 30/90/180/365 Days only from the date of subscription.</li>
                            <li>After the expiry of subscription, the plan will get auto-renewed and the amount will get debited from your wallet</li>
                            <li>The Retailer can stop the subscription at any time, and he will be shifted to the same plan on the same day.</li>
                            <li>Subscription charges, once deducted are non-refundable.</li>
                        </ul>
                    </div>
                    <div className="ref">
                        <div>REFFERED BY:</div>
                        <div className="ref-text">
                            <input type="text"></input>
                        </div>
                    </div>
                    <div className="agree">
                        <input type="checkbox" />
                        <label className="block">I agree to the terms and Conditions.</label>
                    </div>
                    <div className="agree">
                        <button>Active now!!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
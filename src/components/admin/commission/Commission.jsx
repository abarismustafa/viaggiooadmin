import React, { useState } from "react";
import "../commission/commission.css";
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";

const month = [
  { id: "0", title: "Nov-2018" },
  { id: "1", title: "Dec-2018" },
  { id: "2", title: "Jan-2019" },
  { id: "3", title: "Feb-2019" },
  { id: "4", title: "Mar-2019" },
  { id: "5", title: "Apr-2019" },
  { id: "6", title: "May-2019" },
  { id: "7", title: "Jun-2019" },
  { id: "8", title: "Jul-2019" },
  { id: "9", title: "Aug-2019" },
  { id: "10", title: "Set-2019" },
  { id: "11", title: "Oct-2019" },
  { id: "11", title: "Nov-2019" },
];

export default function Commission() {
  const [select, Setselect] = useState(false);
  const open = () => {
    Setselect(true);
  };
  //   console.log(select);
  const [option, setoption] = useState("select month");

  const OptionEvent = (text) => {
    setoption(text);
    Setselect(!select);
  };
  return (
    <div className="wrapper">
      <div className="filter_wrapper">
        <h1>Filter</h1>
        <div className="month_selecter">
          <div className="selector_wrap">
            <div className="selector" onClick={open}>
              <span>{option}</span>
              <span>
                <FaCaretDown />
              </span>
            </div>
            <div className={`month ${select === true ? "block" : "hidden"}`}>
              <div>
                <input type="text" />
              </div>
              <ul>
                {month.map((text) => (
                  <li key={text.id} onClick={() => OptionEvent(text.title)}>
                    {text.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <a href="#" className="btn">
              <FaCircleArrowRight />
            </a>
          </div>
        </div>
      </div>
      <div className="filter_wrapper">
        <div className="earned">
          <h1>Commission Earned:</h1>
          <button>
            <FaDownload /> Download
          </button>
        </div>
        <ul className="amontlist">
          <li>Amount</li>
          <li>Discount On Commission</li>
          <li>TDS</li>
          <li>Net Commission</li>
        </ul>
      </div>
    </div>
  );
}

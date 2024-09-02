import { PiDeviceMobileSpeakerLight } from "react-icons/pi";
import { IoLocationOutline } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import {
  getCountry,
  getPersionDetail,
  getState,
  personalDetails,
} from "../../api/login/Login";
import { ToastContainer, toast } from "react-toastify";
import { CiLocationOn } from "react-icons/ci";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import { toastErrorMessage, toastSuccessMessage } from "./ToastShare";
export const SecForm = ({
  setState,
  stepCount,
  persnalData,
  allData,
  getVarifyallData,
}) => {
  const [country, setCountry] = useState();
  const [state, setstate] = useState();
  const [data, setData] = useState({
    state: "",
    country: "65f164b9e3abb32ae33badde",
    presentAddr: "",
    alternate_mobileNo: persnalData ? persnalData : "",
    mobileNo: " ",
    name: "",
    pin: "",
    educationQualification: "",
  });
  const [loader, setloader] = useState(false);
  const getData = async () => {
    console.log(window.localStorage.getItem("regisNumber"));
    try {
      const res = await getCountry();
      const res1 = await getPersionDetail();
      // console.log('kjfhdkj', res1.data?.data);S
      setData({
        state: res1.data.data.state,
        country: "65f164b9e3abb32ae33badde",
        presentAddr:
          res1.data?.data?.addressLine1 +
          " " +
          res1.data?.data?.addressLine2 +
          " " +
          res1.data?.data?.city +
          " " +
          res1.data?.data?.district,
        alternate_mobileNo: allData.alternate_mobileNo,
        mobileNo: window.localStorage.getItem("regisNumber"),
        name: res1.data.data.firstname + " " + res1.data.data.lastname,
        pin: res1.data.data.pin_code,
        educationQualification: allData?.educationQualification,
      });
      const res2 = await getState();
      setCountry(res.data?.data);
      setstate(res2.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onchangeHandle = (e) => {
    if (e.target.name == "alternate_mobileNo") {
      if (e.target.value?.length == 11) {
        return;
      }
    }
    const clone = { ...data };
    clone[e.target.name] = e.target.value;
    setData(clone);
  };

  const submitData = async () => {
    setloader(true);
    try {
      await personalDetails({
        ...data,
        user_id: window.localStorage.getItem("userToken"),
      });
      setloader(false);
      toastSuccessMessage("Personal Details Varify Successfully");
      setTimeout(() => {
        setState(2);
        window.localStorage.setItem("steps", 2);
      }, 1000);
    } catch (error) {
      setloader(false);
    }
    // setState(2)
  };

  const backButton = () => {
    setState(0);
    window.localStorage.setItem("steps", 0);
    getVarifyallData();
  };
  const handlePaste = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container">
      <ToastContainer />
      <form className="row">
        <div className="col-6 mb-3 clrelative">
          <input
            type="text"
            disabled
            className="form-control"
            id="exampleInputEmail1"
            onChange={onchangeHandle}
            name="name"
            value={data.name}
            placeholder="Name"
            aria-describedby="emailHelp"
          />
          <MdDriveFileRenameOutline className="clApsulute" />
        </div>
        <div className="col-6 mb-3 clrelative">
          <input
            type="text"
            disabled
            className="form-control"
            id="exampleInputEmail1"
            onChange={onchangeHandle}
            name="mobileNo"
            value={data.mobileNo}
            placeholder="Enter mobile number"
            aria-describedby="emailHelp"

          />
          <PiDeviceMobileSpeakerLight className="clApsulute" />
        </div>
        <div className="col-6 mb-3 clrelative">
          <input
            type="number"
            className="form-control"
            id="exampleInputEmail1"
            onChange={onchangeHandle}
            name="alternate_mobileNo"
            value={data.alternate_mobileNo}
            placeholder="Enter Alernate mobile number"
            aria-describedby="emailHelp"
            onPaste={handlePaste}
          />
          <PiDeviceMobileSpeakerLight className="clApsulute" />
        </div>
        <div className="col-6 mb-3 clrelative">
          <input
            type="text"
            disabled
            className="form-control"
            id="exampleInputEmail1"
            onChange={onchangeHandle}
            name="presentAddr"
            value={data.presentAddr}
            placeholder="Enter Present Address"
            aria-describedby="emailHelp"
          />
          <IoLocationOutline className="clApsulute" />
        </div>
        <div className="col-6 mb-3 clrelative">
          <select
            className="form-select"
            disabled
            name="country"
            onChange={onchangeHandle}
            value={data.country}
            aria-label="Default select example"
          >
            <option selected>Select Country</option>
            {country &&
              country.map((item) => {
                return <option value={item?._id}>{item?.name}</option>;
              })}
          </select>
        </div>
        <div className="col-6 mb-3 clrelative">
          <input
            type="number"
            className="form-control"
            disabled
            id="exampleInputEmail1"
            onChange={onchangeHandle}
            name="pin"
            value={data.pin}
            placeholder="Enter Pin"
            aria-describedby="emailHelp"
          />
          <CiLocationOn className="clApsulute" />
        </div>
        <div className="col-6 mb-3 clrelative">
          {/* <select className="form-select" disabled name="state" value={data.state} onChange={onchangeHandle} aria-label="Default select example">
            <option selected>Select State</option>
            {state && state.map((item) => {
              return <option value={item?._id}>{item?.name}</option>
            })}
          </select> */}
          <input
            type="text"
            disabled
            className="form-control"
            id="exampleInputEmail1"
            onChange={onchangeHandle}
            name="presentAddr"
            value={data.state}
            placeholder="Enter State"
            aria-describedby="emailHelp"
          />
          <IoLocationOutline className="clApsulute" />
        </div>

        <div className="col-6 mb-3 clrelative">
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            onChange={onchangeHandle}
            name="educationQualification"
            value={data.educationQualification}
            placeholder="Enter educational qualifications"
            aria-describedby="emailHelp"
          />
          <FaUserGraduate className="clApsulute" />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* <button type="submit" onClick={() => { setState(0) }} style={{ backgroundColor: '#2E3191' }} className="btn btn-primary">Back</button> */}
          <button
            type="button"
            onClick={backButton}
            className="btn btn-secondary text-white"
          >
            Back
          </button>

          {/* <button type="submit" onClick={()=>{setState(2)}} style={{ backgroundColor: '#2E3191' }} className="btn btn-primary">Next</button> */}
          <button
            type="button"
            onClick={submitData}
            // style={{ backgroundColor: "#2E3191" }}
            // disabled={!data.alternate_mobileNo || !data.educationQualification}
            className="btn btn-success text-white"
          >
            Submit
          </button>
          {/* <button type="submit" onClick={()=>{setState(3)}} style={{ backgroundColor: '#2E3191' }} className="btn btn-primary">Next</button>  */}
        </div>
      </form>
    </div>
  );
};

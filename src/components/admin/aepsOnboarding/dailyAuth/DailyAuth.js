import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { capturefingerprint } from "../../../../common/fingurePrintJs/FingurePrint";
import { IoFingerPrint } from "react-icons/io5";
import { dailyAuth } from "../../../../api/login/Login";

import img1 from '../../../../asesets/logo/finger_success.gif'

import imgg1 from '../../../../asesets/Devices/iris.png'
import imgg2 from '../../../../asesets/Devices/mantra.png'
import imgg3 from '../../../../asesets/Devices/mantral1.png'
import imgg4 from '../../../../asesets/Devices/morpho.png'
import imgg5 from '../../../../asesets/Devices/morphol1.png'
import imgg6 from '../../../../asesets/Devices/precision.png'
import imgg7 from '../../../../asesets/Devices/sequgen.png'
import imgg8 from '../../../../asesets/Devices/startrek.png'
import imgg9 from '../../../../asesets/Devices/startrekl1.png'
// import imgg9 from '../../../../asesets/Devices/iris.png'

const mockData = [
    { id: '1', image: imgg1 },
    { id: '1', image: imgg2 },
    { id: '1', image: imgg3 },
    { id: '1', image: imgg4 },
    { id: '1', image: imgg5 },
    { id: '1', image: imgg6 },
    { id: '1', image: imgg7 },
    { id: '1', image: imgg8 },
    { id: '1', image: imgg9 },
]



function DailyAuth({ onDailyAuthComplete }) {
    const [position, setPosition] = useState({ latitude: null, longitude: null });

    // console.log('position', position);
    const [fingerDataa, setFingerDataa] = useState()

    const [loader, setLoader] = useState(false)

    const [initialAuth, setinitialAuth] = useState({
        accessmodetype: "site",
        latitude: "",
        longitude: "",
        data: "",
        ipaddress: "",
        user_id: ""
    })

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            alert('Geolocation is not available in your browser.')
        }
    }, []);


    const toastSuccessMessage = (str) => {
        toast.success(`${str}`, {
            position: "top-center",
        });
    };

    const toastSuccessMessage1 = (str) => {
        toast.error(`${str}`, {
            position: "top-center",
        });
    };


    const Capturefingerherw = () => {

        try {
            const fingerData = new capturefingerprint('http://127.0.0.1:11100/rd/capture', result)
            // console.log(fingerData);
        } catch (error) {
            console.log(error);
        }
    }

    const result = (data) => {
        // console.log(data);
        console.log(data.pid_data);

        const prolog = data?.pid_data;
        var parser = new DOMParser();
        const XmlStr = prolog + "<bookz/>";
        var xmlz = parser.parseFromString(XmlStr, "application/xml");
        // console.log(window.btoa((new XMLSerializer()).serializeToString(xmlz)));


        if (data?.errCode == '0') {
            toastSuccessMessage('Finger Capture Successfully.')
        }
        // if (data?.errCode == '700') {
        //     toastSuccessMessage1('Finger Capture Not Successfully.')
        // }


        // setFingerDataa(window.btoa((new XMLSerializer()).serializeToString(xmlz)))



        if (data?.httpSuccess == true) {
            dataPost(window.btoa((new XMLSerializer()).serializeToString(xmlz)))
        }





    }



    const dataPost = async (fingerData) => {
        const clone = { ...initialAuth, latitude: position.latitude, longitude: position.longitude, data: fingerData, user_id: window.localStorage.getItem('userIdToken') }
        try {
          const res = await dailyAuth(clone)
          console.log(res);
          if (res?.data?.statusCode == 400) {
            toastSuccessMessage1(res?.data?.message)
          }
          if (res?.data?.statusCode == '403') {
            toastSuccessMessage1(res?.data?.message)
          }
          if (res?.data?.statusCode == 200) {  // Assuming 200 is the success status code
            toastSuccessMessage('Daily Auth completed successfully')
            onDailyAuthComplete()  // Call the callback function
          }
        } catch (error) {
          console.error('Error in daily auth:', error)
          toastSuccessMessage1('An error occurred during daily auth')
        }
      }
    return (
        <>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header Register-header">
                        <span >Daily Auth</span>
                        {/* <span>
                            <HiMiniWallet />
                        </span> */}
                    </div>
                    <div className="card-body">
                        <div className="form-row">
                            <div className="col-lg-6">
                                <div className="bankResiter">
                                    <button type="buton" className="btn btn-success" onClick={Capturefingerherw}>
                                        {/* <IoFingerPrint /> */}
                                        <img src={img1} alt="" style={{ height: '526px' }} />
                                    </button>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row">
                                    {mockData.map((item) => {
                                        return <div className="col-lg-4 mt-2" key={item?.id}>
                                            <div className="deviceImage">
                                                <img src={item?.image} alt="" />
                                            </div>
                                        </div>
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <ToastContainer /> */}
            </div >

        </>
    )
}
export default DailyAuth
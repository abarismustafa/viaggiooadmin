
import { Offcanvas } from "react-bootstrap";
import profilePic from '../../../asesets/adminImage/profile-pic.jpg'
import { postNotification } from "../../../api/login/Login";
import { useEffect, useState } from "react";

function NotificationSide({ ...props }) {
    const  [intData,setInData] = useState(
        {
            type: "Browser",
            token: "",
            user_id: ""
        }
    )
    const userIdToken = window.localStorage.getItem("userIdToken")
    const fetchNotification = async ()=>{
        

        try {
            const clone = {...intData,token:props?.tokenNoti ,user_id:userIdToken}
            console.log("clone",clone);
            const response = await postNotification(clone)
            console.log("response",response);
        } catch (error) {
            alert(error)
        }

    } 
    useEffect(()=> {
        if (userIdToken) {
            fetchNotification() 
        }
    },[userIdToken])

    return (
        <>
            <Offcanvas
                className="dilog-classs"
                show={props.show}
                onHide={props.handleClose}
                {...props}
            >
                <Offcanvas.Header
                    closeButton
                    style={{ background: "rgb(22 24 106)", color: "white" }}
                >
                    <Offcanvas.Title style={{ color: "white" }}>
                        Notification
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="row">
                        <div className="col-lg-12">
                            {props?.NotificationData && props?.NotificationData?.notifications.map((item) => {
                                return <div key={item?._id}>
                                    <div className="flex my-3 justify-between items-start gap-2">
                                        <div className="ant-skeleton">
                                            {/* <span className="ant-skeleton-avatar ant-skeleton-avatar-circle" style={{ width: '40px', height: '40px', lineHeight: 40 }}> */}
                                            <img src={profilePic} alt="" />
                                            {/* </span> */}
                                        </div>
                                        <div>
                                            <p className="font-semibold">
                                                {item?.message}
                                            </p>
                                            <p className="text-bsgray600">
                                                {item?.subject}
                                            </p>
                                        </div>
                                        <p className="text-bsgray600 text-bsgray600-2 font-semibold">{new Date(item?.createdAt).getDate() + "-" + Number(new Date(item?.createdAt).getMonth() + 1) + "-" + new Date(item?.createdAt).getFullYear() + "," + new Date(item?.createdAt).getHours() + ":" + new Date(item?.createdAt).getMinutes()}</p>
                                    </div>

                                </div>
                            })}

                            {/* <div>
                                <div className="flex my-3 justify-between items-start gap-2">
                                    <div className="ant-skeleton">
                                        <img src={profilePic} alt="" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            Recharge
                                        </p>
                                        <p className="text-bsgray600">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        </p>
                                    </div>
                                    <p className="text-bsgray600 text-bsgray600-2 font-semibold">Tuesday</p>
                                </div>

                            </div>
                            <div>
                                <div className="flex my-3 justify-between items-start gap-2">
                                    <div className="ant-skeleton">
                                        <img src={profilePic} alt="" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            Recharge
                                        </p>
                                        <p className="text-bsgray600">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        </p>
                                    </div>
                                    <p className="text-bsgray600 text-bsgray600-2 font-semibold">Wednesday</p>
                                </div>

                            </div>
                            <div>
                                <div className="flex my-3 justify-between items-start gap-2">
                                    <div className="ant-skeleton">
                                        <img src={profilePic} alt="" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">
                                            Recharge
                                        </p>
                                        <p className="text-bsgray600">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                        </p>
                                    </div>
                                    <p className="text-bsgray600 text-bsgray600-2 font-semibold">Friday</p>
                                </div>

                            </div> */}
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
export default NotificationSide
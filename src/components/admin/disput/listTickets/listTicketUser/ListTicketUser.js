import { useParams } from "react-router-dom";

import '../listTicketUser/listTicketUser.css'
import { FaUser } from "react-icons/fa";
import Replay from "./Replay";

import ReactFancyBox from 'react-fancybox'
import { dmtdisputechat } from "../../../../../api/login/Login";
import { useCallback, useEffect, useState } from "react";
import { Pagination } from "antd";
function ListTicketUser() {
    const param = useParams()
    // console.log(param);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(10)
    const [page, setPage] = useState(0)
    // console.log(page);
    const [totalCount, setTotalCount] = useState(null)
    const [data, setData] = useState(null)
    // console.log(data);

    const [filterInitial, setFilterInitial] = useState({
        count: '',
        page: '',

    })

    function createMarkup(data) {
        return { __html: data };
    }

    const ticketUser = useCallback(async (input) => {
        setLoading(true);
        const clone = { ...filterInitial, count: count, page: input, id: param?.id };
        try {
            const res = await dmtdisputechat(clone);
            setTotalCount(res?.data?.totalCount);
            setData(res?.data?.data);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }, [filterInitial, count, param?.id]);

    const onChangeVal = (e) => {
        // console.log(e - 1);
        setPage(e - 1)
        ticketUser(e - 1)
    };

    useEffect(() => {
        ticketUser(0)
    }, [ticketUser])

    return (
        <>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Ticket List User</span></div>
                    <div className="card-body">
                        <div className="form-row" style={{ alignItems: 'end' }}>
                            <Replay id={param?.id} ticketUser={ticketUser} />

                            {data && data?.map((item) => {
                                // console.log(item);
                                return <div className="col-lg-12 mt-3">
                                    <div className="chat-first">
                                        <div className={`card-header card-header-card ${item?.operator == 'Retailer' && 'card-header-card-2'}`}>
                                            <div className="nameAndDetails">
                                                <div className="avtar-set">
                                                    <FaUser />
                                                </div>
                                                <div className="parent-set">


                                                    <h5>{item?.by.name}</h5>  <h5>{item?.by.email}</h5>
                                                </div>
                                                <div className="parent-set">
                                                    <p className="operator operator-2">{item?.operator}</p>
                                                </div>
                                            </div>
                                            <div className="dateandtime dateandtime-2">
                                                <p>{new Date(item?.createdAt).getDate() + "-" + Number(new Date(item?.createdAt).getMonth() + 1) + "-" + new Date(item?.createdAt).getFullYear() + " / " + new Date(item?.createdAt).getHours() + ":" + new Date(item?.createdAt).getMinutes()}</p>
                                            </div>
                                        </div>
                                        <div className="msg-sec">
                                            {/* {item?.chat} */}

                                            <div className="tabs_item">
                                                <div
                                                    className="products-details-tab-content"
                                                    dangerouslySetInnerHTML={createMarkup(
                                                        item?.chat
                                                    )}
                                                />
                                            </div>
                                            {/* <p>In publishing and graph`ic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document.</p> */}
                                            <div className="form-row mt-3">
                                                {item?.attachments.map((item) => {
                                                    return <div className="col-lg-2 image-set" style={{ height: '155px' }}>
                                                        <ReactFancyBox
                                                            thumbnail={`https://api.paypandabnk.com/api/cloudinary/${item}`}
                                                            image={`https://api.paypandabnk.com/api/cloudinary/${item}`}
                                                            className="ljhdfjdh"
                                                        />
                                                        {/* <img src={`https://api.paypandabnk.com/api/cloudinary/${item}`} style={{ height: '100%', width: "100%" }} alt="" /> */}
                                                    </div>
                                                })}
                                            </div>

                                            {/* {attachments.map((attach) => return <img [src]="https://api.paypandabnk.com/api/cloudinary/:" + attach >) */}
                                        </div>
                                    </div>
                                </div>
                            })}




                            {/* <div className="col-lg-12 mt-3">
                                <div className="chat-first">
                                    <div className="card-header card-header-card">
                                        <div className="nameAndDetails">
                                            <div className="avtar-set">
                                                <FaUser />
                                            </div>
                                            <div className="parent-set">
                                                <h5>Mustafa Ashraf</h5>
                                                <h5>Staff</h5>
                                            </div>
                                            <div className="parent-set">
                                                <p className="operator">operator</p>
                                            </div>
                                        </div>
                                        <div className="dateandtime">
                                            <p>Monday , March 24/04/2024 (03:30)</p>
                                        </div>
                                    </div>
                                    <div className="msg-sec">
                                        <p>Hello sir , </p>
                                        <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.</p>
                                        <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.</p>
                                    </div>
                                </div>
                            </div> */}


                        </div>

                        {/* <div className="dataTables_info_page">
                            <div className="dataTables_info" id="empoloyees-tblwrapper_info" role="status" aria-live="polite">
                                Total {totalCount}  entries
                            </div>
                            <div className="dataTables_paginate paging_simple_numbers" id="empoloyees-tblwrapper_paginate">
                                <Pagination
                                    // showSizeChanger
                                    // onShowSizeChange={''}

                                    defaultCurrent={1}
                                    onChange={onChangeVal}
                                    total={totalCount}
                                />
                            </div>
                        </div> */}
                    </div>
                </div >
            </div >
        </>
    )
}
export default ListTicketUser
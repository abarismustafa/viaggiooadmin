import { useEffect, useState } from "react";
import { paymentRequestMemberHistoryUpdate, paymentRequestToUseradmin, paymentRequestToUseradminAll } from "../../../../api/login/Login";
import { Pagination } from "antd";
import Loader from "../../../../common/loader/Loader"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReactFancyBox from 'react-fancybox'
import 'react-fancybox/lib/fancybox.css'

import image from '../../../../asesets/logo/PayPanda_logo_Final-09-e1670775011263.png'
import StatusChangeRequestHistory from "../paymentRequest/statusChangeRequestHistory/StatusChangeRequestHistory";
import { ToastContainer, toast } from "react-toastify";

function PaymentRequestByMember() {
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(10)
    const [page, setPage] = useState(0)
    const [totalCount, setTotalCount] = useState(null)
    const [data, setData] = useState(null)
    const [allData, setAllData] = useState(null)

    const [modalShow, setModalShow] = useState(false);



    const [filterInitial, setFilterInitial] = useState({
        user_id: '',
        count: '',
        page: '',
        min_amt: 0,
        max_amt: 0,
        end_date: '',
        start_date: '',
        status: '',
        sortType: '',
        sortKey: ''
    })

    const handleChange = (e) => {
        const clone = { ...filterInitial }
        const value = e.target.value
        const name = e.target.name
        clone[name] = value
        setFilterInitial(clone)
    }

    const getTransitionReport = async (currentPage) => {
        setLoading(true);
        const apiPage = currentPage !== undefined ? currentPage : page;
        const clone = { 
            ...filterInitial, 
            count: count, 
            page: apiPage, 
            min_amt: +filterInitial.min_amt, 
            max_amt: +filterInitial.max_amt, 
            user_id: window.localStorage.getItem('userIdToken') 
        };
        try {
            const res = await paymentRequestToUseradmin(clone);
            setTotalCount(res?.data?.data?.totalCount);
            setData(res?.data?.data?.requestList);
            allDataPaymentRequest();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };
    const onChangeVal = (e) => {
        const newPage = e - 1; // Convert from 1-indexed to 0-indexed
        setPage(newPage);
        getTransitionReport(newPage);
    };


    const [sortDirection, setSortDirection] = useState();
    // console.log(sortDirection);

    const [assending, setDecending] = useState(1)

    const sortByColumn = async (key) => {
        // const sorted = [...data].sort((a, b) => {
        //     if (sortDirection === 'asc') {
        //         return a[key] > b[key] ? 1 : -1;
        //     } else {
        //         return a[key] < b[key] ? 1 : -1;
        //     }
        // });
        // console.log(sorted);
        // setData(sorted);

        // const clone = { ...filterInitial, sortType: assending, sortKey: key }

        if (sortDirection == 'asc') {
            setDecending(1)
        } else {
            setDecending(-1)
        }
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        setLoading(true)
        const clone = { ...filterInitial, count: count, page: page, sortType: +assending, sortKey: key, user_id: window.localStorage.getItem('userIdToken') }
        // console.log(clone);
        try {
            const res = await paymentRequestToUseradmin(clone)
            console.log(res?.data?.data?.requestList);
            setTotalCount(res?.data?.data?.totalCount)
            setData(res?.data?.data?.requestList)
            // getTransitionReport()
        } catch (error) {

        }
        setLoading(false)
    };

    const allDataPaymentRequest = async () => {
        const clone = { ...filterInitial, count: count, page: page, user_id: window.localStorage.getItem('userIdToken') }
        try {
            const res = await paymentRequestToUseradminAll(clone)
            setAllData(res?.data?.data?.requestList);
        } catch (error) {

        }
    }

    const toastSuccessMessage = (str) => {
        toast.success(`${str}`, {
            position: "top-center"
        })
    };
    const toastErrorMessage = (str) => {
        toast.error(`${str}`, {
            position: "top-center"
        });
    };

    const [updateInitialMemberHistory, setUpdateInitialMemberHistory] = useState({
        Payment: '',
        status: '',
        pin: '',
        user_id: ''
    })


    const handleChangeUpdate = (e) => {
        const clone = { ...updateInitialMemberHistory }
        console.log("clone",clone)
        const value = e.target.value
        const name = e.target.name
        clone[name] = value
        setUpdateInitialMemberHistory(clone)
    }

    const [idPayment, setPayment] = useState()


    const updateGetId = (item) => {
        console.log("item",item)
        setPayment(item?._id);

        setUpdateInitialMemberHistory(item)
        if (item.status == 'Approved') {
            toastSuccessMessage('Already Approved')
        } else {
            setModalShow(true)
        }


    }


    const updateData = async () => {
        const clone = { ...updateInitialMemberHistory, Payment: idPayment, user_id: window.localStorage.getItem('userIdToken') }
        try {
            setLoading(true);
            const res = await paymentRequestMemberHistoryUpdate(clone);
            if (res?.data?.statusCode === 200) {
                toastSuccessMessage(res?.data?.message);
                setTimeout(() => {
                    setModalShow(false);
                    getTransitionReport();
                }, 2000);
            } else {
               
                toastErrorMessage(res?.data?.message || 'Update failed. Please try again.');
            }
        } catch (error) {
            
            toastErrorMessage(error?.response?.data?.message || 'An error occurred. Please try again.');
            console.error('Update error:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getTransitionReport()
        allDataPaymentRequest()
    }, [])
    const storedUserType = localStorage.getItem('userType');
    useEffect(() => {
        const today = new Date().toISOString().substr(0, 10); 
        setFilterInitial((prev) => ({
            ...prev,
            start_date: today,
            end_date: today
        }));
        getTransitionReport(0);
        allDataPaymentRequest();
    }, []);
    return (
        <>
            {loading && <Loader />}
            <div className="PageHeading">
            { storedUserType === 'Distributor' ? (
  <>
  <h1>Payment request by Member</h1>
  </>
) : (
    <>
                <h1>Payment request by Member</h1>
                </>
)
}
                
                </div>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Filter</span></div>
                    <div className="card-body">
                        <form action="" method="post" name="frmReport" id="frmReport">
                            <input type="hidden" id="hidID" name="hidID" />
                            <div className="form-row" style={{ alignItems: 'end' }}>
                                {/* <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Min Amount</label>
                                    <input type="number" name="min_amt" id="account_no" className="form-control" value={filterInitial.min_amt} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Max Amount</label>
                                    <input type="number" name="max_amt" id="account_no" className="form-control" value={filterInitial.max_amt} onChange={handleChange} />
                                </div> */}

                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Start Date</label>
                                    <input type="date" name="start_date" id="account_no" className="form-control" max={filterInitial.end_date} value={filterInitial.start_date} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">End Date</label>
                                    <input type="date" name="end_date" id="account_no" className="form-control" max={new Date().toISOString().substr(0, 10)} value={filterInitial.end_date} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="ddldb">Status</label>
                                    <select className="form-select" aria-label="Default select example" name="status" onChange={handleChange}>
                                        <option selected>Select Status</option>
                                        <option value={"Pending"}>Pending</option>
                                        <option value={"Approved"}>Approved</option>
                                        <option value={"Rejected"}>Rejected</option>
                                    </select>
                                </div>

                                <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <button type="button" className="btn btn-primary" onClick={getTransitionReport}>Search</button>
                                </div>
                                {/* <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <input type="button" name="btnExport" id="btnExport" defaultValue="Export" className="btn btn-secondary" onclick="startexoprt()" fdprocessedid="6zqsnhw" />
                                </div> */}
                            </div>
                        </form>
                    </div>

                </div>
                <div className="card mt-4" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <div id="myTable_wrapper" className="dataTables_wrapper no-footer">
                            <div className="d-flex  justify-content-between align-items-center">
                                <div className="dataTables_length" id="myTable_length">
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="download-table-xls-button btn btn-success cusxel"
                                        table="table-to-xlsx"
                                        filename="tablexls"
                                        sheet="tablexls"
                                        buttonText="Download Excel sheet" />
                                </div>
                                <div className="form-group col-md-2">
                                    <label >
                                        Search:
                                    </label>
                                    <input className="form-control datefield" id="txtFrom" name="txtFrom" type="text" style={{ cursor: 'pointer' }} />
                                </div>
                            </div>
                            <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed" id="" role="grid" aria-describedby="myTable_info" >
                                <thead>
                                    <tr role="row">
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '169.4px' }} onClick={() => sortByColumn('createdAt')}>
                                            Request Date
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '169.4px' }} onClick={() => sortByColumn('createdAt')}>
                                            User Name
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '169.4px' }} onClick={() => sortByColumn('createdAt')}>
                                            User Type
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                                           Mobile No.
                                        </th>

                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                                            Amount
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                                            Remarks
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '76.4px' }} aria-label="Status: activate to sort column ascending">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data?.map((item) => {
                                        // console.log(item);
                                        return <tr className="odd" key={item?._id}>

                                            {/* <td valign="top" className="dataTables_empty">--</td> */}
                                          
                                            <td valign="top" className="dataTables_empty">{item?.createdAt}</td>
                                            <td valign="top" className="dataTables_empty">{item?.user_id}</td>
                                            <td valign="top" className="dataTables_empty">{item?.user_type}</td>
                                            <td valign="top" className="dataTables_empty">{item?.user_mobile}</td>
                                            <td valign="top" className="dataTables_empty">{item?.amount}</td>
                                            <td valign="top" className="dataTables_empty">{item?.remark}</td>
                                            {/* <td valign="top" className="dataTables_empty">{item?.is_refunded == true ? 'Yes' : 'No'}</td> */}
                                            <td valign="top" className="dataTables_empty">
                                                {item?.status == 'Pending' ? <button class="btn btn-warning" onClick={() => updateGetId(item)}>{item?.status}</button> : ''}
                                                {item?.status == 'Approved' ? <button class="btn btn-success" onClick={() => updateGetId(item)}>{item?.status}</button> : ''}
                                                {item?.status == 'Rejected' ? <button class="btn btn-danger" onClick={() => updateGetId(item)}>{item?.status}</button> : ''}
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            <div className="dataTables_info_page">
                                <div className="dataTables_info" id="empoloyees-tblwrapper_info" role="status" aria-live="polite">
                                    Total {totalCount}  entries
                                </div>
                                <div className="dataTables_paginate paging_simple_numbers" id="empoloyees-tblwrapper_paginate">
                                    <Pagination
                                          current={page + 1} 
                                          onChange={onChangeVal}
                                          total={totalCount}
                                          pageSize={count}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
                {/* <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="message">Record Not Found.</div>
                </div> */}
                <StatusChangeRequestHistory
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    updateInitialMemberHistory={updateInitialMemberHistory}
                    handleChangeUpdate={handleChangeUpdate}
                    updateData={updateData}
                />
                <ToastContainer />
            </div>

            <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed d-none" id="table-to-xlsx" role="grid" aria-describedby="myTable_info" >
                <thead>
                    <tr role="row">
                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '169.4px' }} onClick={() => sortByColumn('createdAt')}>
                            Create Date
                        </th>

                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                            Amount
                        </th>
                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                            Remarks
                        </th>
                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '76.4px' }} aria-label="Status: activate to sort column ascending">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {allData && allData?.map((item) => {
                        return <tr className="odd" key={item?._id}>

                            {/* <td valign="top" className="dataTables_empty">--</td> */}
                            <td valign="top" className="dataTables_empty">{new Date(item?.createdAt).getDate() + "/" + Number(new Date(item?.createdAt).getMonth() + 1) + "/" + new Date(item?.createdAt).getFullYear() + "," + new Date(item?.createdAt).getHours() + ":" + new Date(item?.createdAt).getMinutes()}</td>


                            <td valign="top" className="dataTables_empty">{item?.amount}</td>
                            <td valign="top" className="dataTables_empty">--</td>
                            {/* <td valign="top" className="dataTables_empty">{item?.is_refunded == true ? 'Yes' : 'No'}</td> */}
                            <td valign="top" className="dataTables_empty">
                                {item?.status == 'Pending' ? <button class="btn btn-warning">{item?.status}</button> : ''}
                                {item?.status == 'Approved' ? <button class="btn btn-success">{item?.status}</button> : ''}
                                {item?.status == 'Rejected' ? <button class="btn btn-danger">{item?.status}</button> : ''}
                                {item?.status == 'In progress' ? <button class="btn btn-warning">{item?.status}</button> : ''}
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </>

    )
}
export default PaymentRequestByMember
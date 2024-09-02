import { useEffect, useState } from "react";
import { allDataPayment, dmtTransiList, paymentRequest } from "../../../../api/login/Login";
import { Pagination } from "antd";
import Loader from "../../../../common/loader/Loader";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReactFancyBox from 'react-fancybox'
import 'react-fancybox/lib/fancybox.css'

import image from '../../../../asesets/logo/PayPanda_logo_Final-09-e1670775011263.png'
import ImageModal from "../../../../common/imageModal/ImageModal";
import { Link } from "react-router-dom";



function PaymentRequestView() {
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
        bank: '',
        method: '',
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

 
    const onChangeVal = (e) => {
        setPage(e - 1)
        getTransitionReport(e - 1)
    };

    const ResetData = async () => {
        setLoading(true)
        const obj = {
            count: 10,
            page: 0,
            min_amt: '',
            max_amt: '',
            end_date: '',
            start_date: '',
            bank: '',
            method: '',
            status: '',
            sortType: '',
            sortKey: '',
            user_id: window.localStorage.getItem('userIdToken')
        }
        try {
            const res = await paymentRequest(obj)
            setData(res?.data?.data?.requestList)
            setTotalCount(res?.data?.data?.totalCount)
            setFilterInitial({
                min_amt: 0,
                max_amt: 0,
             end_date: '',
                start_date: '',
                // end_date: new Date().toISOString().substr(0, 10),
                // start_date: new Date().toISOString().substr(0, 10),
                bank: '',
                method: '',
                status: '',
            })
        } catch (error) {

        }
        setLoading(false)
    }


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
            const res = await paymentRequest(clone)
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
            const res = await allDataPayment(clone)
            setAllData(res?.data?.data?.requestList);
        } catch (error) {

        }
    }
    const [currentDate, setCurrentDate] = useState('');
    const getCurrentDate = () => {
        return new Date().toISOString().split('T')[0];
    }

    const getTransitionReport = async (input) => {
        setLoading(true)
        const currentDate = getCurrentDate();
        const clone = { 
            ...filterInitial, 
            count: count, 
            page: input, 
            min_amt: +filterInitial.min_amt, 
            max_amt: +filterInitial.max_amt, 
            user_id: window.localStorage.getItem('userIdToken'),
            start_date: filterInitial.start_date || currentDate,
            end_date: filterInitial.end_date || currentDate
        }
        try {
            const res = await paymentRequest(clone)
            setTotalCount(res?.data?.data?.totalCount)
            setData(res?.data?.data?.requestList)
            allDataPaymentRequest()
            
            // Update filterInitial with the current date if it wasn't set
            if (!filterInitial.start_date || !filterInitial.end_date) {
                setFilterInitial(prevState => ({
                    ...prevState,
                    start_date: currentDate,
                    end_date: currentDate
                }))
            }
        } catch (error) {
            console.error("Error fetching transition report:", error);
        }
        setLoading(false)
    }

    // ... other functions

    useEffect(() => {
        getTransitionReport(0)
        allDataPaymentRequest()
    }, [])
    // console.log(currentDate);

    // const getCurrentDate = () => {
    //     const today = new Date();
    //     const year = today.getFullYear();
    //     const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    //     const day = String(today.getDate()).padStart(2, '0');
    //     const formattedDate = `${year}-${month}-${day}`;
    //     setCurrentDate(formattedDate);
    //     const clone = { ...filterInitial, start_date: formattedDate, end_date: formattedDate }
    //     setFilterInitial(clone)
    // }

    // useEffect(() => {
    //     getCurrentDate()
    // }, [])


   

    const [modalData, setModalData] = useState(null);
    console.log(modalData);


    const openModal = (item) => {
        setModalData(item);
        setModalShow(true);
    };
   
    return (
        <>
            {loading && <Loader />}
            <div className="PageHeading"><h1>Payment Request History To Company</h1></div>
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
                                    <input type="date" name="start_date" id="account_no" max={filterInitial.end_date} defaultValue={currentDate} className="form-control" value={filterInitial.start_date} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">End Date</label>
                                    <input type="date" name="end_date" id="account_no" max={new Date().toISOString().substr(0, 10)} defaultValue={currentDate} className="form-control" value={filterInitial.end_date} onChange={handleChange} />
                                </div>
                                {/* <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Bank</label>
                                    <input type="text" name="bank" id="account_no" className="form-control" placeholder="Enter Bank Name" value={filterInitial.bank} onChange={handleChange} />
                                </div> */}
                                {/* <div className="form-group col-md-4">
                                    <label htmlFor="ddldb">Select Method</label>
                                    <select className="form-select" aria-label="Default select example" name="method" onChange={handleChange}>
                                        <option selected>Select Method</option>
                                        <option value={"neft"}>NEFT</option>
                                        <option value={"rtgs"}>RTGS</option>
                                    </select>
                                </div> */}

                                <div className="form-group col-md-4">
                                    <label htmlFor="ddldb">Status</label>
                                    <select className="form-select" aria-label="Default select example" name="status" value={filterInitial.status} onChange={handleChange}>
                                        <option selected>Select Status</option>
                                        <option value={"Pending"}>Pending</option>
                                        <option value={"Approved"}>Approved</option>
                                        <option value={"Rejected"}>Rejected</option>
                                    </select>
                                </div>

                                <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <button type="button" className="btn btn-primary mr-3" onClick={() => getTransitionReport(0)}>Search</button>
                                    <button type="button" className="btn btn-warning" onClick={ResetData}>Reset</button>
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
                                <div className="dataTables_length mb-2" id="myTable_length">
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="download-table-xls-button btn btn-success cusxel"
                                        table="table-to-xlsx"
                                        filename="tablexls"
                                        sheet="tablexls"
                                        buttonText="Download Excel sheet" />
                                </div>
                                {/* <div className="form-group col-md-2">
                                    <label >
                                        Search:
                                    </label>
                                    <input className="form-control datefield" id="txtFrom" name="txtFrom" type="text" style={{ cursor: 'pointer' }} />
                                </div> */}
                            </div>
                            <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed" role="grid" aria-describedby="myTable_info" >
                                <thead>
                                    <tr role="row">
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '169.4px' }} onClick={() => sortByColumn('createdAt')}>
                                            S.No
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '169.4px' }} onClick={() => sortByColumn('createdAt')}>
                                            Request Date
                                        </th>
                                        {/* <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '171.4px' }} aria-label="Vehicle Number: activate to sort column ascending">
                                            Payment Date
                                        </th> */}
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '181.4px' }} aria-label="Customer Mobile: activate to sort column ascending">
                                            Bank
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                                            Method
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                                            Amount
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                                            Remarks
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                                            Slip
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                                            Payment Type
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '76.4px' }} aria-label="Status: activate to sort column ascending">
                                            Status
                                        </th>
                                        <th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: 0, display: 'none' }} aria-label="Transaction Number">
                                            Transaction Number
                                        </th>
                                        <th className="sorting">Transaction Dispute</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data?.map((item, i) => {
                                        // console.log(item);
                                        return <tr className="odd" key={item?._id}>


                                            {/* <td valign="top" className="dataTables_empty">--</td> */}

                                            <td valign="top" className="dataTables_empty">{(i + 1) + (page * count)}</td>
                                            <td valign="top" className="dataTables_empty">{new Date(item?.createdAt).getDate() + "/" + Number(new Date(item?.createdAt).getMonth() + 1) + "/" + new Date(item?.createdAt).getFullYear() + "," + new Date(item?.createdAt).getHours() + ":" + new Date(item?.createdAt).getMinutes()}</td>
                                            {/* <td valign="top" className="dataTables_empty">{new Date(item?.createdAt).getDate() + "/" + Number(new Date(item?.createdAt).getMonth() + 1) + "/" + new Date(item?.createdAt).getFullYear() + "," + new Date(item?.createdAt).getHours() + ":" + new Date(item?.createdAt).getMinutes()}</td> */}
                                            <td valign="top" className="dataTables_empty">{item?.bank}</td>
                                            <td valign="top" className="dataTables_empty">{item?.method}</td>
                                            <td valign="top" className="dataTables_empty">{item?.amount}</td>
                                            <td valign="top" className="dataTables_empty">{item?.remark}</td>
                                            <td valign="top" className="dataTables_empty" onClick={() => openModal(item)}>
                                                <img src={`https://api.paypandabnk.com/api/cloudinary/${item?.receipt_img}`} alt="" />
                                                {/* <ReactFancyBox
                                                    thumbnail={`https://api.paypandabnk.com/api/cloudinary/${item?.receipt_img}`}
                                                    image={`https://api.paypandabnk.com/api/cloudinary/${item?.receipt_img}`} /> */}
                                            </td>
                                            {/* <td valign="top" className="dataTables_empty">{item?.is_refunded == true ? 'Yes' : 'No'}</td> */}
                                            <td valign="top" className="dataTables_empty">--</td>
                                            <td valign="top" className="dataTables_empty">
                                                {item?.status == 'Pending' ? <button class="btn btn-warning">{item?.status}</button> : ''}
                                                {item?.status == 'Approved' ? <button class="btn btn-success">{item?.status}</button> : ''}
                                                {item?.status == 'Rejected' ? <button class="btn btn-danger">{item?.status}</button> : ''}
                                                {item?.status == 'In progress' ? <button class="btn btn-warning">{item?.status}</button> : ''}
                                            </td>
                                            <td valign="top" className="dataTables_empty">
                                                    <Link className="btn btn-primary" to={`/add-ticket/${item?._id}`} state={{ item, serviceId: '65f9484a26eb74e182c640fc' }}>Dispute</Link>
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
                                        // showSizeChanger
                                        // onShowSizeChange={page}
                                        // showQuickJumper

                                        // defaultCurrent={1}
                                        onChange={onChangeVal}
                                        total={totalCount}
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

                <ImageModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    modalData={modalData}
                />
            </div>


            <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed d-none" id="table-to-xlsx" role="grid" aria-describedby="myTable_info" >
                <thead>
                    <tr role="row">

                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '60.4px' }} aria-label="Date: activate to sort column ascending">
                            User
                        </th>
                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '169.4px' }} onClick={() => sortByColumn('createdAt')}>
                            Create Date
                        </th>
                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '171.4px' }} aria-label="Vehicle Number: activate to sort column ascending">
                            Payment Date
                        </th>
                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '181.4px' }} aria-label="Customer Mobile: activate to sort column ascending">
                            Bank
                        </th>
                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                            Method
                        </th>
                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                            Amount
                        </th>
                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                            UTR
                        </th>
                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                            Slip
                        </th>
                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                            Payment Type
                        </th>
                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '76.4px' }} aria-label="Status: activate to sort column ascending">
                            Status
                        </th>
                        <th className="sorting_disabled" rowSpan={1} colSpan={1} style={{ width: 0, display: 'none' }} aria-label="Transaction Number">
                            Transaction Number
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {allData && allData?.map((item) => {
                        // console.log(item);
                        return <tr className="odd" key={item?._id}>
                            {/* <td valign="top" className="dataTables_empty">--</td> */}
                            <td valign="top" className="dataTables_empty">{item?.user_id}</td>
                            <td valign="top" className="dataTables_empty">{new Date(item?.createdAt).getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()}</td>
                            <td valign="top" className="dataTables_empty">{new Date(item?.paymentDate).getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()}</td>
                            <td valign="top" className="dataTables_empty">{item?.bank}</td>
                            <td valign="top" className="dataTables_empty">{item?.method}</td>
                            <td valign="top" className="dataTables_empty">{item?.amount}</td>
                            <td valign="top" className="dataTables_empty">--</td>
                            <td valign="top" className="dataTables_empty">--</td>
                            {/* <td valign="top" className="dataTables_empty">{item?.is_refunded == true ? 'Yes' : 'No'}</td> */}
                            <td valign="top" className="dataTables_empty">--</td>
                            <td valign="top" className="dataTables_empty">
                                {item?.status == 'Pending' ? <button type="button" class="btn btn-warning">{item?.status}</button> : ''}
                                {item?.status == 'Approved' ? <button type="button" class="btn btn-success">{item?.status}</button> : ''}
                                {item?.status == 'Reject' ? <button type="button" class="btn btn-success">{item?.status}</button> : ''}
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </>
    )
}
export default PaymentRequestView
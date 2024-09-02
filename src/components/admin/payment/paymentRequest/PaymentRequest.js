import { useEffect, useState } from "react";
import { paymentRequestMemberHistoryUpdate, paymentRequestToUser, paymentRequestToUserAll } from "../../../../api/login/Login";
import { Pagination } from "antd";
import Loader from "../../../../common/loader/Loader"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReactFancyBox from 'react-fancybox'
import 'react-fancybox/lib/fancybox.css'
import image from '../../../../asesets/logo/PayPanda_logo_Final-09-e1670775011263.png'
import StatusChangeRequestHistory from "./statusChangeRequestHistory/StatusChangeRequestHistory";
import { Link } from "react-router-dom";

function PaymentRequest() {
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(10);
    const [page, setPage] = useState(0);
    const [totalCount, setTotalCount] = useState(null);
    const [data, setData] = useState(null);
    const [allData, setAllData] = useState(null);
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
    });
    const [currentDate, setCurrentDate] = useState('');
    useEffect(() => {
        const today = new Date().toISOString().substr(0, 10);
        setFilterInitial((prev) => ({
          ...prev,
          start_date: today,
          end_date: today
        }));
        getTransitionReport(filterInitial, 0);
        allDataPaymentRequest();
      }, []);
      
      const ResetData = async () => {
        setLoading(true);
        const obj = {
          count: 10,
          page: 0,
          min_amt: 0,
          max_amt: 0,
          end_date: '',
          start_date: '',
          status: '',
          sortType: '',
          sortKey: '',
          user_id: window.localStorage.getItem('userIdToken')
        };
        try {
          const res = await paymentRequestToUser(obj);
          setData(res?.data?.data?.requestList);
          setTotalCount(res?.data?.data?.totalCount);
          setFilterInitial({
            min_amt: 0,
            max_amt: 0,
            end_date: '',
            start_date: '',
            status: '',
          });
          setPage(0);
          setCount(10);
        } catch (error) {
          console.error("Something went wrong");
        }
        setLoading(false);
      };

    const handleChange = (e) => {
        const clone = { ...filterInitial };
        const value = e.target.value;
        const name = e.target.name;
        clone[name] = value;
        setFilterInitial(clone);
    }

    const getTransitionReport = async (input, page) => {
        console.log("getTransitionReport called with page:", page);
        setLoading(true);
        console.log("...filterInitial", filterInitial);
        const clone = { 
            ...filterInitial, 
            count: count, 
            page: page, 
            min_amt: +filterInitial.min_amt, 
            max_amt: +filterInitial.max_amt, 
            user_id: window.localStorage.getItem('userIdToken'),
        };

        console.log("clone for response", clone);

        try { 
            const res = await paymentRequestToUser(clone);
            setTotalCount(res?.data?.data?.totalCount);
            setData(res?.data?.data?.requestList);
            allDataPaymentRequest();
        } catch (error) {
            console.error("Something went wrong");
        }
        setLoading(false);
    };

    const onChangeVal = (e) => {
        const newPage = e - 1;
        setPage(newPage);
        getTransitionReport(filterInitial, newPage);
    };

 

    const [sortDirection, setSortDirection] = useState();
    const [ascending, setAscending] = useState(1);

    const sortByColumn = async (key) => {
        if (sortDirection === 'asc') {
            setAscending(1);
        } else {
            setAscending(-1);
        }
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        setLoading(true);
        const clone = { ...filterInitial, count: count, page: page, sortType: +ascending, sortKey: key, user_id: window.localStorage.getItem('userIdToken') };
        try {
            const res = await paymentRequestToUser(clone);
            setTotalCount(res?.data?.data?.totalCount);
            setData(res?.data?.data?.requestList);
        } catch (error) {
            console.error("Something went wrong");
        }
        setLoading(false);
    };

    const allDataPaymentRequest = async () => {
        const clone = { ...filterInitial, count: count, page: page, user_id: window.localStorage.getItem('userIdToken') };
        try {
            const res = await paymentRequestToUserAll(clone);
            setAllData(res?.data?.data?.requestList);
        } catch (error) {
            console.error("Something went wrong");
        }
    }



   

    const storedUserType = localStorage.getItem('userType');

    return (
        <>
            {loading && <Loader />}
            <div className="PageHeading">
                {storedUserType === 'Distributor' ? (
                    <h1>Payment request to super distributor</h1>
                ) : (
                    <h1>Payment request to distributor / super distributor</h1>
                )}
            </div>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Filter</span></div>
                    <div className="card-body">
                        <form action="" method="post" name="frmReport" id="frmReport">
                            <input type="hidden" id="hidID" name="hidID" />
                            <div className="form-row" style={{ alignItems: 'end' }}>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Start Date</label>
                                    <input type="date" name="start_date" id="account_no" max={filterInitial.end_date} defaultValue={currentDate} className="form-control" value={filterInitial.start_date} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">End Date</label>
                                    <input type="date" name="end_date" id="account_no" max={new Date().toISOString().substr(0, 10)} defaultValue={currentDate} className="form-control" value={filterInitial.end_date} onChange={handleChange} />
                                </div>
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
                                    <button type="button" className="btn btn-primary mr-3" onClick={() => getTransitionReport(filterInitial, 0)}>Search</button>
                                    <button type="button" className="btn btn-warning" onClick={ResetData}>Reset</button>
                                </div>
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
                            </div>
                            <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed" id="" role="grid" aria-describedby="myTable_info" >
                                <thead>
                                    <tr role="row">
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '169.4px' }} onClick={() => sortByColumn('createdAt')}>
                                            S.No
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '169.4px' }} onClick={() => sortByColumn('createdAt')}>
                                            Request Date
                                        </th>
                                        { storedUserType === 'Retailer' ? (
  <>
   <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                                          User Name
                                        </th>
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1} style={{ width: '131.4px' }} aria-label="Bill Amount: activate to sort column ascending">
                                         User Type
                                        </th>
  </>
) : (
    <>
                
                </>
)
}
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
                                        <th className="sorting" tabIndex={0} aria-controls="myTable" rowSpan={1} colSpan={1}  aria-label="Status: activate to sort column ascending">Transaction Dispute</th>
                                    </tr>
                                   
                                </thead>
                                <tbody>
                                    {data && data?.map((item,i) => {
                                        // console.log(item);
                                        return <tr className="odd" key={item?._id}>

                                            <td valign="top" className="dataTables_empty">{(i+1)+(page*count)}</td>
                                            <td valign="top" className="dataTables_empty">{new Date(item?.createdAt).getDate() + "/" + Number(new Date(item?.createdAt).getMonth() + 1) + "/" + new Date(item?.createdAt).getFullYear() + "," + new Date(item?.createdAt).getHours() + ":" + new Date(item?.createdAt).getMinutes()}</td>
                                            { storedUserType === 'Retailer' ? (
  <>
 <td valign="top" className="dataTables_empty">{item?.requestTo?.name}</td>
 <td valign="top" className="dataTables_empty">{item?.requestTo?.user_type_id?.user_type}</td>
  </>
) : (
    <>
                
                </>
)
}
<td valign="top" className="dataTables_empty">{item?.requestTo?.mobile}</td>

                                            <td valign="top" className="dataTables_empty">{item?.amount}</td>
                                            <td valign="top" className="dataTables_empty">{item?.remark}</td>
                                            {/* <td valign="top" className="dataTables_empty">{item?.is_refunded == true ? 'Yes' : 'No'}</td>setModalShow(true) */}
                                            <td valign="top" className="dataTables_empty">
                                                {item?.status == 'Pending' ? <button class="btn btn-warning" >{item?.status}</button> : ''}
                                                {item?.status == 'Approved' ? <button class="btn btn-success" >{item?.status}</button> : ''}
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

                            <div className="dataTables_paginate paging_simple_numbers d-flex justify-content-between align-items-center" id="myTable_paginate">
                            <div className="dataTables_info" id="myTable_info" role="status" aria-live="polite">
                                Total {totalCount}  entries
                                </div>
                                <div>
                                    <Pagination onChange={onChangeVal} current={page + 1} total={totalCount} defaultPageSize={count} />
                                </div>
                                
                            </div>
                        </div>
                    </div>
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
                                {item?.status == 'Reject' ? <button class="btn btn-danger">{item?.status}</button> : ''}
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            </div>
        </>
    )
}
export default PaymentRequest;


import { Pagination } from "antd"
import { useEffect, useState } from "react"
import { allquickDhan, dmtTransiList, quickDhan } from "../../../api/login/Login"
import Loader from "../../../common/loader/Loader"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
function QuickDhan() {
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(10)
    const [page, setPage] = useState(0)
    // console.log(page);
    const [totalCount, setTotalCount] = useState(null)
    const [data, setData] = useState([])
    const [allData, setAllData] = useState(null)
    const [filterInitial, setFilterInitial] = useState({
        user_id: '',
        count: '',
        page: '',
        end_date: '',
        start_date: '',
        customer_mobile: '',
        adhaar_no: '',
        txn_id: '',
        sortType: '',
        sortType: ''
    })


    const handleChange = (e) => {
        const clone = { ...filterInitial }
        const value = e.target.value
        const name = e.target.name
        clone[name] = value
        setFilterInitial(clone)
    }

    const getTransitionReport = async (input) => {
        setLoading(true);
        const clone = { ...filterInitial, count: count, page: input, min_amt: +filterInitial.min_amt, max_amt: +filterInitial.max_amt, user_id: window.localStorage.getItem('userIdToken') };
        try {
          const res = await quickDhan(clone);
          setTotalCount(res?.data?.totalCount || 0);
          setData(res?.data?.data || []);
          allDataWalletReport();
        } catch (error) {
          console.error("Error fetching data:", error);
          setData([]);
          setTotalCount(0);
        } finally {
          setLoading(false);
        }
      };
    const onChangeVal = (e) => {
        console.log(e - 1);

        setPage(e - 1)
        getTransitionReport(e - 1)
    };


    const ResetData = async () => {
        setLoading(true)
        const obj = {
            user_id: '',
            count: 10,
            page: 0,
            end_date: '',
            start_date: '',
            customer_mobile: '',
            adhaar_no: '',
            txn_id: '',
            sortType: '',
            sortType: '',
            user_id: window.localStorage.getItem('userIdToken')
        }
        try {
            const res = await quickDhan(obj)
            setTotalCount(res?.data?.data?.totalCount)
            setData(res?.data?.data?.dashboard)
            setFilterInitial({
                end_date: new Date().toISOString().substr(0, 10),
                start_date: new Date().toISOString().substr(0, 10),
                customer_mobile: '',
                adhaar_no: '',
                txn_id: '',
            })
        } catch (error) {

        }
        setLoading(false)
    }


    const [sortDirection, setSortDirection] = useState();
    // console.log(sortDirection);

    const [assending, setDecending] = useState(1)

    const sortByColumn = async (key) => {
        if (sortDirection == 'asc') {
            setDecending(1)
        } else {
            setDecending(-1)
        }

        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');

        setLoading(true)

        const clone = { ...filterInitial, count: count, page: page, min_amt: +filterInitial.min_amt, max_amt: +filterInitial.max_amt, sortType: +assending, sortKey: key, user_id: window.localStorage.getItem('userIdToken') }
        // console.log(clone);
        try {
            const res = await quickDhan(clone)
            // console.log(res?.data?.data?.wallet);
            setTotalCount(res?.data?.data?.totalCount)
            setData(res?.data?.data?.dashboard)
            // getTransitionReport()
        } catch (error) {

        }
        setLoading(false)
    };

    const allDataWalletReport = async () => {
        const clone = { ...filterInitial, count: count, page: page, min_amt: +filterInitial.min_amt, max_amt: +filterInitial.max_amt, user_id: window.localStorage.getItem('userIdToken') }
        try {

            const res = await allquickDhan(clone)
            setAllData(res?.data?.data?.dashboard);
        } catch (error) {

        }
    }

    const [currentDate, setCurrentDate] = useState('');
    // console.log(currentDate);

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setCurrentDate(formattedDate);
        const clone = { ...filterInitial, start_date: formattedDate, end_date: formattedDate }
        setFilterInitial(clone)
    }

    useEffect(() => {
        getCurrentDate()
    }, [])

    useEffect(() => {
        allDataWalletReport()
        getTransitionReport(0)

    }, [])
    return (
        <>
            {loading && <Loader />}
            <div className="PageHeading">
                <h1>Quick Dhan Report</h1>
            </div>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Filter</span></div>
                    <div className="card-body">
                        <form action="" method="post" name="frmReport" id="frmReport">
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
                                    <input type="date" name="start_date" id="account_no" max={currentDate} defaultValue={currentDate} className="form-control" value={filterInitial.start_date} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">End Date</label>
                                    <input type="date" name="end_date" id="account_no" max={currentDate} defaultValue={currentDate} className="form-control" value={filterInitial.end_date} onChange={handleChange} />
                                </div>



                                <div className="form-group col-md-4">
                                    <label htmlFor="customer_mobile">Customer Mobile</label>
                                    <input type="number" name="customer_mobile" id="customer_mobile" className="form-control" placeholder="Enter Customer Mobile" value={filterInitial.customer_mobile} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="adhaar_no">Aadhaar Mobile</label>
                                    <input type="number" name="adhaar_no" id="adhaar_no" className="form-control" placeholder="Enter Aadhaar Mobile" value={filterInitial.adhaar_no} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txn_id">Txn Id</label>
                                    {/* <input type="number" name="txn_id " id="txn_id " className="form-control" placeholder="Enter Txn Id" value={filterInitial.txn_id} onChange={handleChange} /> */}
                                    <input type="text" name="txn_id" id="txn_id" className="form-control" placeholder="Enter Txn Id" value={filterInitial.txn_id} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <button type="button" className="btn btn-primary mr-3" onClick={() => getTransitionReport(0)}>Search</button>
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
                                <div className="dataTables_length mb-3" id="myTable_length">
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
                            <div id="myTable_processing" className="dataTables_processing" style={{ display: 'none' }}>Processing...</div>
                            <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed" id="myTable" role="grid" aria-describedby="myTable_info" >
                                <thead>
                                    <tr role="row">
                                        <th className="sorting">
                                            S.No
                                        </th>
                                        <th className="sorting" onClick={() => sortByColumn('createdAt')}>Created Date</th>
                                        {/* <th className="sorting">
                                            Update Date
                                        </th> */}

                                        <th className="sorting">
                                            address
                                        </th>
                                        <th className="sorting">
                                            merchant_code
                                        </th>
                                        <th className="sorting" >merchant_name</th>
                                        <th className="sorting" >mobile</th>
                                        <th className="sorting" >pincode</th>

                                        <th className="sorting" >Amount</th>
                                        <th className="sorting" >purpose</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {(data && Array.isArray(data) && data.length > 0) ? (
                                        data.map((item, i) => (
                                            <tr className="odd" key={item?._id}>
                                                <td valign="top" className="dataTables_empty">{(i + 1) + (page * count)}</td>
                                                <td valign="top" className="dataTables_empty">{item?.createdAt}</td>
                                                <th valign="top" className="dataTables_empty">
                                                    {item?.address}
                                                </th>
                                                <th valign="top" className="dataTables_empty">
                                                    {item?.merchant_code}
                                                </th>
                                                <th valign="top" className="dataTables_empty">
                                                    {item?.merchant_name}
                                                </th>
                                                <td valign="top" className="dataTables_empty">{item?.mobile}</td>
                                                <td valign="top" className="dataTables_empty">{item?.pincode}</td>
                                                <td valign="top" className="dataTables_empty">{item?.amount}</td>
                                                <td valign="top" className="dataTables_empty">{item?.purpose}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center">No data available</td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                            <div className="dataTables_info_page">
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
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>

            </div >

            <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed d-none" id="table-to-xlsx" role="grid" aria-describedby="myTable_info" >
                <thead>
                    <tr role="row">
                        <th className="sorting" onClick={() => sortByColumn('createdAt')}>Created Date</th>
                        {/* <th className="sorting">
                                            Update Date
                                        </th> */}

                        <th className="sorting">
                            address
                        </th>
                        <th className="sorting">
                            merchant_code
                        </th>
                        <th className="sorting" >merchant_name</th>
                        <th className="sorting" >mobile</th>
                        <th className="sorting" >pincode</th>

                        <th className="sorting" >Amount</th>
                        <th className="sorting" >purpose</th>

                    </tr>
                </thead>
                <tbody>
                    {allData && allData?.map((item) => {
                        // console.log(item);
                        return <tr className="odd" key={item?._id}>
                            <td valign="top" className="dataTables_empty">{new Date(item?.createdAt).getDate() + "/" + Number(new Date(item?.createdAt).getMonth() + 1) + "/" + new Date(item?.createdAt).getFullYear() + "," + new Date(item?.createdAt).getHours() + ":" + new Date(item?.createdAt).getMinutes()}</td>
                            {/* <td valign="top" className="dataTables_empty">{item?.updatedAt}</td> */}
                            <th valign="top" className="dataTables_empty">
                                {item?.address}
                            </th>
                            <th valign="top" className="dataTables_empty">
                                {item?.merchant_code}
                            </th>
                            <th valign="top" className="dataTables_empty">
                                {item?.merchant_name}
                            </th>
                            <td valign="top" className="dataTables_empty">{item?.mobile}</td>
                            <td valign="top" className="dataTables_empty">{item?.pincode}</td>


                            <td valign="top" className="dataTables_empty">{item?.amount}</td>
                            <td valign="top" className="dataTables_empty">{item?.purpose}</td>

                        </tr>
                    })}

                </tbody>
            </table>
        </>
    )
}
export default QuickDhan
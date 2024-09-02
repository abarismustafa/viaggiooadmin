
import { Pagination } from "antd"
import { useEffect, useState } from "react"
import { aepsWallets, aepsWalletsAll, allDataWallets, dmtTransiList, walletsREports } from "../../../api/login/Login"
import Loader from "../../../common/loader/Loader"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Link } from "react-router-dom";
function AepsWallets() {
    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().substr(0, 10);
    };

    const [currentDate, setCurrentDate] = useState(getCurrentDate());
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(10)
    const [page, setPage] = useState(0)
    // console.log(page);
    const [totalCount, setTotalCount] = useState(null)
    const [data, setData] = useState(null)
    const [allData, setAllData] = useState(null)
    const [filterInitial, setFilterInitial] = useState({
        user_id: '',
        count: '',
        page: '',
        min_amt: 0,
        max_amt: 0,
        end_date: getCurrentDate(),
        start_date: getCurrentDate(),
        type: '',
        order_id: '',
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
        console.log('iojijip');
        setLoading(true)
        const clone = { ...filterInitial, count: count, page: input, min_amt: +filterInitial.min_amt, max_amt: +filterInitial.max_amt, user_id: window.localStorage.getItem('userIdToken') }
        try {
            const res = await aepsWallets(clone)
            // console.log(res);
            setTotalCount(res?.data?.data?.total)
            setData(res?.data?.data?.wallet)
            allDataWalletReport()
        } catch (error) {

        }
        setLoading(false)
    }
    const onChangeVal = (e) => {
        console.log(e - 1);

        setPage(e - 1)
        getTransitionReport(e - 1)
    };


    const ResetData = async () => {
        setLoading(true)
        const obj = {
            count: 10,
            page: 0,
            min_amt: 0,
            max_amt: 0,
            end_date: '',
            start_date: '',
            type: '',
            order_id: '',
            txn_id: '',
            sortType: '',
            sortType: '',
            user_id: window.localStorage.getItem('userIdToken')
        }
        try {
            const res = await aepsWallets(obj)
            setTotalCount(res?.data?.data?.total)
            setData(res?.data?.data?.wallet)
            setFilterInitial({
                end_date: '',
                start_date: '',
                type: '',
                trans_type: '',
                order_id: '',
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
            const res = await aepsWallets(clone)
            // console.log(res?.data?.data?.wallet);
            setTotalCount(res?.data?.data?.total)
            setData(res?.data?.data?.wallet)
            // getTransitionReport()
        } catch (error) {

        }
        setLoading(false)
    };

    const allDataWalletReport = async () => {
        const clone = { ...filterInitial, count: count, page: page, min_amt: +filterInitial.min_amt, max_amt: +filterInitial.max_amt, user_id: window.localStorage.getItem('userIdToken') }
        try {
            // aepsWalletsAll
            const res = await aepsWalletsAll(clone)
            setAllData(res?.data?.data?.wallet);
        } catch (error) {

        }
    }

    // const [currentDate, setCurrentDate] = useState('');
    // // console.log(currentDate);

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
                <h1>AEPS Wallet Report</h1>
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
                                    <input type="date" name="start_date" id="account_no" className="form-control" max={currentDate} defaultValue={currentDate} value={filterInitial.start_date} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">End Date</label>
                                    <input type="date" name="end_date" id="account_no" max={currentDate} defaultValue={currentDate} className="form-control" value={filterInitial.end_date} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Type</label>
                                    <select class="form-select" name="type" value={filterInitial.type} onChange={handleChange}>
                                        <option selected>select Type</option>
                                        <option value="credit">Credit</option>
                                        <option value="debit">Debit</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="order_id">Order Id</label>
                                    <input type="text" name="order_id" id="order_id" className="form-control" placeholder="Enter Order Id" value={filterInitial.order_id} onChange={handleChange} />
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
                                            Txn Id
                                        </th>
                                        <th className="sorting">
                                            Order Id
                                        </th>
                                        {/* <th className="sorting" >Transaction type</th> */}
                                        <th className="sorting" >Type</th>
                                        <th className="sorting" >Opening Balance</th>
                                        <th className="sorting" >Closing Balance</th>
                                        <th className="sorting" >Amount</th>
                                        {/* <th className="sorting" >Is Refunded</th> */}
                                        <th className="sorting" >Is By Admin</th>
                                        <th className="sorting" >Message</th>
                                        <th className="sorting" >Approve</th>
                                        <th className="sorting">Transaction Dispute</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data?.map((item,i) => {
                                        // console.log(item);
                                        return <tr className="odd" key={item?._id}>
                                            <td valign="top" className="dataTables_empty">{(i + 1) + (page * count)}</td>
                                            <td valign="top" className="dataTables_empty">{item?.createdAt}</td>
                                            {/* <td valign="top" className="dataTables_empty">{item?.updatedAt}</td> */}
                                            <th valign="top" className="dataTables_empty">
                                                {item?.txn_id}
                                            </th>
                                            <td valign="top" className="dataTables_empty">{item?.order_id}</td>
                                            {/* <td valign="top" className="dataTables_empty">{item?.trans_type}</td> */}
                                            <td valign="top" className="dataTables_empty">{item?.type}</td>
                                            <td valign="top" className="dataTables_empty">{item?.o_bal}</td>
                                            <td valign="top" className="dataTables_empty">{item?.c_bal}</td>
                                            <td valign="top" className="dataTables_empty">{item?.amount}</td>
                                            {/* <td valign="top" className="dataTables_empty">{item?.is_refunded == true ? 'Yes' : 'No'}</td> */}
                                            <td valign="top" className="dataTables_empty">{item?.is_by_admin == true ? 'Yes' : 'No'}</td>
                                            <td valign="top" className="dataTables_empty">{item?.message}</td>
                                            <td valign="top" className="dataTables_empty">{item?.approve.toString()}</td>
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

            </div>

            <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed d-none" id="table-to-xlsx" role="grid" aria-describedby="myTable_info" >
                <thead>
                    <tr role="row">
                        <th className="sorting">Created Date</th>
                        {/* <th className="sorting">
                                            Update Date
                                        </th> */}
                        <th className="sorting">
                            Txn Id
                        </th>
                        <th className="sorting">
                            Order Id
                        </th>
                        <th className="sorting" >Transaction type</th>
                        <th className="sorting" >Type</th>
                        <th className="sorting" >Opening Balance</th>
                        <th className="sorting" >Closing Balance</th>
                        <th className="sorting" >Amount</th>
                        <th className="sorting" >Is Refunded</th>
                        <th className="sorting" >Is Commission</th>
                        <th className="sorting" >Message</th>
                        <th className="sorting" >Approve</th>
                    </tr>
                </thead>
                <tbody>
                    {allData && allData?.map((item) => {
                        // console.log(item);
                        return <tr className="odd" key={item?._id}>
                            <td valign="top" className="dataTables_empty">{new Date(item?.createdAt).getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()}</td>
                            {/* <td valign="top" className="dataTables_empty">{item?.updatedAt}</td> */}
                            <th valign="top" className="dataTables_empty">
                                {item?.txn_id}
                            </th>
                            <td valign="top" className="dataTables_empty">{item?.order_id}</td>
                            <td valign="top" className="dataTables_empty">{item?.trans_type}</td>
                            <td valign="top" className="dataTables_empty">{item?.type}</td>
                            <td valign="top" className="dataTables_empty">{item?.o_bal}</td>
                            <td valign="top" className="dataTables_empty">{item?.c_bal}</td>
                            <td valign="top" className="dataTables_empty">{item?.amount}</td>
                            <td valign="top" className="dataTables_empty">{item?.is_refunded == true ? 'Yes' : 'No'}</td>
                            <td valign="top" className="dataTables_empty">{item?.is_commision == true ? 'Yes' : 'No'}</td>
                            <td valign="top" className="dataTables_empty">{item?.message}</td>
                            <td valign="top" className="dataTables_empty">{item?.approve.toString()}</td>
                        </tr>
                    })}

                </tbody>
            </table>
        </>
    )
}
export default AepsWallets
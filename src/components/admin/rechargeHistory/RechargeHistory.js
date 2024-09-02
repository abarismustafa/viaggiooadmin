import { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Loader from '../../../common/loader/Loader';
import { RechargeREports } from '../../../api/login/Login';
import { Pagination } from "antd"
function RechargeHistory() {
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
        amount: 0,
        end_date: '',
        start_date: '',
        operator_id: '',
        search: '',
        refundId: '',

    })

    const handleChange = (e) => {
        const clone = { ...filterInitial }
        const value = e.target.value
        const name = e.target.name
        clone[name] = value
        setFilterInitial(clone)
    }

    const getTransitionReport = async (input) => {
        // console.log('iojijip');
        setLoading(true)
        const clone = { ...filterInitial, count: count, page: input, amount: +filterInitial.amount, user_id: window.localStorage.getItem('userIdToken') }
        try {
            const res = await RechargeREports(clone)
            console.log(res?.data?.data?.dashboard);
            setTotalCount(res?.data?.data?.count)
            setData(res?.data?.data?.dashboard)
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
            trans_type: '',
            order_id: '',
            txn_id: '',
            sortType: '',
            sortType: '',
            user_id: window.localStorage.getItem('userIdToken')
        }
        try {
            // const res = await walletsREports(obj)
            // setTotalCount(res?.data?.data?.total)
            // setData(res?.data?.data?.wallet)
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
            // const res = await walletsREports(clone)
            // // console.log(res?.data?.data?.wallet);
            // setTotalCount(res?.data?.data?.total)
            // setData(res?.data?.data?.wallet)
            // getTransitionReport()
        } catch (error) {

        }
        setLoading(false)
    };

    const allDataWalletReport = async () => {
        const clone = { ...filterInitial, count: count, page: page, min_amt: +filterInitial.min_amt, max_amt: +filterInitial.max_amt, user_id: window.localStorage.getItem('userIdToken') }
        try {
            // const res = await allDataWallets(clone)
            // setAllData(res?.data?.data?.wallet);
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
                <h1>Recharge History</h1>
            </div>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header">
                        <span>Filter</span>
                        {/* <div className="float-right mt-2">
                            <button className="btn btn-success mr-2" type="button" id="all-success" fdprocessedid="guzzp">Success : 0</button>
                            <button className="btn btn-warning mr-2" type="button" id="all-pending" fdprocessedid="5z6v5">Pending : 0</button>
                            <button className="btn btn-danger mr-2" type="button" id="all-failure" fdprocessedid="n4v2pr">Failure : 0</button>
                            <button className="btn btn-info" type="button" id="all-commission" fdprocessedid="df961n">Commission : 0</button>
                        </div> */}
                    </div>
                    <div className="card-body">
                        <form action="# " method="post" name="frmCallAction" id="frmCallAction">
                            <input type="hidden" id="hidID" name="hidID" />
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtFrom">Start Date</label>
                                    <input className="form-control datefield" id="txtFrom" name="start_date" type="date" max={currentDate} defaultValue={currentDate} placeholder="Select Date" value={filterInitial.start_date} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtTo">End Date</label>
                                    {/* <input className="form-control datefield" id="txtTo" name="end_date" type="date" placeholder="Select Date" value={filterInitial.end_date} onChange={handleChange} /> */}
                                    <input type="date" name="end_date" id="account_no" max={currentDate} defaultValue={currentDate} className="form-control" value={filterInitial.end_date} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="Amount">Amount</label>
                                    <input className="form-control" id="Amount" name="amount" type="number" placeholder="Amount" value={filterInitial.amount} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="Amount">Operator Id</label>
                                    <input className="form-control" id="Amount" name="operator_id" type="text" placeholder="Operator Id" value={filterInitial.operator_id} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtNumId">Search / Mobile</label>
                                    <input className="form-control" id="txtNumId" name="search" type="text" placeholder="Search / Mobile" value={filterInitial.search} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtNumId">Refund Id</label>
                                    <input className="form-control" id="txtNumId" name="refundId" type="text" placeholder="Refund Id" value={filterInitial.refundId} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="form-row text-align-center">
                                <input type="button" id="btnSearch" name="btnSearch" defaultValue="Search" className="btn btn-primary" onClick={() => getTransitionReport(0)} />

                            </div>
                        </form></div>

                </div>
                <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button btn btn-success cusxel"
                            table="table-to-xlsx"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download Excel sheet" />
                        <div className="GridUi no-header-footer-grid mt-3" id="all_transaction">
                            <div id="rechargehistorytbl_wrapper" className="dataTables_wrapper">
                                <table id="table-to-xlsx" className="table table-striped table-bordered table-hover display fixed_headers dataTable" style={{ width: 1250 }} role="grid" aria-describedby="rechargehistorytbl_info">
                                    <thead>
                                        <tr role="row">
                                            <th className="sorting_asc" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Sr No: activate to sort column descending">
                                                S.No
                                            </th>
                                            <th className="sorting_asc" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Sr No: activate to sort column descending">
                                                Amount

                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Recharge ID: activate to sort column ascending">
                                                Close Balance
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Txn Id: activate to sort column ascending">
                                                Opening Balance
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Txn Id: activate to sort column ascending">
                                                Mobile Number
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Recharge  DateTime: activate to sort column ascending">
                                                Recharge Mode
                                            </th>

                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Mobile No: activate to sort column ascending">
                                                Com Type
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Amount: activate to sort column ascending">
                                                Is On Spot
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {data && data?.map((item,i) => {
                                            return <tr className="table-to-xls" key={item?._id}>
                                                <td> {(i + 1) + (page * count)}   </td>
                                                <td>{item?.amount}</td>
                                                <td>{item?.cbalance}</td>
                                                <td>{item?.obalance}</td>
                                                <td>{item?.number}</td>
                                                <td>{item?.recharge_mode}</td>
                                                <td>{item?.com_type}</td>
                                                <td>{item?.is_on_spot?.toString()}</td>
                                            </tr>
                                        })}


                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
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

        </>
    )
}
export default RechargeHistory
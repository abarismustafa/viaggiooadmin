
import { useEffect, useState } from "react";

import { Pagination } from "antd";
import Select from "react-select";
import { bbps_txnElectri, operatorApi } from "../../../../api/login/Login";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function CreditCardBillList() {
    const navigate = useNavigate();
    const [bankData, setBankData] = useState(null)
    const [showBanak, setShowBank] = useState()
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(10)
    const [page, setPage] = useState(0)
    // console.log(page);
    const [totalCount, setTotalCount] = useState(null)
    const [totalAmount, setTotalAmount] = useState(null)
    const [data, setData] = useState(null)
    const [allData, setAllData] = useState(null)
    const [filterInitial, setFilterInitial] = useState({
        txn_id: '',
        start_date: '',
        end_date: '',
        biller_id: '',
        page: '',
    })

    console.log(filterInitial);



    const handleChange = (e) => {
        const clone = { ...filterInitial }
        const value = e.target.value
        const name = e.target.name
        clone[name] = value
        setFilterInitial(clone)
    }

    const getTransitionReport = async (input) => {
        setLoading(true)
        const clone = {
            ...filterInitial, count: count,
            category: '667e8a8aa0cc9372aaceb009', biller_id: showBanak?._id ? showBanak?._id : '', page: input, user_id: window.localStorage.getItem('userIdToken')
        }
        try {
            const res = await bbps_txnElectri(clone)
            // console.log(res);
            // console.log(res);
            setTotalCount(res?.data?.totalCount)
            setTotalAmount(res?.data?.totalAmount)
            setData(res?.data?.data)
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
            end_date: '',
            start_date: '',
            txn_id: '',
            sortType: '',
            sortType: '',
            category: '667e8a8aa0cc9372aaceb009',
            biller_id: '',
            user_id: window.localStorage.getItem('userIdToken')
        }
        try {
            const res = await bbps_txnElectri(obj)
            setTotalCount(res?.data?.totalCount)
            setData(res?.data?.data)
            setFilterInitial({
                end_date: new Date().toISOString().substr(0, 10),
                start_date: new Date().toISOString().substr(0, 10),
                biller_id: '',
                txn_id: '',
                showBanak: ''
            })
            setShowBank('')
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
            // // getTransitionReport()
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
        rechargeOperator()

    }, [])
    const rechargeOperator = async () => {
        const electricity = '667e8a8aa0cc9372aaceb009'
        try {
            const res = await operatorApi(electricity)
            // console.log(res?.data.data);
            const maped = res?.data?.data?.map((item) => {
                // console.log(item);
                return { ...item, label: item.name }
            })
            // console.log(res?.data?.data);

            setBankData(maped)
        } catch (error) {

        }
    }



    const bankChange = (e) => {
        console.log(e);
        // const clone = { ...initialValue }
        // // if (name == 'bank_id') {
        // const findIfac = bankData.find((item) => {
        //     // console.log(item);
        //     return item?.bankID == e.bankID
        // })
        // // console.log(findIfac);
        // let abc = findIfac?.ifsc_code
        // let bankName = findIfac?.bank_name
        // // console.log(findIfac, abc);
        // const clone2 = { ...clone, ifsc: abc == 'NULL' ? "" : abc, bank_name: bankName }
        // // console.log({ ...initialData, account_number: abc });
        // setInitialValue(clone2)

        setShowBank(e)

    }
    const handleViewInvoice = (id) => {
        navigate(`/bill-invoice/${id}`);
    };
    return (
        <>
            <div className="col-md-7 col-sm-12 mobileTopSpacing ng-scope" ng-controller="dthCtrl">
                <h2 className="SecTitle">Recent Transaction
                    {/* <p className="all-pm-0 float-right"><i className="fa fa-refresh" ng-click="updateDth()" /></p> */}
                </h2>
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
                                <input type="date" name="start_date" id="account_no" max={currentDate} defaultValue={currentDate} className="form-control" value={filterInitial?.start_date} onChange={handleChange} />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="txtUserId">End Date</label>
                                <input type="date" name="end_date" id="account_no" max={currentDate} defaultValue={currentDate} className="form-control" value={filterInitial?.end_date} onChange={handleChange} />
                            </div>

                            <div className="form-group col-md-4">
                                <label htmlFor="txtUserId">Transaction Id</label>
                                <input type="text" name="txn_id" id="account_no" className="form-control" placeholder="Transaction Id" value={filterInitial?.txn_id} onChange={handleChange} />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="txtUserId">Operator</label>
                                <Select
                                    // isMulti
                                    // defaultValue={showCateg}
                                    value={showBanak}
                                    name="showBanak"
                                    options={bankData}
                                    className="games-dropdown-2 customsection"
                                    classNamePrefix="select"
                                    onChange={bankChange}
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label>&nbsp;</label>
                                <button type="button" className="btn btn-primary mr-3" onClick={() => getTransitionReport(0)}>
                                    Search

                                </button>
                                <button type="button" className="btn btn-warning" onClick={ResetData}>Reset</button>
                            </div>

                        </div>
                    </form>
                </div>
                <div className="GridUi no-header-footer-grid">
                    <table className="DataTableGrid display responsive dataTable" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Date</th>
                                <th>Biller ID</th>
                                <th>Operator name</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data?.map((item, i) => {
                                return <tr key={item?._id}>
                                    <td>{(i + 1) + (page * count)}</td>
                                    <td>{item?.createdAt}</td>
                                    <td>{item?.biller_id}</td>
                                    <td>{item?.operator_name}</td>
                                    <td>{item?.amount}</td>
                                    <td>
                                        {item?.status === 2 ? <button type="button" className="btn btn-success">Success</button> : ''}
                                        {item?.status === 1 ? <button type="button" className="btn btn-warning">Pending</button> : ''}
                                        {item?.status === 3 ? <button type="button" className="btn btn-danger">Failed</button> : ''}
                                    </td>
                                    <td>
                                    <FaEye 
                                        style={{ cursor: 'pointer' }} 
                                        onClick={() => handleViewInvoice(item?._id)}
                                    />
                                </td>

                                </tr>
                            })}
                            <tr style={{ backgroundColor: 'green', color: 'white' }}>
                                <td colspan="4">Total Amount</td>
                                <td>{totalAmount}</td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>
                    <div className="dataTables_info_page mt-3">
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
            </div>
        </>
    )
}
export default CreditCardBillList
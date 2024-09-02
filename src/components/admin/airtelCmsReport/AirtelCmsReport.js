import { Pagination } from "antd"
import { useEffect, useState } from "react"
import { getCmsData, getCmsAllData } from "../../../api/login/Login"
import Loader from "../../../common/loader/Loader"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Link } from "react-router-dom";

function AirtelCmsReport() {
    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().substr(0, 10);
    };

    const [currentDate, setCurrentDate] = useState(getCurrentDate());
    const [loading, setLoading] = useState(false);
    const [count] = useState(10);  // count is now a number 10
    const [page, setPage] = useState(0)
    const [totalCount, setTotalCount] = useState(null)
    const [data, setData] = useState(null)
    const [allData, setAllData] = useState(null)
    const [filterInitial, setFilterInitial] = useState({
        customer_mobile: '',
        end_date: getCurrentDate(),
        start_date: getCurrentDate(),
        txn_id: '',
    })

    const handleChange = (e) => {
        const clone = { ...filterInitial }
        const value = e.target.value
        const name = e.target.name
        clone[name] = value
        setFilterInitial(clone)
    }

    const getCmsReport = async (input) => {
        console.log('getCmsReport called with input:', input);
        setLoading(true);
        const params = new URLSearchParams({
            ...filterInitial,
            count: count,  // count is a number 10
            page: input,
        })
        console.log('API params:', params);
        try {
            const res = await getCmsData(params);
            console.log('API response:', res);
            setTotalCount(res?.data?.data?.total);
            setData(res?.data?.data?.cms);
            allDataCmsReport();
        } catch (error) {
            console.error('API error:', error);
        }
        setLoading(false);
    };

    const onChangeVal = (e) => {
        setPage(e - 1)
        getCmsReport(e - 1)
    };

    const ResetData = async () => {
        setLoading(true);
        const params = new URLSearchParams({
            count: count,  // count is a number 10
            page: 0,
            end_date: '',
            start_date: '',
            customer_mobile: '',
            txn_id: '',
        })
        try {
            const res = await getCmsData(params);
            setTotalCount(res?.data?.data?.total);
            setData(res?.data?.data?.cms);
            setFilterInitial({
                end_date: '',
                start_date: '',
                customer_mobile: '',
                txn_id: '',
            });
            getCmsReport(0);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const allDataCmsReport = async () => {
        const params = new URLSearchParams({
            ...filterInitial,
            count: count,  // count is a number 10
            page: page,
        })
        try {
            const res = await getCmsAllData(params);
            setAllData(res?.data?.data?.cms);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCmsReport(0)
    }, [])


    return (
        <>
            {loading && <Loader />}
            <div className="PageHeading">
                <h1>CMS Report</h1>
            </div>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Filter</span></div>
                    <div className="card-body">
                        <form action="" method="get" name="frmReport" id="frmReport">
                            <input type="hidden" id="hidID" name="hidID" />
                            <div className="form-row" style={{ alignItems: 'end' }}>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Start Date</label>
                                    <input type="date" name="start_date" id="account_no" className="form-control" max={currentDate} defaultValue={currentDate} value={filterInitial.start_date} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">End Date</label>
                                    <input type="date" name="end_date" id="account_no" max={currentDate} defaultValue={currentDate} className="form-control" value={filterInitial.end_date} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="customer_mobile">Customer Mobile</label>
                                    <input type="text" name="customer_mobile" id="customer_mobile" className="form-control" placeholder="Enter Customer Mobile" value={filterInitial.customer_mobile} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txn_id">Txn Id</label>
                                    <input type="text" name="txn_id" id="txn_id" className="form-control" placeholder="Enter Txn Id" value={filterInitial.txn_id} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-2">
                                    <label>&nbsp;</label>
                                    <button type="button" className="btn btn-primary mr-3" onClick={() => getCmsReport(0)}>Search</button>
                                    <button type="button" className="btn btn-warning" onClick={ResetData}>Reset</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="card mt-4" style={{ overflow: 'auto' }}>
                    <div className="card-body">
                        <div id="myTable_wrapper" className="dataTables_wrapper no-footer">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="dataTables_length mb-3" id="myTable_length">
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="download-table-xls-button btn btn-success cusxel"
                                        table="table-to-xlsx"
                                        filename="tablexls"
                                        sheet="tablexls"
                                        buttonText="Download Excel sheet" />
                                </div>
                            </div>
                            <div id="myTable_processing" className="dataTables_processing" style={{ display: 'none' }}>Processing...</div>
                            <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed" id="myTable" role="grid" aria-describedby="myTable_info" >
                                <thead>
                                    <tr role="row">
                                        <th className="sorting">S.No</th>
                                        <th className="sorting">Created Date</th>
                                        <th className="sorting">Txn Id</th>
                                        <th className="sorting">Customer Mobile</th>
                                        <th className="sorting">Amount</th>
                                        <th className="sorting">Status</th>
                                        <th className="sorting">Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data?.map((item, i) => (
                                        <tr className="odd" key={item?._id}>
                                            <td valign="top" className="dataTables_empty">{(i + 1) + (page * count)}</td>
                                            <td valign="top" className="dataTables_empty">{item?.createdAt}</td>
                                            <td valign="top" className="dataTables_empty">{item?.txn_id}</td>
                                            <td valign="top" className="dataTables_empty">{item?.customer_mobile}</td>
                                            <td valign="top" className="dataTables_empty">{item?.amount}</td>
                                            <td valign="top" className="dataTables_empty">{item?.status}</td>
                                            <td valign="top" className="dataTables_empty">{item?.message}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="dataTables_info_page">
                                <div className="dataTables_info" id="empoloyees-tblwrapper_info" role="status" aria-live="polite">
                                    Total {totalCount} entries
                                </div>
                                <div className="dataTables_paginate paging_simple_numbers" id="empoloyees-tblwrapper_paginate">
                                    <Pagination
                                        defaultCurrent={1}
                                        onChange={onChangeVal}
                                        total={totalCount}
                                        pageSize={count}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed d-none" id="table-to-xlsx" role="grid" aria-describedby="myTable_info" >
                <thead>
                    <tr role="row">
                        <th className="sorting">Created Date</th>
                        <th className="sorting">Txn Id</th>
                        <th className="sorting">Customer Mobile</th>
                        <th className="sorting">Amount</th>
                        <th className="sorting">Status</th>
                        <th className="sorting">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {allData && allData?.map((item) => (
                        <tr className="odd" key={item?._id}>
                            <td valign="top" className="dataTables_empty">{new Date(item?.createdAt).toLocaleDateString()}</td>
                            <td valign="top" className="dataTables_empty">{item?.txn_id}</td>
                            <td valign="top" className="dataTables_empty">{item?.customer_mobile}</td>
                            <td valign="top" className="dataTables_empty">{item?.amount}</td>
                            <td valign="top" className="dataTables_empty">{item?.status}</td>
                            <td valign="top" className="dataTables_empty">{item?.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default AirtelCmsReport
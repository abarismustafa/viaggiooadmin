import { Pagination } from "antd"
import { useEffect, useState } from "react"
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Loader from "../../../../common/loader/Loader";
import { packList, packageHistory } from "../../../../api/login/Login";
import { Link } from "react-router-dom";

function PackageHistory() {
    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().substr(0, 10);
    };

    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(10)
    const [page, setPage] = useState(0)
    const [totalCount, setTotalCount] = useState(null)
    const [data, setData] = useState([])
    const [DataPackage, setDataPackage] = useState([])
    const [currentDate, setCurrentDate] = useState(getCurrentDate());

    const [filterInitial, setFilterInitial] = useState({
        user_id: window.localStorage.getItem('userIdToken'),
        count: 10,
        page: 0,
        end_date: getCurrentDate(),
        start_date: getCurrentDate(),
        sortKey: '',
        sortType: '',
        package_id: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilterInitial(prev => ({ ...prev, [name]: value }));
    }

    const packageList = async () => {
        try {
            const res = await packList()
            setDataPackage(Array.isArray(res?.data?.data) ? res.data.data : [])
        } catch (error) {
            setDataPackage([])
        }
    }

    const getTransitionReport = async (input = 0) => {
        setLoading(true)
        const params = {
            ...filterInitial,
            page: input,
            count: count
        }
        try {
            const res = await packageHistory(params)
            setTotalCount(res?.data?.totalCount || 0)
            setData(Array.isArray(res?.data?.data) ? res.data.data : [])
        } catch (error) {
            console.error("error", error)
            setData([])
        }
        setLoading(false)
    }

    const onChangeVal = (e) => {
        setPage(e - 1)
        getTransitionReport(e - 1)
    };

    const ResetData = () => {
        const resetFilter = {
            ...filterInitial,
            end_date: '',
            start_date: '',
            package_id: '',
        }
        setFilterInitial(resetFilter)
        getTransitionReport(0)
    }

    useEffect(() => {
        packageList();
        getTransitionReport();
    }, []);

    useEffect(() => {
        getTransitionReport()
    }, [filterInitial.start_date, filterInitial.end_date])
    console.group("data",data)

    return (
        <>
            {loading && <Loader />}
            <div className="PageHeading">
                <h1>Package History</h1>
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
                                    <input
                                        type="date"
                                        name="start_date"
                                        id="account_no"
                                        className="form-control"
                                        max={currentDate}
                                        value={filterInitial.start_date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">End Date</label>
                                    <input
                                        type="date"
                                        name="end_date"
                                        id="account_no"
                                        max={currentDate}
                                        className="form-control"
                                        value={filterInitial.end_date}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Package</label>
                                    <select className="form-select" name="package_id" value={filterInitial.package_id} onChange={handleChange}>
                                        <option value="">Select Package</option>
                                        {Array.isArray(DataPackage) && DataPackage.length > 0 ? (
                                            DataPackage.map((item) => (
                                                <option key={item?._id} value={item?._id}>{item?.package_name}</option>
                                            ))
                                        ) : (
                                            <option disabled>No packages available</option>
                                        )}
                                    </select>
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
                            <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed" role="grid" aria-describedby="myTable_info" >
                                <thead>
                                    <tr role="row">
                                        <th className="sorting">S.No</th>
                                        <th className="sorting">Date / Time</th>
                                        <th className="sorting">Duration</th>
                                        <th className="sorting">Duration Type</th>
                                        <th className="sorting">Package Name</th>
                                        <th className="sorting">MRP</th>
                                        <th className="sorting">Purchase Amount</th>
                                        <th className="sorting">Tax</th>
                                        <th className="sorting">Tax Type</th>
                                        <th className="sorting">Transaction Dispute</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(data) && data.length > 0 ? (
                                        data.map((item, i) => (
                                            <tr className="odd" key={item?._id}>
                                                <td valign="top" className="dataTables_empty">{(i + 1) + (page * count)}</td>
                                                <td valign="top" className="dataTables_empty">
                                                    {new Date(item?.createdAt).getDate() + "-" +
                                                        Number(new Date(item?.createdAt).getMonth() + 1) + "-" +
                                                        new Date(item?.createdAt).getFullYear() + " / " +
                                                        new Date(item?.createdAt).getHours() + ":" +
                                                        new Date(item?.createdAt).getMinutes()}
                                                </td>
                                                <td valign="top" className="dataTables_empty">{item?.duration}</td>
                                                <td valign="top" className="dataTables_empty">{item?.duration_type}</td>
                                                <td valign="top" className="dataTables_empty">{item?.package_name}</td>
                                                <td valign="top" className="dataTables_empty">{item?.mrp}</td>
                                                <td valign="top" className="dataTables_empty">{item?.amount}</td>
                                                <td valign="top" className="dataTables_empty">{item?.tax}</td>
                                                <td valign="top" className="dataTables_empty">{item?.tax_type}</td>
                                                <td valign="top" className="dataTables_empty">
                                                    <Link className="btn btn-primary" to={`/add-ticket/${item?._id}`} state={{ item, serviceId: '65f9484a26eb74e182c640fc' }}>Dispute</Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="9" className="text-center">No data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="dataTables_info_page">
                    <div className="dataTables_info" id="empoloyees-tblwrapper_info" role="status" aria-live="polite">
                        Total {totalCount} entries
                    </div>
                    <div className="dataTables_paginate paging_simple_numbers" id="empoloyees-tblwrapper_paginate">
                        <Pagination
                            onChange={onChangeVal}
                            total={totalCount}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PackageHistory
import { useEffect, useState } from "react"
import { listTicket } from "../../../../api/login/Login"
import { Link } from "react-router-dom"


function OpenDisput() {
    const [data, setData] = useState(null)
    const getTransitionReport = async (input) => {

        const clone = { count: 10, page: 0, min_amt: 0, max_amt: 10000, user_id: window.localStorage.getItem('userIdToken'), status: '667fbc67329a68a445295a3b' }
        try {
            const res = await listTicket(clone)
            setData(res?.data?.data?.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        getTransitionReport(0)
    }, [])
    return (
        <>
            <div className="PageHeading">
                <h1>Pending Tickets</h1>
            </div>
            <div className="ContentArea">
                <div className="card mt-2" style={{ overflow: 'auto' }}>
                    <div className="card-body">

                        <div className="GridUi no-header-footer-grid mt-3" id="all_transaction">
                            <div id="rechargehistorytbl_wrapper" className="dataTables_wrapper">

                                <table id="rechargehistorytbl" className="table table-striped table-bordered table-hover display fixed_headers dataTable" style={{ width: 1250 }} role="grid" aria-describedby="rechargehistorytbl_info">
                                    <thead>
                                        <tr role="row">
                                            <th className="sorting_asc" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Sr No: activate to sort column descending">
                                                Ticket ID
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Recharge ID: activate to sort column ascending">
                                                Sending Date
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Txn Id: activate to sort column ascending">
                                                Subject
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Recharge  DateTime: activate to sort column ascending">
                                                User
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Company Name: activate to sort column ascending">
                                                Status</th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Mobile No: activate to sort column ascending">
                                                Last reply
                                            </th>
                                            <th className="sorting" tabIndex={0} aria-controls="rechargehistorytbl" rowSpan={1} colSpan={1} aria-label="Amount: activate to sort column ascending">
                                                Options

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data?.map((item, i) => {
                                            return <tr className="odd" key={item?._id}>
                                                <td valign="top" className="dataTables_empty">{(i + 1)}</td>
                                                <td valign="top" className="dataTables_empty">{new Date(item?.createdAt).getDate() + "-" + Number(new Date(item?.createdAt).getMonth() + 1) + "-" + new Date(item?.createdAt).getFullYear() + " / " + new Date(item?.createdAt).getHours() + ":" + new Date(item?.createdAt).getMinutes()}</td>
                                                {/* <td valign="top" className="dataTables_empty">{item?.updatedAt}</td> */}

                                                <td valign="top" className="dataTables_empty">{item?.refer_code}</td>
                                                <td valign="top" className="dataTables_empty">{item?.subject}</td>
                                                <td valign="top" className="dataTables_empty">{item?.department_id}</td>
                                                <td valign="top" className="dataTables_empty">{item?.priority}</td>
                                                {/* <td valign="top" className="dataTables_empty">--</td> */}
                                                <td valign="top" className="dataTables_empty"> <Link to={`/list-ticket-user/${item?._id}`} className="btn btn-primary">Reply</Link> </td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                                {/* <div className="dataTables_info" id="rechargehistorytbl_info" role="status" aria-live="polite">Showing 0 to 0 of 0 entries</div><div className="dataTables_paginate paging_simple_numbers" id="rechargehistorytbl_paginate"><a className="paginate_button previous disabled" aria-controls="rechargehistorytbl" data-dt-idx={0} tabIndex={0} id="rechargehistorytbl_previous">Previous</a><span /><a className="paginate_button next disabled" aria-controls="rechargehistorytbl" data-dt-idx={1} tabIndex={0} id="rechargehistorytbl_next">Next</a></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default OpenDisput
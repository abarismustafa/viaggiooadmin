function PlanList({ data, selectAmount }) {
    console.log(data);
    return (
        <>

            <div className="card mt-4" style={{ overflow: 'auto' }}>
                <div className="card-body card-body-sec">
                    <div id="myTable_wrapper" className="dataTables_wrapper no-footer">

                        <div id="myTable_processing" className="dataTables_processing" style={{ display: 'none' }}>Processing...</div>
                        <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed" id="myTable" role="grid" aria-describedby="myTable_info" >
                            <thead>
                                <tr role="row">
                                    <th className="sorting">Amount</th>
                                    {/* <th className="sorting">
                                            Update Date
                                        </th> */}
                                    <th className="sorting">
                                        Desc
                                    </th>
                                    <th className="sorting">
                                        Validity
                                    </th>
                                    <th className="sorting" >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data?.map((item) => {
                                    return <tr key={item?._id}>
                                        <td>{item?.rs}</td>
                                        <td>{item?.desc}</td>
                                        <td>{item?.validity}</td>
                                        <td>
                                            <button type="button" className="btn btn-success" onClick={() => selectAmount(item)}>Select</button>
                                        </td>
                                    </tr>
                                })}


                            </tbody>
                        </table>

                    </div>
                    {/* </div> */}
                </div>
            </div>

        </>
    )
}
export default PlanList
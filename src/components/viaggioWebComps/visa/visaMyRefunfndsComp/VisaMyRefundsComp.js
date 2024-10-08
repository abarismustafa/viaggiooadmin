import { Pagination } from 'antd'
import React from 'react'

function VisaMyRefundsComp() {
  return (
    <>
    {/* {loading && <Loader />} */}
    <div className="PageHeading">
        <h1>Refund List</h1>
    </div>
    <div className="ContentArea">
        <div className="card">

            <div className="card-header"><span>Filter</span></div>
            <div className="card-body">
                <form action="" method="post" name="frmReport" id="frmReport">
                    <input type="hidden" id="hidID" name="hidID" />
                    <div className="form-row" style={{ alignItems: 'end' }}>

                        <div className="form-group col-md-4">
                            <label htmlFor="txtUserId">Select key to search by</label>
                            <select class="form-select" name="type" value={'filterInitial.type'} onChange={'handleChange'}>
                                <option selected>Please Select</option>
                                <option value="all">First Name</option>
                                <option value="credit">Last Name</option>
                                <option value="debit">Booking Ref No</option>
                            </select>
                        </div>

                        <div className="form-group col-md-4">
                            <label htmlFor="order_id">Value</label>
                            <input type="text" name="order_id" id="order_id" className="form-control" placeholder="Enter Value" />
                        </div>


                        <div className="form-group col-md-4">
                            <label htmlFor="txtUserId">From Date</label>
                            <input type="date" name="start_date" id="account_no" className="form-control" />
                        </div>

                        <div className="form-group col-md-4">
                            <label htmlFor="txtUserId">To Date</label>
                            <input type="date" name="start_date" id="account_no" className="form-control" />
                        </div>

                       

                        <div className="form-group col-md-2">
                            <label>&nbsp;</label>
                            <button type="button" className="btn btn-primary mr-3" >
                                Search

                            </button>
                            <button type="button" className="btn btn-warning">Reset</button>
                        </div>

                    </div>
                </form>
            </div>

        </div>
        <div className="card mt-4" style={{ overflow: 'auto' }}>
            <div className="card-body">
                <div id="myTable_wrapper" className="dataTables_wrapper no-footer">
                    <div id="myTable_processing" className="dataTables_processing" style={{ display: 'none' }}>Processing...</div>
                    <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed" id="myTable" role="grid" aria-describedby="myTable_info" >
                        <thead>
                            <tr role="row">
                                <th className="sorting">
                                    S.No
                                </th>
                                <th className="sorting">Booking Ref. Number</th>
                                <th className="sorting">Amendment Id</th>
                                <th className="sorting">
                                Refund Type
                                </th>
                                <th className="sorting" >Refund Amount</th>
                                <th className="sorting" >Refund Status</th>
                                <th className="sorting" >Country</th>
                                <th className="sorting" >Type</th>
                                <th className="sorting" >Travel Date</th>
                                
                                <th className="sorting" >Remark</th>
                                <th className="sorting" >Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td valign="top" className="dataTables_empty">1</td>
                                <td valign="top" className="dataTables_empty">----</td>
                                <td valign="top" className="dataTables_empty">----</td>
                                <td valign="top" className="dataTables_empty">----</td>
                                <td valign="top" className="dataTables_empty">----</td>
                                <td valign="top" className="dataTables_empty">----</td>
                                <td valign="top" className="dataTables_empty">----</td>
                                <td valign="top" className="dataTables_empty">----</td>
                                <td valign="top" className="dataTables_empty">----</td>
                                <td valign="top" className="dataTables_empty">----</td>
                                <td valign="top" className="dataTables_empty">----</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div className="dataTables_info_page">
            <div className="dataTables_info" id="empoloyees-tblwrapper_info" role="status" aria-live="polite">
                Total 00 entries
            </div>
            <div className="dataTables_paginate paging_simple_numbers" id="empoloyees-tblwrapper_paginate">
                <Pagination
                    // defaultCurrent={1}
                    // onChange={onChangeVal}
                    // total={totalCount}
                />
            </div>
        </div>
    </div>
</>
  )
}

export default VisaMyRefundsComp
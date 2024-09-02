import { Pagination } from "antd"
import { useEffect, useState } from "react"
import { allDataDmt, dmtTransiList, paymentEnquiry, sendOtpRef, subOtpRef } from "../../../api/login/Login"
import Loader from "../../../common/loader/Loader"
import { ToastContainer, toast } from "react-toastify";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Link } from "react-router-dom";
import DisputeMessage from "./disputeMessage/DisputeMessage";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { FaEye } from 'react-icons/fa';
import Table from 'react-bootstrap/Table';
import "./DtmReportSearch.css";
function DtmReportSearch() {
    const getCurrentDate = () => {
        const today = new Date();
        return today.toISOString().substr(0, 10);
    };

    const [currentDate, setCurrentDate] = useState(getCurrentDate());
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(10)
    const [page, setPage] = useState(0)
    const [totalCount, setTotalCount] = useState(null)
    const [data, setData] = useState(null)
    const [allData, setAllData] = useState(null)

    const [idDispute, setIdDispute] = useState()

    // MOdal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    // MOdal


    const [filterInitial, setFilterInitial] = useState({
        user_id: '',
        count: '',
        page: '',
        min_amt: 0,
        max_amt: 0,
        end_date: getCurrentDate(),
        start_date: getCurrentDate(),
        sortKey: '',
        sortType: '',
        search: ''
    })

    const handleChange = (e) => {
        const clone = { ...filterInitial }
        const value = e.target.value
        const name = e.target.name
        clone[name] = value
        setFilterInitial(clone)
    }

    const toastSuccessMessage = (str) => {
        toast.success(`${str}`, {
            position: "top-center"
        })
    };

    const getTransitionReport = async (input) => {
        console.log('fgdf');
        setLoading(true)
        const clone = { ...filterInitial, count: count, page: input, min_amt: +filterInitial.min_amt, max_amt: +filterInitial.max_amt, user_id: window.localStorage.getItem('userIdToken') }
        try {
            const res = await dmtTransiList(clone)
            setTotalCount(res?.data?.data?.total)
            setData(res?.data?.data?.trans)
            allDataDmtData()
        } catch (error) {

        }
        setLoading(false)
    }
    const onChangeVal = (e) => {
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
            sortKey: '',
            sortType: '',
            user_id: window.localStorage.getItem('userIdToken')
        }
        try {
            const res = await dmtTransiList(obj)
            setTotalCount(res?.data?.data?.total)
            setData(res?.data?.data?.trans)
            setFilterInitial({
                end_date: '',
                start_date: '',
                search: ''
            })
        } catch (error) {

        }
        setLoading(false)
    }

    const [taxnum, settaxnum] = useState(null)
    const [taxnumId, settaxnumId] = useState(null)
    const EnquiryTransition = async (id) => {
        setIdDispute(id.id)
        settaxnumId(id._id)
        settaxnum(id.txn_id)
        handleShow(true)
        // try {
        //     const res = await paymentEnquiry(id)
        //     if (res?.data?.statusCode == 200) {
        //         toastSuccessMessage(res?.data?.message);
        //     }
        // } catch (error) {

        // }
    }


    const [sortDirection, setSortDirection] = useState();
    // console.log(sortDirection);

    const [assending, setDecending] = useState(1)

    const sortByColumn = async (key) => {
        // const sorted = [...data].sort((a, b) => {
        //     if (sortDirection === 'asc') {
        //         return a[key] > b[key] ? 1 : -1;
        //     } else {
        //         return a[key] < b[key] ? 1 : -1;
        //     }
        // });
        // console.log(sorted);
        // setData(sorted);

        // const clone = { ...filterInitial, sortType: assending, sortKey: key }

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
            const res = await dmtTransiList(clone)
            console.log(res?.data?.data?.trans);
            setTotalCount(res?.data?.data?.total)
            setData(res?.data?.data?.trans)
            // getTransitionReport()
        } catch (error) {

        }
        setLoading(false)
    };

    const allDataDmtData = async () => {
        const clone = { ...filterInitial, count: count, page: page, min_amt: +filterInitial.min_amt, max_amt: +filterInitial.max_amt, user_id: window.localStorage.getItem('userIdToken') }
        try {
            const res = await allDataDmt(clone)
            setAllData(res?.data?.data?.trans);
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


    const responseEnquiry = async (id) => {
        try {
            const res = await paymentEnquiry(id)
            if (res?.data?.statusCode == 200) {
                toastSuccessMessage(res?.data?.message);
                getTransitionReport()
            }
        } catch (error) {

        }
    }



    useEffect(() => {
        getTransitionReport(0)
        allDataDmtData()
    }, [])


    const [showOtp, setShowOtp] = useState(false);

    const handleCloseOtp = () => setShowOtp(false);
    const [otpStore, setotpStore] = useState(null)
    const handleShowOtp = async (item) => {
        try {
            const res = await sendOtpRef({ user_id: window.localStorage.getItem('userIdToken'), id: item._id })
        } catch (error) {

        }
        setShowOtp(true)
        setotpStore({ name: item.customer_name, id: item._id, amount: item.amount, number: item.customer_mobile, txn_id: item?.txn_id })
    };

    const [otpNew, setotpNew] = useState()
    const onchageOtp = (e) => {
        if (otpNew?.length == 6) {
            return
        }
        setotpNew(e.target.value)
    }

    const subMitOtpRef = async () => {
        try {
            const res = await subOtpRef({ user_id: window.localStorage.getItem('userIdToken'), id: otpStore.id, otp: otpNew })
        } catch (error) {

        }
    }

    const [selectedRow, setSelectedRow] = useState(null);

    const handleViewClick = (item) => {
        setSelectedRow(item);
    };
    console.log("data", data)


    return (
        <>
            {loading && <Loader />}
            <div className="PageHeading">
                <h1>DMT Transaction Report</h1>
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
                                    <label htmlFor="txtUserId">Txn Id / Customer Mobile / Account Number</label>
                                    <input type="text" placeholder="Txn Id / Customer Mobile / Account Number" name="search" id="account_no" className="form-control" value={filterInitial.search} onChange={handleChange} />
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
                            <div className="table-responsive">
                                <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed" role="grid" aria-describedby="myTable_info">
                                    <thead>
                                        <tr role="row">
                                            <th className="sorting">S.No</th>
                                            <th className="sorting" onClick={() => sortByColumn('createdAt')}>Transaction Date</th>
                                            <th className="sorting">Batch ID</th>
                                            <th className="sorting" onClick={() => sortByColumn('txn_id')}>Txn Id</th>
                                            <th className="sorting">UTR No /RRN NO.</th>
                                            <th className="sorting">Amount</th>
                                            <th className="sorting">Response</th>
                                            <th className="sorting">View</th>
                                            <th className="sorting">Transaction Dispute</th>
                                            <th className="sorting">Print</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data.map((item, i) => (
                                            <tr className="odd" key={item?._id}>
                                                <td valign="top" className="dataTables_empty">{i + 1}</td>
                                                <td valign="top" className="dataTables_empty">{item?.createdAt}</td>
                                                <td valign="top" className="dataTables_empty">{item?.batchId}</td>
                                                <td valign="top" className="dataTables_empty">{item?.txn_id || '---'}</td>
                                                <td valign="top" className="dataTables_empty">{item?.utr}</td>
                                                <td valign="top" className="dataTables_empty">{item?.amount}</td>
                                                <td valign="top" className="dataTables_empty">
                                                {item?.response == 1 &&
                                                    <>
                                                        {/* {item?.tx_status == 0 && <button className="btn btn-warning" onClick={() => responseEnquiry(item?._id)}>Pending</button>} */}
                                                        {item?.tx_status == 0 && <button className="btn btn-success" style={{ fontSize: "12px" }} > Success</button>}
                                                        {item?.tx_status == 1 && <button className="btn btn-danger" style={{ fontSize: "12px" }} > Failed</button>}
                                                        {item?.tx_status == 2 && <button onClick={() => responseEnquiry(item?._id)} className="btn btn-warning" style={{ fontSize: "12px" }}> Pending</button>}

                                                        {item?.tx_status == 3 && <button onClick={() => { handleShowOtp(item) }} className="btn btn-warning" style={{ fontSize: "12px" }} >Initiate Refund</button>}
                                                        {item?.tx_status == 4 && <button className="btn btn-success" style={{ fontSize: "12px" }} >Refunded</button>}

                                                        {item?.tx_status == 5 && <button onClick={() => responseEnquiry(item?._id)} className="btn btn-warning" style={{ fontSize: "12px" }}>Pending</button>}
                                                    </>
                                                }
                                                {item?.response == 2 ? <button className="btn btn-success" >Success</button> : ''}
                                                {item?.response == 3 ? <button className="btn btn-danger">Failed</button> : ''}
                                            </td>
                                                <td valign="top" className="dataTables_empty text-center">
                                                    <FaEye className="eyeiconreport" onClick={() => handleViewClick(item)} />
                                                </td>
                                                <td valign="top" className="dataTables_empty">
                                                    <Link className="btn btn-primary" to={`/add-ticket/${item?._id}`} state={{ item, serviceId: '65f9484a26eb74e182c640fc' }}>Dispute</Link>
                                                </td>
                                                <td valign="top" className="dataTables_empty">
                                                    <Link className="btn btn-primary" to={`/deatils/${item?.batchId}`}>Print</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        {/* </div> */}
                    </div>
                </div>
                <ToastContainer />
                <DisputeMessage handleClose={handleClose} show={show} idDispute={idDispute} toastSuccessMessage={toastSuccessMessage} taxnum={taxnum} />

                <div className="dataTables_info_page">
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
            {/* </div> */}
            {/* </div >
                </div > */}
            <ToastContainer />
            <DisputeMessage taxnumId={taxnumId} handleClose={handleClose} show={show} idDispute={idDispute} toastSuccessMessage={toastSuccessMessage} taxnum={taxnum} />
            {/* </div > */}


            <Modal show={showOtp} onHide={handleCloseOtp}>
                <Modal.Header closeButton>
                    <Modal.Title>Process Refund</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Transaction Amount : </Form.Label> <span>{otpStore?.amount}</span>
                            <br />
                            <Form.Label>Customer Mobile : </Form.Label> <span>{otpStore?.number}</span> <br />
                            <Form.Label>Transaction Id : </Form.Label> <span>{otpStore?.txn_id}</span>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Enter Otp</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Otp"
                                autoFocus
                                value={otpNew}
                                onChange={onchageOtp}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button> */}
                    <Button variant="primary" disabled={otpNew?.length !== 6} onClick={subMitOtpRef}>
                        Proceed
                    </Button>
                </Modal.Footer>
            </Modal>


            <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed d-none" id="table-to-xlsx" role="grid" aria-describedby="myTable_info" >
                <thead>
                    <tr role="row">
                        <th className="sorting" onClick={() => sortByColumn('Created')}>Created Date</th>
                        <th className="sorting">
                            Update Date
                        </th>
                        <th className="sorting">
                            Txn Id
                        </th>
                        <th className="sorting" >Customer Mobile</th>
                        <th className="sorting" >Account Number</th>
                        <th className="sorting" >Bank Name</th>
                        <th className="sorting" >Opening Balance</th>
                        <th className="sorting" >Closing Balance</th>
                        <th className="sorting" >Amount</th>
                        <th className="sorting" >Charge</th>
                        {/* <th className="sorting" >Is Refunded</th> */}
                        <th className="sorting" >Commission</th>
                        <th className="sorting" >Tds</th>
                        <th className="sorting" >key Status</th>
                        {/* <th className="sorting" >Trasaction Enquiry</th>s */}
                    </tr>
                </thead>
                <tbody>
                    {allData && allData?.map((item) => {

                        return <tr className="odd" key={item?._id}>
                            <td valign="top" className="dataTables_empty">{item?.createdAt}</td>
                            <td valign="top" className="dataTables_empty">{new Date(item?.updatedAt).getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()}</td>
                            <td valign="top" className="dataTables_empty">{item?.txn_id}</td>
                            <td valign="top" className="dataTables_empty">{item?.customer_mobile}</td>
                            <td valign="top" className="dataTables_empty">{item?.account_number}</td>
                            <td valign="top" className="dataTables_empty">{item?.bank_name}</td>
                            <td valign="top" className="dataTables_empty">{item?.o_bal}</td>
                            <td valign="top" className="dataTables_empty">{item?.c_bal}</td>
                            <td valign="top" className="dataTables_empty">{item?.amount}</td>
                            <td valign="top" className="dataTables_empty">{item?.charge}</td>
                            {/* <td valign="top" className="dataTables_empty">{item?.is_refunded == true ? 'Yes' : 'No'}</td> */}
                            <td valign="top" className="dataTables_empty">{item?.commission}</td>
                            <td valign="top" className="dataTables_empty">{item?.tds}</td>
                            <td valign="top" className="dataTables_empty">
                            {item?.response == 1 &&
                                                    <>
                                                        {/* {item?.tx_status == 0 && <button className="btn btn-warning" onClick={() => responseEnquiry(item?._id)}>Pending</button>} */}
                                                        {item?.tx_status == 0 && <span className="dataTables_empty" style={{ fontSize: "12px" }} > Success</span>}
                                                        {item?.tx_status == 1 && <span className="dataTables_empty" style={{ fontSize: "12px" }} > Failed</span>}
                                                        {item?.tx_status == 2 && <span  className="dataTables_empty" style={{ fontSize: "12px" }}> Pending</span>}

                                                        {item?.tx_status == 3 && <span  className="dataTables_empty" style={{ fontSize: "12px" }} >Initiate Refund</span>}
                                                        {item?.tx_status == 4 && <span className="dataTables_empty" style={{ fontSize: "12px" }} >Refunded</span>}

                                                        {item?.tx_status == 5 && <span  className="dataTables_empty" style={{ fontSize: "12px" }}>Pending</span>}
                                                    </>
                                                }
                                                {item?.response == 2 ? <span className="dataTables_empty" >Success</span> : ''}
                                                {item?.response == 3 ? <span className="dataTables_empty">Failed</span> : ''}
                                                </td>
                            {/* <td valign="top" className="dataTables_empty">
                                <button className="btn btn-primary" onClick={() => EnquiryTransition(item?._id)}>Enquiry</button>
                            </td> */}
                        </tr>
                    })}

                </tbody>
            </table>
            {selectedRow && (
                <Modal show={!!selectedRow} onHide={() => setSelectedRow(null)} centered className="transaction-modal">
                    <Modal.Header closeButton className="bg-primary text-white">
                        <Modal.Title>Transaction ID # {selectedRow.txn_id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="bg-white">
                        <Table borderless style={{ border: 'none' }}>
                            <tbody>
                                <tr >
                                    <td className="trportpopup">Beneficiary Name:</td>
                                    <td className="trportpopup">{selectedRow?.beneficiary_name}</td>
                                </tr>
                                <tr>
                                    <td className="trportpopup">Account No:</td>
                                    <td className="trportpopup">{selectedRow?.account_number}</td>
                                </tr>
                                <tr>
                                    <td className="trportpopup">Transaction Date:</td>
                                    <td className="trportpopup">{selectedRow?.createdAt.split(' ')[0]}</td>
                                </tr>
                                <tr>
                                    <td className="trportpopup">Bank Name:</td>
                                    <td className="trportpopup">{selectedRow?.bank_name}</td>
                                </tr>
                                <tr>
                                    <td className="trportpopup">IFSC Code:</td>
                                    <td className="trportpopup">{selectedRow?.ifsc_code}</td>
                                </tr>
                                <tr>
                                    <td className="trportpopup">Remitter Mobile No:</td>
                                    <td className="trportpopup">{selectedRow?.customer_mobile}</td>
                                </tr>

                                <tr>
                                    <td className="trportpopup">Amount:</td>
                                    <td className="trportpopup">₹{selectedRow?.amount}</td>
                                </tr>
                                <tr>
                                    <td className="trportpopup">Charges:</td>
                                    <td className="trportpopup">₹{selectedRow?.charge}</td>
                                </tr>
                                <tr>
                                    <td className="trportpopup">Commissions:</td>
                                    <td className="trportpopup">₹{selectedRow?.commission}</td>
                                </tr>
                                <tr>
                                    <td className="trportpopup">TDS:</td>
                                    <td className="trportpopup">₹{selectedRow?.tds}</td>
                                </tr>
                                <tr>
                                    <td className="trportpopup">UTR No/RRN No:</td>
                                    <td className="trportpopup">{selectedRow?.utr}</td>
                                </tr>
                                <tr>
                                    <td className="trportpopup">Opening Balance:</td>
                                    <td className="trportpopup">{selectedRow?.o_bal}</td>
                                </tr>
                                <tr>
                                    <td className="trportpopup">Closing Balance:</td>
                                    <td className="trportpopup">{selectedRow?.c_bal}</td>
                                </tr>
                                <tr>
                                    <td className="trportpopup">Status:</td>
                                    <td className="trportpopup">
                                        {selectedRow?.response === 1 && (
                                            <>
                                                {selectedRow?.tx_status === 0 && (
                                                    <span className="badge bg-success" style={{ fontSize: "12px" }}>Success</span>
                                                )}
                                                {selectedRow?.tx_status === 1 && (
                                                    <span className="badge bg-danger" style={{ fontSize: "12px" }}>Failed</span>
                                                )}
                                                {selectedRow?.tx_status === 2 && (
                                                    <span className="badge bg-warning" style={{ fontSize: "12px" }} onClick={() => responseEnquiry(selectedRow?._id)}>
                                                        Pending
                                                    </span>
                                                )}
                                                {selectedRow?.tx_status === 3 && (
                                                    <span className="badge bg-warning" style={{ fontSize: "12px" }} onClick={() => handleShowOtp(selectedRow)}>
                                                        Initiate Refund
                                                    </span>
                                                )}
                                                {selectedRow?.tx_status === 4 && (
                                                    <span className="badge bg-success" style={{ fontSize: "12px" }} >Refunded</span>
                                                )}
                                                {selectedRow?.tx_status === 5 && (
                                                    <span className="badge bg-warning" style={{ fontSize: "12px" }} onClick={() => responseEnquiry(selectedRow?._id)}>
                                                        Pending
                                                    </span>
                                                )}
                                            </>
                                        )}
                                        {selectedRow?.response === 2 && (
                                            <span className="badge bg-success" style={{ fontSize: "12px" }}>Success</span>
                                        )}
                                        {selectedRow?.response === 3 && (
                                            <span className="badge bg-danger" style={{ fontSize: "12px" }}>Failed</span>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setSelectedRow(null)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

        </>
    )
}
export default DtmReportSearch
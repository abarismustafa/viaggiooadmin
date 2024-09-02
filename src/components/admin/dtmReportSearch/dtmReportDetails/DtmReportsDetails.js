
import { useEffect, useRef, useState } from "react";
import { IoMdPrint } from "react-icons/io";
import { useReactToPrint } from "react-to-print";
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useParams } from "react-router-dom";
import { dmtDtails } from "../../../../api/login/Login";
import Loader from "../../../../common/loader/Loader";
import image from "../../../../asesets/logo/PayPanda_logo_Final-09-e1670775011263.png"
function DtmReportDetails() {
    const [loading, setLoading] = useState(false);

    const param = useParams()
    // console.log(param);
    const [data, setData] = useState(null)
    // console.log(data.invoice[0]);


    const ref = useRef()

    const handlePrint = useReactToPrint({
        content: () => ref.current,
        documentTitle: 'DMT Data',
        // onAfterPrint: () => alert('Print Success')
    })



    // const handleDownloadThermal =
    //     useReactToPrint({
    //         content: () => ref.current,
    //         documentTitle: 'DMT Data',
    //         onAfterPrint: () => alert('Print Success')
    //     })

    const handleDownloadThermal = () => {
        const element = document.getElementById('contentId');
        const opt = {
            margin: 1,
            format: [90, 297],
            filename: 'thermal_print_page.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: [110, 200], orientation: 'portrait' }
        };
        // Generate PDF
        html2pdf().set(opt).from(element).save();
    }



    const dataDetails = async () => {
        setLoading(true)
        try {
            const res = await dmtDtails(param.id)
            setData(res?.data?.data);
        } catch (error) {

        }
        setLoading(false)
    }
    useEffect(() => {
        dataDetails()
    }, [])

console.log("data",data)
    return (
        <>
            {loading && <Loader />}
            <div className="PageHeading">
                <h1>Details</h1>
            </div>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header card-Details">
                        <div className="Details"><span>Details</span></div>
                        <div className="button-print">
                            <div type="button" className="btn btn-warning mr-3" onClick={handlePrint}
                            > <IoMdPrint />Full Print</div>
                            {/* <div type="button" className="btn btn-warning mr-3" onClick={handleDownloadShort}> <IoMdPrint />Short Print</div> */}
                            <div type="button" className="btn btn-warning mr-3" onClick={handleDownloadThermal}> <IoMdPrint />Thermal Print</div>
                        </div>
                    </div>
                    <div ref={ref} id="contentId" className="contentId2">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="logo-print text-align-center">
                                        <img src={image} alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-6 aabc">
                                    <div className="left-side-section">
                                        <div>CSP Name : <span>{data?.invoice[0]?.shop_name}</span></div>
                                        <div>Mobile Number : <span>{data?.invoice[0]?.mobile_number}</span></div>
                                        <div>Sender Name : <span>{data?.invoice[0]?.customer_name}</span></div>
                                        <div>Sender No : <span>{data?.invoice[0]?.customer_mobile}</span></div>
                                    </div>
                                </div>
                                <div className="col-lg-6 aabc">
                                    <div className="right-side-section">
                                        <div>Beneficiary : <span>{data?.invoice[0]?.beneficiary_name}</span></div>
                                        <div>Bank Name : <span>{data?.invoice[0]?.bank_name}</span></div>

                                        <div>Account No : <span>{data?.invoice[0]?.account_number}</span></div>
                                        <div>Date : <span>{data?.invoice[0]?.createdAt}</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="card mt-4" style={{ overflow: 'auto' }}>
                                <div className="card-body">
                                    <div id="myTable_wrapper" className="dataTables_wrapper no-footer">
                                        <table className="table table-striped table-bordered table-hover display dataTable no-footer dtr-inline collapsed" role="grid" aria-describedby="myTable_info" >
                                            <thead>
                                                <tr role="row">
                                                    <th className="sorting" >TID</th>
                                                    {/* <th className="sorting">
                                                        MODE
                                                    </th> */}
                                                    <th className="sorting" >
                                                        Status
                                                    </th>
                                                    <th className="sorting" >UTR No</th>
                                                    <th className="sorting" >Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data && data?.invoice[0]?.allTrans?.map((item) => {
                                                    return <tr key={item?._id}>
                                                        <td valign="top" className="dataTables_empty">{item?.tid}</td>

                                                        <td valign="top" className="dataTables_empty">{item?.status}</td>
                                                        <td valign="top" className="dataTables_empty">{item?.utr}</td>
                                                        <td valign="top" className="dataTables_empty">{item?.amount}</td>
                                                    </tr>
                                                })}
                                                <tr>
                                                    <td valign="top" className="dataTables_empty" colSpan={3}>Total</td>
                                                    <td valign="top" className="dataTables_empty">{data?.invoice[0]?.totalAmount}</td>

                                                </tr>


                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="reserve">
                                            <p>© 2022 All Rights Reserved </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default DtmReportDetails
import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import paypandalogo from "../../../asesets/logo/image 2.png";
import bhartbillpay from "../../../asesets/logo/bbillpay.png";
import { bbstxnInvoice } from '../../../api/login/Login';
import { useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";

const InvoiceBill = () => {
    const [invoice, setInvoice] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const invoiceRef = useRef(null);

    useEffect(() => {
        const getInvoice = async () => {
            try {
                const response = await bbstxnInvoice(id);
                console.log("responsedata", response)
                if (response && response.data) {
                    setInvoice(response.data);
                } else {
                    throw new Error("Invalid response format");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        getInvoice();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const downloadPDF = () => {
        const input = invoiceRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('invoice.pdf');
        });
    };

    if (error) {
        return <div className="alert alert-danger">Sorry, something went wrong. Please try again later.</div>;
    }

    if (isLoading) {
        return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }
    const getServiceLabel = (serviceName) => {
        const serviceLabels = {
            "Credit Card": "Credit Card Number",
            "Aeps Bank Withdraw": "Aadhaar Number",
            "Aeps Cash Deposit": "Aadhaar Number",
            "B2B": "Reference Number",
            "Broadband Postpaid": "Customer ID",
            "CMS": "Customer ID",
            "Cable TV": "Subscriber ID",
            "Clubs and Associations": "Member ID",
            "DMT": "Beneficiary Account",
            "DTH": "Biller Number",
            "Donation": "Donor ID",
            "Education Fees": "Student ID",
            "Electricity": "Consumer Number",
            "Fastag": "Vehicle Number",
            "Gas": "Consumer Number",
            "Health Insurance": "Policy Number",
            "Water": "Consumer Number",
            "Subscription": "Subscription ID",
            "Rental": "Tenant ID",
            "Recurring Deposit": "Account Number",
            "Recharge": "Mobile Number",
            "Quick Dhan": "Transaction ID",
            "Payout": "Beneficiary ID",
            "NCMC Recharge": "Card Number",
            "Municipal Taxes": "Property ID",
            "Municipal Services": "Service ID",
            "Mobile Prepaid": "Mobile Number",
            "Mobile Postpaid": "Mobile Number",
            "Metro Recharge": "Card Number",
            "Loan Repayment": "Loan Account Number",
            "Life Insurance": "Policy Number",
            "Landline Postpaid": "Landline Number",
            "LPG Gas": "LPG ID",
            "Insurance": "Policy Number",
            "Housing Society": "Member ID",
            "Hospital and Pathology": "Patient ID",
        };

        return serviceLabels[serviceName] || "Reference Number";
    };

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-end mt-2 mb-2">
                <button onClick={downloadPDF} className="btn btn-primary">
                    <i className="fas fa-download me-2"></i>Download PDF
                </button>
            </div>
            <div className="card shadow" ref={invoiceRef}>
                <div className="card-body p-5">
                    <div className="row mb-4 align-items-center">
                        <div className="col-md-8">
                            <img src={paypandalogo} alt="Pay-Panda Logo" className="img-fluid" style={{ maxHeight: "50px" }} />
                        </div>
                        <div className="col-md-4 text-md-end">
                            <img src={bhartbillpay} alt="Bharat BillPay Logo" className="img-fluid" style={{ maxHeight: "40px", transform: 'scale(2)' }} />
                        </div>
                    </div>

                    <h4 className="border-bottom pb-2 mb-4">Payer Details</h4>
                    <div className="row">
                        <div className="col-md-8">
                            <p><strong>Name:</strong> {invoice?.user_id.name}</p>
                            <p><strong>Mobile No:</strong> {invoice?.user_id.mobile}</p>
                            <p><strong>Transaction ID:</strong> {invoice?.txn_id}</p>
                            <p><strong>BBPS Ref No:</strong> {invoice?.txnReferenceId}</p>
                            <p><strong>Status:</strong> <span className={`badge ${invoice?.status === 2 ? 'bg-success' : 'bg-danger'}`}>
                                {invoice?.status === 2 ? 'Success' : 'Failed'}
                            </span></p>
                        </div>
                        <div className="col-md-4 text-md-end">
                            <p className="mb-0"><strong>Date & Time</strong></p>
                            <p className="mb-0">{formatDate(invoice?.createdAt)}</p>
                            <p>{formatTime(invoice?.createdAt)}</p>
                        </div>
                    </div>

                    <div className="table-responsive mt-4">
                        <table className="table table-bordered table-striped">
                            <thead className="table-light">
                                <tr>
                                    <th>Service</th>
                                    <th>Service Provider</th>
                                    <th>{getServiceLabel(invoice?.category_id?.service_name)}</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{invoice?.category_id?.service_name}</td>
                                    <td>{invoice?.operator_name}</td>
                                    <td>{invoice?.ca_num}</td>
                                    <td>₹{invoice?.amount.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>



                    <h5 className="border-bottom pb-2 mb-3 mt-4">Retailer Details</h5>
                    <p><strong>Name:</strong> {invoice?.user_id.name}</p>
                    <p><strong>CSP Name:</strong> {invoice?.user_id.shop_name}</p>
                    <div className="alert alert-info mt-4">
                        <p className="mb-0"><strong>Note:</strong></p>
                        <p className="mb-0">Bill paid will be updated at biller in 24 hrs to 72hr</p>
                        <p className="mb-0">This is a Computer generated receipt and does not require any physical signature</p>
                        <p className="mb-0">
                            Have any further questions? Contact us at{' '}
                            <a href="mailto:support@paypanda.in">support@paypanda.in</a>.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default InvoiceBill;
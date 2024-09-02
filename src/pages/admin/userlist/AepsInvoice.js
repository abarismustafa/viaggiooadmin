import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './AepsInvoice.css';
import paypandalogo from "../../../asesets/logo/image 2.png";
import aepsLogo from "../../../asesets/adminImage/AEPS-Logo.png";
import { FaDownload, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';
import { aepsInvoice } from '../../../api/login/Login';
import { useParams } from 'react-router-dom';

const AepsInvoice = () => {
    const { id } = useParams();
    const [transaction, setTransaction] = useState(null);
    const invoiceRef = useRef(null);
const Adhaar_no="1234"
    useEffect(() => {
        const fetchTransactionData = async () => {
            try {
                const response = await aepsInvoice(id);
                setTransaction(response.data.data);
            } catch (error) {
                console.error("Error fetching transaction data:", error);
            }
        };

        fetchTransactionData();
    }, [id]);

    const downloadPDF = () => {
        const input = invoiceRef.current;
        html2canvas(input).then((canvas) => {
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
            pdf.save('aeps_invoice.pdf');
        });
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'success':
                return <FaCheckCircle className="status-icon success" />;
            case 'failed':
                return <FaTimesCircle className="status-icon failed" />;
            default:
                return <FaExclamationCircle className="status-icon pending" />;
        }
    };

    if (!transaction) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="aeps-invoice-container">
            <div className="aeps-invoice" ref={invoiceRef}>
                <div className="invoice-header">
                    <img src={paypandalogo} alt="Company Logo" className="company-logo" />
                    <img src={aepsLogo} alt="AEPS Logo" className="aeps-logo" />
                </div>
                <h1>AePS Transaction Receipt</h1>
                <div className="transaction-status">
                    {getStatusIcon(transaction?.status)}
                    <span className={`status ${transaction?.status.toLowerCase()}`}>
                        {transaction?.status}
                    </span>
                </div>
                <div className="invoice-details">
                    <div className="detail-column">
                        <div className="detail-item">
                            <span className="label">Transaction ID</span>
                            <span className="value">{transaction?.txn_id}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Date & Time</span>
                            <span className="value">{transaction?.createdAt}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Customer Mobile</span>
                            <span className="value">{transaction?.customer_mobile}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Shop Name</span>
                            <span className="value">{transaction?.shop_name}</span>
                        </div>
                    </div>
                    <div className="detail-column">
                        <div className="detail-item">
                            <span className="label">Bank Name</span>
                            <span className="value">{transaction?.bank_name}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Transaction Type</span>
                            <span className="value">{transaction?.type}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Amount</span>
                            <span className="value amount">₹{transaction?.amount.toFixed(2)}</span>
                        </div>
                        <div className="detail-item">
                            <span className="label">Total Amount</span>
                            <span className="value amount">₹{transaction?.totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                {transaction.utr && (
                    <div className="utr-section">
                        <span className="label">UTR</span>
                        <span className="value">{transaction?.utr}</span>
                    </div>
                )}
                {transaction.adhaar_no && (
                    <div className="utr-section">
                        <span className="label">UTR</span>
                        <span className="value">
                            xxxx{transaction?.adhaar_no?.slice(-4)}
                        </span>

                    </div>
                )}

                <div className="invoice-footer">
                    <p>Thank you for using our AePS service!</p>
                    <p>For any queries, please contact our customer support at  <a href="mailto:support@paypanda.in">support@paypanda.in</a>..</p>
                </div>
            </div>
            <button onClick={downloadPDF} className="download-btn">
                <FaDownload /> Download PDF
            </button>
        </div>
    );
};

export default AepsInvoice;
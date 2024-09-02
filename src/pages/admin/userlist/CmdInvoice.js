import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaDownload, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from 'react-icons/fa';
import { cmdInvoice } from '../../../api/login/Login';
import { useParams } from 'react-router-dom';
import paypandalogo from "../../../asesets/logo/image 2.png";
import "./CmdInvoice.css"

const CmsInvoice = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const invoiceRef = useRef(null);

    useEffect(() => {
        const fetchInvoiceData = async () => {
            try {
                const response = await cmdInvoice(id);
                setInvoice(response.data.data);
            } catch (error) {
                console.error("Error fetching invoice data:", error);
            }
        };

        fetchInvoiceData();
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
          pdf.save('cms_invoice.pdf');
        });
    };
    
    if (!invoice) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
            </div>
        );
    }

    const getStatusIcon = (status) => {
        switch(status.toLowerCase()) {
            case 'success':
                return <FaCheckCircle className="status-icon success" />;
            case 'failed':
                return <FaTimesCircle className="status-icon failed" />;
            default:
                return <FaExclamationCircle className="status-icon pending" />;
        }
    };

    return (
        <div className="cms-invoice-container">
            <div className="cms-invoice" ref={invoiceRef}>
                <div className="cms-invoice-header">
                    <img src={paypandalogo} alt="PayPanda Logo" className="cms-invoice-logo"/>
                    <h1>CMS Invoice</h1>
                </div>
                <div className="cms-invoice-details">
                    <div className="cms-invoice-row">
                        <span>Shop Name:</span>
                        <span>{invoice.shop_name}</span>
                    </div>
                    <div className="cms-invoice-row">
                        <span>Mobile Number:</span>
                        <span>{invoice.mobile_number}</span>
                    </div>
                    <div className="cms-invoice-row">
                        <span>Transaction ID:</span>
                        <span>{invoice.txn_id}</span>
                    </div>
                    <div className="cms-invoice-row">
                        <span>Date & Time:</span>
                        <span>{invoice.createdAt}</span>
                    </div>
                    <div className="cms-invoice-row">
                        <span>Amount:</span>
                        <span>₹{invoice.amount}</span>
                    </div>
                    <div className="cms-invoice-row">
                        <span>Status:</span>
                        <span className={`status ${invoice.status.toLowerCase()}`}>
                            {getStatusIcon(invoice.status)}
                            {invoice.status}
                        </span>
                    </div>
                </div>
            </div>
            <button className="cms-invoice-download" onClick={downloadPDF}>
                <FaDownload /> Download Invoice
            </button>
        </div>
    );
};

export default CmsInvoice;
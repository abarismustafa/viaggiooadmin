import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col, Typography, Divider, Tag, Statistic, Avatar, Button } from 'antd';
import { DownloadOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import 'bootstrap/dist/css/bootstrap.min.css';
import paypandalogo from "../../../asesets/logo/image 2.png";
import { payoutInvoice } from '../../../api/login/Login';

const { Title, Text } = Typography;

const PayoutInvoice = () => {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef(null);

  useEffect(() => {
    getPayoutInvoice(id);
  }, [id]);

  const getPayoutInvoice = async (invoiceId) => {
    try {
      const response = await payoutInvoice(invoiceId);
      setInvoiceData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching invoice:', error);
      setLoading(false);
    }
  };

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
      pdf.save('invoice.pdf');
    });
  };

  if (loading) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  return (
    <div className="container my-5">
      <Card className="shadow-lg" ref={invoiceRef}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Avatar src={paypandalogo} size={64} />
            <Title level={2} className="mt-3">AEPS Payout Invoice</Title>
          </Col>
          <Col xs={24} md={12} className="text-md-end">
            <Statistic title="Invoice Number" value={invoiceData.txn_id} />
            <Text type="secondary">Date: {invoiceData.createdAt}</Text>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Title level={4}>Customer Details</Title>
            <Text strong>Name: </Text><Text>{invoiceData.customer_name}</Text><br />
            <Text strong>Mobile: </Text><Text>{invoiceData.mobile_number}</Text><br />
            <Text strong>Shop Name: </Text><Text>{invoiceData.shop_name}</Text>
          </Col>
          <Col xs={24} md={12}>
            <Title level={4}>Transaction Details</Title>
            <Text strong>Bank: </Text><Text>{invoiceData.bank_name}</Text><br />
            <Text strong>Account: </Text><Text>{invoiceData.bank_account_number}</Text><br />
            <Text strong>Payment Mode: </Text><Text>{invoiceData.paymentMode}</Text>
          </Col>
        </Row>

        <Divider />

        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={8}>
            <Statistic 
              title="Amount" 
              value={invoiceData.amount} 
              prefix="₹"
              valueStyle={{ color: '#3f8600' }}
            />
          </Col>
          <Col xs={24} md={8} className="text-center">
            <Tag icon={invoiceData.status === 'Failed' ? <CloseCircleOutlined /> : <CheckCircleOutlined />} 
                 color={invoiceData.status === 'Failed' ? 'error' : 'success'}
                 style={{ fontSize: '16px', padding: '8px 16px' }}>
              {invoiceData.status}
            </Tag>
          </Col>
          <Col xs={24} md={8} className="text-md-end">
            <Text strong>UTR: </Text><Text>{invoiceData.utr || 'N/A'}</Text>
          </Col>
        </Row>

        <Divider />

        <Row justify="end">
          <Col>
            <Statistic title="Total Amount" value={invoiceData.totalAmount} prefix="₹" />
          </Col>
        </Row>

        <Divider />

        <Row justify="center">
          <Col>
            <Text type="secondary">
              For any queries, please contact us at: support@yourcompany.com | +91 1234567890
            </Text>
          </Col>
        </Row>
      </Card>

      <Row justify="center" className="mt-4">
        <Col>
          <Button type="primary" icon={<DownloadOutlined />} onClick={downloadPDF} size="large">
            Download Invoice PDF
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default PayoutInvoice;
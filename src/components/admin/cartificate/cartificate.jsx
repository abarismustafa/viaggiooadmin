import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "../cartificate/certificate.css";
import logo from "../../../asesets/logo/PayPanda_logo_Final-09-e1670775011263.png";
import { authCertificate } from "../../../api/login/Login"

export default function Certificate() {
  const [state, setState] = useState();
  const certificateRef = useRef(null);

  const fetchauthCertificate = async () => {
    const response = await authCertificate();
    setState(response.data);
  };

  useEffect(() => {
    fetchauthCertificate();
  }, []);
  /**
   * formatTime function use for downlaod pdf
   * @return String
   * @author Parimal | <from Paypanda>
   * @email parimal.srivastav@paypanda.in
   * @since 10/08/2024
   */
  const downloadPDF = () => {
    const input = certificateRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('certificate.pdf');
    });
  };

  return (
    <Container className="mt-4">
      <div className="certificate-container" ref={certificateRef}>
        <div className="certificate">
          <div className="certificate-header">
            <img src={logo} alt="PayPanda Logo" className="logo" />
            <h1>Certificate of Authorization</h1>
          </div>
          <div className="certificate-body">
            <p className="merchant-code">
              {state?.data?.merchant_type} Code: {state?.data?.refer_id}
            </p>
            <div className="certify">
              <p>This is to certify that</p>
              <h2>{state?.data?.name}</h2>
              <p>Is appointed as the customer service point of Pay Panda Payment Solution Private Limited.</p>
              <p className="address">{state?.data?.address}</p>
            </div>
            <Row className="validity">
              <Col xs={12} md={4}>
                <div className="validity-item">
                  <h3>{state?.data?.onBoardDate}</h3>
                  <p>Onboarding Date</p>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="validity-item">
                  <h3>{new Date().toLocaleDateString()}</h3>
                  <p>Print Date</p>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="validity-item">
                  <h3>{state?.data?.validDate}</h3>
                  <p>Valid Till</p>
                </div>
              </Col>
            </Row>
          </div>
          <div className="certificate-footer">
            <div className="signature">
              <img
                src={`https://api.paypandabnk.com/api/cloudinary/${state?.data?.sign}`}
                alt="Signature"
                className="img-fluid"
              />
              <p>Signature</p>
            </div>
            <div className="powered-by">
              <p>Powered by</p>
              <img src={logo} alt="PayPanda Logo" className="logo-small" />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <Button variant="primary" onClick={downloadPDF}>Download Certificate</Button>
      </div>
    </Container>
  );
}
import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './KYCConfirmation.css';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userValidate } from "../../api/login/Login";

const DeclearPage = () => {
  const navigate = useNavigate();

  const getVarifyall = async () => {
    try {
      const res = await userValidate();
      console.log(res.data?.is_approved);
      if (res.data?.is_approved == true) {
        navigate("/Dashboard");
      }
    } catch (error) { }
  };
  useEffect(() => {
    getVarifyall();
  }, []);
  return (
    <Container fluid className="kyc-confirmation-container d-flex align-items-center justify-content-center">
      <Row className="kyc-confirmation-card">
        <Col xs={12} className="text-center">
          <FaCheckCircle className="confirmation-icon mb-4" />
          <h1 className="mb-3">Congratulations!</h1>
          <h2 className="mb-4">Your KYC is Submitted</h2>
          <p className="lead mb-5">Waiting for Approval Soon</p>
          <Button variant="primary" size="lg" className="login-button">
            <Link to="/login-area" className=" link-underline-opacity-0 text-white"> Back to Login </Link>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DeclearPage;
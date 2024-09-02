import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './StepperForm.css';

const LoanNavbar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="loan-navbar">
      <Container>
        <Navbar.Brand as={Link} to="#" className="brand">Loan Services</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link}  className="nav-link">Home</Nav.Link>
            <NavDropdown title="Loan Types" id="loan-types-dropdown" className="custom-dropdown">
              <NavDropdown.Item as={Link} to="#">Personal Loan</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#">Home Loan</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#">Car Loan</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Services" id="services-dropdown" className="custom-dropdown">
              <NavDropdown.Item as={Link} to="#">Loan Calculator</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#">Eligibility Check</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#">Apply for Loan</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="#" className="nav-link">About Us</Nav.Link>
            <Nav.Link as={Link} to="#" className="nav-link">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default LoanNavbar;
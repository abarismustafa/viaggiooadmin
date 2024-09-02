import React from 'react';
import './LoanBox.css';

const LoanBox = ({ imgSrc, title, description,bgColor,hoverColor }) => {
    return (
        <div className="loan-box" style={{ '--bg-color': bgColor, '--hover-color': hoverColor }}>
           
           
            <img src={imgSrc} alt={title} className="loan-img" />
            <div className="loan-title">
            <p >{title}</p></div>
            <div className="loan-info">
                
                <p>{description}</p>
                <a  href="/loan-form" target="_blank" rel="noopener noreferrer" className="loan-click">
                    Click here →
                </a>
            </div>
            {/* <Row>
          <Col lg={3} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Income Source*</Form.Label>
              <Form.Select name="incomeSource" onChange={handleChange}>
                <option>Choose...</option>
                <option>Salaried</option>
                <option>Self-employed</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col lg={3} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Monthly Income*</Form.Label>
              <Form.Control type="number" name="monthlyIncome" onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col lg={3} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Pin Code*</Form.Label>
              <Form.Control type="text" name="pinCode" onChange={handleChange} />
            </Form.Group>
          </Col>
      
        </Row> */}

        {/* <Row>
          
          
          <Col lg={3} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Loan Amount*</Form.Label>
              <Form.Control type="number" name="loanAmount" onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col lg={3} md={6} sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Credit Score*</Form.Label>
              <Form.Control type="number" name="creditScore" onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row> */}
            
        </div>
    );
};

export default LoanBox;

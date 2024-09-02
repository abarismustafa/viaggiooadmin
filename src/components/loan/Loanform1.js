import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import './StepperForm.css';
import LoanNavbar from './Loannavbar';


const Loanform1 = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
       
        name: '', fatherName: '', motherName: '', mobile: '', email: '', dateOfBirth: '',
        gender: '', aadhaarCard: '', panCard: '', marriageStatus: '', monthlySalary: '',
        monthlyIncome: '', annualIncome: '', currentLoan: '',
      
        permanentAddress: '', permanentCity: '', permanentState: '', permanentPincode: '',
        currentAddress: '', currentCity: '', currentState: '', currentPincode: '',
        
        coApplicantName: '', 
        coApplicantMobile: '', 
        coApplicantAddress: '', 
        coApplicantGender: '', 
        coApplicantAge: '', 
        coApplicantRelation: '',
      
        loanType: '',
        previousLoan: '',
        lenderName: '',
        previousLoanAmount: '',
        monthlyEMI: '',
        loanRequiredAmount: '',
        loanCategory: '',
        loanType: '',
        previousLoan: '',
        lenderName: '',
        previousLoanAmount: '',
        monthlyEMI: '',
        emiTenure: '',
        loanRequiredAmount: '',
        loanCategory: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            ...(name === 'monthlySalary' && value === 'No' && { monthlyIncome: '' })
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step < 4) {
            setStep(step + 1);
        } else {
            console.log(formData);
           
        }
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const steps = [
        'Personal Information',
        'Address',
        'Co-Applicant',
        'Loan Information',
    ];

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <Row>
                            <Col lg={3} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-user"></i></InputGroup.Text>
                                        <Form.Control type="text" name="name" onChange={handleChange} value={formData.name} className='inpuformloan' />
                                    </InputGroup>

                                </Form.Group>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Father Name<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-male"></i></InputGroup.Text>
                                        <Form.Control type="text" name="fatherName" onChange={handleChange} value={formData.fatherName} className='inpuformloan' />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mother Name<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-female"></i></InputGroup.Text>
                                        <Form.Control type="text" name="motherName" onChange={handleChange} value={formData.motherName} className='inpuformloan' />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mobile<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-phone"></i></InputGroup.Text>
                                        <Form.Control type="tel" name="mobile" onChange={handleChange} value={formData.mobile} className='inpuformloan' />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={3} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-envelope"></i></InputGroup.Text>
                                        <Form.Control type="email" name="email" onChange={handleChange} value={formData.email} className='inpuformloan' />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Date of Birth<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-calendar-alt"></i></InputGroup.Text>
                                        <Form.Control type="date" name="dateOfBirth" onChange={handleChange} value={formData.dateOfBirth} className='inpuformloan' />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Select Gender<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-venus-mars"></i></InputGroup.Text>
                                        <Form.Select name="gender" onChange={handleChange} value={formData.gender} className='inpuformloan'>
                                            <option value="">Choose...</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </Form.Select>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Aadhaar Card No.<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-id-card"></i></InputGroup.Text>
                                        <Form.Control type="text" name="aadhaarCard" onChange={handleChange} value={formData.aadhaarCard} className='inpuformloan' />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={3} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>PAN Card<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-credit-card"></i></InputGroup.Text>
                                        <Form.Control type="text" name="panCard" onChange={handleChange} value={formData.panCard} className='inpuformloan' />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                                <Form.Group className="mb-3">

                                    <Form.Label>Marriage status<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-ring"></i></InputGroup.Text>
                                        <Form.Select name="marriageStatus" onChange={handleChange} value={formData.marriageStatus} className='inpuformloan'>
                                            <option value="">Choose...</option>
                                            <option value="Single">Single</option>
                                            <option value="Married">Married</option>
                                        </Form.Select>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Monthly Salary<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-money-bill-wave"></i></InputGroup.Text>
                                        <Form.Select name="monthlySalary" onChange={handleChange} value={formData.monthlySalary} className='inpuformloan'>
                                            <option value="">Choose...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </Form.Select>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            {formData.monthlySalary === 'Yes' && (
                                <Col lg={3} md={6} sm={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Monthly Income<span className='text-danger'>*</span></Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text><i className="fas fa-dollar-sign"></i></InputGroup.Text>
                                            <Form.Control type="number" name="monthlyIncome" onChange={handleChange} value={formData.monthlyIncome} className='inpuformloan' />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            )}
                            <Col lg={3} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Annual income<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-chart-line"></i></InputGroup.Text>
                                        <Form.Control type="number" name="annualIncome" onChange={handleChange} value={formData.annualIncome} className='inpuformloan' />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col lg={3} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Current Loan<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-hand-holding-usd"></i></InputGroup.Text>
                                        <Form.Select name="currentLoan" onChange={handleChange} value={formData.currentLoan} className='inpuformloan'>
                                            <option value="">Choose...</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </Form.Select>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                    </>
                );
            case 2:
                return (
                    <>
                        <Row>
                            {/* Permanent Address Section */}
                            <Col lg={6} md={12}>
                                <div className="address-section border border-primary rounded p-3 mb-4">
                                    <h5 className="mb-3">Permanent Address</h5>
                                    <Row>
                                        <Col lg={6} md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>House Number<span className='text-danger'>*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text><i className="fas fa-home"></i></InputGroup.Text>
                                                    <Form.Control type="text" name="permanentAddress.houseNumber" onChange={handleChange} value={formData.permanentAddress.houseNumber} className='inpuformloan' />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6} md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Street<span className='text-danger'>*</span></Form.Label>
                                                <InputGroup>
                                                <InputGroup.Text><i className="fas fa-road"></i></InputGroup.Text>
                                                <Form.Control type="text" name="permanentAddress.street" onChange={handleChange} value={formData.permanentAddress.street} className='inpuformloan' />
                                            </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6} md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>City<span className='text-danger'>*</span></Form.Label>
                                                <InputGroup>
                                                <InputGroup.Text><i className="fas fa-city"></i></InputGroup.Text>
                                                <Form.Control type="text" name="permanentAddress.city" onChange={handleChange} value={formData.permanentAddress.city} className='inpuformloan' />
                                            </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6} md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>State<span className='text-danger'>*</span></Form.Label>
                                                <InputGroup>
                                                <InputGroup.Text><i className="fas fa-map-marked-alt"></i></InputGroup.Text>
                                                <Form.Control type="text" name="permanentAddress.state" onChange={handleChange} value={formData.permanentAddress.state} className='inpuformloan' />
                                            </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6} md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Pincode<span className='text-danger'>*</span></Form.Label>
                                                <InputGroup>
                                                <InputGroup.Text><i className="fas fa-map-pin"></i></InputGroup.Text>
                                                <Form.Control type="number" name="permanentAddress.pincode" onChange={handleChange} value={formData.permanentAddress.pincode} className='inpuformloan' />
                                            </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6} md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Country<span className='text-danger'>*</span></Form.Label>
                                                <InputGroup>
                                                <InputGroup.Text><i className="fas fa-globe"></i></InputGroup.Text>
                                                <Form.Control type="text" name="permanentAddress.country" onChange={handleChange} value={formData.permanentAddress.country} className='inpuformloan' />
                                            </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>

                            {/* Current Address Section */}
                            <Col lg={6} md={12}>
                                <div className="address-section border border-primary rounded p-3 mb-4">
                                    <h5 className="mb-3">Current Address</h5>
                                    <Row>
                                        <Col lg={6} md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>House Number<span className='text-danger'>*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text><i className="fas fa-home"></i></InputGroup.Text>
                                                    <Form.Control type="text" name="currentAddress.houseNumber" onChange={handleChange} value={formData.currentAddress.houseNumber} />
                                                </InputGroup>
                                                
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6} md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Street<span className='text-danger'>*</span></Form.Label>
                                                
                                                <InputGroup>
                                                <InputGroup.Text><i className="fas fa-road"></i></InputGroup.Text>
                                                <Form.Control type="text" name="currentAddress.street" onChange={handleChange} value={formData.currentAddress.street} />
                                            </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6} md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>City<span className='text-danger'>*</span></Form.Label>
                                                
                                                <InputGroup>
                                                <InputGroup.Text><i className="fas fa-city"></i></InputGroup.Text>
                                                <Form.Control type="text" name="currentAddress.city" onChange={handleChange} value={formData.currentAddress.city} />
                                            </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6} md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>State<span className='text-danger'>*</span></Form.Label>
                                               
                                                <InputGroup>
                                                <InputGroup.Text><i className="fas fa-map-marked-alt"></i></InputGroup.Text>
                                                <Form.Control type="text" name="currentAddress.state" onChange={handleChange} value={formData.currentAddress.state} />
                                            </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6} md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Pincode<span className='text-danger'>*</span></Form.Label>
                                               
                                                <InputGroup>
                                                <InputGroup.Text><i className="fas fa-map-pin"></i></InputGroup.Text>
                                                <Form.Control type="number" name="currentAddress.pincode" onChange={handleChange} value={formData.currentAddress.pincode} />
                                            </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={6} md={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Country<span className='text-danger'>*</span></Form.Label>
                                               
                                                <InputGroup>
                                                <InputGroup.Text><i className="fas fa-globe"></i></InputGroup.Text>
                                                <Form.Control type="text" name="currentAddress.country" onChange={handleChange} value={formData.currentAddress.country} />
                                            </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </>
                );
                case 3:
                    return (
                        <Row>
                            <Col lg={4} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Co-Applicant Name<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-user"></i></InputGroup.Text>
                                        <Form.Control type="text" name="coApplicantName" onChange={handleChange} value={formData.coApplicantName} className='inpuformloan' />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col lg={4} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Co-Applicant Mobile<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-phone"></i></InputGroup.Text>
                                        <Form.Control type="tel" name="coApplicantMobile" onChange={handleChange} value={formData.coApplicantMobile} className='inpuformloan' />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col lg={4} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Co-Applicant Address<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-home"></i></InputGroup.Text>
                                        <Form.Control type="text" name="coApplicantAddress" onChange={handleChange} value={formData.coApplicantAddress} className='inpuformloan' />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col lg={4} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Co-Applicant Gender<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-venus-mars"></i></InputGroup.Text>
                                        <Form.Select name="coApplicantGender" onChange={handleChange} value={formData.coApplicantGender} className='inpuformloan'>
                                            <option value="">Choose...</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </Form.Select>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col lg={4} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Co-Applicant Age<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-birthday-cake"></i></InputGroup.Text>
                                        <Form.Control type="number" name="coApplicantAge" onChange={handleChange} value={formData.coApplicantAge} className='inpuformloan' />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col lg={4} md={6} sm={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Co-Applicant Relation<span className='text-danger'>*</span></Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text><i className="fas fa-users"></i></InputGroup.Text>
                                        <Form.Select name="coApplicantRelation" onChange={handleChange} value={formData.coApplicantRelation} className='inpuformloan'>
                                            <option value="">Choose...</option>
                                            <option value="Son">Son</option>
                                            <option value="Brother">Brother</option>
                                            <option value="Sister">Sister</option>
                                            <option value="Daughter">Daughter</option>
                                            <option value="Spouse">Spouse</option>
                                            <option value="Father">Father</option>
                                            <option value="Mother">Mother</option>
                                        </Form.Select>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                    );
                    case 4:
                        return (
                            <Row>
                                <Col lg={3} md={6} sm={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Loan Type<span className='text-danger'>*</span></Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text><i className="fas fa-file-invoice-dollar"></i></InputGroup.Text>
                                            <Form.Select name="loanType" onChange={handleChange} value={formData.loanType} className='inpuformloan'>
                                                <option value="">Choose...</option>
                                                <option value="Personal">Personal Loan</option>
                                                <option value="Home">Home Loan</option>
                                                <option value="Car">Car Loan</option>
                                            </Form.Select>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col lg={3} md={6} sm={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Previous Loan<span className='text-danger'>*</span></Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text><i className="fas fa-history"></i></InputGroup.Text>
                                            <Form.Select name="previousLoan" onChange={handleChange} value={formData.previousLoan} className='inpuformloan'>
                                                <option value="">Choose...</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </Form.Select>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                {formData.previousLoan === 'Yes' && (
                                    <>
                                        <Col lg={3} md={6} sm={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Lender Name<span className='text-danger'>*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text><i className="fas fa-university"></i></InputGroup.Text>
                                                    <Form.Control type="text" name="lenderName" onChange={handleChange} value={formData.lenderName} className='inpuformloan' />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={3} md={6} sm={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Previous Loan Amount<span className='text-danger'>*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text><i className="fas fa-rupee-sign"></i></InputGroup.Text>
                                                    <Form.Control type="number" name="previousLoanAmount" onChange={handleChange} value={formData.previousLoanAmount} className='inpuformloan' />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={3} md={6} sm={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Monthly EMI<span className='text-danger'>*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text><i className="fas fa-calendar-alt"></i></InputGroup.Text>
                                                    <Form.Control type="number" name="monthlyEMI" onChange={handleChange} value={formData.monthlyEMI} className='inpuformloan' />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                        <Col lg={3} md={6} sm={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>EMI Tenure (in months)<span className='text-danger'>*</span></Form.Label>
                                                <InputGroup>
                                                    <InputGroup.Text><i className="fas fa-clock"></i></InputGroup.Text>
                                                    <Form.Control type="number" name="emiTenure" onChange={handleChange} value={formData.emiTenure} className='inpuformloan' />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </>
                                )}
                                <Col lg={3} md={6} sm={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Loan Required Amount<span className='text-danger'>*</span></Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text><i className="fas fa-rupee-sign"></i></InputGroup.Text>
                                            <Form.Control type="number" name="loanRequiredAmount" onChange={handleChange} value={formData.loanRequiredAmount} className='inpuformloan' />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                                <Col lg={3} md={6} sm={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Loan Category<span className='text-danger'>*</span></Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text><i className="fas fa-tags"></i></InputGroup.Text>
                                            <Form.Select name="loanCategory" onChange={handleChange} value={formData.loanCategory} className='inpuformloan'>
                                                <option value="">Choose...</option>
                                                <option value="Secured">Secured</option>
                                                <option value="Unsecured">Unsecured</option>
                                            </Form.Select>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>
                            </Row>
                        );
            default:
                return null;
        }
    };

    return (
<>
<LoanNavbar/>
        <Container className="stepper-form">
         {/* <LoanNavbar/> */}
           <div className="stepper">
  {steps.map((stepName, index) => (
    <div key={index} className={`step ${index + 1 <= step ? 'active' : ''}`}>
      {index + 1 <= step ? (
        <span className="step-icon">✓</span>
      ) : (
        <span className="step-number">{index + 1}</span>
      )}
      <span className="step-text">{stepName}</span>
    </div>
  ))}
</div>

            <Form onSubmit={handleSubmit}>
                {renderStepContent()}

                <div className="text-center mt-4">
                    {step > 1 && (
                        <Button variant="secondary" onClick={handlePrevious} className="me-2">
                            Previous
                        </Button>
                    )}
                    <Button variant="success" type="submit">
                        {step < 4 ? 'Next' : 'Submit'}
                    </Button>
                </div>
            </Form>
        </Container>
        </>
    );
};

export default Loanform1;
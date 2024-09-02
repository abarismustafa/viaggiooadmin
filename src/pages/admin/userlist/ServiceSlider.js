import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaPencilRuler, FaDesktop, FaCode } from 'react-icons/fa';
import './UserTypeSelector.css';

const ServiceSlidernew = () => {
  const userTypesData = [
    { id: 1, title: 'UX Designer', icon: <FaDesktop /> },
    { id: 2, title: 'UI Designer', icon: <FaPencilRuler /> },
    { id: 3, title: 'Developer', icon: <FaCode /> },
  ];

  const [userTypes, setUserTypes] = useState(userTypesData);
  const [selectedUserType, setSelectedUserType] = useState(userTypesData[1].id);

  const handleCardClick = (id) => {
    setSelectedUserType(id);
  };

  return (
    <Container className="user-type-selector">
      <h2 className="text-center mb-4">SELECT SERVICE</h2>
      <div className="selector-underline"></div>
      <Row className="justify-content-center">
        {userTypes.map((type) => (
          <Col key={type.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <div
              className={`user-type-card ${selectedUserType === type.id ? 'selected' : ''}`}
              onClick={() => handleCardClick(type.id)}
            >
              <div className="icon-wrapper">{type.icon}</div>
              <h3>{type.title}</h3>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ServiceSlidernew;

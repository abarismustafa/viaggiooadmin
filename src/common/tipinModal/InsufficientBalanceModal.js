import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './InsufficientBalanceModal.css';

function InsufficientBalanceModal({ show, onHide, message }) {
  return (
    <Modal 
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="insufficient-balance-modal"
    >
      <Modal.Header closeButton className="insufficient-balance-modal-header">
        <Modal.Title id="contained-modal-title-vcenter">
          <span className="warning-icon">&#9888;</span>
          Insufficient Balance
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="insufficient-balance-modal-body" >
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer className="insufficient-balance-modal-footer">
        <Button onClick={onHide} className="insufficient-balance-modal-button">
          Got it
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InsufficientBalanceModal;
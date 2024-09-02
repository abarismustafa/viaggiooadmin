import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Invoice.css';

const Invoice = () => {
  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow invoice-card">
        <div className="card-body">
          <h2 className="text-center mb-4 invoice-title">TAX INVOICE</h2>
          
          <div className="row mb-3">
            <div className="col-md-6">
              <strong className="company-name">PAY PANDA PAYMENT SOLUTION PRIVATE LIMITED</strong>
              <p className="address">Registered Address:<br />
              C-23, First Floor, Sector-2,<br />
              Noida, Uttar Pradesh 201301</p>
            </div>
            <div className="col-md-6">
              <p><strong>Service Receiver</strong></p>
              <p className="address">Address:</p>
            </div>
          </div>
          
          <div className="row mb-3">
            <div className="col-md-6">
              <p>Date: <span className="info-value">7666666</span></p>
              <p>Invoice No.: <span className="info-value">__________</span></p>
              <p>Ref. No.: <span className="info-value">__________</span></p>
            </div>
            <div className="col-md-6">
              <p>Reverse Charges: <span className="info-value">No</span></p>
              <p>State Code: <span className="info-value">09</span></p>
            </div>
          </div>
          
          <table className="table table-bordered invoice-table">
            <thead>
              <tr>
                <th>Description of Goods/ Service</th>
                <th>Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Amount</td>
                <td></td>
              </tr>
              <tr>
                <td>CGST (9%)</td>
                <td></td>
              </tr>
              <tr>
                <td>SGST (9%)</td>
                <td></td>
              </tr>
              <tr>
                <td>IGST (18%)</td>
                <td></td>
              </tr>
              <tr className="total-row">
                <td><strong>Total Amount (Rounded off)</strong></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          
          <p><strong>Amount Chargeable (In Words)</strong></p>
          <p className="amount-in-words">______</p>
          
          <p className="text-center mt-4 digital-signature">Digitally Signed, hence physical Signature not required.</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;







import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomMarquee.css';

const CustomMarquee = ({ retailerName }) => {
  return (
    <div className="custom-marquee-container">
      <div className="marquee-content">
        <span className="congratulations">Congratulations!</span>
        <span className="message1111">
          Dear <strong>{retailerName}</strong>, now you have become our partner with PayPanda. 
          So let's grow together. Thank you!
        </span>
      </div>
    </div>
  );
};

export default CustomMarquee;
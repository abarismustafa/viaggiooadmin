import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserAlt } from "react-icons/fa";

function NewTabSignUp({ data, count, tabChange, register, handleResiter2 }) {
  const initialUserTypeId = '65f3fb87a6a2a92f979b47eb';
  const [selectedOption, setSelectedOption] = useState(initialUserTypeId);
  const [errorValue, setErrorValue] = useState({});

  useEffect(() => {
    if (data && data.length > 0) {
      const index = data.findIndex(item => item._id === initialUserTypeId);
      if (index !== -1) {
        tabChange(index, initialUserTypeId);
        handleResiter2(initialUserTypeId);
      }
    }
  }, [data]);

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    setSelectedOption(selectedId);
    const index = data.findIndex(item => item._id === selectedId);
    tabChange(index, selectedId);
    handleResiter2(selectedId);
    
    setErrorValue(prev => ({ ...prev, user_type: "" }));
  };

  return (
    <div className="col-lg-6 col-md-6 col-sm-12 mb-3 form-group uk-scrollspy-inview uk-animation-slide-bottom">
      <label htmlFor="userTypeSelect">User Type <span style={{ color: 'red' }}>*</span></label>
      <div className="input-group mb-1">
        <span className="input-group-text" id="basic-addon1"><FaUserAlt /></span>
        <select
          id="userTypeSelect"
          name="user_type_id"
          value={selectedOption}
          onChange={handleSelectChange}
          className="form-select form-control"
        >
          <option value="" disabled>Select User Type</option>
          {data && data.map((item) => (
            <option key={item._id} value={item._id}>
              {item.user_type}
            </option>
          ))}
        </select>
      </div>
      <span className="text-danger">{errorValue.user_type}</span>
    </div>
  );
}

export default NewTabSignUp;
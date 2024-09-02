  import { useEffect, useState } from "react";

  function TabSignUp({ data, count, tabChange, resiter, handleResiter2 }) {
    return (
      <>
        <div className="email-mobile-tab mb-2">
        
          {data && data.map((item, i) => (
            <div key={item?._id} className="mobileitab me-3" onClick={() => tabChange(i, item?._id)}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  id={item?._id}
                  checked={i === count}
                  name="user_type_id"
                  value={resiter.user_type_id}
                  onChange={() => handleResiter2(item?._id)}
                />
                <label className="form-check-label" htmlFor={item?._id}>
                  {item?.user_type}
                </label>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  export default TabSignUp;

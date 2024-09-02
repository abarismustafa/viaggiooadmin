
import grhak from "../../../asesets/id-card/grahak.jpg";
import user from "../../../asesets/id-card/user.jpg";
import frame from "../../../asesets/id-card/frame.png";

import "../idCard/IdCard.css";

function IdCard() {
  return (
    <section className="sheet">
      <div className="outer_wrapper">
        <div className="top_img">
          <img src={grhak} />
        </div>

        <div className="frame">
          <div className="frame_img">
            <img src={frame} />
          </div>
          <div className="user_image">
            <img src={user} />
          </div>
        </div>
        <div className="user_details">
          <h1>ARYAN KUMAR</h1>
          <h2>DIGITAL SEVA KENDRA</h2>
          <p>BC Code: R001116099</p>
          <p>
            S/O MAHENDRA,OKHLA VIHAR,A-35,NEAR IQBAL FAIZI HOSPITAL,SOUTH
            DELHI,JAMIA NAGAR,DELHI,INDIA,110025, SOUTH DELHI, SOUTH DELHI,
            DELHI, DELHI, 226001
          </p>
        </div>
        <div className="footer">
          <img src="https://partner.rnfi.in/asset/common/cards/images/footer.jpg" />
        </div>
      </div>
    </section>
  );
}

export default IdCard;

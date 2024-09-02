import { useEffect, useState } from "react";
import {
  cloudImage,
  uploadDocument,
  userValidate,
} from "../../api/login/Login";
import { ToastContainer, toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { ModalImgShow } from "./ModalImgShow";
import Modal from "react-bootstrap/Modal";
import { toastErrorMessage, toastSuccessMessage } from "./ToastShare";

export const UploadDoc = ({ setState, docs, setModalShow,backBtnFun,setBackBtn }) => {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  console.log(position);

  const [isGstAvailable, setIsGstAvailable] = useState(false);
  const [fileList, setFileList] = useState([]);
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const [initialValue, setInitialValue] = useState({
    adhaar_front_card: "",
    adhaar_back_card: "",
    pan_card: "",
    gst: "",
    bank_proof: "",
    shop_internal_photo: "",
    shop_outside_photo: "",
    user_id: "",
    latitude: "",
    longitude: "",
  });
  const [imageValidity, setImageValidity] = useState({
    adhaar_front_card: true,
    adhaar_back_card: true,
    pan_card: true,
    gst: true,
    bank_proof: true,
    shop_internal_photo: true,
    shop_outside_photo: true,
  });
  const [btnDisable, setBtnDisable] = useState(true);

  useEffect(() => {
    if (docs?.adhaar_back_card) {
      setInitialValue({ ...docs });
    }
  }, [docs]);

  const gstIdVerified = async () => {
    try {
      const res = await userValidate();
      if (res.data.isGstAvailable) {
        setIsGstAvailable(true);
      }
    } catch (error) {
      console.error("GST Validation Error:", error);
    }
  };

  useEffect(() => {
    gstIdVerified();
    if (!btnDisable) {
      setBackBtn(false)
    } else {
      
    }
  }, [btnDisable]); // Added empty dependency array to avoid repeated calls

  

  const onChangeHandleImage = async (e) => {
    const image = new FormData();
    if (!e.target.files || e.target.files.length === 0) {
      
      return;
    }
    image.append("image", e.target.files[0]);
    const allowedTypes = [
      "video/mp4",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/pdf",
      "application/x-rar-compressed",
      "application/x-zip-compressed",
      "application/zip",
    ];
    if (e.target.files[0] && allowedTypes.includes(e.target.files[0].type)) {
      toastErrorMessage("Invalid file type. Please select a valid file.");
      return;
    }
    // Validate image size
    const maxSize = 500 * 1024; // 500 KB in bytes
    const minSize = 225 * 1024; // 225 KB in bytes
    if (image.size > maxSize) {
      toastErrorMessage(
        "Maximum file size exceeded (500 KB). Please select a smaller file."
      );
      return;
    }
    if (image.size < minSize) {
      toastErrorMessage(
        "Minimum file size not met (225 KB). Please select a larger file."
      );
      return;
    }
    try {
      const res = await cloudImage(image);
      const clone = { ...initialValue, [e.target.name]: res.data?.data.url };
      if (
        clone.adhaar_front_card?.length &&
        clone.adhaar_back_card?.length &&
        clone.pan_card?.length &&
        clone.bank_proof?.length
      ) {
        setBtnDisable(false);
      }
      setTimeout(() => {
        setInitialValue(clone);
      }, 1000);
      image.delete("image");
    } catch (error) {
      console.error("Image Upload Error:", error);
      const clone = { ...initialValue, [e.target.name]: "" };
      setInitialValue(clone);
      console.log("clone1", clone);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        function (error) {
          console.error("Geolocation Error:", error);
        }
      );
    } else {
      alert("Geolocation is not available in your browser.");
    }
  }, []);
  const submitData = async () => {
    if (!position.latitude || !position.longitude) {
      // Ask for location permission
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            // Successfully got location
            setPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            // Now proceed with document upload
            uploadDocuments(position.coords.latitude, position.coords.longitude);
          },
          function(error) {
            // Handle error or user denying permission
            console.error("Geolocation Error:", error);
            toastErrorMessage("Unable to get location. Please enable location services and try again.");
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      } else {
        toastErrorMessage("Geolocation is not supported by your browser.");
      }
    } else {
     
      uploadDocuments(position.latitude, position.longitude);
    }
  };
  
  

  const uploadDocuments = async () => {
    // if (!position.latitude || !position.longitude) {
    //   toastErrorMessage(
    //     "Location data is not available. Please enable location services and try again."
    //   );
    //   return;
    // }
    try {
      const res = await uploadDocument({
        ...initialValue,
        latitude: position.latitude,
        longitude: position.longitude,
        user_id: window.localStorage.getItem("userIdToken"),
      });
      if (res?.data?.statusCode === "200") {
        toastSuccessMessage("Document Upload Successful");
        setTimeout(() => {
          setState(5);
          window.localStorage.setItem("steps", 5);
          setModalShow(true);
        }, 1000);
      }
    } catch (error) {
      console.error("Document Upload Error:", error);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cantain, setCantain] = useState({});

  const clickImgShow = (url, str) => {
    handleShow();
    setCantain({ url, str });
  };

  const backButton = () => {
    setState(3);
    window.localStorage.setItem("steps", 3);
  };

  return (
    <div className="container">
      <h6 style={{ margin: "15px 0", textAlign: "center" }}>
        {" "}
        Upload Required Documents
      </h6>
      <p style={{ margin: "15px 0", textAlign: "center" }}>
         Upload all required documents. Ensure the copies are clear and
        legible.
      </p>

      <form className="row">
        <div className="form-group col-6">
          <label htmlFor="aadhaarFront">Upload Aadhaar Front:</label>
          <input
            type="file"
            className="form-control"
            id="aadhaarFront"
            name="adhaar_front_card"
            onChange={onChangeHandleImage}
          />
          <p>file Supported :- jpg,jpeg ,webp, png </p>
          {initialValue.adhaar_front_card && (
            <div
              className="perentEye d-flex justify-content-between align-items-center"
              onClick={() => {
                clickImgShow(initialValue.adhaar_front_card, "Aadhaar Front");
              }}
            >
              <img
                src={`https://api.paypandabnk.com/api/cloudinary/${initialValue.adhaar_front_card}`}
                alt="Aadhaar Front"
                className="img-fluid mt-2"
              />
              <div className="eyeV">
                <FaEye />
              </div>
            </div>
          )}
        </div>
        <div className="form-group col-6">
          <label htmlFor="aadhaarBack">Upload Aadhaar Back:</label>
          <input
            type="file"
            className="form-control"
            id="aadhaarBack"
            name="adhaar_back_card"
            onChange={onChangeHandleImage}
          />
          <p>file Supported :- jpg,jpeg ,webp, png </p>
          {initialValue.adhaar_back_card && (
            <div
              className="perentEye"
              onClick={() => {
                clickImgShow(initialValue.adhaar_back_card, "Aadhaar Back");
              }}
            >
              <img
                src={`https://api.paypandabnk.com/api/cloudinary/${initialValue.adhaar_back_card}`}
                alt="Aadhaar Back"
                className="img-fluid mt-2"
              />
              <div className="eyeV">
                <FaEye />
              </div>
            </div>
          )}
        </div>
        <div className="form-group col-6">
          <label htmlFor="pancardFront">Upload PAN card Front:</label>
          <input
            type="file"
            className="form-control"
            id="pancardFront"
            name="pan_card"
            onChange={onChangeHandleImage}
          />
          <p>file Supported :- jpg,jpeg ,webp, png </p>
          {initialValue.pan_card && (
            <div
              className="perentEye"
              onClick={() => {
                clickImgShow(initialValue.pan_card, "Pancard Front");
              }}
            >
              <img
                src={`https://api.paypandabnk.com/api/cloudinary/${initialValue.pan_card}`}
                alt="Pancard Front"
                className="img-fluid mt-2"
              />
              <div className="eyeV">
                <FaEye />
              </div>
            </div>
          )}
        </div>
        <div className="form-group col-6">
          <label htmlFor="bankProof">Upload Bank Proof:</label>
          <input
            type="file"
            className="form-control"
            id="bankProof"
            name="bank_proof"
            onChange={onChangeHandleImage}
          />
          <p>file Supported :- jpg,jpeg ,webp, png </p>
          {initialValue.bank_proof && (
            <div
              className="perentEye"
              onClick={() => {
                clickImgShow(initialValue.bank_proof, "Bank Proof");
              }}
            >
              <img
                src={`https://api.paypandabnk.com/api/cloudinary/${initialValue.bank_proof}`}
                alt="Bank Proof"
                className="img-fluid mt-2"
              />
              <div className="eyeV">
                <FaEye />
              </div>
            </div>
          )}
        </div>
        <div className="form-group col-6">
          <label htmlFor="bankProof">
             Upload a photo of the shop's interior:
          </label>
          <input
            type="file"
            className="form-control"
            id="bankProof"
            name="shop_internal_photo"
            onChange={onChangeHandleImage}
          />
          <p>file Supported :- jpg,jpeg ,webp, png </p>
          {initialValue.shop_internal_photo && (
            <div
              className="perentEye"
              onClick={() => {
                clickImgShow(
                  initialValue.shop_internal_photo,
                  "Shop Internal Photo"
                );
              }}
            >
              <img
                src={`https://api.paypandabnk.com/api/cloudinary/${initialValue.shop_internal_photo}`}
                alt="Shop Internal Photo"
                className="img-fluid mt-2"
              />
              <div className="eyeV">
                <FaEye />
              </div>
            </div>
          )}
        </div>
        <div className="form-group col-6">
          <label htmlFor="bankProof">Upload Photo of Shop Exterior:</label>
          <input
            type="file"
            className="form-control"
            id="bankProof"
            name="shop_outside_photo"
            onChange={onChangeHandleImage}
          />
          <p>file Supported :- jpg,jpeg ,webp, png </p>
          {initialValue.shop_outside_photo && (
            <div
              className="perentEye"
              onClick={() => {
                clickImgShow(
                  initialValue.shop_outside_photo,
                  "Shop Outside Photo"
                );
              }}
            >
              <img
                src={`https://api.paypandabnk.com/api/cloudinary/${initialValue.shop_outside_photo}`}
                alt="Shop Outside Photo"
                className="img-fluid mt-2"
              />
              <div className="eyeV">
                <FaEye />
              </div>
            </div>
          )}
        </div>
        {isGstAvailable && (
          <div className="form-group col-6">
            <label htmlFor="bankProof">
               Upload Your GST Certificate:
            </label>
            <input
              type="file"
              className="form-control"
              id="bankProof"
              name="gst"
              onChange={onChangeHandleImage}
            />
            {initialValue.gst && (
              <div
                className="perentEye"
                onClick={() => {
                  clickImgShow(initialValue.gst, "GST Certificate");
                }}
              >
                <img
                  src={`https://api.paypandabnk.com/api/cloudinary/${initialValue.gst}`}
                  alt="GST Certificate"
                  className="img-fluid mt-2"
                />
                <div className="eyeV">
                  <FaEye />
                </div>
              </div>
            )}
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            type="button"
            onClick={backButton}
            style={{ backgroundColor: "#2E3191" }}
            className="btn btn-secondary text-white"
          >
            Back
          </button>
          <button
            type="button"
            onClick={submitData}
            // style={{ backgroundColor: "#2E3191" }}
            disabled={btnDisable}
            className={`${
              btnDisable ? "btn btn-success not-allowed" : "btn btn-success"
            } text-white`}
          >
            Submit
          </button>
          {btnDisable && (
            <button
              type="button"
              onClick={() => {
                setState(5);
                window.localStorage.setItem("steps", 5);
              }}
              disabled={backBtnFun}
              className={`${
                backBtnFun ? "btn btn-info not-allowed" : "btn btn-primary"
              } text-white`}
            >
              Next
            </button>
          )}
        </div>
      </form>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <ModalImgShow handleClose={handleClose} cantain={cantain} />
      </Modal>

      <ToastContainer />
    </div>
  );
};


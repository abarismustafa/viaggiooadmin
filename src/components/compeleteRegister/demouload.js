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
import {  Button, Form, Card, Row, Col } from "react-bootstrap";
import {  FaCloudUploadAlt } from "react-icons/fa";
import './UploadDoc.css';

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
  const renderUploadField = (label, name, value) => (
    <Form.Group as={Col} lg={3} md={6} sm={12} className="mb-4">

      <Form.Label>{label}</Form.Label>
      <div className="custom-file-upload">
        <input
          type="file"
          className="form-control"
          id={name}
          name={name}
          onChange={onChangeHandleImage}
        />
        <label htmlFor={name} className="btn btn-outline-primary w-100">
          <FaCloudUploadAlt className="me-2" />
          Choose File
        </label>
      </div>
      <small className="text-muted">Supported formats: jpg, jpeg, webp, png</small>
      {value && (
        <Card className="mt-2">
          <Card.Img
            variant="top"
            src={`https://api.paypandabnk.com/api/cloudinary/${value}`}
            alt={label}
            className="img-thumbnail"
          />
          <Card.Body>
            <Button
              variant="link"
              className="p-0"
              onClick={() => clickImgShow(value, label)}
            >
              <FaEye className="me-1" /> View
            </Button>
          </Card.Body>
        </Card>
      )}
    </Form.Group>
  );


  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Upload Required Documents</h2>
      <p className="text-center mb-5">
        Please upload all required documents. Ensure the copies are clear and legible.
      </p>

      <Form>
        <Row>
          {renderUploadField("Aadhaar Front", "adhaar_front_card", initialValue.adhaar_front_card)}
          {renderUploadField("Aadhaar Back", "adhaar_back_card", initialValue.adhaar_back_card)}
          {renderUploadField("PAN Card Front", "pan_card", initialValue.pan_card)}
          {renderUploadField("Bank Proof", "bank_proof", initialValue.bank_proof)}
          {renderUploadField("Shop Interior Photo", "shop_internal_photo", initialValue.shop_internal_photo)}
          {renderUploadField("Shop Exterior Photo", "shop_outside_photo", initialValue.shop_outside_photo)}
          {isGstAvailable && renderUploadField("GST Certificate", "gst", initialValue.gst)}
        </Row>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="secondary" onClick={backButton}>
            Back
          </Button>
          <Button
            variant="success"
            onClick={submitData}
            disabled={btnDisable}
          >
            Submit
          </Button>
          {btnDisable && (
            <Button
              variant="primary"
              onClick={() => {
                setState(5);
                window.localStorage.setItem("steps", 5);
              }}
              disabled={backBtnFun}
            >
              Next
            </Button>
          )}
        </div>
      </Form>

      <Modal show={show} onHide={handleClose} centered>
        <ModalImgShow handleClose={handleClose} cantain={cantain} />
      </Modal>

      <ToastContainer />
    </div>
  );
};
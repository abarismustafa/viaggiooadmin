import React, { useState } from 'react';
import { FcVideoCall } from "react-icons/fc";
import { declarationSub, videoKycUpload } from "../../api/login/Login";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TermCondition } from "./TermCondition";
import { PrivecyPolicy } from "./PrivecyPolicy";
import ModalVideoKycSet from "./modalVideoKycSet/ModalVideoKycSet";
import { toastErrorMessage, toastSuccessMessage } from "./ToastShare";
import { Card } from 'react-bootstrap';
import VideoRecorder from './VideoRecorder';
import { FaVideo, FaUpload } from 'react-icons/fa';
import "./VedioKyc.css";

export const VedioKyc = ({ setState, datas, modalShow, setModalShow, setBackBtn }) => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const navigate = useNavigate();
  const [disa, setDisa] = useState(true);
  const [initialValue, setInitialValue] = useState({
    video: "",
    userId: "",
  });

  // New state for video recording
  const [showRecorder, setShowRecorder] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const videoUploadHandle = async (e) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/pdf",
      "application/x-rar-compressed",
      "application/x-zip-compressed",
      "application/zip",
    ];
    if (e.target.files[0]?.type == "image/jpeg" || e.target.files[0]?.type == "image/png") {
      toastErrorMessage("Invalid file type. Please select a Video.");
      return;
    }
    if (e.target.files[0] && allowedTypes.includes(e.target.files[0].type)) {
      toastErrorMessage("Invalid file type. Please select a Video.");
      return;
    }
    const video = new FormData();
    video.append("video", e.target.files[0]);
    video.append("user_id", window.localStorage.getItem("userIdToken"));
    setInitialValue(video);
    setRecordedVideo(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmitKyc = async () => {
    setIsLoading(true);
    try {
      const res = await videoKycUpload(initialValue);
      if (res?.data?.statusCode == "200") {
        toastSuccessMessage(res?.data?.message);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const Declaration = async () => {
    setIsLoading2(true);
    try {
      const res = await declarationSub({
        user_id: window.localStorage.getItem("userIdToken"),
      });
      if (res?.data?.statusCode == "200") {
        toastSuccessMessage("Self Declaration Saved");
        setTimeout(() => {
          setState(0);
          window.localStorage.setItem("steps", 0);
          navigate("/is_self_declare");
        }, 1000);
      }
      if (res?.data?.statusCode == "401") {
        toastErrorMessage(res.data.message);
      }
    } catch (error) {
    } finally {
      setIsLoading2(false);
    }
  };

  const backButton = () => {
    setState(4);
    window.localStorage.setItem("steps", 4);
    setBackBtn(false)
  };

  // New functions for video recording
  const handleSaveVideo = (videoUrl) => {
    setRecordedVideo(videoUrl);
    setShowRecorder(false);
    const video = new FormData();
    video.append("video", videoUrl);
    video.append("user_id", window.localStorage.getItem("userIdToken"));
    setInitialValue(video);
  };

  const uploadVideo = async (videoBlob) => {
    setIsUploading(true);
    const video = new FormData();
    video.append("video", videoBlob, "recorded_video.webm");
    video.append("user_id", window.localStorage.getItem("userIdToken"));

    try {
      const res = await videoKycUpload(video);
      if (res?.data?.statusCode == "200") {
        toastSuccessMessage(res?.data?.message);
      }
    } catch (error) {
      toastErrorMessage("Error uploading video");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpload = async () => {
    if (recordedVideo) {
      const videoBlob = await fetch(recordedVideo).then(r => r.blob());
      await uploadVideo(videoBlob);
    } else {
      toastErrorMessage("Please record or select a video first");
    }
  };

  const buttonStyle = {
    border: '2px solid #28a745',
    borderRadius: '8px',
    padding: '10px 20px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    backgroundColor: 'white',
    color: '#28a745',
    margin: '0 10px 10px 0',
    width: '100%',
    maxWidth: '200px',
  };

  const iconStyle = {
    marginRight: '10px',
  };
  return (
    <div className="container">
      <h6 style={{ margin: "15px 0", textAlign: "center" }}>
        Video Kyc upload{" "}
      </h6>
      <form className="row">
        <div className="col-12">
          <Card className="mb-4">
            <Card.Body>
            <div className="d-flex flex-wrap justify-content-center">
            <Button 
        style={buttonStyle}
        onClick={() => setShowRecorder(true)}
        className="video-button "
      >
        <FaVideo style={iconStyle} />
        Record Video
      </Button>
      
      <label style={buttonStyle} className="video-button">
        <FaUpload style={iconStyle} />
        Upload Video
        <input
          type="file"
          name="video"
          onChange={videoUploadHandle}
          disabled={isUploading}
          style={{ display: 'none' }}
          accept="video/*"
        />
      </label>
      </div>
              {recordedVideo && (
                <div className="mt-3 text-center">
                  <video src={recordedVideo} controls style={{width: '100%', maxWidth: '500px'}} />
                  <Button 
                    variant="success" 
                    onClick={handleUpload} 
                    disabled={isUploading}
                    className="mt-3"
                  >
                    {isUploading ? 'Uploading...' : 'Upload Video'}
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>

        <div>
          <h6>Self Declaration</h6>
          <div className="form-check">
            <input
              onClick={() => {
                setDisa(!disa);
              }}
              className="form-check-input"
              type="checkbox"
              checked={!disa}
              value=""
              id="flexCheckDefault"
            />
            <div className="form-check-label" for="flexCheckDefault">
              I Agree to the latest{" "}
              <span className="spanNext" onClick={() => setShow(true)}>
                Terms & Conditions
              </span>{" "}
              &{" "}
              <span onClick={() => setShow2(true)} className="spanNext">
                Privacy Policy
              </span>
              .
            </div>
            <div className="laste">
              I certify that all the information provided by me is correct and
              accurate
            </div>
            <div className="btn-center-set">
              <button
                type="button"
                onClick={backButton}
                className="btn btn-primary text-white"
              >
                Back
              </button>
              <button
                type="button"
                disabled={disa || isLoading2}
                onClick={Declaration}
                className="btn btn-success text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer className={"text-center"} />
      <Modal
        show={show}
        onHide={() => setShow(false)}
        className="cusmoal"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <TermCondition />
      </Modal>
      <Modal
        show={show2}
        onHide={() => setShow2(false)}
        className="cusmoal"
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <PrivecyPolicy />
      </Modal>

      <ModalVideoKycSet show={modalShow} onHide={() => setModalShow(false)} />
      
      <VideoRecorder 
        show={showRecorder} 
        handleClose={() => setShowRecorder(false)} 
        onSave={handleSaveVideo}
      />
    </div>
  );
};
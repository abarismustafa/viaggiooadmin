import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const detectWebcam = () => {
  return new Promise((resolve) => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      resolve(false);
    } else {
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          resolve(devices.some(device => device.kind === 'videoinput'));
        })
        .catch(() => {
          resolve(false);
        });
    }
  });
};

const VideoRecorder = ({ show, handleClose, onSave }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [timer, setTimer] = useState(0);
  const [cameraError, setCameraError] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [hasWebcam, setHasWebcam] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);

  useEffect(() => {
    if (show) {
      detectWebcam().then(result => {
        setHasWebcam("result",result);
        if (!result) {
          setCameraError("No webcam detected. Please connect a webcam and try again.");
        }
      });
    }
  }, [show]);

  useEffect(() => {
    let interval;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const startRecording = useCallback(() => {
    if (!hasWebcam) {
      setCameraError("No webcam detected. Please connect a webcam and try again.");
      return;
    }

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current.onstop = handleStop;
        mediaRecorderRef.current.start(1000);
        setIsRecording(true);
        setIsPaused(false);
        setTimer(0);
        chunksRef.current = [];
        setCameraError(null);
      })
      .catch(error => {
        console.error("Error accessing media devices:", error);
        if (error.name === 'NotAllowedError') {
          setCameraError("Please give permission to allow camera access and refresh page.");
        } else if (error.name === 'NotFoundError') {
          setCameraError("System does not have a camera or camera is not responding. Please use another system to record video.");
        } else {
          setCameraError("An error occurred while trying to access the camera. Please try again.");
        }
      });
  }, [hasWebcam]);

   /**
   * stopRecording function use for stop recording
   * @return void
   * @author Parimal | <from Paypanda>
   * @email parimal.srivastav@paypanda.in
   * @since 09/08/2024
   */

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  }, []);
  /**
   * resumeRecording function use for resume recording recording
   * @return void
   * @author Parimal | <from Paypanda>
   * @email parimal.srivastav@paypanda.in
   * @since 09/08/2024
   */

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  }, []);

    /**
   * resumeRecording function use for resume recording recording
   * @return void
   * @author Parimal | <from Paypanda>
   * @email parimal.srivastav@paypanda.in
   * @since 09/08/2024
   */

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  }, []);
   /**
   * handleDataAvailable function use hadling recorded video size
   * @return void
   * @author Parimal | <from Paypanda>
   * @email parimal.srivastav@paypanda.in
   * @since 09/08/2024
   */

  const handleDataAvailable = useCallback(({ data }) => {
    if (data.size > 0) {
      chunksRef.current.push(data);
    }
  }, []);

   /**
   * handleStop function use for handling stop and close of recording Pupop
   * @return void
   * @author Parimal | <from Paypanda>
   * @email parimal.srivastav@paypanda.in
   * @since 09/08/2024
   */

  const handleStop = useCallback(() => {
    const videoBlob = new Blob(chunksRef.current, { type: "video/webm" });
    const videoUrl = URL.createObjectURL(videoBlob);
    setRecordedVideo(videoUrl);
    setIsRecording(false);
    setIsPaused(false);
  }, []);


  /**
   * handleSave function use for save and send to video kyc page
   * @return void
   * @author Parimal | <from Paypanda>
   * @email parimal.srivastav@paypanda.in
   * @since 09/08/2024
   */
  const handleSave = () => {
    onSave(recordedVideo);
    handleClose();
  };
 /**
   * handleCancel function use cancel the final recording
   * @return void
   * @author Parimal | <from Paypanda>
   * @email parimal.srivastav@paypanda.in
   * @since 09/08/2024
   */
  const handleCancel = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setRecordedVideo(null);
    setIsRecording(false);
    setIsPaused(false);
    setTimer(0);
    setCameraError(null);
    setIsCameraOn(true);
    handleClose();
  };
  /**
   * formatTime function use for getting time formate
   * @return string
   * @author Parimal | <from Paypanda>
   * @email parimal.srivastav@paypanda.in
   * @since 09/08/2024
   */
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
    /**
   * formatTime function use for toggel camera
   * @return void
   * @author Parimal | <from Paypanda>
   * @email parimal.srivastav@paypanda.in
   * @since 09/08/2024
   */
  const toggleCamera = () => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !isCameraOn;
      });
      setIsCameraOn(!isCameraOn);
    }
  };
  
  return (
    <Modal show={show} onHide={handleCancel} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Record Video</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {hasWebcam === false ? (
          <div className="alert alert-danger">
            No webcam detected. Please connect a webcam and try again.
          </div>
        ) : cameraError ? (
          <div className="alert alert-danger">
            {cameraError}
          </div>
        ) : (
          <>
            {(!isRecording || !recordedVideo) && (
              <video ref={videoRef} width="100%" height="auto" autoPlay muted={isRecording} style={{ display: recordedVideo ? 'none' : 'block',background : recordedVideo ? '' : 'black'}}/>
            )}
            {recordedVideo && !isRecording && (
              <video src={recordedVideo} controls style={{width: '100%', maxWidth: '30rem'}} />
            )}
            <div className="mt-3">
              {isRecording && <div>Recording Time: {formatTime(timer)}</div>}
              {!isRecording && !recordedVideo && (
                <Button variant="primary" onClick={startRecording}>
                  Start Recording
                </Button>
              )}
              {isRecording && !isPaused && (
                <>
                  <Button variant="warning" onClick={pauseRecording} className="me-2">
                    Pause
                  </Button>
                  <Button variant="danger" onClick={stopRecording}>
                    Stop Recording
                  </Button>
                </>
              )}
              {isRecording && isPaused && (
                <>
                  <Button variant="success" onClick={resumeRecording} className="me-2">
                    Resume
                  </Button>
                  <Button variant="danger" onClick={stopRecording}>
                    Stop Recording
                  </Button>
                </>
              )}
              {recordedVideo && !isRecording && (
                <>
                  <Button variant="success" onClick={handleSave} className="me-2 mt-2">
                    Save Video
                  </Button>
                  <Button variant="secondary" onClick={() => {
                    setRecordedVideo(null);
                    setTimer(0);
                  }} className="mt-2">
                    Retake
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VideoRecorder;
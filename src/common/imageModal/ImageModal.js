import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import "./imagemodal.css"; 

function ImageModal(props) {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        setImageLoaded(false);
    }, [props.modalData]);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="custom-image-modal-dialog"
            >
                <Modal.Header closeButton />
                <Modal.Body className="custom-image-modal-body">
                    <div className="custom-image-container">
                        {!imageLoaded && <div className="custom-image-loading">Loading...</div>}
                        <img
                            src={`https://api.paypandabnk.com/api/cloudinary/${props?.modalData?.receipt_img}`}
                            alt="Receipt"
                            onLoad={handleImageLoad}
                            style={{ display: imageLoaded ? 'block' : 'none' }}
                            className="custom-modal-image"
                        />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ImageModal;
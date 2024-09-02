
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QRCode from "qrcode.react";
import logo from '../../../../../asesets/logo/PayPanda_logo_Final-09-e1670775011263.png'


function QrCodeGenerate({ qrshow, handleCloseqr, QrCodeUrl }) {
    const [timeLeft, setTimeLeft] = useState(60);
    useEffect(() => {
        if (!qrshow) return;

        // setQRValue(uuidv4());
        setTimeLeft(60);

        const interval = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    handleCloseqr();
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [qrshow, handleCloseqr]);

    // if (!qrshow) return null;
    return (
        <>
            <Modal show={qrshow} onHide={handleCloseqr}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <div className='qrCode'>
                        <img src={logo} alt="" />
                        <p className='text-align-center'>Expire QR Code : {timeLeft} seconds</p>
                        <QRCode value={QrCodeUrl} size={268} />
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    )
}
export default QrCodeGenerate
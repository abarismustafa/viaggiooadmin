
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export const ModalImgShow = ({ handleClose, cantain }) => {
   
    return <>
        <Modal.Header closeButton>
            <Modal.Title>{cantain.str}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <img src={`https://api.paypandabnk.com/api/cloudinary/${cantain.url}`} />
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>

        </Modal.Footer>

    </>
}
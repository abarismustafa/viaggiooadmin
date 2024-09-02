
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
function OtpChaeckTost(props) {
    const OtpModalOpen = () => {
        props.handleClose(false)
        props.setModalShow3(true)
    }

    return (
        <>
            {/* <Row>
                <Col xs={6}>
                    <Toast onClose={() => props.setShow(false)} show={props.show} delay={10000} autohide>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Bootstrap</strong>
                            <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
                    </Toast>
                </Col>
            </Row> */}
            <Modal show={props.show} onHide={props.handleClose}>
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header> */}
                <Modal.Body className='text-align-center'>
                    You Are Not Verified !
                    <div className='mt-4'>
                        <Button variant="secondary" className='me-3' onClick={props.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={OtpModalOpen}>
                            Procced
                        </Button>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>


                </Modal.Footer> */}
            </Modal>
        </>
    )
}
export default OtpChaeckTost
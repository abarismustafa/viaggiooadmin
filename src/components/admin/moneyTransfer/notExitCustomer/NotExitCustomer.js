import { Modal } from "react-bootstrap"

import Button from 'react-bootstrap/Button';
import { FcDoNotInhale } from "react-icons/fc";

function NotExitCustomer(props) {
    // console.log(props);

    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="modalNotExit"
            >
                {/* <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                    </Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="customerNoExit text-align-center">
                                <div className="icon-set">
                                    <FcDoNotInhale  />
                                </div>
                                <div className="notContent">
                                    <h2>Customer Account Not Exist</h2>
                                    <p>Do You want to create customer account</p>
                                </div>
                                <button className="btn btn-success mr-2" onClick={props.customerCreate}>Yes</button>
                                <button className="btn btn-danger" onClick={props.onHide}>No</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer> */}
            </Modal>

        </>
    )
}
export default NotExitCustomer
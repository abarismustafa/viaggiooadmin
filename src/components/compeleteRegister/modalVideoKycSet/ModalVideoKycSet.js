import { Button, Modal } from "react-bootstrap"


function ModalVideoKycSet(props) {
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
            >
                <Modal.Header >
                    <Modal.Title id="contained-modal-title-vcenter" style={{ color: '2e3191' }}>
                        Video KYC Instructions / वीडियो केवाईसी निर्देश
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ lineHeight: '37px', fontWeight: '700' }}>
                        मेरा नाम………………………. है. मेरे शॉप का नाम…………………… है .मैं PAYPANDA के साथ काम करना चाहता / चाहती हुँ.और मैं अपना / अपनी KYC आपके साथ साझा करता /करती हुँ / My Name is ………………. My Shop Name is ………………………. I want to work with PAYPANDA. and I share my KYC with you.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} >Agree</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalVideoKycSet
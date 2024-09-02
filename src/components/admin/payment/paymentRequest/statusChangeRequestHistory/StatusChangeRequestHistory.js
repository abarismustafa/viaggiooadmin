
import { useState ,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
function StatusChangeRequestHistory(props) {

    const [tpinError, setTpinError] = useState('');
    const [isValidTpin, setIsValidTpin] = useState(false);

    useEffect(() => {
        validateTpin(props.updateInitialMemberHistory.pin);
    }, [props.updateInitialMemberHistory.pin]);

    const validateTpin = (tpin) => {
        if (!tpin) {
            setTpinError('TPIN is required');
            setIsValidTpin(false);
        } else if (tpin.length !== 4) {
            setTpinError('TPIN should be of four digits');
            setIsValidTpin(false);
        } else {
            setTpinError('');
            setIsValidTpin(true);
        }
    };

    const handleTpinChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); 
        if (value.length <= 4) {
            props.handleChangeUpdate({
                target: { name: 'pin', value }
            });
        }
        validateTpin(value);
    };



    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className='text-align-center'>
                        Payment Request By Member
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-lg-6'>
                            <div className="form-group">
                                <label htmlFor="txtUserId">Date :</label>

                                <input className="form-control datefield" id="txtFrom" type="text" name="date"
                                 value={props.updateInitialMemberHistory?.createdAt} 
                                disabled />
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className="form-group">
                                <label htmlFor="txtUserId">Amount :</label>
                                <input className="form-control datefield" id="txtFrom" type="number" name="amount" value={props.updateInitialMemberHistory.amount} disabled />
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className="form-group">
                                <label htmlFor="txtUserId">Remarks :</label>
                                <input className="form-control datefield" id="txtFrom" type="text" name="remark" value={props.updateInitialMemberHistory.remark} disabled />
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div className="form-group">
                                <label htmlFor="txtUserId">TPin :</label>
                                <input 
                                    className="form-control datefield" 
                                    id="txtFrom" 
                                    type="password" 
                                    name="pin" 
                                    placeholder='Enter TPin' 
                                    value={props.updateInitialMemberHistory?.pin} 
                                    onChange={handleTpinChange} 
                                    maxLength={4}
                                />
                                 {tpinError && <div className="text-danger">{tpinError}</div>}
                            </div>
                        </div>
                        <div className='col-lg-6'>
                            <div classname="mb-3">
                                <label htmlFor="ddldb">Select Status</label>
                                <select className="form-select" aria-label="Default select example" name="status" value={props.updateInitialMemberHistory.status} onChange={props.handleChangeUpdate}>
                                    <option selected>Select Status</option>
                                    <option value={"Pending"}>Pending</option>
                                    <option value={"Approved"}>Approved</option>
                                    <option value={"Rejected"}>Rejected</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                    <Button onClick={props.updateData} disabled={!isValidTpin}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default StatusChangeRequestHistory
import { useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { issueDisputeList, issueDisputeListSumit } from "../../../../api/login/Login"
import { ToastContainer, toast } from "react-toastify"

import Select from 'react-select'
function DisputeMessage(props) {
    const [lengthMax, setLengthMax] = useState(125)
    const [dataIssu, setDataIssue] = useState(null)

    const [valueInitial, setValueInitial] = useState({
        user_id: '',
        dmt_id: '',
        remarks: '',
        reason_id: ''
    })

    const handleChangeDisute = (e) => {
        const cloneDispute = { ...valueInitial }
        const value = e.target.value
        const name = e.target.name
        cloneDispute[name] = value
        setValueInitial(cloneDispute)
    }
    const handleChangeDisute2 = (e) => {
        const cloneDispute = { ...valueInitial,reason_id:e._id }
        setValueInitial(cloneDispute)
    }

    const ListissueDispute = async () => {
        try {
            const res = await issueDisputeList()
            const maped = res?.data?.data.map((item) => {
                return { ...item, label: item?.message }
            })
            setDataIssue(maped);
        } catch (error) {

        }
    }


    const submitDispute = async () => {
        const clone = { ...valueInitial, dmt_id: props?.taxnumId, user_id: window.localStorage.getItem('userIdToken') }
        try {
            const res = await issueDisputeListSumit(clone)
            setValueInitial({
                remarks: '',
                reason_id: ''
            })
            if (res?.data?.error == false) {
                props.toastSuccessMessage('Success')
                setTimeout(() => {
                    props.handleClose()
                }, 1000)
            }
        } catch (error) {

        }

    }

    useEffect(() => {
        ListissueDispute()
    }, [])
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Dispute
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="head-dispute">
                                <h6>Txn ID : </h6>
                                <h6>{props?.taxnum?.length ? props?.taxnum : '--'}</h6>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label htmlFor="txtUserId">Select Your Issue</label>
                                {/* <select class="form-select" name="reason_id" aria-label="Default select example" onChange={handleChangeDisute}>
                                    <option selected disabled>select Issue</option>
                                    {dataIssu && dataIssu?.map((item) => {
                                        return <option value={item?._id}>{item?.message}</option>
                                    })}
                                </select> */}
                                <Select
                                    // isMulti
                                    // defaultValue={showCateg}
                                    name="showBanak"
                                    options={dataIssu}
                                    className="games-dropdown-2 customsection"
                                    classNamePrefix="select"
                                    onChange={handleChangeDisute2}

                                />

                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label htmlFor="txtUserId">Remarks</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" name="remarks" value={valueInitial.remarks} maxLength={lengthMax} rows="3" onChange={handleChangeDisute}></textarea>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <button type="button" className="btn btn-success W-100 btn-success-btn" onClick={submitDispute}>Submit</button>
                        </div>
                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={props.handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    )
}
export default DisputeMessage
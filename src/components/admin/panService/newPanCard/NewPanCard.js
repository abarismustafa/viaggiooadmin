import '../../panService/pan.css'
import Select from 'react-select'
import { BsFillInfoCircleFill } from "react-icons/bs";
function NewPanCard() {
    return (
        <>
            <div className="PageHeading">
                <h1>Pan Services</h1>
            </div>
            <div className="ContentArea">
                <div className="card">

                    <div className="card-header"><span>New Pan Card</span></div>
                    <div className="card-body">
                        <form action="" method="post" name="frmReport" id="frmReport">
                            <input type="hidden" id="hidID" name="hidID" />
                            <div className="form-row" style={{ alignItems: 'end' }}>
                                {/* <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Min Amount</label>
                                    <input type="number" name="min_amt" id="account_no" className="form-control" value={filterInitial.min_amt} onChange={handleChange} />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Max Amount</label>
                                    <input type="number" name="max_amt" id="account_no" className="form-control" value={filterInitial.max_amt} onChange={handleChange} />
                                </div> */}



                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Application Type <span style={{ color: 'red' }}>*</span></label>
                                    <Select
                                        // isMulti
                                        // defaultValue={showCateg}
                                        // value={showBanak}
                                        // name="showBanak"
                                        // options={bankData}
                                        className="games-dropdown-2 customsection "
                                        classNamePrefix="select"
                                    // onChange={bankChange}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Category <span style={{ color: 'red' }}>*</span></label>
                                    <Select
                                        // isMulti
                                        // defaultValue={showCateg}
                                        // value={showBanak}
                                        // name="showBanak"
                                        // options={bankData}
                                        className="games-dropdown-2 customsection "
                                        classNamePrefix="select"
                                    // onChange={bankChange}
                                    />
                                </div>
                                <div className='col-lg-12'>
                                    <div className='info-set'>
                                        Applicant information <span><BsFillInfoCircleFill /></span>
                                    </div>
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Title <span style={{ color: 'red' }}>*</span></label>
                                    <Select
                                        // isMulti
                                        // defaultValue={showCateg}
                                        // value={showBanak}
                                        // name="showBanak"
                                        // options={bankData}
                                        className="games-dropdown-2 customsection "
                                        classNamePrefix="select"
                                    // onChange={bankChange}
                                    />
                                </div>
                                <div className="form-group col-md-4">

                                </div>
                                <div className="form-group col-md-4">

                                </div>

                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Last Name / Surname <span style={{ color: 'red' }}>*</span></label>

                                    <input type="text" name="end_date" id="account_no" className="form-control" placeholder='Enter Last Name / Surname' />
                                </div>

                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">First Name <span style={{ color: 'red' }}>*</span></label>

                                    <input type="text" name="end_date" id="account_no" className="form-control" placeholder='Enter First Name' />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Middle Name <span style={{ color: 'red' }}>*</span></label>

                                    <input type="text" name="end_date" id="account_no" className="form-control" placeholder='Enter Middle Name' />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Date of Birth / Incorporation / Formation (DD/MM/YYYY) <span style={{ color: 'red' }}>*</span></label>

                                    <input type="date" name="end_date" id="account_no" className="form-control" placeholder='Enter Middle Name' />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Email ID <span style={{ color: 'red' }}>*</span></label>

                                    <input type="email" name="end_date" id="account_no" className="form-control" placeholder='Enter Email ID' />
                                </div>
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtUserId">Mobile Number <span style={{ color: 'red' }}>*</span></label>

                                    <input type="email" name="end_date" id="account_no" className="form-control" placeholder='Enter Mobile Number' />
                                </div>
                                <div className="form-group col-md-12">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.
                                        </label>
                                    </div>

                                </div>
                                <div className="form-group col-md-12 text-align-center">
                                    <label>&nbsp;</label>
                                    <button type="button" className="btn btn-primary mr-3" >
                                        Submit

                                    </button>
                                    {/* <button type="button" className="btn btn-warning" >Reset</button> */}
                                </div>

                            </div>
                        </form>
                    </div>

                </div >


            </div >
        </>
    )
}
export default NewPanCard
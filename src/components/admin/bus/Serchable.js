import Select from 'react-select'
function Searchable() {
    return (
        <>
            <div className="form-row set-form-row">
                <div className="form-group col-md-3">
                    <label htmlFor="txtUserId">Depart From <span style={{ color: 'red' }}>*</span></label>
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
                <div className="form-group col-md-3">
                    <label htmlFor="txtUserId">Going To <span style={{ color: 'red' }}>*</span></label>
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
                <div className="form-group col-md-3">
                    <label htmlFor="txtUserId">Departure Date <span style={{ color: 'red' }}>*</span></label>
                    <input type="date" name="end_date" id="account_no" className="form-control" placeholder='Enter Middle Name' />
                </div>
                {/* <div className="form-group col-md-1">

                </div> */}
                <div className="form-group form-group-form-group col-md-3">
                    <label htmlFor="txtUserId" style={{ marginTop: '45px' }}></label>
                    <button type='button' className='btn btn-primary'>Search</button>
                </div>
            </div>
        </>
    )
}
export default Searchable
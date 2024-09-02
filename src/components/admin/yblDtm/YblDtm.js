
function YblDtm() {
    return (
        <>
            <div className="PageHeading">
                <h1>YBL AGENT REGISTRATION</h1>
            </div>

            <div className="card" style={{ overflow: 'auto' }}>
                {/* <div className="alert alert-success alert-dismissable" id="response">
                    <button aria-hidden="true" data-dismiss="alert" className="close" type="button">×</button>
                    <h4>  <i className="icon fa fa-check" /> <span id="response_msg" /></h4>
                </div> */}
                <div className="card-header"><span>YBL AGENT REGISTRATION - STEP - 1 of 3</span></div>
                <div className="card-body">

                    <form action="" name="frmRegisterYblAgent" id="frmRegisterYblAgent" method="post" autoComplete="off" acceptCharset="utf-8">
                        <input type="hidden" name="hidstep" id="hidstep" defaultValue="56a4473a52c810ccde9f2bd5dbc1813f4da0c8e196c8afa5b2f0793d9fa740de5ef6e34ed5b112d77742d7f0fda13af6f52d31ebd2ba1719df261c8dcd0d1989DS2g4fxaJX3.2mp.ZI3FgB1YXrd4Cu8kCd9GZvIafQw-" />
                        <input type="hidden" name="hidparam1" id="hidparam1" defaultValue="62f0424b58f5363c5085667acb4dc2e00af2a555ae8725b04b2187d8592c3bf4ce7b6f43f7f33570e69cbe3a6bca6677143fbd38784934315b1ee07be8a54252HpPShTqzytE9oYaa1REUCuEXz5aJLskcN7y2PsvtIco-" />
                        <input type="hidden" name="hidparam2" id="hidparam2" defaultValue="57b24f35ec0f80936c409e6fa19a506f7a095f1f42edd2f356c63efe229261ad6a0b7357e959a23329044e8d5ce6369a0e6103a2b7c3592114b45922dbb7313aaYF~hLFNZohyJRhK5rXPYzM.MZWabEApT1Jyq7jndrA-" />
                        <table border={0} className="table">
                            <tbody>
                                <tr>
                                    <td className="frm_input_head">Mobile No.:</td>
                                    <td align="left">
                                        <input type="text" className="form-control frm_input_text" maxLength={10} name="txtMobileNumber" id="txtMobileNumber" placeholder="Enter Mobile Number" tabIndex={1} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="frm_input_head">Shop Name:</td>
                                    <td align="left">
                                        <input type="text" className="form-control frm_input_text" id="txtShopname" maxLength={70} name="txtShopname" placeholder="Enter Shop Name" tabIndex={2} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="frm_input_head">Fullname: (As Per Pancard)</td>
                                    <td align="left">
                                        <input type="text" className="form-control frm_input_text" id="txtFullname" maxLength={70} name="txtFullname" placeholder="Enter Fullname" tabIndex={3} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="frm_input_head">Pancard No.:</td>
                                    <td align="left">
                                        <input type="text" className="form-control frm_input_text" id="txtPanNo" maxLength={10} name="txtPanNo" placeholder="Enter Pancard No." tabIndex={4} />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="frm_input_head">Gender:</td>
                                    <td align="left">
                                        <select name="selGender" id="selGender" className="form-control frm_input_text" tabIndex={6} fdprocessedid="bp5mq8">
                                            <option value>Please Select</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                            <option value="T">Transgender</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="frm_input_head">Email:</td>
                                    <td align="left">
                                        <input type="text" className="form-control frm_input_text" id="txtEmail" maxLength={70} name="txtEmail" placeholder="Enter Email" tabIndex={7} fdprocessedid="8qlc8" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="frm_input_head">Date Of Birth:</td>
                                    <td align="left">
                                        <input type="date" className="form-control frm_input_text datefield hasDatepicker" id="txtBirthDate" maxLength={10} name="txtBirthDate" placeholder="Select Date Of Birth" tabIndex={8} />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2} align="middle">
                                        <input type="button" className="btn btn-success" defaultValue="Submit" id="btnReg" name="btnReg" tabIndex={9} style={{ backgroundColor: 'rgb(30 85 145)', width: 220 }} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>


        </>
    )
}

export default YblDtm
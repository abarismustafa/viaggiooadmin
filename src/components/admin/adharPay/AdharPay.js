
function AdharPay() {
    return (
        <>
            <div className="PageHeading withimg">
                <h1>Users Onboard</h1>
                <div>
                    <a href="javascript:history.go(-1)">
                        Back
                    </a>
                </div>
            </div>
            <div className="ContentArea">
                {/* <div className="card" style={{ marginBottom: 10 }}>
                    
                </div> */}
                <div className="row">
                    <div className="col-md-12 col-sm-16">

                        <form action="" method="post" name="frmCallAction" id="frmCallAction" encType="multipart/form-data">
                            <input type="hidden" name="fingpay_id" defaultValue />
                            <div className="card top-border-card" style={{ borderColor: '#63a2c7' }}>
                                <div className="card-body p-0">
                                    <div className="heading">Users Onboard</div>
                                    <div className="p-3">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="roundblock">
                                                    <div className="blocklegend">Business Details</div>
                                                    <div className="legendcontainer">
                                                        <div className="form-group col-4">
                                                            <label htmlFor="merchantName">Name <span className="text-danger">*</span></label>
                                                            <input className="form-control " name="merchantName" type="text" placeholder="Enter Name" />
                                                            <span className="disp-error uname" />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <label htmlFor="merchantPhoneNumber">Mobile No <span className="text-danger">*</span></label>
                                                            <input className="form-control " id="merchantPhoneNumber" name="merchantPhoneNumber" type="text" placeholder="Enter Mobile No." />
                                                            <span className="disp-error umobileno" />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <label htmlFor="emailId">Email <span className="text-danger">*</span></label>
                                                            <input className="form-control " id="emailId" name="emailId" type="text" placeholder="Enter Email" />
                                                            <span className="disp-error uemail" />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <label htmlFor="companyLegalName">Shop Name <span className="text-danger">*</span></label>
                                                            <input className="form-control " id="companyLegalName" name="companyLegalName" type="text" placeholder="Enter Shop Name" />
                                                            <span className="disp-error ucompanyname" />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <label htmlFor="tan">State <span className="text-danger">*</span></label>
                                                            <select className="form-control required" id="state_id" name="state_id" fdprocessedid="8jghr7">
                                                                <option value>--Choose State--</option>
                                                                <option value={1}>Andaman and Nicobar Islands</option>
                                                                <option value={2}>Andhra Pradesh</option>
                                                                <option value={3}>Arunachal Pradesh</option>
                                                                <option value={4}>Assam</option>
                                                                <option value={5}>Bihar</option>
                                                                <option value={6}>Chandigarh</option>
                                                                <option value={7}>Chhattisgarh</option>
                                                                <option value={8}>Dadra and Nagar Haveli</option>
                                                                <option value={9}>Daman and Diu</option>
                                                                <option value={10}>Delhi</option>
                                                                <option value={11}>Goa</option>
                                                                <option value={12}>Gujarat</option>
                                                                <option value={13}>Haryana</option>
                                                                <option value={14}>Himachal Pradesh</option>
                                                                <option value={15}>Jammu and Kashmir</option>
                                                                <option value={16}>Jharkhand</option>
                                                                <option value={17}>Karnataka</option>
                                                                <option value={19}>Kerala</option>
                                                                <option value={20}>Lakshadweep</option>
                                                                <option value={21}>Madhya Pradesh</option>
                                                                <option value={22}>Maharashtra</option>
                                                                <option value={23}>Manipur</option>
                                                                <option value={24}>Meghalaya</option>
                                                                <option value={25}>Mizoram</option>
                                                                <option value={26}>Nagaland</option>
                                                                <option value={29}>Odisha</option>
                                                                <option value={31}>Pondicherry</option>
                                                                <option value={32}>Punjab</option>
                                                                <option value={33}>Rajasthan</option>
                                                                <option value={34}>Sikkim</option>
                                                                <option value={35}>Tamil Nadu</option>
                                                                <option value={36}>Telangana</option>
                                                                <option value={37}>Tripura</option>
                                                                <option value={38}>Uttar Pradesh</option>
                                                                <option value={39}>Uttarakhand</option>
                                                                <option value={41}>West Bengal</option>
                                                            </select>
                                                            <span className="disp-error ustate" />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <label htmlFor="tan">City <span className="text-danger">*</span></label>
                                                            <select className="form-control required" id="city_id" name="city_id" fdprocessedid="php3y">
                                                                <option value>--Choose City--</option>
                                                            </select>
                                                            <span className="disp-error ucity" />
                                                        </div>
                                                        {/* <div class="form-group col-4">
                                                          <label for="merchantDistrictName">District Name <span class="text-danger">*</span></label>
                                                          <input class="form-control required" required="" id="merchantDistrictName" name="merchantDistrictName" type="text" placeholder="Enter District Name" value="">
                                                              <span class="disp-error udistrict"></span>
                                                      </div> */}
                                                        <div className="form-group col-4">
                                                            <label htmlFor="merchantAddress">Address<span className="text-danger">*</span></label>
                                                            <textarea name="merchantAddress" id="merchantAddress" className="form-control required" placeholder="Enter Address" defaultValue={""} />
                                                            <span className="disp-error uaddress" />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <label htmlFor="merchantPinCode">Pincode <span className="text-danger">*</span></label>
                                                            <input className="form-control required" id="merchantPinCode" name="merchantPinCode" type="text" placeholder="Enter Pincode" />
                                                            <span className="disp-error upincode" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div class="col-md-12" style="margin-top: 10px;">
                                              <div class="roundblock">
                                                  <div class="blocklegend">Business Details</div>
                                                  <div class="legendcontainer">
                                                      <div class="form-group col-4">
                                                          <label for="companyLegalName">Shop Name <span class="text-danger">*</span></label>
                                                          <input class="form-control required" required="" id="companyLegalName" name="companyLegalName" type="text" placeholder="Enter Shop Name" value="">
                                                              <span class="disp-error ucompanyname"></span>
                                                      </div>
                                                      <div class="form-group col-4">
                                                          <label for="companyMarketingName">Company Marketing Name <span class="text-danger">*</span></label>
                                                          <input class="form-control required" required="" id="companyMarketingName" name="companyMarketingName" type="hidden" placeholder="Enter Company Marketing Name" value="">
                                                              <span class="disp-error ucompanymarketingname"></span>
                                                      </div>
                                                      <div class="form-group col-4">
                                                          <label for="merchantBranch">Branch Name</label>
                                                          <input class="form-control " id="merchantBranch" name="merchantBranch" type="text" placeholder="Enter Branch Name" value="">
                                                              <span class="disp-error ubranchname"></span>
                                                      </div>

                                                  </div>

                                              </div>
                                          </div> */}
                                            <div className="col-md-12" style={{ marginTop: 10 }}>
                                                <div className="roundblock">
                                                    <div className="blocklegend">KYC Details</div>
                                                    <div className="legendcontainer">
                                                        <div className="form-group col-4">
                                                            <label htmlFor="userPan">Pan Card <span className="text-danger">*</span></label>
                                                            <input className="form-control" id="userPan" name="userPan" type="text" placeholder="Enter Pan Card" maxLength={10} />
                                                            <span className="disp-error upancard" />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            <label htmlFor="aadhaarNumber">Aadhar No <span className="text-danger">*</span></label>
                                                            <input className="form-control " id="aadhaarNumber" name="aadhaarNumber" type="text" placeholder="Enter Aadhar No" maxLength={12} />
                                                            <span className="disp-error uaadharno" />
                                                        </div>
                                                        <div className="form-group col-4">
                                                            {/*  <label for="gstInNumber">GST No <span class="text-danger">*</span></label> */}
                                                            <input className="form-control " id="merchantBranch" name="merchantBranch" type="hidden" placeholder="Enter Branch Name" defaultValue />
                                                            <input className="form-control required" required id="merchantDistrictName" name="merchantDistrictName" type="hidden" placeholder="Enter District Name" defaultValue />
                                                            <input className="form-control required" required id="companyMarketingName" name="companyMarketingName" type="hidden" placeholder="Enter Company Marketing Name" defaultValue />
                                                            <input className="form-control " id="gstInNumber" name="gstInNumber" type="hidden" placeholder="Enter GST No" defaultValue />
                                                            <span className="disp-error ugstno" />
                                                            <input className="form-control" id="tan" name="tan" type="hidden" placeholder="Enter Tan" defaultValue />
                                                            <input className="form-control required" required id="companyOrShopPan" name="companyOrShopPan" type="hidden" placeholder="Enter Company/Shop Pancard" defaultValue />
                                                            <input className="form-control required" required id="companyBankAccountNumber" name="companyBankAccountNumber" type="hidden" placeholder="Enter Bank Account No." defaultValue />
                                                            <input className="form-control required" required id="bankIfscCode" name="bankIfscCode" type="hidden" placeholder="Enter Bank IFSC" defaultValue />
                                                            <input className="form-control required" required id="companyBankName" name="companyBankName" type="hidden" placeholder="Enter Bank Name" defaultValue />
                                                            <input className="form-control required" required id="bankBranchName" name="bankBranchName" type="hidden" placeholder="Enter Bank Branch Name" defaultValue />
                                                            <input className="form-control required" required id="bankAccountName" name="bankAccountName" type="hidden" placeholder="Enter Bank Account Name" defaultValue />
                                                        </div>
                                                        {/* <div class="form-group col-4">
                                                                                                      <label for="companyBankAccountNumber">Bank Account No. <span class="text-danger">*</span></label>

                                                                                                      <span class="disp-error ucompbankaccount"></span>
                                                                                                  </div>
                                                                                                  <div class="form-group col-4">
                                                                                                      <label for="bankIfscCode">Bank IFSC <span class="text-danger">*</span></label>
                                                                                                      <input class="form-control required" required="" id="bankIfscCode" name="bankIfscCode" type="text" placeholder="Enter Bank IFSC" value="">
                                                                                                          <span class="disp-error ubankifsc"></span>
                                                                                                  </div>
                                                                                                  <div class="form-group col-4">
                                                                                                      <label for="companyBankName">Bank Name <span class="text-danger">*</span></label>
                                                                                                      <input class="form-control required" required="" id="companyBankName" name="companyBankName" type="text" placeholder="Enter Bank Name" value="">
                                                                                                          <span class="disp-error ubankname"></span>
                                                                                                  </div>
                                                                                                  <div class="form-group col-4">
                                                                                                      <label for="bankBranchName">Bank Branch Name <span class="text-danger">*</span></label>
                                                                                                      <input class="form-control required" required="" id="bankBranchName" name="bankBranchName" type="text" placeholder="Enter Bank Branch Name" value="">
                                                                                                          <span class="disp-error ubankbranchname"></span>
                                                                                                  </div>
                                                                                                  <div class="form-group col-4">
                                                                                                      <label for="bankAccountName">Bank Account Name <span class="text-danger">*</span></label>
                                                                                                      <input class="form-control required" required="" id="bankAccountName" name="bankAccountName" type="text" placeholder="Enter Bank Account Name" value="">
                                                                                                          <span class="disp-error ubankaccountname"></span>
                                                                                                  </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row my-2 text-center">
                                            <div className="col-12 text-center">
                                                <input type="submit" id="btnSubmit" name="btnSubmit" defaultValue="Save" className="btn btn-primary" fdprocessedid="0c88up" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}
export default AdharPay
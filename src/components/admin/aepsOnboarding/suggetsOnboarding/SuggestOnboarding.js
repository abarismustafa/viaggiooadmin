

function SuggestOnboarding({ onBoardingApiCall }) {
    return (
        <>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Onboarding Document Requirment</span></div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="seggest-point">
                                    <h2>Onboarding Document Requirment</h2>
                                </div>
                                <div className="seggest-point">
                                    <p>1- Merchant Original Pancard image.</p>
                                    <p>2- Merchant Original AADHAR IMAGE image.</p>
                                    <p>3- Onboarding STATE SHOULD match Aadhaar address.</p>
                                </div>
                                <div className="alert alert-info mt-4">
                                    <blockquote className="blockquote text-center mb-0">
                                        <p className="mb-0">
                                            "For now, we need an L0 device for AEPS for a few days because we will provide you with options for all devices after a few days. Thank you"
                                        </p>
                                    </blockquote>
                                </div>
                                <div className="btn-section">
                                    <button type="button" className="btn btn-success" onClick={onBoardingApiCall}>Proceed</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default SuggestOnboarding

// function SuggestOnboarding({ onBoardingApiCall }) {
//     return (
//         <>
//             <div className="ContentArea">
//                 <div className="card">
//                     <div className="card-header"><span>Onboarding Document Requirement</span></div>
//                     <div className="card-body">
//                         <div className="row">
//                             <div className="col-lg-12">
//                                 <div className="suggest-point">
//                                     <h2>Onboarding Document Requirement</h2>
//                                 </div>
//                                 <div className="suggest-point">
//                                     <p>1- Merchant Original Pancard image.</p>
//                                     <p>2- Merchant Original AADHAR IMAGE image.</p>
//                                     <p>3- Onboarding STATE SHOULD match Aadhaar address.</p>
//                                 </div>
//                                 <div className="alert alert-info mt-4">
//                                     <blockquote className="blockquote text-center mb-0">
//                                         <p className="mb-0">
//                                             "For now, we need an L0 device for AEPS for a few days because we will provide you with options for all devices after a few days. Thank you"
//                                         </p>
//                                     </blockquote>
//                                 </div>
//                                 <div className="btn-section mt-4">
//                                     <button type="button" className="btn btn-success" onClick={onBoardingApiCall}>Proceed</button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
// export default SuggestOnboarding
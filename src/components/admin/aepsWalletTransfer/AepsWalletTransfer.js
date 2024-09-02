import { useEffect, useState } from "react"
import { aepsWalletTrasfer, aepstransfer } from "../../../api/login/Login"
import { ToastContainer, toast } from "react-toastify"


function AepsWalletTrasfer() {
    const [loader1, setloader1] = useState(false)
    const [transferData, setTransferData] = useState(null)

    const [initialVal, setInitialVal] = useState({
        user_id: '',
        amount: ''
    })


    const handleTrasfer = (e) => {
        const name = e.target.name
        const value = e.target.value
        const updateClone = { ...initialVal, [name]: value }
        setInitialVal(updateClone)
    }


    const aepstTransfer = async () => {
        try {
            const res = await aepstransfer()
            setTransferData(res?.data?.data?.minAepsToMainWallet);
        } catch (error) {

        }
    }

    const toastSuccessMessage = (data) => {
        // console.log(data);
        toast.success(`${data}`, {
            position: "top-center",
        });
    };
    const toastWarningMessage = (data) => {
        // console.log(data);
        toast.error(`${data}`, {
            position: "top-center",
        });
    };

    const SubmitTransfer = async () => {
        setloader1(true)
        const clone = { ...initialVal, user_id: window.localStorage.getItem("userIdToken") }
        try {
            const res = await aepsWalletTrasfer(clone)
            console.log(res.data.statusCode == "403");
            if (res?.data?.statusCode == "200") {
                toastSuccessMessage(res?.data?.message)
            }
            if (res?.data?.statusCode == "403") {
                toastWarningMessage(res?.data?.message)
            }
            setloader1(false)
        } catch (error) {
            // console.log(error);
            setloader1(false)
        }
    }


    useEffect(() => {
        aepstTransfer()
    }, [])
    return (
        <>
            <div className="PageHeading"><h1>AEPS Wallet Transfer</h1></div>
            <div className="ContentArea"><div className="card">
                <div className="card-header">
                    <span>Sent</span>
                    {/* <div style={{ float: 'right', color: '#1e5591', fontWeight: 600, paddingTop: 15 }}>Dhamaka Offer Limit: 62011</div> */}
                </div>
                <div className="card-body">
                    <div className="row row-row" id="dev-search-form">
                        <div className="col-md-4 ">
                            <div className="form-group mobile-input-container">
                                <label htmlFor="txtSM">Amount<span id="lenofsendernumber" className="float-right" /></label>
                                <input type="number" id="txtSM" className="form-control" name="amount" value={initialVal.amount} placeholder="Enter Amount" onChange={handleTrasfer} />
                                {/* {transferData && <p style={{ color: 'red' }}>Transfer amount must be greater than equal to {transferData}</p>} */}
                            </div>
                        </div>
                        <div className="col-md-3 pt-md-3 mt-1">
                            <button type="button" id="btnSearch"  
                              className={`btn ${ !initialVal.amount ? 'commonbotton_disable': 'btn-success' } custom-button example-1`}
                            disabled={!initialVal.amount} onClick={SubmitTransfer}>
                                Submit
                                {loader1 && <div style={{ height: "16px", width: "16px" }} className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <ToastContainer />
        </>
    )
}
export default AepsWalletTrasfer
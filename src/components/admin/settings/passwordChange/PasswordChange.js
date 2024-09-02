import { useState } from "react"
import { changePassword } from "../../../../api/login/Login"
import { ToastContainer, toast } from "react-toastify";
import { IoMdEye } from "react-icons/io";
import { FaEyeSlash } from "react-icons/fa";

function PasswordChange() {
    const [loader1, setloader1] = useState(false)
    const [isValid, setIsValid] = useState(false);
    const [initialData, setInitialData] = useState({
        user_id: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const handleChange = (e, str) => {
        const clone = { ...initialData }
        const value = e.target.value
        if (str == 'newPassword') {
            const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!&])[A-Z](?=.*[a-zA-Z\d@$!&])[a-zA-Z\d@$!&]{8,}$/;
            setIsValid(regex.test(value));
        }
        const name = e.target.name
        clone[name] = value
        setInitialData(clone)
    }

    const toastSuccessMessage = (str) => {
        toast.success(`${str}`, {
            position: "top-center"
        })
    };

    const toastErrorMessage = (str) => {
        toast.error(`${str}`, {
            position: "top-center"
        })
    };

    const submitData = async () => {
        setloader1(true)
        const clone = { ...initialData, user_id: window.localStorage.getItem('userIdToken') }
        try {
            const res = await changePassword(clone)
            // console.log(res?.data);
            if (res?.data?.statusCode == '200') {
                toastSuccessMessage(res?.data?.data?.mesage);
                setInitialData({
                    user_id: '',
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                })
            }
            if (res?.data?.statusCode == '403') {
                toastErrorMessage(res?.data?.message);
            }
            setloader1(false)

        } catch (error) {
            setloader1(false)
        }
    }


    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    return (
        <>

            <div className="PageHeading">
                <h1>Password</h1>
            </div>
            <div className="ContentArea">
                <div className="card">
                    <div className="card-header"><span>Change Your Password</span></div>
                    <div className="card-body">
                        <form action="" method="post" name="frmCallAction" id="frmCallAction">
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="txtOldPassword">Old Password <span style={{ color: 'red' }}>*</span></label>
                                    <input className="form-control" id="txtOldPassword" name="oldPassword" type="password" value={initialData.oldPassword} placeholder="Old Password" onChange={handleChange} />
                                </div>
                                <div className="form-group input-group-eye input-group-eye-2 col-md-4">
                                    <label htmlFor="txtNewPassword">New Password <span style={{ color: 'red' }}>*</span></label>
                                    <input className="form-control" id="txtNewPassword" name="newPassword" type={showPassword ? 'text' : 'password'} value={initialData.newPassword} placeholder="New Password" onChange={(e) => handleChange(e, 'newPassword')} />
                                    <div className="eye" onClick={toggleShowPassword}>{showPassword ? <IoMdEye /> : <FaEyeSlash />} </div>
                                    {initialData.newPassword && (
                                        isValid ? (
                                            <p style={{ color: 'green' }}>Valid password</p>
                                        ) : (
                                            <p style={{ color: 'red', marginBottom: '4px' }}> Password: 8+ chars, start with a capital, include a special char, alphanumeric.</p>
                                        )
                                    )}
                                </div>
                                <div className="form-group col-md-4 input-group-eye input-group-eye-2">
                                    <label htmlFor="txtCnfPassword">Confirm Password <span style={{ color: 'red' }}>*</span></label>
                                    <input className="form-control" id="txtCnfPassword" name="confirmPassword" type={showPassword2 ? 'text' : 'password'} value={initialData.confirmPassword} placeholder="Confirm New Password" onChange={handleChange} />
                                    <div className="eye" onClick={toggleShowPassword2}>{showPassword2 ? <IoMdEye /> : <FaEyeSlash />} </div>
                                </div>
                            </div>
                            <div className="text-align-center">
                                <button type="button" disabled={!initialData.oldPassword || !initialData.newPassword || !initialData.confirmPassword} onClick={submitData} className={`btn ${!initialData.oldPassword || !initialData.newPassword || !initialData.confirmPassword ? 'commonbotton_disable' : 'btn-primary'} `}>
                                    Change Password
                                    {loader1 && <div style={{ height: "16px", width: "16px" }} className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ToastContainer />

        </>
    )
}
export default PasswordChange
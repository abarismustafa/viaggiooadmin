import axiosInstancee from "../../axiosServiseFactory/aesEncription/AesEncripition";
import { baseUrl } from "../../baseUrl";
import axiosInstance from "../../axiosServiseFactory/AxiosServiseFactory";
import axios from "axios";

const token = window.localStorage.getItem("userIdToken")

/**
 * userType function use for getting userType list
 * @param {*} data 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const userType = (data) => {
  return axiosInstance.get(`${baseUrl}usertype/public/list`);
};

/**
 * isMobileExits function use for checking mobile number is already exist or not 
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const isMobileExits = (value) => {
  return axiosInstance.get(`${baseUrl}auth/isMobileNoExist/${value}`);
};

/**
 * isEmailExits function use for checking email is already exist or not.
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const isEmailExits = (value) => {
  return axiosInstance.get(`${baseUrl}auth/isEmailexist/${value}`);
};

/**
 * isEmailExits2 function use for checking email is already exist or not.
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const isEmailExits2 = (value) => {
  return axiosInstance.get(`${baseUrl}auth/isEmailexist/${value}`);
};

/**
 * mobileGenerateOtp function use for OTP genreate
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const mobileGenerateOtp = (value) => {
  return axios.post(`${baseUrl}auth/forgotPassInitiateByMobile`, value);
};

/**
 * emailGenerateOtp function use for email OTP genreate
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const emailGenerateOtp = (value) => {
  return axios.post(`${baseUrl}auth/forgotPassInitiateByEmail`, value);
};

/**
 * fogotPassVerifyByEmail verify email
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const fogotPassVerifyByEmail = (value) => {
  return axios.post(`${baseUrl}auth/fogotPassVerifyByEmail`, value);
};

/**
 * fogotPassVerifyByMobile verify mobile
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const fogotPassVerifyByMobile = (value) => {
  return axios.post(`${baseUrl}auth/fogotPassVerifyByMobile`, value);
};

/**
 * resetApi function use reset password
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const resetApi = (value) => {
  return axios.put(`${baseUrl}auth/v1/resetPassword`, value);
};

/**
 * sinupApi function use create users
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const sinupApi = (value) => {
  return axios.post(`${baseUrl}auth/mb/verifyMobileNo`, value);
};

/**
 * EmailGenerateOtp frunction use for genrate email otp
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const EmailGenerateOtp = (value) => {
  return axios.post(`${baseUrl}auth/mb/verifyEmail`, value);
};

/**
 * isVerifiedMobileOtp frunction use for OTP verify according to mobile number
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const isVerifiedMobileOtp = (value) => {
  return axios.post(`${baseUrl}auth/mb/verifyMobileNoOtp`, value);
};

/**
 * isVerifiedEmailOtp frunction use for OTP verify according to email
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const isVerifiedEmailOtp = (value) => {
  return axios.post(`${baseUrl}auth/mb/verifyEmailOtp`, value);
};

/**
 * registerUser frunction use for create user
 * @param {object} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const registerUser = (value) => {
  return axiosInstance.post(`${baseUrl}auth/mb/register`, value);
};

/**
 * panNumberVarify frunction use for verify pan number
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const panNumberVarify = (value) => {
  return axios.post(`${baseUrl}verification/pan/verifypanOtp`, value);
};

/**
 * adharGenerateOtp frunction use adhar genrate OTP
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const adharGenerateOtp = (value) => {
  return axios.post(`${baseUrl}verification/adhaar/otp`, value);
};

/**
 * subOtp frunction use for adhar otp verify
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const subOtp = (value) => {
  return axios.post(`${baseUrl}verification/adhaar/verify`, value);
};

/**
 * personalDetails frunction use for store persnal details
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const personalDetails = (value) => {
  return axios.post(`${baseUrl}verification/personalDetails`, value);
};

/**
 * GstBusiness frunction use for getting business details
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const GstBusiness = (value) => {
  return axios.post(`${baseUrl}verification/gstno`, value,);
};

/**
 * GstBusinessAfterVerifide frunction use for verifyed
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const GstBusinessAfterVerifide = (value) => {
  return axios.post(`${baseUrl}verification/gstNoSave`, value);
};

/**
 * getDetailByPin frunction use for getting detail by Pin
 * @param {string} value 
 * @returns Json
 * @author Parimal <from PayPanda>
 * @email primal.srivastav@paypanda.in
 * @since 06/08/2024
 */
export const getDetailByPin = (value) => {
  return axios.get(`${baseUrl}pin/pincode/${value}`);
};

export const userLogin = (value) => {
  return axiosInstance.post(`${baseUrl}auth/mb/login`, value);
};
export const userLoginOtp = (value) => {
  return axiosInstance.post(`${baseUrl}auth/mb/verifyLoginOtp`, value);
};

export const bankAccount = (value) => {
  return axios.post(`${baseUrl}verification/bankAccount`, value);
};
export const bankAccountSave = (value) => {
  return axios.post(`${baseUrl}verification/bankAccountSave`, value);
};
export const videoKycUpload = (value) => {
  return axios.post(`${baseUrl}verification/kycUpload`, value);
};

export const userValidate = (value) => {
  return axiosInstance.get(`${baseUrl}auth/userValidate`);
};
export const userValidateAllData = (value) => {
  return axiosInstance.get(`${baseUrl}user/onBoard`);
};

export const cloudImage = (value) => {
  return axios.post(`${baseUrl}cloudinary/addImage`, value);
};
export const uploadDocument = (value) => {
  return axios.post(`${baseUrl}userdocument/add_doc`, value);
};
export const CountryList = (value) => {
  return axiosInstance.get(`${baseUrl}country/public/list`);
};

export const getCountry = (value) => {
  return axios.get(`${baseUrl}country/public/list`);
};

export const getPersionDetail = (value) => {
  return axios.get(`${baseUrl}deliveryaddress/permanentAdd`, {
    headers: {
      "content-type": "application/json; charset=UTF-8",
      authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};
export const getState = (value) => {
  return axios.get(`${baseUrl}state/mb/public`);
};

export const declarationSub = (value) => {
  return axios.post(`${baseUrl}verification/docSave`, value);
};
export const sendShipping = (value) => {
  return axios.post(`${baseUrl}deliveryaddress/user/addDeliveryaddress`, value);
};
// profileUpdate

export const updateProfilee = (value) => {
  return axios.put(`${baseUrl}auth/mb/update/profile`, value);
};

export const countryGet = (value) => {
  return axios.get(`${baseUrl}country/mb/public`);
};
export const languageGet = () => {
  return axios.get(`${baseUrl}language/lang/list`);
};
export const Getprofile = () => {
  return axios.get(`${baseUrl}auth/mb/get/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

// profileUpdate



export const sendShippingUpdate = ({ value, id }) => {
  return axios.put(`${baseUrl}deliveryaddress/user/updatedeliveryaddress/${id}`, value);
};

export const getShippingAddress = (value) => {
  return axios.get(`${baseUrl}deliveryaddress/user/shipping`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};
export const getShippingAddressById = (id) => {
  return axios.get(`${baseUrl}deliveryaddress/user/detail/${id}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const getShippingAddressDelete = (id) => {
  return axios.delete(`${baseUrl}deliveryaddress/user/deletedeliveryaddress/${id}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};


export const getBillingAddress = (value) => {
  return axios.get(`${baseUrl}deliveryaddress/user/billing`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};





// dmt

export const CustomerInfo = (value) => {
  return axios.get(`${baseUrl}eko/customerProfile?mobileNo=${value.mobile}&api_id=${value.api_id}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const createCustomer = (value) => {
  return axios.post(`${baseUrl}eko/createCustomer`, value);
};
export const ekoVeryfyCustomer = (value) => {
  console.log("valuesverfy", value)
  return axios.post(`${baseUrl}eko/verifyCustomer`, value);
};
export const resendOtpsCustomer = (value) => {
  return axios.post(`${baseUrl}eko/resendCustomerOtp`, value);
};
export const reciptList = (value) => {
  console.log(value);
  return axios.get(`${baseUrl}eko/recipientList?mobileNo=${value.mobile}&api_id=${value.api_id}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const bankListApi = () => {
  return axios.get(`${baseUrl}dmt_bank/public/list`);
};

export const bankListApiwithid = (api_id) => {
  return axios.get(`${baseUrl}dmt_bank/public/list`, {
    params: { api_id }
  });
};

export const BENEFICIARYAdd = (value) => {
  return axios.post(`${baseUrl}eko/recipientAdd`, value, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};
export const BENEFICIARYDelete = (value) => {
  return axios.post(`${baseUrl}eko/recipientDelete`, value);
};

export const sendMoneyTrans = (value) => {
  console.log(value);
  return axios.post(`${baseUrl}dmt_txn/trans`, value);
};

export const dmtTransiList = (value) => {
  return axios.post(`${baseUrl}dmt_txn/report`, value);
};

export const walletsREports = (value) => {
  return axios.post(`${baseUrl}mainwallet/public/filter`, value);
};
export const walletsREportscomission = (filterData) => {
  let url = `${baseUrl}mainwallet/public/filter?`;

  if (filterData.userId) url += `userId=${encodeURIComponent(filterData.userId)}&`;
  if (filterData.name) url += `name=${encodeURIComponent(filterData.name)}&`;
  if (filterData.email) url += `email=${encodeURIComponent(filterData.email)}&`;
  if (filterData.mobile) url += `mobile=${encodeURIComponent(filterData.mobile)}&`;
  if (filterData.is_approved !== '') url += `is_approved=${filterData.is_approved}&`;
  if (filterData.refer_id) url += `refer_id=${encodeURIComponent(filterData.refer_id)}&`;
  if (filterData.startDate) url += `startDate=${encodeURIComponent(filterData.startDate)}&`;
  if (filterData.endDate) url += `endDate=${encodeURIComponent(filterData.endDate)}&`;
  if (filterData.transactionType) url += `transactionType=${encodeURIComponent(filterData.transactionType)}&`;

  // Remove trailing '&' if present
  url = url.endsWith('&') ? url.slice(0, -1) : url;

  return axios.get(url, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};


export const walletsReportsCommission = (value) => {
  console.log(value);
  return axios.post(`${baseUrl}mainwallet/public/filter`, value, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};



export const aepsPayoutReport = (value) => {
  console.log(value);
  return axios.get(`${baseUrl}payout/public?start_date=${value?.start_date}&end_date=${value?.end_date}&txn_id=${value?.txn_id}&page=${value?.page}&count=${value?.count}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};


export const allDataDmt = (value) => {
  return axios.post(`${baseUrl}dmt_txn/report/all`, value);
};
export const allDataPayment = (value) => {
  return axios.post(`${baseUrl}paymentrequest/user/all`, value);
};
export const allDataWallets = (value) => {
  return axios.post(`${baseUrl}mainwallet/public/filter/all`, value);
};

export const payoutAllData = (value) => {
  return axios.get(`${baseUrl}payout/public/all`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const sagestMobileNumber = (value) => {
  return axios.get(`${baseUrl}eko/suggested?mobileNo=${value.mobile}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const bankPublic = (value) => {
  return axios.get(`${baseUrl}bank/public`);
};




// dmt

export const WalletsShow = () => {
  return axios.get(`${baseUrl}auth/userValidate`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const service_user_permission = () => {
  return axios.get(`${baseUrl}service_user_permission/isAvail/188`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};


export const addPaymentRequest = (value) => {
  return axios.post(`${baseUrl}paymentRequest/addRequest`, value);
};

export const paymentRequest = (value) => {
  console.log(value);
  return axios.post(`${baseUrl}paymentRequest/user`, value);
};

export const paymentEnquiry = (id) => {
  return axios.get(`${baseUrl}dmt_txn/trans/${id}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
}

export const trasferTo = () => {
  return axios.get(`${baseUrl}paymentRequestToUser/permit`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
}

export const paymentRequestToUser = (value) => {
  return axios.post(`${baseUrl}paymentRequestTouser/user`, value);
};
export const sendOtpRef = (value) => {
  return axios.post(`${baseUrl}dmt_txn/refund/initialize`, value);
};
export const subOtpRef = (value) => {
  return axios.post(`${baseUrl}dmt_txn/refund/verify`, value);
};
export const paymentRequestToUserAll = (value) => {
  return axios.post(`${baseUrl}paymentRequestToUser/user/all`, value);
};


export const paymentRequestToUseradmin = (value) => {
  return axios.post(`${baseUrl}paymentRequestToUser/admin`, value);
};
export const paymentRequestToUseradminAll = (value) => {
  return axios.post(`${baseUrl}paymentRequestToUser/user/admin/all`, value);
};

export const paymentRequestMemberHistoryUpdate = (value) => {
  return axios.put(`${baseUrl}paymentrequesttouser/transfer`, value);
};

export const changePassword = (value) => {
  return axios.put(`${baseUrl}auth/passwordChange`, value);
};

export const pinChange = (value) => {
  return axios.put(`${baseUrl}auth/pinChange`, value);
};


export const dateGet = (value) => {
  return axios.get(`${baseUrl}dashboard/public?date=${value}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
}

export const dmtDtails = (value) => {
  return axios.get(`${baseUrl}dmt_txn/batchId/${value}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
}

export const chargeBeneficiay = (value) => {
  return axios.get(`${baseUrl}setting/bankVerify`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
}

export const verificationBank = (value) => {
  return axios.post(`${baseUrl}verification/bankVerification`, value, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  })
}

export const reciptListUpdate = (value) => {
  return axios.get(`${baseUrl}eko/recipientsListUpdate?mobileNo=${value.mobile}&api_id=${value.api_id}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};


export const RechargeREports = (value) => {
  return axios.post(`${baseUrl}recharge/member`, value);
};

export const settingBank = () => {
  return axios.get(`${baseUrl}setting/dmtType`);
};


export const aepsWallets = (value) => {
  return axios.post(`${baseUrl}aepswallet/public/filter`, value);
};
export const aepsWalletsAll = (value) => {
  return axios.post(`${baseUrl}aepswallet/public/filter/all`, value);
};

export const aepsTrasactionReport = (value) => {
  return axios.post(`${baseUrl}aepsTxn/Public`, value);
};

export const aepsTrasactionReportAll = (value) => {
  return axios.post(`${baseUrl}aepsTxn/Public/all`, value);
};

export const aepsWalletTrasfer = (value) => {
  return axios.post(`${baseUrl}aepsTransfer/transfer`, value);
};
export const aepstransfer = () => {
  return axios.get(`${baseUrl}setting/aepsTrasfer`);
};

export const adharPay = (value) => {
  return axios.post(`${baseUrl}adhaarPay/Public`, value);
};
export const allDataadharPa = (value) => {
  return axios.post(`${baseUrl}adhaarPay/Public/all`, value);
};

export const quickDhan = (value) => {
  return axios.post(`${baseUrl}quickDhan/public`, value);
};
export const allquickDhan = (value) => {
  return axios.post(`${baseUrl}quickdhan/public/all`, value);
};
export const issueDisputeList = () => {
  return axios.get(`${baseUrl}dmtdisputeReasons/public`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};
export const issueDisputeListSumit = (value) => {
  return axios.post(`${baseUrl}dmtdisputes/add_dispute`, value);
};

export const ForgotPinGet = () => {
  return axios.get(`${baseUrl}auth/forgotPinSendOtp`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const ForgotPinOtp = (value) => {
  return axios.put(`${baseUrl}auth/forgotPinVerifyOtp`, value);
};

export const emailSinup = (value) => {
  console.log(value);
  return axios.post(`${baseUrl}auth/mb/verifyEmail`, value);
};
export const emailSinupOtp = (value) => {
  return axios.post(`${baseUrl}auth/mb/verifyEmailOtp`, value);
};


export const getPincodeDetails = (value) => {
  return axios.get(`${baseUrl}pin/pinCode/${value}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const notifications = (count, page) => {
  return axios.get(`${baseUrl}notification/summary/public`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const notificationsList = (count, page, read) => {
  return axios.get(`${baseUrl}notification/filter/public?count=${count}&page=${page}&readed=${read}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};


// onBoadingPart

export const UserPermissionAeps = () => {
  return axios.get(`${baseUrl}service_user_permission/isAvail/206`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};
export const UserPermissionAepsCashwithdraw = () => {
  return axios.get(`${baseUrl}service_user_permission/isAvail/207`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};
export const UserPermissionAepswithuiqueid = (serviceId) => {
  return axios.get(`${baseUrl}service_user_permission/isAvail/${serviceId}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const UserPermissionAeps2 = (value) => {
  return axios.get(`${baseUrl}service_user_permission/isAvail/${value}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const aepsOnboard = (value) => {
  return axios.post(`${baseUrl}aeps/onBoard`, value);
};

export const bankResiter = (value) => {
  return axios.post(`${baseUrl}aeps/bankRegister`, value);
};
export const dailyAuth = (value) => {
  return axios.post(`${baseUrl}aeps/bankAuth`, value);
};


export const balanceVerify = (value) => {
  return axios.post(`${baseUrl}aeps/balanceVerify`, value);
};
export const aepsBankList = () => {
  return axios.get(`${baseUrl}aeps/bankList`);
};

export const banktxnMerchantAuth = (value) => {
  return axios.post(`${baseUrl}aeps/banktxnMerchantAuth`, value);
};
export const bankWithdraw = (value) => {
  return axios.post(`${baseUrl}aeps/bankWithdraw`, value, {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`
    }
  });
};


export const miniStatement = (value) => {
  return axios.post(`${baseUrl}aeps/AepsMiniStatement`, value);
};
export const adhaarPay = (value) => {
  return axios.post(`${baseUrl}aeps/adhaarPay`, value);
};


// onBoadingPart



///Health and Support

export const department = () => {
  return axios.get(`${baseUrl}department/public`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};
export const dmtDisputePriority = () => {
  return axios.get(`${baseUrl}dmtDisputePriority/public`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};
export const relatedService = () => {
  return axios.get(`${baseUrl}service/public`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const addTicket = (value) => {
  return axios.post(`${baseUrl}dmtDisputes/add_dispute`, value);
};

export const listTicket = (value) => {
  return axios.post(`${baseUrl}dmtDisputes/public`, value);
};

export const dmtdisputechat = (value) => {

  return axios.get(`${baseUrl}dmtdisputechat/public?dispute_id=${value.id}&count=${value.count}&page=${value.page}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const repayTicket = (value) => {
  return axios.post(`${baseUrl}dmtdisputeChat/add_dispute/public`, value);
};


export const packList = () => {
  return axios.get(`${baseUrl}package/public`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const pacDetails = (id) => {
  return axios.get(`${baseUrl}package/public/${id}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const packageBuy = (value) => {
  return axios.post(`${baseUrl}packagePayment/pay`, value);
};



export const packageHistory = (value) => {
  console.log('fdgdgf', value);
  return axios.get(`${baseUrl}packagePayment/history?page=${value?.page}&count=${value?.count}&start_date=${value?.start_date}&end_date=${value?.end_date}&package_id=${value?.package_id}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

///Health and Support

// bbbps

export const bbpsCategory = () => {
  return axios.get(`${baseUrl}bbps/category/public?api_id=1`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};



export const bbps_txnElectri = (value) => {

  return axios.get(`${baseUrl}bbps_txn/public?start_date=${value?.start_date}&end_date=${value?.end_date}&biller_id=${value?.biller_id}&page=${value?.page}&count=${value?.count}&category_id=${value?.category}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const rechargeMember = (value) => {

  return axios.post(`${baseUrl}recharge/member`, value);
};


export const operatorApi = (value) => {
  console.log(value);

  return axios.get(`${baseUrl}operator/public?api_id=${1}&service=${value}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
}

export const operatorApiRecharge = (value) => {
  // console.log(value);

  return axios.get(`${baseUrl}recharge_txn/recharge`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
}

export const rechargeOperators = (value) => {
  // console.log(value);

  return axios.get(`${baseUrl}recharge_txn/rechargeOperators?servicetypeid=6683af280b801cb1adc7407a`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
}

export const dthrechargeOperators = (value) => {
  // console.log(value);

  return axios.get(`${baseUrl}recharge_txn/rechargeOperators?servicetypeid=667e8a8aa0cc9372aaceb002`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
}


export const mobilePlanDetails = (value) => {
  console.log(value);

  return axios.get(`${baseUrl}recharge_txn/mobilePlanDetails?mobileNo=${value}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
}

export const dthPlanDetails = (value) => {
  console.log('abc', value);

  return axios.get(`${baseUrl}recharge_txn/dthPlanDetails?operator_code=${value?.operator}&mobileNo=${value?.mobile}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
}

export const billPayRecharge = (value) => {
  return axios.post(`${baseUrl}recharge_txn/payBill`, value);
};

export const billPayment = (value) => {
  return axios.post(`${baseUrl}billPayment/billDetail`, value);
};

export const billPay = (value) => {
  return axios.post(`${baseUrl}billPayment/paybill`, value);
};

// bbbps

//tpin
export const generateOtpForTpin = () => {
  return axios.get(`${baseUrl}auth/generateOtpForTpin`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};
export const generateOtpForResendTpin = () => {
  return axios.get(`${baseUrl}auth/resendOtpForTpin`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const verifyOtpForTpin = (value) => {

  return axios.post(`${baseUrl}auth/varifyOtpForTpin`, value, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};
export const generatenewTpin = (value) => {

  return axios.post(`${baseUrl}auth/genNewTpin`, value, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};


export const cmsGeneral = (value) => {
  return axios.post(`${baseUrl}cms/general`, value);
};

export const qickDhan = (value) => {
  return axios.post(`${baseUrl}quickDhan/sendotp`, value);
};
export const qickDhanOtp = (value) => {
  return axios.post(`${baseUrl}quickDhan/verifyotp`, value);
};

export const cashDeposite = (value) => {
  return axios.post(`${baseUrl}aeps/Cashdeposit`, value);
};

export const authCertificate = () => {
  return axios.get(`${baseUrl}user/certificate`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};


export const aepsAdd = (value) => {
  return axiosInstancee.post(`${baseUrl}payout/addAccount`, value);
};

export const payoutBenefiaries = () => {
  return axios.get(`${baseUrl}payout/Benefiaries`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const payoutAccountEnquiry = (value) => {
  return axios.get(`${baseUrl}payout/account/enquiry/${value}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const payoutBankDelete = (value) => {
  return axios.delete(`${baseUrl}payout/bank/${value}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const payoutDoTransaction = (value) => {
  return axiosInstancee.post(`${baseUrl}payout/doTransaction`, value);
};
export const postNotification = (value) => {
  console.log(value, "------------value");
  return axios.post(`${baseUrl}fcm/save`, value);
};


//referid
export const onboardingRequest = (value) => {

  return axios.post(`${baseUrl}auth/onboardingRequest`, value, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

//loginresendotp

export const resendOtpsloginForm = (value) => {
  return axiosInstance.post(`${baseUrl}auth/mb/login/resendOtp`, value);
};
export const resendOtpslogin = (value) => {
  return axios.post(`${baseUrl}auth/resendOtp`, value);
};
export const resendOtpsforgetPassword = (value) => {
  return axios.post(`${baseUrl}auth/resendOtpForgotPass`, value);
};
export const resendOtpsTpin = (value) => {
  return axios.post(`${baseUrl}auth/resendOtpForgotPass`, value);
};





export const getDownstreamList = (page, count, id = '', filterData = {}) => {
  let url = `${baseUrl}user/referTo?page=${page}&count=${count}`;

  if (id) {
    console.log("id", id)
    url += `&id=${id}`;
  }

  // Add filter parameters to the URL
  if (filterData.userId) url += `&userId=${encodeURIComponent(filterData.userId)}`;
  if (filterData.name) url += `&name=${encodeURIComponent(filterData.name)}`;
  if (filterData.email) url += `&email=${encodeURIComponent(filterData.email)}`;
  if (filterData.mobile) url += `&mobile=${encodeURIComponent(filterData.mobile)}`;
  if (filterData.is_approved) url += `&is_approved=${filterData.is_approved}`;
  if (filterData.refer_id) url += `&refer_id=${encodeURIComponent(filterData.refer_id)}`;

  return axios.get(url, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};
export const getDownstreamListReport = (page, count, id = '') => {
  let url = `${baseUrl}report/fundtransfer?page=${page}&count=${count}&to=${id}`;

  // if (id) {
  //   url += `&id=${id}`;
  // }

  return axios.get(url, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};
export const getEarnings = (page, count, id = '') => {
  let url = `${baseUrl}report/fundtransfer?page=${page}&count=${count}&to=${id}`;
  if (id) {
    url += `&id=${id}`;
  }
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};
export const fundtransferToRefer = (value) => {
  return axios.post(`${baseUrl}user/fundTransferToRefer`, value, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};
// export const reversefundTransction = (value) => {
//   return axios.post(`${baseUrl}/user/fundReverseVerify`, value, {
//     headers: {
//       "Content-Type": "application/json; charset=UTF-8",
//       Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
//     },
//   });
// };

export const confirmReverseTransfer = async (data) => {
  return await axios.post(`${baseUrl}user/fundReverseVerify`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`
    }
  });
};

export const cassDepositApi = (value) => {
  return axios.get(`${baseUrl}aeps/cashDepositBankList`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const bbstxnInvoice = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}bbps_txn/invoice/${id}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching package invoice:', error);
    throw error;
  }
};
export const bpbsServiceList = async () => {
  try {
    const response = await axios.get(`${baseUrl}bbps_txn/allBbpsOperator`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching package invoice:', error);
    throw error;
  }
};

export const bpbsOperatorList = async (serviceId) => {
  try {
    const response = await axios.get(`${baseUrl}bbps_txn/getBbpsService`, {
      params: {
        service_id: serviceId
      },
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching BBPS operators:', error);
    throw error;
  }
};
export const bpbsAllServiceList = async () => {
  try {
    const response = await axios.get(`${baseUrl}service_user_permission/service/list`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching package invoice:', error);
    throw error;
  }
};

// export const ledgerReport = async (page, count, startDate, endDate) => {
//   try {
//     let url = `${baseUrl}dashboard/ledgerReport`;

//     const params = new URLSearchParams({
//       page: page.toString(),
//       count: count.toString()
//     });

//     if (startDate) {
//       params.append('start_date', startDate);
//     }

//     if (endDate) {
//       params.append('end_date', endDate);
//     }

//     url += `?${params.toString()}`;

//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching ledger report:', error);
//     throw error;
//   }
// };
// export const ledgerReportAll = async ( startDate, endDate) => {
//   try {
//     let url = `${baseUrl}dashboard/ledgerReport/all`;

//     const params = new URLSearchParams({

//     });

//     if (startDate) {
//       params.append('start_date', startDate);
//     }

//     if (endDate) {
//       params.append('end_date', endDate);
//     }

//     url += `?${params.toString()}`;

//     const response = await axios.get(url);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching ledger report:', error);
//     throw error;
//   }
// };



export const commissionServiceByReport = async (startDate, endDate) => {
  try {
    let url = `${baseUrl}dashboard/commisionReportByServicesForMerchantPanel?`;

    const params = new URLSearchParams();

    if (startDate) {
      params.append('start_date', startDate);
    }

    if (endDate) {
      params.append('end_date', endDate);
    }

    url += params.toString();

    // Retrieve the Bearer token from localStorage
    const token = localStorage.getItem('userToken');

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching commission report:', error);
    throw error;
  }
};
export const tdsServiceByReport = async (startDate, endDate) => {


  try {
    let url = `${baseUrl}dashboard/tdsReportByServicesForMerchan?`;

    const params = new URLSearchParams({

    });

    if (startDate) {
      params.append('start_date', startDate);
    }

    if (endDate) {
      params.append('end_date', endDate);
    }

    url += params.toString();

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching commission report:', error);
    throw error;
  }
};

export const chargeServiceByReport = async (startDate, endDate) => {
  try {
    let url = `${baseUrl}dashboard/chargeReportByServicesForMerchant?`;

    const params = new URLSearchParams();

    if (startDate) {
      params.append('start_date', startDate);
    }

    if (endDate) {
      params.append('end_date', endDate);
    }

    url += params.toString();

    // Retrieve the Bearer token from localStorage
    const token = localStorage.getItem('userToken');

    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching commission report:', error);
    throw error;
  }
};
// Usage:
export const demoapiCheck = async () => {
  return await axios.get(`${baseUrl}service_user_permission/service/list`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`
    }
  });
};
export const aepsInvoice = (id) => {
  return axios.get(`${baseUrl}aepstxn/${id}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};
export const cmdInvoice = (id) => {
  return axios.get(`${baseUrl}cms/invoice/6680005b29363ecd060746d3`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const payoutInvoice = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}payout/invoice/${id}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching package invoice:', error);
    throw error;
  }
};

export const getCmsData = (params) => {
  const urlParams = new URLSearchParams(params);

  // Get the value of the 'count' parameter
  let countValue = urlParams.get('count');

  // Parse countValue to an integer if it exists
  if (countValue !== null) {
    countValue = parseInt(countValue, 10);

    // Check if parsing was successful
    if (!isNaN(countValue)) {
      // Remove the original 'count' parameter
      urlParams.delete('count');
    } else {
      console.warn("Invalid 'count' parameter: not a number");
      // Remove invalid 'count' parameter
      urlParams.delete('count');
    }
  }

  // Convert URLSearchParams object to a string
  let queryString = urlParams.toString();

  // Append the count parameter as a number if it exists
  if (typeof countValue === 'number') {
    queryString += (queryString ? '&' : '') + `count=${countValue}`;
  }

  // Log the count value and its type
  console.log("Count value:", countValue);
  console.log("Data type of count:", typeof countValue);

  return axios.get(`${baseUrl}cms/public?${queryString}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};

export const getCmsAllData = (params) => {
  return axios.get(`${baseUrl}cms/public/all?${params}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};
export const getapyoutinenqury = (params) => {
  return axios.get(`${baseUrl}payout/trans/enquiry/${params}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${window.localStorage.getItem('userToken')}`,
    },
  });
};




// export const currencyAdd = (data) => {
//   return axiosInstance.post(`${baseUrl}currency/addcurrency`, data);
// };
// export const currencyList = (data) => {
//   return axiosInstance.get(`${baseUrl}currency`);
// };
// export const currencyDelete = (id) => {
//   return axiosInstance.delete(`${baseUrl}currency/deletecurrency/${id}`);
// };



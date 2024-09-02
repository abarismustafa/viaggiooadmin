import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  bankAccount,
  bankAccountSave,
  bankListApi,
  userValidateAllData,
} from "../../api/login/Login";
import { ToastContainer, toast } from "react-toastify";

export const BankDetail = ({
  setState,
  bankDetail,
  getVarifyallData,
  setSubmitVerified,
}) => {
  const [handleChange2, setHandleChange2] = useState("Saving");
  const [loader, setLoader] = useState(false);
  const [initailValue, setInitailValue] = useState({
    name: "",
    ifsc: "",
    remarks: "test",
    bankAccount: "",
    bank_id: "",
    phone: "",
    user_id: "",
    account_type: "",
  });

  // console.log("bank", bankDetail);
  const [errorValue, setErrorValue] = useState({});
  const [databankList, setDataBankList] = useState([]);
  const [bankId, setBankId] = useState(null);
  const [bankName, setBankName] = useState(null);
  const [isButtonDesible, setisButtonDesible] = useState(true);
  const [isVerifybutton, setIsVerifyButton] = useState(true);
  const [index, setIndex] = useState(0);
  const [isVarifyAccountHolder, setIsVarifyAccountHolder] = useState(false);
  const [isbank, setIsBank] = useState(false);

  const validation = (values) => {
    const error = {};
    const accountRegex = /^\d{9,18}$/i;
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/gm;

    if (!values.name) {
      error.name = "Name is Required!";
    }
    if (!values.phone) {
      error.phone = "Phone Number is Required!";
    }
    if (!values.bankAccount) {
      error.bankAccount = "Bank Account Number is Required!";
    } else if (!accountRegex.test(values.bankAccount)) {
      error.bankAccount = "Invalid Bank Account Number";
    }
    if (!values.ifsc) {
      error.ifsc = "IFSC Code is Required!";
    } else if (!ifscRegex.test(values.ifsc)) {
      error.ifsc = "Invalid Bank IFSC Code";
    }
    return error;
  };

  const toastSuccessMessage = (str) => {
    toast.success(`${str}`, {
      position: "top-center",
    });
  };

  const handleChange = (e) => {
    let name, value;

    if (e && e.target) {
      name = e.target.name;
      value = e.target.value;
    } else if (e) {
      name = "bank_id";
      value = e.value;
    } else {
      name = "bank_id";
      value = "";
    }

    // if (e.target.name == "phone") {
    //   if (e.target.value?.length == 11) {
    //     const clone = { ...initailValue };
    // clone[name] = value;
    // setInitailValue(clone);
    //     return;
    //   }
    // }

    const clone = { ...initailValue };
    clone[name] = value;
    setInitailValue(clone);

    if (name === "bank_id") {
      filterBank(value, clone);
    }
    if (
      bankDetail?.ifsc !== initailValue?.ifsc ||
      bankDetail?.bankAccount !== initailValue?.bankAccount ||
      bankDetail?.phone !== initailValue?.phone ||
      bankDetail?.name !== initailValue?.name ||
      bankDetail?.bank_id !== initailValue?.bank_id ||
      !isbank
    ) {
      setIsVerifyButton(true)
      console.log("api data cheak");

    }
    if (
      !initailValue?.ifsc ||
      !initailValue?.bankAccount ||
      !initailValue?.phone ||
      !initailValue?.name ||
      !initailValue?.bank_id ||
      !isbank
    ) {
      setIsVerifyButton(true)
      console.log("balnka data cheak");
    }
    else {
      setIsVerifyButton(false)
    }

  };

  const handleChangePhone = (e) => {
    const value = e.target.value
    const name = e.target.name
    if (e.target.name == "phone") {
      if (e.target.value?.length == 11) {
        return;
      }
    }
    const clone = { ...initailValue };
    clone[name] = value;
    setInitailValue(clone);
    if (
      
      !initailValue?.phone ||
      
      !isbank
    ) {
      setIsVerifyButton(true)
      console.log("balnka data cheak");
    }
    else {
      setIsVerifyButton(false)
    }
  }

  const handleVarifyAccountHolder = async (event) => {
    event.preventDefault();
    setLoader(true);
    const clone = {
      ...initailValue,
      user_id: window.localStorage.getItem("userToken"),
      account_type: handleChange2,
      bank_id: bankId,
      bank_name: bankName,
    };

    try {
      const res = await bankAccount(clone);
      if (res?.data?.data?.status === "ERROR") {
        alert(res?.data?.message);
        setLoader(false);
        return;
      }
      if (res?.data?.statusCode === "200") {
        setisButtonDesible(false);
        setInitailValue({
          ...initailValue,
          name: res.data.data.data.nameAtBank,
        });
        setIsVarifyAccountHolder(true);
        toastSuccessMessage("Bank Details Verified Successfully");
        setisButtonDesible(true);
        setIsVerifyButton(false)
      }
      if (res?.data?.error) {
        alert(res?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
    setLoader(false);
  };

  useEffect(() => {
    if (bankDetail?.bank_ifsc) {
      setInitailValue({
        name: bankDetail?.bank_account_name,
        ifsc: bankDetail?.bank_ifsc,
        remarks: "test",
        bankAccount: bankDetail?.bank_account_number,
        bank_id: bankDetail?.bank_id,
        phone: bankDetail?.phone,
        user_id: bankDetail?.user_id,
      });
      setBankId(bankDetail?.bank_id);
    }
    if (databankList.length) {
      const foundIndex = databankList.findIndex(
        (bank) => bank.bankID === bankDetail?.bank_id
      );
      setIndex(foundIndex);
      const selectedBank = databankList.find(
        (item) => item.bankID === bankDetail?.bank_id
      );
      setBnkSelect(selectedBank);
    }
  }, [bankDetail, databankList]);


  const bankList = async () => {
    try {
      const res = await bankListApi();
      const mapped = res?.data?.data?.map((item) => {
        return { ...item, value: item.bankID, label: item.bank_name };
      });
      setDataBankList(mapped);
    } catch (error) {
      console.error(error);
    }
  };

  const [bnkselec, setBnkSelect] = useState();
  const filterBank = (bankId, clone) => {
    const selectedBank = databankList.find((item) => item.bankID === bankId);
    setBnkSelect(selectedBank);
    if (selectedBank) {
      setInitailValue({ ...clone, ifsc: selectedBank?.ifsc_code });
      setBankId(selectedBank.bankID);

      setBankName(selectedBank.bank_name);
    } else {
      console.error("Selected bank not found");
    }
  };
  console.log(isbank, "is Bank");
  console.log(isVerifybutton, "is Bankcheak btn");
  const handleSave = async () => {
    const clone = {
      ...initailValue,
      bank_ifsc: initailValue.ifsc,
      account_type: handleChange2,
      bank_account_number: initailValue.bankAccount,
      bank_account_name: initailValue.name,
      bank_name: bnkselec?.bank_name,
      bank_id: bankId,
      user_id: window.localStorage.getItem("userIdToken"),
    };
    console.log("hello clicked 1");
    try {
      const res = await bankAccountSave(clone);
      if (res?.data?.statusCode == "200") {
        toastSuccessMessage(res?.data?.message);
        setisButtonDesible(false);
        setTimeout(() => {
          console.log("hello clicked 2");
          setState(4);
          window.localStorage.setItem("steps", 4);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    bankList();
  }, [bankDetail]);
  console.log(bankDetail);
  const backButton = async () => {
    setState(2);
    window.localStorage.setItem("steps", 2);
    const res = await userValidateAllData();
    setIsBank(res?.data?.is_bank)
    if (res?.data?.data?.isGstAvailable) {
      setSubmitVerified(true);
    }
  };
  useEffect(() => {
    if (!isbank) {
      setIsVerifyButton(false)
    }
    else {
      setIsVerifyButton(true)
    }
  }, [isbank])
  useEffect(() => {
    if (
      bankDetail?.ifsc !== initailValue?.ifsc ||
      bankDetail?.bankAccount !== initailValue?.bankAccount ||
      bankDetail?.phone !== initailValue?.phone ||
      bankDetail?.name !== initailValue?.name ||
      bankDetail?.bank_id !== initailValue?.bank_id ||
      !isbank
    ) {
      setIsVerifyButton(false)
      console.log("api data cheak");

    }
    if (
      !initailValue?.ifsc ||
      !initailValue?.bankAccount ||
      !initailValue?.phone ||
      !initailValue?.name ||
      !initailValue?.bank_id ||
      !isbank
    ) {
      setIsVerifyButton(false)
      console.log("balnka data cheak");
    }
    else {
      setIsVerifyButton(true)
    }
  }, [])

  const handlePaste = (event) => {
    event.preventDefault();
  };

  console.log(bankDetail, "bankdetails------------------");
  return (
    <div className="container">
      <h6 style={{ margin: "15px 0", textAlign: "center" }}>
        Add Your Bank Account
      </h6>
      <p>
        Please enter your savings or current account details below. Ensure that
        the account holder's name matches the name on your PAN card.
      </p>
      <form className="row">
        <div className="col-6 mb-3 clrelative">
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            name="name"
            value={initailValue.name}
            placeholder="Enter Name"
            onChange={handleChange}
          />
          <p style={{ color: "red", marginBottom: "2px" }}>{errorValue.name}</p>
        </div>

        <div className="col-6 mb-3 clrelative">
          <Select
            options={databankList}
            defaultValue={bnkselec}
            value={bnkselec}
            onChange={handleChange}
            placeholder="Select Bank"
            isClearable
            isSearchable
            styles={{
              control: (base) => ({
                ...base,
                borderColor: "blue",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "darkblue",
                },
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "lightblue" : "white",
                color: "black",
                "&:hover": {
                  backgroundColor: "darkblue",
                  color: "white",
                },
              }),
            }}
          />
          <p style={{ color: "red", marginBottom: "2px" }}>
            {errorValue.bank_id}
          </p>
        </div>

        <div className="col-6 mb-3 clrelative">
          <input
            type="text"
            className="form-control"
            name="ifsc"
            value={initailValue.ifsc}
            placeholder="Enter IFSC"
            onChange={handleChange}
          />
          <p style={{ color: "red", marginBottom: "2px" }}>{errorValue.ifsc}</p>
        </div>

        <div className="col-6 mb-3 clrelative">
          <input
            type="number"
            className="form-control"
            name="phone"
            value={initailValue.phone}
            placeholder="Enter Phone Number"
            onChange={handleChangePhone}
            onPaste={handlePaste}
          />
          <p style={{ color: "red", marginBottom: "2px" }}>
            {errorValue.phone}
          </p>
        </div>

        <div className="col-6 mb-3 clrelative">
          <input
            type="number"
            className="form-control"
            name="bankAccount"
            value={initailValue.bankAccount}
            placeholder="Enter Account Number"
            onChange={handleChange}
          />
          <p style={{ color: "red", marginBottom: "2px" }}>
            {errorValue.bankAccount}
          </p>
        </div>

        <div className="row">
          <h6>Select Account Type</h6>
          <div className="form-check" style={{ marginLeft: "25px" }}>
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              checked={handleChange2 === "Saving"}
              onChange={() => setHandleChange2("Saving")}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Saving
            </label>
          </div>
          <div className="form-check" style={{ marginLeft: "25px" }}>
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              checked={handleChange2 === "Current"}
              onChange={() => setHandleChange2("Current")}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Current
            </label>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
          }}
        >
          <button
            type="button"
            onClick={backButton}
            // style={{ backgroundColor: "#2E3191" }}
            className={`${isVarifyAccountHolder
              ? "btn btn-info not-allowed"
              : "btn btn-secondary "
              } text-white`}
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleVarifyAccountHolder}
            // style={{ backgroundColor: "#2E3191" }}
            disabled={
              !initailValue?.ifsc ||
              !initailValue?.bankAccount ||
              !initailValue?.phone ||
              !initailValue?.name ||
              !initailValue?.bank_id ||
              !isVerifybutton
            }
            className={`btn btn-primary text-white`}
          >
            Verify Account Holder
            {loader && (
              <div className="spinner-border mx-2" role="status" style={{ width: "20px", height: "20px" }}>
              </div>
            )}

          </button>

          <button
            type="button"
            onClick={handleSave}
            // style={{ backgroundColor: "#2E3191" }}
            className={`${isVerifybutton ? "btn btn-danger not-allowed" : "btn btn-success"} text-white`}
            // className="btn btn-success"
            disabled={
              isVerifybutton
            }
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

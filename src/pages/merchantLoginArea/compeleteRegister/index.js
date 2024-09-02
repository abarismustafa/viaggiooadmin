import { Steps } from "antd";
import MerchantLoginAreaBanner from "../../../common/merchantLoginAreaBanner/MerchantLoginAreaBanner";
import MerchantLoginHeader from "../../../common/merchantLoginHeader/MerchantLoginHeader";
import { TopSection } from "../../../components/compeleteRegister/TopSection";
import { useEffect, useState } from "react";
import { UploadDoc } from "../../../components/compeleteRegister/UploadDoc";
import { VedioKyc } from "../../../components/compeleteRegister/VedioKyc";
import { FirstForm } from "../../../components/compeleteRegister/FirstForm";
import { SecForm } from "../../../components/compeleteRegister/SecForm";
import { GstBusinessForm } from "../../../components/compeleteRegister/GstBusinessForm";
import { BankDetail } from "../../../components/compeleteRegister/BankDetail";
import { userValidate, userValidateAllData } from "../../../api/login/Login";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../components/compeleteRegister/kyc.css";

function CompeleteRegister() {
  const [submitVerified, setSubmitVerified] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [state, setState] = useState(0);
  const [datas, setDatas] = useState();
  const [allData, setAllData] = useState(null);
  const [backBtnFun, setBackBtn] = useState(true);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  const items = [
    { title: "Identity Verification" },
    { title: "Personal Details" },
    { title: "GST & Business Details" },
    { title: "Bank Details" },
    { title: "Upload Document" },
    { title: "Video KYC" },
  ];

  const getVarifyall = async (num) => {
    try {
      setIsLoading(true);
      const res = await userValidate();
      setDatas(res.data);
      window.localStorage.setItem("regisNumber", res.data?.mobile);
      //   if (res.data?.isIdentity_verified && res.data?.adhaarVerified) setState(1);
      //   if (res.data?.is_personalDetails) setState(2);
      //   if (res.data?.is_gst) setState(3);
      //   if (res.data?.is_bank) setState(4);

      window.localStorage.setItem("steps", num);
      setState(num);

      if (res.data?.is_document) {
        if (state == 5) {
          setState(5);
          setModalShow(true);
        }
      }
      if (
        res.data?.is_self_declare === true &&
        res.data?.is_approved === false
      ) {
        navigate("/is_self_declare");
      }
      if (res.data?.is_approved === true) {
        navigate("/Dashboard");
      }
    } catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const getVarifyallData = async () => {
    try {
      const res = await userValidateAllData();
      setAllData(res.data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const completeSteps = window.localStorage.getItem("steps");
    completeSteps === "null" ? getVarifyall(0) : getVarifyall(+completeSteps);
    getVarifyallData();
  }, [state]);

  const backButton = () => {
    setState((prevState) => Math.max(prevState - 1, 0));
  };
  const [currentPage, setCurrentPage] = useState('/');

  const location = useLocation()

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <>
      <MerchantLoginHeader currentPage={currentPage} />
      <MerchantLoginAreaBanner title="Merchant Create account" />
      <section className="my-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 ">
              <TopSection />
              <Steps current={state} labelPlacement="vertical" items={items} />
              <div className="firstFor">
                {state == 0 && (
                  <FirstForm
                    datas={datas}
                    setState={setState}
                    state={state}
                    getVarifyall={() => getVarifyall(state)}
                    adhaar_number={allData?.adhaar_number}
                    allData={allData}
                    backButton={backButton}
                  />
                )}
                {state == 1 && (
                  <SecForm
                    setState={setState}
                    stepCount={state}
                    persnalData={allData?.alternate_mobileNo}
                    allData={allData}
                    getVarifyallData={getVarifyallData}
                    submitVerified={submitVerified}
                    setSubmitVerified={setSubmitVerified}
                    backButton={backButton}
                  />
                )}
                {state == 2 && (
                  <GstBusinessForm
                    setState={setState}
                    state={state}
                    gstData={{
                      ...allData?.gst,
                      isGstAvailable: allData?.isGstAvailable,
                      shop_name: allData?.shop_name,
                    }}
                    getVarifyallData={getVarifyallData}
                    allData={allData}
                    submitVerified={submitVerified}
                    setSubmitVerified={setSubmitVerified}
                    backButton={backButton}
                  />
                )}
                {state == 3 && (
                  <BankDetail
                    setState={setState}
                    state={state}
                    bankDetail={allData?.bank}
                    getVarifyallData={getVarifyallData}
                    submitVerified={submitVerified}
                    setSubmitVerified={setSubmitVerified}
                    backButton={backButton}
                  />
                )}
                {state == 4 && (
                  <UploadDoc
                    setState={setState}
                    docs={allData?.docs}
                    modalShow={modalShow}
                    setModalShow={setModalShow}
                    backButton={backButton}
                    backBtnFun={backBtnFun}
                    setBackBtn={setBackBtn}
                  />
                )}
                {state == 5 && (
                  <VedioKyc
                    datas={datas}
                    setState={setState}
                    modalShow={modalShow}
                    setModalShow={setModalShow}
                    backButton={backButton}
                    setBackBtn={setBackBtn}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CompeleteRegister;



import { useEffect, useRef, useState } from 'react';
import img1 from '../../../../asesets/banner/package.jpg'
import BuyPackage from './buyPackage/BuyPackage'
import { useNavigate, useParams } from 'react-router-dom';
import { pacDetails, packageBuy,packageinvoice} from '../../../../api/login/Login';
import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import './Packagedetail.css';
import Invoice from './Invoice';
import ServiceOperatorList from './Bbpslist';
import { Form, Card, Badge, Row, Col,Alert } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

import { TreeSelect, Table,Typography, Divider, Empty, Button, Spin, Collapse, Pagination } from 'antd';
const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const ItemsPerPage = 10;
function PackageDetails({walletShowHeader,walletData2}) {

    const navigate = useNavigate()

    const [show, setShow] = useState(false);

  
    
    const handleShow = () => setShow(true);
    const param = useParams()
    // console.log(param?.id);
    const [dataDetails, setDataDetails] = useState(null)

    // console.log(dataDetails);

    const [saleRate, setSaleRate] = useState(null)
    const [waletsData, setwaletsData] = useState(null)
    const [message2, setMessage2] = useState('');
    console.log('fvfdvdf', waletsData);

    const [totalData, setTotalData] = useState();
    const [gstamount, setGstAmount] = useState();
    const [showInvoice, setShowInvoice] = useState(false);
    const [isCongratsModalVisible, setIsCongratsModalVisible] = useState(false);

    const handleCloseInvoice = () => setShowInvoice(false);
    const handleOpenInvoice = () => setShowInvoice(true);



    const [isLoading, setIsLoading] = useState(false);
    const [currentPages, setCurrentPages] = useState({});
  const userType = window.localStorage.getItem("userType")
    useEffect(() => {
      if (dataDetails?.OtherComm) {
        const initialPages = dataDetails.OtherComm.reduce((acc, item) => {
          acc[item._id] = 1;
          return acc;
        }, {});
        setCurrentPages(initialPages);
      }
    }, [dataDetails]);
  
    const handlePageChange = (page, serviceId) => {
      setCurrentPages(prevPages => ({
        ...prevPages,
        [serviceId]: page
      }));
    };
  
    const getColumns = () => [
      {
        title: 'S No.',
        key: 'index',
        render: (text, record, index) => index + 1,
        onHeaderCell: () => ({
          style: {
            backgroundColor: '#cfe2ff',
          },
        }),
      },
      {
        title: 'Start Amount',
        dataIndex: 'start_amt',
        key: 'start_amt',
        onHeaderCell: () => ({
          style: {
            backgroundColor: '#cfe2ff',
          },
        }),
      },
      {
        title: 'End Amount',
        dataIndex: 'end_amt',
        key: 'end_amt',
        onHeaderCell: () => ({
          style: {
            backgroundColor: '#cfe2ff',
          },
        }),
      },
      { 
        title: userType === "Super Distributor" ? "Super Distributor Commission" :
               userType === "Distributor" ? "Distributor Commission" :
               "Retailer Commission",
        dataIndex: userType === "Super Distributor" ? "master_distributer_com" :
                   userType === "Distributor" ? "distributor_comm" :
                   "commision",
        key: 'commission',
        onHeaderCell: () => ({
          style: {
            backgroundColor: '#cfe2ff',
          },
        }),
      },
      {
        title: userType === "Super Distributor" ? "Super Distributor Commission Type" :
               userType === "Distributor" ? "Distributor Commission Type" :
               "Retailer Commission Type",
        dataIndex: userType === "Super Distributor" ? "master_distributer_com_type" :
                   userType === "Distributor" ? "distributor_comm_type" :
                   "commision_type",
        key: 'commissionType',
        onHeaderCell: () => ({
          style: {
            backgroundColor: '#cfe2ff',
          },
        }),
      }
    ];
  
    const renderOtherCommTables = () => {
      if (!dataDetails?.OtherComm || dataDetails.OtherComm.length === 0) {
        return <Empty description="No commission data available" />;
      }
  
      return dataDetails.OtherComm.map((service) => {
        const currentPage = currentPages[service._id] || 1;
  
        return (
          <div key={service._id}>
            <Title level={4}>{service.service}</Title>
            {/* <Paragraph>Commission Name: {service.commision_name}</Paragraph> */}
            <Table
              dataSource={service.commision}
              columns={getColumns()}
              pagination={{
                current: currentPage,
                pageSize: ItemsPerPage,
                total: service.commision.length,
                onChange: (page) => handlePageChange(page, service._id)
              }}
              rowKey="_id"
              scroll={{ x: true }}
            />
            <Divider />
          </div>
        );
      });
    };

   

    const packageDetail = async () => {
        
        try {
            const res = await pacDetails(param?.id)
            setDataDetails(res?.data?.data)
            changeHandle(res?.data?.data?.prices[0])
        } catch (error) {

        }
    }

    function createMarkup(data) {
        return { __html: data };
    }

    const length = 4
    const [otp, setOtp] = useState(new Array(length).fill(''));
    // console.log(otp);

    let str = ''
    for (let index = 0; index < otp.length; index++) {
        const element = otp[index];
        str = str + element
    }

    console.log(str);

    const inputs = useRef([]);

    const otpChandleChange = (index, value) => {
        // const input = value.replace(/[^0-9+]/g, '');
        const newOtp = [...otp];
        if (value.length == 2) {
            return
        }
        newOtp[index] = value;
        setOtp(newOtp);


        // Move to the next input field if there's a value
        if (value && inputs.current[index + 1]) {
            inputs.current[index + 1].focus();
        }

    };

    const handleKeyDown = (index, e) => {
        // Move to the previous input field if backspace is pressed and the input is empty
        if (e.key === 'Backspace' && !otp[index] && inputs.current[index - 1]) {
            inputs.current[index - 1].focus();
        }
    };





    const [initialValue, setInitialValue] = useState({
        package_id: '',
        tpin: '',
        price: '',
        user_id: ''
    })

    console.log(initialValue);

    const changeHandle = (item) => {
        setSelectedPrice(item);
        console.log(item);
        setSaleRate(item)
        const clone = { ...initialValue, price: item?._id }
        console.log(clone);
        setInitialValue(clone);
    }
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };


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


    const payPackage = async () => {
        setIsLoading(true);
        const clone = { ...initialValue, package_id: param?.id, tpin: str, user_id: window.localStorage.getItem("userIdToken") };
        try {
            const res = await packageBuy(clone);
            console.log("paypakage", res);
            if (res?.data?.error === true) {
                if (res?.data?.message === "Pin Not matched") {
                    toastErrorMessage("PIN not matched");
                } else if (res?.data?.message === "Not enough amount in your wallet") {
                    toastErrorMessage("Not enough amount in your wallet");
                } else {
                    toastErrorMessage(res?.data?.message);
                    handleClose();
                }
            } else if (res?.data?.error === false) {
                toastSuccessMessage(res?.data?.message);
                if (walletShowHeader) walletShowHeader();
                handleClose();
                setIsCongratsModalVisible(true);
                
                // setTimeout(() => {
                //     handleClose();
                //     navigate('/package-list');
                //   }, 1000); 
                
            }
        } catch (error) {
            console.error("Error in payPackage:", error);
            toastErrorMessage("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    const waletsShow = async () => {
        try {
            // const res = await userValidate()
            // setwaletsData(res?.data);
            // console.log("response,",res)


            const gstAmount = ((saleRate?.sale_rate ?? 0) * 0.18).toFixed(2);

            setGstAmount(gstAmount)
            const totalamountwithGst = saleRate?.sale_rate + gstAmount;



            const totalData = (walletData2?.main_wallet - totalamountwithGst).toFixed(2);

            setTotalData(totalData)
        } catch (error) {

        }
    }
    const handleClose = () => {
        setShow(false);
        setOtp(new Array(length).fill(''));
    };




    useEffect(() => {
        packageDetail()
    }, [])
    useEffect(() => {
        waletsShow()
    }, [saleRate])
    console.log("dataDetails", dataDetails);
    console.log("waletsData2", walletData2);
    console.log("saleRate", saleRate);
    const isPurchasePackage = dataDetails?.isPurchased;
   
    const isPurchaseDisabled = !isChecked || (selectedPrice && selectedPrice.isPaid);
    const formatExpirationDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
      };
      useEffect(() => {
        // Initialize current pages for each table
        if (dataDetails?.OtherComm) {
          const initialPages = dataDetails.OtherComm.reduce((acc, item) => {
            acc[item._id] = 1;
            return acc;
          }, {});
          setCurrentPages(initialPages);
        }
      }, [dataDetails]);
    
   
    return (
        <>
            <div className="PageHeading">
                <h1>Package Details</h1>
            </div>
            <div className="ContentArea">
                <h3>{dataDetails?.package_name}</h3>
                <div className="card">
                    <div className="card-header card-header-plannhrad">
                        <h2 className='plannhrad'>Subscription Plan</h2>
                    </div>
                    <div className="card-body">
                        <div className="form-row">
                            {/* <div className="col-lg-6">
                                <div className="image-banner">
                                    <img src={img1} alt="" />
                                </div>
                            </div> */}
                            <div className="col-lg-12">
                                <div className='details-set'>
                                <h3>{dataDetails?.package_name}</h3>
        <Card>
         
          <div className="card-body">
            <div className="form-row">
              <div className="col-lg-12">
                <div className='details-set'>
                  <p>
                    <div
                      className="products-details-tab-content"
                      dangerouslySetInnerHTML={createMarkup(
                        dataDetails?.description
                      )}
                    />
                  </p>
                  
                  {dataDetails?.BBPSWiseServices?.length > 0 && (
                    <Collapse>
                      <Panel header="BBPS Services" key="1">
                        <ServiceOperatorList 
                          BBPSWiseServices={dataDetails.BBPSWiseServices} 
                          dataDetails={dataDetails}
                        />
                      </Panel>
                    </Collapse>
                  )}

                  {dataDetails?.OtherComm?.length > 0 && (
                    <Collapse className='mt-2'>
                      <Panel header="Commissions" key="2">
                        {renderOtherCommTables()}
                      </Panel>
                    </Collapse>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
                                   


                   
                              <div>
            { dataDetails?.isPaid === true && dataDetails?.prices?.length > 0 && (
                 <Card className="mt-3">
                 <Card.Header>
                   <h4 className="mb-0">Subscription Plans</h4>
                 
                 </Card.Header>
                 <Card.Body>
                   <Form>
                     <Row>
                       {dataDetails.prices.map((item, i) => (
                         <Col key={item?._id} md={6} lg={4} className="mb-3">
                           <Card>
                             <Card.Body style={{minHeight:'2rem'}}>
                               <Form.Check
                                 type="radio"
                                 id={item?._id}
                                 name="package_id"
                                 label={
                                   <div>
                                     <strong>{item?.duration} {item?.duration_type}</strong>
                                     <div>
                                       <Badge variant="success" className="mr-2">
                                        Our Offer: ₹{item?.sale_rate}
                                       </Badge>
                                       <Badge variant="secondary">
                                         MRP: <strike>₹{item?.mrp}</strike>
                                       </Badge>
                                     </div>
                                     <small className="text-muted">
                                       + {item?.tax} {item?.tax_type} Tax
                                     </small>
                                   </div>
                                 }
                                 defaultChecked={i === 0}
                                 onChange={() => changeHandle(item)}
                               />
                             </Card.Body>
                           </Card>
                         </Col>
                       ))}
                     </Row>
                   </Form>
                 </Card.Body>
               </Card>
            )}
            {/* {dataDetails?.isPurchased === "true" && (
    <p>Expiry Date: {new Date(dataDetails?.history).toLocaleString()}</p>
)} */}

            <div className='mt-3 ConditionsTerm'>
                <h4 style={{ fontSize: '12px' }}><strong>Terms & Conditions</strong></h4>
                <ul>
                    <li>1. The subscription's validity is only valid for 30/90/180/365 days after the date of purchase.</li>
                    <li>2. Your wallet will be debited for the amount automatically renewed when your subscription expires.</li>
                    <li>3. The Retailer will be switched to the same plan on the same day if he cancels the subscription at any moment.</li>
                    <li>4. After being deducted, subscription fees are not refundable.</li>
                </ul>
                <div className="form-check">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="flexCheckDefault" 
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        I agree to the terms and Conditions.
                    </label>
                </div>
            </div>

            {dataDetails?.isPurchased ? (
                <Alert variant="info">
                  Expiration Date: {formatExpirationDate(dataDetails?.history)}
                </Alert>
              ) : null}

            {!dataDetails?.isPaid ? null : (
                                        <div className='buy-now'>
                                            <button
                                                type='button'
                                                className='btn btn-success'
                                                disabled={!isChecked}
                                                onClick={handleShow}
                                            >
                                                BUY
                                            </button>
                                        </div>
                                    )}
        </div>


                                    {/* )} */}

                                    {/* <div className='buy-now'>
                                        <button
                                            type='button'
                                            className='btn btn-success'
                                            disabled={!isChecked}
                                            onClick={handleShow}
                                        >
                                            BUY
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <BuyPackage
                show={modalShow}
                onHide={() => setModalShow(false)}
                otp={otp}
                otpChandleChange={otpChandleChange}
                handleKeyDown={handleKeyDown}
                inputs={inputs}
            /> */}



     
{/* <Modal
  size="lg"
  show={show}
  onHide={handleClose}
  backdrop="static"
  keyboard={false}
  className="bpbs-modal"
  style={{
    zIndex: 1050,
   
  }}
>
  <Modal.Header closeButton className="bpbs-modal-header">
    <Modal.Title id="contained-modal-title-vcenter">
      Package Purchase
    </Modal.Title>
  </Modal.Header> */}
  {/* <Modal.Body className="bpbs-modal-body" style={{
    backgroundColor: '#ffffff',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
  }}>
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-md-4 bpbs-info-item">
          <h5 className="bpbs-info-title">Current Amount</h5>
          <p className="bpbs-info-value">₹ {waletsData?.main_wallet ?? 0}</p>
        </div>
        <div className="col-md-4 bpbs-info-item">
          <h5 className="bpbs-info-title">Package Amount</h5>
          <p className="bpbs-info-value">₹ {saleRate?.sale_rate ?? 0} + {gstamount}</p>
        </div>
        <div className="col-md-4 bpbs-info-item">
          <h5 className="bpbs-info-title">Available Amount</h5>
          <p className="bpbs-info-value">₹ {totalData}</p>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12">
          <div className="form-group text-center">
            <label htmlFor="txtCnfPassword" className="bpbs-tpin-label">Enter Tpin <span className="text-danger">*</span></label>
            <div className="d-flex justify-content-center mt-3 mb-4">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="password"
                  value={value}
                  onChange={(e) => otpChandleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(input) => (inputs.current[index] = input)}
                  className="bpbs-tpin-input"
                />
              ))}
            </div>
            <button
              type="button"
              className={`btn btn-lg ${str.length !== 4 ? 'btn-secondary' : 'btn-primary'} bpbs-pay-button`}
              disabled={str.length !== 4 || isLoading}
              onClick={payPackage}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing...
                </>
              ) : (
                'PAY NOW'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Modal.Body> */}
  
{/* </Modal> */}
<Modal className="pkg-details-modal"
size="lg"
show={show}
onHide={handleClose}
backdrop="static"
keyboard={false}

style={{
  zIndex: 1050,
 
}}>
  <Modal.Header closeButton className="pkg-details-header">
    <Modal.Title className="pkg-details-title">Package Purchase Details</Modal.Title>
  </Modal.Header>
  <Modal.Body className="pkg-details-body">
    <div className="pkg-info-grid">
      <div className="pkg-info-item">
        <div className="pkg-info-label">Current Balance</div>
        <div className="pkg-info-value">₹ {walletData2?.main_wallet ?? 0}</div>
      </div>
      <div className="pkg-info-item">
        <div className="pkg-info-label">Available Balance</div>
        <div className="pkg-info-value">₹ {walletData2?.main_wallet - saleRate?.real_value}</div>
      </div>
    </div>
    
    <div className="pkg-details-table">
      <table>
        <tbody>
          <tr>
            <td>MRP</td>
            <td>₹ {saleRate?.mrp ?? 0}</td>
          </tr>
          <tr>
            <td>Sale Price</td>
            <td>₹ {saleRate?.sale_rate ?? 0}</td>
          </tr>
          <tr>
            <td>Tax ({saleRate?.tax ?? 0}{saleRate?.tax_type})</td>
            <td>₹ {(saleRate?.sale_rate * saleRate?.tax / 100).toFixed(2)}</td>
          </tr>
          <tr className="total-row">
            <td>Total Amount</td>
            <td>₹ {saleRate?.real_value ?? 0}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div className="pkg-tpin-section">
      <label className="pkg-tpin-label">Enter Tpin <span className="text-danger">*</span></label>
      <div className="pkg-tpin-inputs">
        {otp.map((value, index) => (
          <input
            key={index}
            type="password"
            value={value}
            onChange={(e) => otpChandleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(input) => (inputs.current[index] = input)}
            className="pkg-tpin-input"
          />
        ))}
      </div>
      <button
        type="button"
        className="pkg-pay-button"
        disabled={str.length !== 4 || isLoading}
        onClick={payPackage}
      >
        {isLoading ? 'Processing...' : 'PAY NOW'}
      </button>
    </div>
  </Modal.Body>
</Modal>
            <Modal
                size="lg"
                show={showInvoice}
                onHide={handleCloseInvoice}
                backdrop="static"
                keyboard={false}
                className="invoice-modal"
                
                style={{
                  zIndex: 1050,
                 
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Invoice</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
    backgroundColor: '#ffffff',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
  }}>
                    <Invoice />
                </Modal.Body>
            </Modal>
            <Modal
            style={{
              zIndex: 1050,
             
            }}

  show={isCongratsModalVisible} 
  onHide={() => {
    setIsCongratsModalVisible(false);
    navigate('/package-list');
  }}
 
  centered
  className="pkg-congrats-modal"
><Modal.Body className="pkg-congrats-modal__body">
          <button className="pkg-congrats-modal__close" onClick={() => {
    setIsCongratsModalVisible(false);
    navigate('/package-list');
  }}>×</button>
          <div className="pkg-congrats-modal__content">
            <div className="pkg-congrats-modal__icon-container">
              <FaStar style={{ color: 'gold' }} className="pkg-congrats-modal__icon" />
            </div>
            <h2 className="pkg-congrats-modal__title">Package Buy Successfully</h2>
            <p className="pkg-congrats-modal__message">The new package has been successfully assigned . You can now enjoy enhanced features and benefits!</p>
            <button className="pkg-congrats-modal__button" onClick={() => {
    setIsCongratsModalVisible(false);
    navigate('/package-list');
  }}>CONTINUE</button>
          </div>
        </Modal.Body>



</Modal>

            <ToastContainer />
        </>
    )
}
export default PackageDetails
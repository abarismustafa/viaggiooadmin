
import { useEffect, useState } from 'react'
import '../companyBankdetails/companyBankdetails.css'
import { bankPublic } from '../../../api/login/Login'
function CompanyBankDetails() {
    const [data, setData] = useState(null)
    const detailsBank = async () => {
        try {
            const res = await bankPublic()
            setData(res?.data?.data);
        } catch (error) {

        }

    }
    useEffect(() => {
        detailsBank()
    }, [])
    return (
        <>
            <div className="PageHeading">
                <h1>Company Bank Details</h1>
            </div>
            <div className="ContentArea">
                <div className='form-row'>
                    {data && data?.map((item) => {
                        console.log(item);
                        return <div className='col-lg-4 '>
                            <div className="cardd mt-4" >
                                <div className="card-inner">
                                    <div className="front">
                                        <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" />
                                        {/* <div className="rows">
                            <img src="https://i.ibb.co/G9pDnYJ/chip.png" width="60px" />
                            <img src="https://i.ibb.co/WHZ3nRJ/visa.png" width="60px" />
                        </div> */}
                                        <div className="rows card-no">
                                            <p>Bank Name</p>
                                            <p>{item?.bank_name}</p>
                                        </div>
                                        <div className="rows card-holder card-no">
                                            <p>Bank Account Number</p>
                                            <p>{item?.bank_account_number}</p>
                                        </div>
                                        <div className="rows name card-no">
                                            <p>IFSC Code</p>
                                            <p>{item?.ifsc_code}</p>
                                        </div>

                                        <div className="rows name card-no">
                                            <p>Bank Code</p>
                                            <p>{item?.bank_code}</p>
                                        </div>
                                        <div className="rows name card-no">
                                            <p>Branch Name</p>
                                            <p>{item?.branch_name}</p>
                                        </div>
                                        {/* <div className="rows name card-no">
                                <p>Bank Id</p>
                                <p>10 / 25</p>
                            </div>
                            <div className="rows name card-no">
                                <p>Active</p>
                                <p>10 / 25</p>
                            </div> */}
                                    </div>
                                    {/* <div className="back">
                            <img src="https://i.ibb.co/PYss3yv/map.png" className="map-img" />
                            <div className="bar" />
                            <div className="rows card-cvv">
                                <div>
                                    <img src="https://i.ibb.co/S6JG8px/pattern.png" />
                                </div>
                                <p>824</p>
                            </div>
                            <div className="rows card-text">
                                <p>this is a virtual card design using HTML and CSS. You can aslo design something like this.</p>
                            </div>
                            <div className="rows signature">
                                <p>CUSTOMER SIGNATURE</p>
                                <img src="https://i.ibb.co/WHZ3nRJ/visa.png" width="80px" />
                            </div>
                        </div> */}
                                </div>

                            </div>
                            <div style={{ color: 'black', marginTop: '5px' }}>
                                Remarks:
                            </div>
                        </div>
                    })}

                </div>
            </div>


        </>
    )
}
export default CompanyBankDetails
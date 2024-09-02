
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getShippingAddress, getShippingAddressDelete } from "../../../api/login/Login";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
const toastSuccessMessage = (str) => {
    toast.success(`${str}`, {
        position: "top-center"
    })
};
function Shipping_Address() {
    const [data, setData] = useState(null);
    const getData = async () => {
        try {
            const res = await getShippingAddress()
            setData(res.data);
        } catch (error) {
            alert("Server Error Failed To load Data");
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const navigate = useNavigate()
    const setIdAddresdEdit = (id) => {
        navigate(`/admin/shipping_AddressaForm/${id}`)
    }

    const deleteAddress = async (id) => {
        try {
            await getShippingAddressDelete(id)
            toastSuccessMessage('Address Delete Successfully')
            getData()
        } catch (error) {
            alert('Address Not Delete')
        }
    }

    return (
        <div className="addressInfo mt-3">
            {/* {isLoading && (
        <div className="preloaderCount">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )} */}
            <ToastContainer />
            <div className="card container" style={{ margin: "10px auto" }}>
                <div className="card-header">
                    <h5 className="mb-0 h6">Shipping Address</h5>
                </div>
                <div className="card-body">
                    <div className="col-lg-3 mx-auto">
                        <div className="border p-3 rounded mb-3 c-pointer text-center bg-light">
                            <i className="la la-plus la-2x" />
                            <div
                                className="alpha-7"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                            >
                                <Link to='/admin/shipping_AddressaForm'>  Add Shipping Address</Link>
                            </div>
                        </div>
                    </div>
                    <div className="row gutters-10">
                        {/* {!data && <div className="preloaderCount">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>} */}
                        {data &&
                            data?.data.map((item) => {
                                return (
                                    <div className="col-lg-6" key={item._id}>
                                        <div className="border p-3 pr-5 rounded mb-3 position-relative">
                                            <h6
                                                style={{
                                                    fontSize: "17px",
                                                    fontWeight: "bold",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                }}
                                            >
                                                Type :{item?.type} Address
                                                <div className="form-check form-switch d-flex">
                                                    <FaEdit
                                                        onClick={() => {
                                                            setIdAddresdEdit(item._id);
                                                        }}
                                                        style={{ cursor: 'pointer' }}

                                                    />
                                                    <MdDelete style={{ marginLeft: "10px", cursor: 'pointer' }} onClick={() => { deleteAddress(item._id) }} />
                                                </div>
                                            </h6>
                                            <div>
                                                <span className="w-50 fw-600">Address:</span>
                                                <span className="ml-2">{item?.province}</span>
                                            </div>
                                            <div>
                                                <span className="w-50 fw-600">Address Line 1:</span>
                                                <span className="ml-2">{item?.addressLine1}</span>
                                            </div>
                                            <div>
                                                <span className="w-50 fw-600">Address Line 2:</span>
                                                <span className="ml-2">{item?.addressLine2}</span>
                                            </div>
                                            <div>
                                                <span className="w-50 fw-600">Postal code:</span>
                                                <span className="ml-2">{item?.zip}</span>
                                            </div>
                                            <div>
                                                <span className="w-50 fw-600">City:</span>
                                                <span className="ml-2">{item?.city}</span>
                                            </div>
                                            <div>
                                                <span className="w-50 fw-600">State:</span>
                                                <span className="ml-2">{item?.state}</span>
                                            </div>
                                            <div>
                                                <span className="w-50 fw-600">Country:</span>
                                                <span className="ml-2">{item?.country}</span>
                                            </div>

                                            <div>
                                                <span className="w-50 fw-600">Name:</span>
                                                <span className="ml-2">
                                                    {item?.firstname}{item?.lastname ? item?.lastname : ''}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="w-50 fw-600">Email:</span>
                                                <span className="ml-2">{item?.email}</span>
                                            </div>
                                            <div>
                                                <span className="w-50 fw-600">Phone:</span>
                                                <span className="ml-2">{item?.phone}</span>
                                            </div>

                                            <div className="dropdown position-absolute right-0 top-0">
                                                <button
                                                    className="btn bg-gray px-2"
                                                    type="button"
                                                    data-toggle="dropdown"
                                                >
                                                    <i className="la la-ellipsis-v" />
                                                </button>
                                                <div
                                                    className="dropdown-menu dropdown-menu-right"
                                                    aria-labelledby="dropdownMenuButton"
                                                >
                                                    <a className="dropdown-item">Edit</a>
                                                    <a className="dropdown-item" href="">
                                                        Make This Default
                                                    </a>
                                                    <a className="dropdown-item" href="">
                                                        Delete
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>

            </div>
        </div>
    );
}
export default Shipping_Address;

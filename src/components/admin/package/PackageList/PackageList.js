import { useEffect, useState } from 'react'
import { packList } from '../../../../api/login/Login'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './packageList.css'

function PackageList() {
    const [data, setData] = useState([])  

    function createMarkup(data) {
        return { __html: data };
    }

    const packageList = async () => {
        try {
            const res = await packList()
            setData(Array.isArray(res?.data?.data) ? res.data.data : [])
        } catch (error) {
            console.error("Error fetching package list:", error)
            setData([])  
        }
    }

    useEffect(() => {
        packageList()
    }, [])
    const TruncateText = (text, maxLength) => {
      if (!text) return '';
      const div = document.createElement("div");
      div.innerHTML = text;
      const plainText = div.innerText;
      return plainText.length > maxLength ? plainText.substring(0, maxLength) + '...' : plainText;
    };

    return (
      <div className="package-list-container">
            <div className="PageHeading">
                <h1>Package List</h1>
            </div>
        <div className="row p-2">
  {Array.isArray(data) && data.length > 0 ? (
    data.map((item) => (
      <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
        <div className="card-flip">
          <div className="card-inner">
            <div className="card-front">
              <div className="card bg-primary text-white">
                <div className="card-body text-center">
                  <img 
                    src={`https://api.paypandabnk.com/api/cloudinary/${item.icon_img}`} 
                    alt=""
                    className="package-icon mb-3"
                    // onError={(e) => {
                    //   e.target.onerror = null;
                    //   e.target.src = 'path/to/placeholder-image.jpg';
                    // }}

                  />
                  <h4 className="card-title">{item?.package_name}</h4>
                  {!item?.isPurchased ? (
                      <>
                       <p className="card-text expiredatepackage">Expiry: {new Date(item?.history).toLocaleString()}</p>
                      </>
                  ) : (
                    <>
                     {/* <p className="card-text expiredatepackage">Expiry: {new Date(item?.history).toLocaleString()}</p> */}
                    </>
                 
                  )}
               
                </div>
              </div>
            </div>
            <div className="card-back">
              <div className="card bg-light">
                <div className="card-body">
                  {/* <h5 className="card-title text-primary">{item?.package_name}</h5> */}
                  <p className="card-text" dangerouslySetInnerHTML={{ __html: TruncateText(item?.description, 150) }}></p>
                 
                  {!item?.isPurchased ? (
                      <>
                       <p className="card-text"><small className="text-muted">Expiry: {new Date(item?.history).toLocaleString()}</small></p> 
                      </>
                  ) : (
                   <>
                   </>
                  )}


<Link to={`/package-details/${item?._id}`} className="btn btn-primary">View Details</Link>

                  {/* {!item?.isPurchased ? (
                    <Link to={`/package-details/${item?._id}`} className="btn btn-primary">View Details</Link>
                  ) : (
                    <button className="btn btn-secondary" disabled>Already Purchased</button>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="col-12">
      <p className="text-center">No packages available</p>
    </div>
  )}
</div>
<ToastContainer/>
      </div>
      
    )
}

export default PackageList
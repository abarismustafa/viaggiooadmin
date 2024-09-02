import React, { useState, useEffect } from 'react';
import { bpbsAllServiceList, bpbsOperatorList } from '../../../api/login/Login';
import './BPBSService.css';

const BPBSService = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [operators, setOperators] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [serviceSearchTerm, setServiceSearchTerm] = useState('');
  const [operatorSearchTerm, setOperatorSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const operatorsPerPage = 10;

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (selectedService) {
      fetchOperators(selectedService);
    }
  }, [selectedService]);

  useEffect(() => {
    const filtered = services.filter(service =>
      service.name.toLowerCase().includes(serviceSearchTerm.toLowerCase())
    );
    setFilteredServices(Array.isArray(filtered) ? filtered : []);
  }, [serviceSearchTerm, services]);

  const fetchServices = async () => {
    try {
      const data = await bpbsAllServiceList();
      setServices(Array.isArray(data) ? data : []);
      console.log("services",services)
      setFilteredServices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchOperators = async (serviceId) => {
    setLoading(true);
    try {
      const data = await bpbsOperatorList(serviceId);
      setOperators(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching operators:', error);
    }
    setLoading(false);
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
    setCurrentPage(1);
    setOperatorSearchTerm('');
  };

  const handleServiceSearch = (e) => {
    setServiceSearchTerm(e.target.value);
  };

  const handleOperatorSearch = (e) => {
    setOperatorSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredOperators = operators.filter(operator =>
    operator.name.toLowerCase().includes(operatorSearchTerm.toLowerCase())
  );

  const indexOfLastOperator = currentPage * operatorsPerPage;
  const indexOfFirstOperator = indexOfLastOperator - operatorsPerPage;
  const currentOperators = filteredOperators.slice(indexOfFirstOperator, indexOfLastOperator);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bpbs-container container-fluid">
      <div className="row">
        <div className="col-md-3 bpbs-sidebar">
          <h2 className="bpbs-title">Select Service</h2>
          <div className="bpbs-search-container">
            <input
              type="text"
              className="form-control bpbs-search"
              placeholder="Search services..."
              value={serviceSearchTerm}
              onChange={handleServiceSearch}
            />
          </div>
          <select 
            className="form-select bpbs-select" 
            value={selectedService} 
            onChange={handleServiceChange}
          >
            <option value="">Choose a service</option>
            {filteredServices.map(service => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-9 bpbs-main">
          <h2 className="bpbs-title">Service Operators</h2>
          <div className="bpbs-search-container">
            <input
              type="text"
              className="form-control bpbs-search"
              placeholder="Search operators..."
              value={operatorSearchTerm}
              onChange={handleOperatorSearch}
            />
          </div>
          {loading ? (
            <div className="bpbs-loading">Loading...</div>
          ) : (
            <>
              <ul className="list-group bpbs-operator-list">
                {currentOperators.map(operator => (
                  <li key={operator.id} className="list-group-item bpbs-operator-item">
                    {operator.name}
                    <button className="btn btn-primary bpbs-pay-btn">Pay Now</button>
                  </li>
                ))}
              </ul>
              <nav className="bpbs-pagination">
                <ul className="pagination">
                  {Array.from({ length: Math.ceil(filteredOperators.length / operatorsPerPage) }, (_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BPBSService;

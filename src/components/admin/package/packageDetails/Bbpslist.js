import React, { useState, useEffect } from 'react';
import { Select, Input, Spin, Card, Table, Pagination, message } from 'antd';
import axios from 'axios';
import { baseUrl } from '../../../../baseUrl';

const { Option } = Select;
const { Search } = Input;

const ServiceOperatorList = ({ BBPSWiseServices, dataDetails }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalOperators, setTotalOperators] = useState(0);
  const pageSize = 4; // Number of operators per page

  useEffect(() => {
    if (selectedService) {
      fetchOperators(currentPage);
    }
  }, [selectedService, currentPage]);

  const fetchOperators = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}package/bbps/commision`, {
        params: {
          package_id: dataDetails?._id,
          service_id: selectedService,
          page: page - 1,
          count: pageSize
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        }
      });

      if (response.data && Array.isArray(response.data.data)) {
        setOperators(response.data.data);
        setTotalOperators(response.data.totalCount || 0);
      } else {
        console.error('Unexpected response structure:', response.data);
        message.error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error fetching operators:', error);
      message.error('Failed to fetch operators');
    }
    setLoading(false);
  };

  const handleServiceChange = (value) => {
    setSelectedService(value);
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredOperators = operators.filter(operator =>
    operator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: 'Start Amount', dataIndex: 'start_amt', key: 'start_amt' },
    { title: 'End Amount', dataIndex: 'end_amt', key: 'end_amt' },
    { title: 'Charge', dataIndex: 'charge', key: 'charge' },
    { title: 'Charge Type', dataIndex: 'charge_type', key: 'charge_type' },
    { title: 'Retailer Commission', dataIndex: 'commision', key: 'commision' },
    { title: 'Retailer Commission Type', dataIndex: 'commision_type', key: 'commision_type' },
  ];

  return (
    <div className="service-operator-list">
      <h3>Service Operator List</h3>
      <Select
        style={{ width: '100%', marginBottom: 16 }}
        value={selectedService}
        placeholder="Please select a service"
        onChange={handleServiceChange}
      >
        {BBPSWiseServices.map(service => (
          <Option key={service._id} value={service._id}>{service.service}</Option>
        ))}
      </Select>

      {selectedService && (
        <>
          <Search
            placeholder="Search operators"
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginBottom: 16 }}
          />

          <Spin spinning={loading}>
            {filteredOperators.length > 0 ? (
              filteredOperators.map(operator => (
                <Card
                  key={operator._id}
                  title={operator.name || 'Operator'}
                  style={{ marginBottom: 16 }}
                >
                  <Table
                    dataSource={operator.slots}
                    columns={columns}
                    pagination={false}
                    rowKey="_id"
                    locale={{ emptyText: 'No data found' }}
                  />
                </Card>
              ))
            ) : (
              <div style={{ textAlign: 'center', marginTop: 20 }}>No operators found</div>
            )}

            {/* Pagination for the list of operators */}
            <Pagination
              current={currentPage}
              total={totalOperators}
              pageSize={pageSize}
              onChange={handlePageChange}
              style={{ marginTop: 16, textAlign: 'right' }}
            />
          </Spin>
        </>
      )}
    </div>
  );
};

export default ServiceOperatorList;
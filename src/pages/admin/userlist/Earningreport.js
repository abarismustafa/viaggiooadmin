import React, { useState, useEffect, useMemo } from 'react';
import { Table, Card, Container, Row, Col, Form, Pagination } from 'react-bootstrap';
import { FaDownload, FaSort } from 'react-icons/fa';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { walletsREports } from '../../../api/login/Login';
import "./Userlist.css";

function Earningreport() {
  const [earningsData, setEarningsData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState('');

  const initialFilterState = {
    user_id: window.localStorage.getItem('userToken'),
    count: 10,
    page: 0,
    min_amt: 0,
    max_amt: 0,
    end_date: '',
    start_date: '',
    type: '',
    trans_type: 'dmt',
    order_id: '',
    txn_id: '',
    sortType: '',
    sortKey: '',
  };

  const [filterValues, setFilterValues] = useState(initialFilterState);
  const [appliedFilters, setAppliedFilters] = useState(initialFilterState);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().substr(0, 10);
    setCurrentDate(formattedDate);
    setFilterValues(prevState => ({
      ...prevState,
      start_date: formattedDate,
      end_date: formattedDate
    }));
    fetchEarningsData();
  }, [appliedFilters, currentPage]);

  const fetchEarningsData = async () => {
    try {
      setLoading(true);
      const response = await walletsREports({ ...appliedFilters, page: currentPage - 1 });
      if (Array.isArray(response.data.data.wallet)) {
        setEarningsData(response.data.data.wallet);
        setTotalCount(response.data.data.total);
      } else {
        console.error("API did not return an array:", response.data);
        setEarningsData([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.error("Error fetching earnings data:", error);
      setEarningsData([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterValues(prevState => ({
      ...prevState,
      [name]: typeof value === 'string' ? value.trim() : value
    }));
  };

  const handleSearch = () => {
    setAppliedFilters(filterValues);
    setCurrentPage(1);
  };

  const handleReset = () => {
    const resetFilter = {
      ...initialFilterState,
      start_date: '',
      end_date: ''
    };
    setFilterValues(resetFilter);
    setAppliedFilters(resetFilter);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setAppliedFilters(prevState => ({
      ...prevState,
      sortType: direction === 'ascending' ? 1 : -1,
      sortKey: key
    }));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...earningsData];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [earningsData, sortConfig]);

  const totalPages = Math.ceil(totalCount / appliedFilters.count);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Container fluid className="px-4 er-container">
      <h1 className="mt-4 mb-4 er-title">Earnings Report</h1>

      <Card className="mb-4 er-card">
        <Card.Header className="er-card-header">Filter</Card.Header>
        <Card.Body className="er-card-body">
          <Form>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="startDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control type="date" name="start_date" value={filterValues.start_date} onChange={handleFilterChange} />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="endDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control type="date" name="end_date" value={filterValues.end_date} onChange={handleFilterChange} />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="type">
                  <Form.Label>Type</Form.Label>
                  <Form.Control as="select" name="type" value={filterValues.type} onChange={handleFilterChange}>
                    <option value="">Select Type</option>
                    
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              {/* <Col md={3}>
                <Form.Group controlId="trans_type">
                  <Form.Label>Transaction Type</Form.Label>
                  <Form.Control as="select" name="trans_type" value={filterValues.trans_type} onChange={handleFilterChange}>
                    <option value="">Select Transaction Type</option>
                    <option value="refund">Refund</option>
                    <option value="recharge">Recharge</option>
                    <option value="transfer">Transfer</option>
                    <option value="order">Order</option>
                    <option value="bill_pay">Bill Pay</option>
                  </Form.Control>
                </Form.Group>
              </Col> */}
            </Row>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="order_id">
                  <Form.Label>Order Id</Form.Label>
                  <Form.Control type="text" name="order_id" value={filterValues.order_id} onChange={handleFilterChange} />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="txn_id">
                  <Form.Label>Txn Id</Form.Label>
                  <Form.Control type="text" name="txn_id" value={filterValues.txn_id} onChange={handleFilterChange} />
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <button type="button" className="btn btn-primary" onClick={handleSearch}>Search</button>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <button type="button" className="btn btn-warning" onClick={handleReset}>Reset</button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mb-4 er-card">
        <Card.Header className="er-card-header">
          <Row className="align-items-center">
            <Col lg={12} className="text-end">
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="btn btn-success er-download-btn"
                table="table-to-xls"
                filename="earnings_report"
                sheet="earnings_report"
                buttonText={<><FaDownload className="me-2" /> Download CSV</>}
              />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="er-card-body">
          <Table responsive striped bordered hover id="table-to-xls" className="er-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('_id')} className="er-th">S.No <FaSort /></th>
                <th onClick={() => handleSort('createdAt')} className="er-th">Date <FaSort /></th>
                <th onClick={() => handleSort('order_id')} className="er-th">Order ID <FaSort /></th>
                <th onClick={() => handleSort('txn_id')} className="er-th">Transaction ID <FaSort /></th>
                <th onClick={() => handleSort('amount')} className="er-th">Amount <FaSort /></th>
              
                <th onClick={() => handleSort('trans_type')} className="er-th">Transaction Type <FaSort /></th>
                <th onClick={() => handleSort('approve')} className="er-th">Approved <FaSort /></th>
                <th onClick={() => handleSort('type')} className="er-th">Type <FaSort /></th>
                <th onClick={() => handleSort('message')} className="er-th">Message <FaSort /></th>
                <th onClick={() => handleSort('o_bal')} className="er-th">Opening Balance <FaSort /></th>
                <th onClick={() => handleSort('c_bal')} className="er-th">Closing Balance <FaSort /></th>
                
              </tr>
            </thead>
            <tbody>
              {sortedData.length > 0 ? (
                sortedData.map((item, index) => (
                  <tr key={index} className="er-tr">
                    <td>{index + 1}</td>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                    <td>{item.order_id}</td>
                    <td>{item.txn_id}</td>
                    <td>{item.amount.toFixed(2)}</td>
                    
                    <td>{item.trans_type}</td>
                    <td>{item.approve ? 'Yes' : 'No'}</td>
                    <td>{item.type}</td>
                    <td>{item.message}</td>
                    <td>{item.o_bal.toFixed(2)}</td>
                    <td>{item.c_bal.toFixed(2)}</td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center">No data found</td>
                </tr>
              )}
            </tbody>
          </Table>
          <div>
            <div>
            Total {totalCount} entries
            </div>

<div>
              
            
          <Pagination>
            <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
          </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
   
  );
}

export default Earningreport;
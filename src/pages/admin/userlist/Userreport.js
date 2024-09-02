import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Table, Card, Container, Row, Col, Form, Button, Pagination } from 'react-bootstrap';
import { FaDownload, FaSort } from 'react-icons/fa';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import "./Userlist.css";
import { getDownstreamListReport } from '../../../api/login/Login';

function UserReport() {
    const { userId } = useParams();
    const location = useLocation();
    const [reportData, setReportData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const initialFilterState = {
        start_date: '',
        end_date: '',
        type: '',
        trans_type: '',
        order_id: '',
        txn_id: '',
        sortType: '',
        sortKey: '',
    };

    const [filterValues, setFilterValues] = useState(initialFilterState);
    const [appliedFilters, setAppliedFilters] = useState(initialFilterState);

    useEffect(() => {
        fetchReportData();
    }, [userId, currentPage, itemsPerPage, appliedFilters]);

    const fetchReportData = async () => {
        try {
            setLoading(true);
            const response = await getDownstreamListReport(currentPage - 1, itemsPerPage, userId, appliedFilters);
            if (response.data && response.data.data) {
                setReportData(response.data.data);
                setTotalCount(response.data.totalCount || 0);
            }
        } catch (error) {
            console.error('Error fetching user report:', error);
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
        setFilterValues(initialFilterState);
        setAppliedFilters(initialFilterState);
        setCurrentPage(1);
    };

    const requestSort = (key) => {
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

    const sortedAndFilteredData = useMemo(() => {
        let sortableItems = [...(reportData || [])];
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
    }, [reportData, sortConfig]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <Container fluid className="px-4 ur-container">
            <h1 className="mt-4 mb-4 ur-title">Transaction Report </h1>
            <p className="ur-total-count">Total Count: {totalCount}</p>

            <Card className="mb-4 ur-card">
                <Card.Header className="ur-card-header">Filter</Card.Header>
                <Card.Body className="ur-card-body">
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
                                        <option value="all">All</option>
                                        <option value="credit">Credit</option>
                                        <option value="debit">Debit</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                           
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
                                <Button variant="primary" onClick={handleSearch}>Search</Button>
                            </Col>
                            <Col md={2} className="d-flex align-items-end">
                                <Button variant="warning" onClick={handleReset}>Reset</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>

            <Card className="mb-4 ur-card">
                <Card.Header className="ur-card-header">
                    <Row className="align-items-center">
                        <Col md={12} className="text-end">
                            <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="btn btn-success ur-download-btn"
                                table="table-to-xls"
                                filename="user_report"
                                sheet="user_report"
                                buttonText={<><FaDownload className="me-2" /> Download CSV</>}
                            />
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body className="ur-card-body">
                    <Table responsive striped bordered hover id="table-to-xls" className="ur-table">
                        <thead>
                            <tr>
                                <th onClick={() => requestSort('_id')} className="ur-th">S.No <FaSort /></th>
                                <th onClick={() => requestSort('_id')} className="ur-th">Transaction Id <FaSort /></th>
                                <th onClick={() => requestSort('amount')} className="ur-th">Amount <FaSort /></th>
                                <th onClick={() => requestSort('trans_type')} className="ur-th">Transaction Type <FaSort /></th>
                                <th onClick={() => requestSort('createdAt')} className="ur-th">Date <FaSort /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAndFilteredData.length > 0 ? (
                                sortedAndFilteredData.map((item, index) => (
                                    <tr key={index} className="ur-tr">
                                        <td>{index + 1}</td>
                                        <td>{item?.txn_id}</td>
                                        <td>{item?.amount}</td>
                                        <td>{item?.trans_type}</td>
                                        <td>{item?.createdAt}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center ur-no-data">No data found</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Pagination className="mt-3 justify-content-center">
                        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                        {[...Array(totalPages).keys()].map((number) => (
                            <Pagination.Item
                                key={number + 1}
                                active={number + 1 === currentPage}
                                onClick={() => handlePageChange(number + 1)}
                            >
                                {number + 1}
                            </Pagination.Item>
                        ))}
                        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                    </Pagination>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default UserReport;
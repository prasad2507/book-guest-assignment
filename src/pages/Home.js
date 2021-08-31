import React, { useState, useRef } from "react";
import {
  Card,
  Container,
  Form,
  Button,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { CSVLink } from "react-csv";
import BootstrapTable from "react-bootstrap-table-next";
import moment from "moment";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
const Home = () => {
  const formRef = useRef(null);
  const { SearchBar } = Search;
  const [userList, setuserList] = useState([
    {
      name: "Prasad Yadav",
      email_id: "prasad@gmail.com",
      ph_no: "1234567898",
      adults: 0,
      childrens: 0,
      check_in: "2021-04-30",
      check_out: "2021-07-30",
      room_category: "Single Room",
    },
  ]);
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [adultCount, setAdultCount] = useState(0);
  const [childrenCount, setChildrenCount] = useState(0);
  const [checkIn, setcheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [roomCategory, setRoomCategory] = useState(new Date());
  //   ---------------------------------------------------------------------------------------
  //   modal
  const [show, setShow] = useState(false);
  // modal state
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //   ---------------------------------------------------------------------------------------
  // function
  const sumbitForm = (e) => {
    e.preventDefault();
    setuserList([
      ...userList,
      {
        name: name,
        email_id: emailId,
        ph_no: mobileNo,
        adults: adultCount,
        childrens: childrenCount,
        check_in: checkIn,
        check_out: checkOut,
        room_category: roomCategory,
      },
    ]);
    formRef.current.reset();
  };

  // --------------------------------------------------------------------------------------------------------
  // dateformatter
  function checkinFormatter(cell, row, rowIndex, formatExtraData) {
    return <div>{moment(row.check_in).format("DD/MM/YYYY")}</div>;
  }
  // --------------------------------------------------------------------------------------------------------
  // dateformatter
  function checkoutFormatter(cell, row, rowIndex, formatExtraData) {
    return <div>{moment(row.check_out).format("DD/MM/YYYY")}</div>;
  }

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
      headerStyle: () => {
        return { width: "7%", fontSize: "12px" };
      },
    },
    {
      dataField: "email_id",
      text: "Email Id",
      headerStyle: () => {
        return { width: "7%", fontSize: "12px" };
      },
    },
    {
      dataField: "ph_no",
      text: "Mobile No.",
      headerStyle: () => {
        return { width: "5%", fontSize: "12px" };
      },
    },
    {
      dataField: "adults",
      text: "No of adults",
      sort: true,
      headerStyle: () => {
        return { width: "3%", fontSize: "12px" };
      },
    },
    {
      dataField: "childrens",
      text: "No of childrens",
      sort: true,
      headerStyle: () => {
        return { width: "3%", fontSize: "12px" };
      },
    },
    {
      dataField: "check_in",
      text: "Check-In",
      sort: true,
      formatter: checkinFormatter,
      headerStyle: () => {
        return { width: "5%", fontSize: "12px" };
      },
    },
    {
      dataField: "check_out",
      text: "Check-Out",
      sort: true,
      formatter: checkoutFormatter,
      headerStyle: () => {
        return { width: "5%", fontSize: "12px" };
      },
    },
    {
      dataField: "room_category",
      text: "Room Type",
      sort: true,
      headerStyle: () => {
        return { width: "5%", fontSize: "12px" };
      },
    },
  ];

  return (
    <div>
      <Container>
        <div className="mt-4">
          <Row>
            <Col md={6}>
              <div>
                <h1>Book Guest</h1>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex justify-content-end ">
                <Button variant="dark" onClick={handleShow}>
                  Add User
                </Button>
              </div>
            </Col>
          </Row>
          {/* table */}
          <Card className="bg-light">
            <Card.Body>
              <div>
                <ToolkitProvider
                  keyField="id"
                  data={userList}
                  columns={columns}
                  search
                  striped
                  hover
                  bootstrap4
                >
                  {(props) => (
                    <div>
                      <Row>
                        <Col md={4}>
                          Download List in Excel:&nbsp;
                          <CSVLink data={userList} filename={"userList.csv"}>
                            Download
                          </CSVLink>
                        </Col>
                        <Col md={8}>
                          <div className="d-flex justify-content-end">
                            <h4>Search User:&nbsp;</h4>
                            <SearchBar {...props.searchProps} />
                          </div>
                        </Col>
                      </Row>

                      <hr />
                      <BootstrapTable {...props.baseProps} />
                    </div>
                  )}
                </ToolkitProvider>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
      {/* modal */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form ref={formRef} onSubmit={sumbitForm}>
              {/* name */}
              <Form.Group controlId="form.name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              {/* emal */}
              <Form.Group controlId="form.email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmailId(e.target.value)}
                  required
                />
              </Form.Group>
              {/* no */}
              <Row>
                <Col md={6}>
                  {/* adults */}
                  <Form.Group controlId="form.name">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      max="10"
                      placeholder="Enter Mobile Number"
                      onChange={(e) => setMobileNo(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* adults */}
                  <Form.Group controlId="form.room">
                    <Form.Label>Room Category</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => setRoomCategory(e.target.value)}
                      required
                    >
                      <option value="Single Room">Single Room</option>
                      <option value="Two Room">Two Rooms</option>
                      <option value="Three Room">Three Rooms</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  {/* adults */}
                  <Form.Group controlId="form.adults">
                    <Form.Label>Number of adults</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="Enter Number Of Adults"
                      onChange={(e) => setAdultCount(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* adults */}
                  <Form.Group controlId="form.childrens">
                    <Form.Label>Number of childrens</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      placeholder="Enter Number Of Childrens"
                      onChange={(e) => setChildrenCount(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  {/* adults */}
                  <Form.Group controlId="form.checkIn">
                    <Form.Label>Check In</Form.Label>
                    <Form.Control
                      type="date"
                      onChange={(e) => setcheckIn(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  {/* adults */}
                  <Form.Group controlId="form.checkOut">
                    <Form.Label>Check Out</Form.Label>
                    <Form.Control
                      type="date"
                      onChange={(e) => setCheckOut(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-end mt-2">
                <Button variant="info" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;

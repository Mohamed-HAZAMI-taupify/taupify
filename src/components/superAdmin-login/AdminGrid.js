import React, { useEffect, useState } from "react";
import { _base_url_auth } from "../../data/config";
import { getAllAdmin } from "../../redux/actions/superAdminAction";
import axios from "axios";
import { useSelector , useDispatch} from "react-redux";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import SearchIcon from "@material-ui/icons/Search";
import AdminUpdateForm from "./updateCrid";

const AdminGrid = () => {
  const AllAdminReducer = useSelector(state => state.AllAdminReducer);
  const [adminUsers, setAdminUsers] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleDelete = async (adminId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this admin ?");
    if (!confirmDelete) {
      return;
    }
  
    try {
      const response = await axios.delete(
        _base_url_auth + `/everest-admin/${adminId}`
      );
      if (response.status === 200) {
        // Admin user deleted successfully
        dispatch(getAllAdmin());
        console.log(response.data.message);
      } else {
        // Error occurred
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  };
  

  useEffect(() => {
    setAdminUsers(AllAdminReducer.allAdmin)
  }, [AllAdminReducer]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleUpdate = (admin) => {
    setSelectedAdmin(admin);
    toggleModal();
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAdmins = adminUsers.filter((admin) =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <h1 style={{width: "100%" ,textAlign: "start" , fontWeight: "bolder"}}>ADMIN</h1>
        <InputGroup style={{ maxWidth: "300px" }}>
          <Input
            type="text"
            placeholder="Search admins"
            value={searchTerm}
            onChange={handleSearch}
            style={{
              height: "30px",
              fontSize: "13px"
          }}
          />
          <InputGroupAddon addonType="append">
            <Button>
              <SearchIcon />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <Container style={{ backgroundColor: "#E8E8E8", marginTop: "10px" ,height: "45vh" , overflow: "auto"}}>
        <Row>
          <Col>
            {filteredAdmins.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th style={{ fontSize: "medium", fontWeight: "bolder" }}>
                      Name
                    </th>
                    <th style={{ fontSize: "medium", fontWeight: "bolder" }}>
                      Email
                    </th>
                    <th style={{ fontSize: "medium", fontWeight: "bolder" }}>
                      Update
                    </th>
                    <th style={{ fontSize: "medium", fontWeight: "bolder" }}>
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  
                  {filteredAdmins.map((admin, index) => (
                    <tr
                      key={admin._id}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#7e7e7e" : "",
                        color: index % 2 === 0 ? "#fff" : "",
                      }}
                    >
                      <td
                        style={{
                          paddingTop: "10px",
                          fontSize: "small",
                          fontWeight: "bold",
                        }}
                      >
                        {admin.name}
                      </td>

                      <td
                        style={{
                          paddingTop: "10px",
                          fontSize: "small",
                          fontWeight: "bolde",
                        }}
                      >
                        {admin.email}
                      </td>
                      <td>
                        <Button
                          style={{width:"100px" , height: '30px', fontSize: '13px', borderRadius: '5px' }}
                          color="info" 
                          onClick={() => handleUpdate(admin)}
                        >
                          Update
                        </Button>
                      </td>
                      <td>
                        <button
                          style={{width:"100px" , height: '30px', fontSize: '13px', borderRadius: '5px' }}
                          className="btn btn-danger"
                          onClick={() => handleDelete(admin._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No admin users found.</p>
            )}
          </Col>
        </Row>
        <Modal isOpen={modalOpen} toggle={toggleModal} centered >
          <ModalHeader toggle={toggleModal}>Update Admin</ModalHeader>
          <ModalBody style={{ padding: "3rem" }}>
            {selectedAdmin && (
              <AdminUpdateForm admin={selectedAdmin} onCancel={toggleModal} />
            )}
          </ModalBody>
        </Modal>
      </Container>
    </section>
  );
};

export default AdminGrid;

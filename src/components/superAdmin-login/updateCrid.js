import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { getAllAdmin , updateAdmin} from "../../redux/actions/superAdminAction";
import { useDispatch} from "react-redux";
import { _base_url_auth } from "../../data/config";
import axios from "axios";

const AdminUpdateForm = ({ admin, onCancel }) => {
  const [formData, setFormData] = useState({
    name: admin.name,
    email: admin.email,
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
        dispatch(updateAdmin(admin._id , formData))
        // Update successful
        dispatch(getAllAdmin());
        onCancel();
    } catch (error) {
      console.error("Server error:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert color="danger">{error}</Alert>}
      <FormGroup>
        <Label for="name">Name:</Label>
        <Input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          style={{
            height: "40px",
            fontSize: "16px",
            borderRadius: "5px",
            borderColor: "#ccc",
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email:</Label>
        <Input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          style={{
            height: "40px",
            fontSize: "16px",
            borderRadius: "5px",
            borderColor: "#ccc",
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password:</Label>
        <Input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          style={{
            height: "40px",
            fontSize: "16px",
            borderRadius: "5px",
            borderColor: "#ccc",
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="confirmPassword">Confirm Password:</Label>
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={{
            height: "40px",
            fontSize: "16px",
            borderRadius: "5px",
            borderColor: "#ccc",
          }}
        />
      </FormGroup>
      <div style={{width: "100%" , display: "flex" , justifyContent: "space-between" , alignItems: "center"}}>
      <Button
        color="primary"
        type="submit"
        style={{width:"100px" , height: '30px', fontSize: '13px', borderRadius: '5px' }}
      >
        Update
      </Button>{" "}
      <Button
        color="secondary"
        onClick={onCancel}
        style={{width:"100px" , height: '30px', fontSize: '13px', borderRadius: '5px' }}
      >
        Cancel
      </Button>
      </div>

    </Form>
  );
};

export default AdminUpdateForm;

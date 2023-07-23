import React, { useState , useEffect} from "react";
import { getAllAdmin , addAdmin } from "../../redux/actions/superAdminAction";
import NotFound from "../common-components/not-found/index";
import jwt_decode from "jwt-decode";
import {_base_url_auth} from "../../data/config"
import AdminGrid from "./AdminGrid";
import { useDispatch} from "react-redux";


import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Container
} from "reactstrap";

export const SuperAdminCRUD = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllAdmin());
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setFormData({
      ...formData,
      roles : "ROLE_ADMINISTRATION",
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // form validation
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } 
    else {
      try {
        dispatch(addAdmin(formData));
      } 
      catch (error) {
        console.error("Server error:", error);
      }
    }
  };

  const dataAdmin = jwt_decode(localStorage.getItem("tokenEverest"));

  return (
    <>
      {dataAdmin.user.roles[0] === "ROLE_SUPERADMINISTRATION" ? (
        <Container>
        <h1 style={{width: "100%" ,textAlign: "start" , fontWeight: "bolder"}}>ADD ADMIN</h1>
        <Form style={{ display: "flex" , 
                       flexDirection: "column", 
                       alignItems: "center" ,
                       justifyContent: "center",
                       backgroundColor: "#E8E8E8",
                       }}  onSubmit={handleSubmit}>
          <FormGroup style={{maxWidth : "500px"}}>
            <Label for="name" style={{fontSize: "16px" ,  fontWeight: "bolde" , marginTop: "20px"}}>Name:</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              invalid={errors.name}
              style={{
                height: "30px",
                fontSize: "16px",
                borderRadius: "5px",
                borderColor: "#ccc",
              }}
            />
            {errors.name && <FormFeedback>{errors.name}</FormFeedback>}
          </FormGroup>
          <FormGroup style={{maxWidth : "500px"}}>
            <Label for="email" style={{fontSize: "16px" ,  fontWeight: "bolde"}}>Email:</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              invalid={errors.email}
              style={{
                height: "30px",
                fontSize: "16px",
                borderRadius: "5px",
                borderColor: "#ccc",
              }}
            />
            {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
          </FormGroup>
          <FormGroup style={{maxWidth : "500px"}}>
            <Label for="password" style={{fontSize: "16px" ,  fontWeight: "bolde"}}>Password:</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              invalid={errors.password}
              style={{
                height: "30px",
                fontSize: "16px",
                borderRadius: "5px",
                borderColor: "#ccc",
              }}
            />
            {errors.password && <FormFeedback>{errors.password}</FormFeedback>}
          </FormGroup>
          <FormGroup style={{maxWidth : "500px"}}>
            <Label for="confirmPassword" style={{fontSize: "16px" ,  fontWeight: "bolde"}}>Confirm Password:</Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              invalid={errors.confirmPassword}
              style={{
                height: "30px",
                fontSize: "16px",
                borderRadius: "5px",
                borderColor: "#ccc",
              }}
            />
            {errors.confirmPassword && (
              <FormFeedback>{errors.confirmPassword}</FormFeedback>
            )}
          </FormGroup>
          <Button style={{width : "100px" , marginBottom: "20px", height: "30px" , fontSize: "13px"}} 
                  color="primary"
                  type="submit">
            Register
          </Button>
        </Form>
        <AdminGrid />
        </Container>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default SuperAdminCRUD;

import React, { useState } from "react";
import {Form,FormGroup,FormLabel,FormControl} from "react-bootstrap";
import {Button} from "react-bootstrap";
import "./Login.css";
import axios from "axios";
import Header from "./Header";

const HOST = "http://localhost:8001";

export default function Login({authUser=f=>f}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const userNew = {
      username:username,
      password:password
    }
   var response = await axios.post(HOST+"/login",userNew)
   localStorage.setItem('currentUser',JSON.stringify(response.data))
    authUser(response.data);
    // .then((response)=>{
    //   authUser(response)
    // })
  }

  

  return (

     
    <div className="Login">
      <Header/> 
      <Form onSubmit={handleSubmit}>
        <FormGroup size="lg" controlId="username">
          <label>UserName</label>
          <FormControl
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup size="lg" controlId="password">
          <label>Password</label>
          <FormControl
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button className="btn btn-success pull-right" size="lg" type="submit" disabled={!validateForm()} onClick={handleSubmit}>
          Login
        </Button>
      </Form>
    </div>
  );
}
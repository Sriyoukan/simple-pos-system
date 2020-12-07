import React,{useState} from "react";
import {Form,FormGroup,FormControl,Label,Button,Modal} from "react-bootstrap";
import axios from "axios";



export default function RegisterUser(){

    const [username,setUsername] = useState(null)
    const [password,setPassword] = useState(null)
    const [successModal,setSuccessModal] = useState(false)

      function validateForm() {
        return (
          username  &&
          password 
          
        );
      }

      async function handleSubmit(event){
        event.preventDefault();

          const user = {
              username: username,
              password:password,
              userType:"laber"
          }
        var  response = await axios.post('http://localhost:8001/newUser',user)
        response?setSuccessModal(true):false

      }
      const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
          handleSubmit();

      }
    };

      return(
        <div style={{paddingLeft:30,paddingRight:30,paddingTop:100,width:500}}>
        <Modal show={successModal}>
          <Modal.Header closeButton>
            <Modal.Title>SignUp Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>
              Successfully signedUp!
            </h3>
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {setSuccessModal(false);setPassword("");setUsername("")}}>
              close
            </Button>
          </Modal.Footer>
        </Modal>
        <Form>
        <FormGroup controlId="email" size="lg">
          <lable>username</lable>
          <FormControl
            autoFocus
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            
          />
        </FormGroup>
        <FormGroup controlId="password" size="lg">
          <lable>Password</lable>
          <FormControl
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            
          />
        </FormGroup>
        <Button
          className="btn btn-success"  
          size="lg"
          type="submit"
          disabled={!validateForm()}
          onClick={handleSubmit}
          
          
        >
          Signup
        </Button>
        </Form>
        
        </div>
      );



}










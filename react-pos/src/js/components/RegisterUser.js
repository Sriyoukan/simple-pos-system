import React,{useState} from "react";
import {Form,FormGroup,FormControl,Label,Button,Modal} from "react-bootstrap";
import axios from "axios";



export default  function RegisterUser(){
    const HOST = "http://localhost:8001/api/user";
    const newHost = "http://kcmotorspareparts.online/api/user"

    const [username,setUsername] = useState(null)
    const [password,setPassword] = useState(null)
    const [successModal,setSuccessModal] = useState(false)
    const [failureModal,setFailureModal] = useState(false)
    const [users,setUsers] = useState([])
    const [deleteModal,setDeleteModal] = useState(false)

  
    async function  getUsers(){
      var response = await axios.get(newHost+'/user')
      setUsers(response.data)
    }

    getUsers()

    function deleteUser(username){
      axios.post(newHost+'/deleteUser',{username:username})
      .then(resolve=>{
        getUsers()
      })
    }

    
    
    


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
                    
        var  response = await axios.post(`${newHost}/newUser`,user)
        response.data?setSuccessModal(true):setFailureModal(true)

      }
      const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
          handleSubmit();

      }
    };

      return(
        <div>
        <div style={{paddingLeft:30,paddingTop:100,width:500,float:'left' }}>
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
        <Modal show={failureModal}>
          <Modal.Header closeButton>
            <Modal.Title>SignUp Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>
              Cant't signedUp!
            </h3>
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {setFailureModal(false);setPassword("");setUsername("")}}>
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
      <div style={{paddingTop:20,paddingBottom:20,width:600,float:'left',border:'0.1px solid gray',marginLeft:'90px',marginTop:'90px'}}>
        <ul style={{listStyleType:'none'}}>
            {users.map((data,i)=>(
            
              <li key={i}>
                <div style={{border:'0.05px solid gray',borderRadius:1,width:"300px",height:"60px", boxShadow:'1px 1px 1px #808080',backgroundColor:'#FFFFFFFF',textAlign:'center',marginBottom:'10px',float:'left'}}>
                  <h3>{data.username}</h3>
                </div>
                { data.userType == 'laber'?
                  <Button style={{marginLeft:'20px',marginTop:'15px',float:'left'}} className="btn btn-danger"  size="lg" onClick={()=>{deleteUser(data.username)}} >Delete</Button>:null
                }
              </li>))}
          </ul>
      </div>
      </div>
      );



}










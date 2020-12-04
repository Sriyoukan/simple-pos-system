import React,{useState} from "react";
// import Header from "./js/components/Header";
import {BrowserRouter as Router, Route,Switch,Link } from "react-router-dom";
import Header from "./js/components/Header"
import Main from "./js/components/Main";
import Login  from "./js/components/Login"

export default function App(){ 
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('currentUser')))
  

  if(user){
    return <Main user={user} logout={(data)=>{setUser(data)}}/>
  }else{
    return <Login authUser={(data)=>{setUser(data);console.log("sri")}}/>
  }
  
}



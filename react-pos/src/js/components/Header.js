import React from "react";
import { Link } from "react-router-dom";
import {Navbar, Tabs,Tab,Button} from "react-bootstrap";
import Inventory from "./Inventory";
import Pos from "./Pos";
import Transactions from "./Transactions";
import LiveCart from "./LiveCart";
import axios from "axios";


// The Header creates links that can be used to navigate
// between routes.

const Header = ({user,logout=f=>f}) => (
  <Navbar bg="light" expand="lg">
  <div className="text-center">
    <h1>
      <a href="/#/">Real Time Point of Sale System</a>
        {user?<Button type="submit"  className="btn btn-success pull-right" onClick={()=>{localStorage.removeItem('currentUser');logout(null)}}>Logout</Button>:null}
    </h1>
    
  </div>
  
  </Navbar>

  
);

export default Header;

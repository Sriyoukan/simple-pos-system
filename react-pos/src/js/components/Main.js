import React from "react";
import { Switch, Route } from "react-router-dom";
import Inventory from "./Inventory";
import Pos from "./Pos";
import Transactions from "./Transactions";
import LiveCart from "./LiveCart";
import {Navbar, Tabs,Tab} from "react-bootstrap";
import RegisterUser from "./RegisterUser";

import Header from "./Header";


const Main = ({user,logout=f=>f}) => (
  <main>
    <Header user={user !== null ? user:null} logout={logout} />
      <Tabs  defaultActiveKey="Inventory" id="uncontrolled-tab-example">
        <Tab eventKey="Inventory" title="Inventory">
          <Inventory user={user} />
        </Tab>
        <Tab eventKey="Pos" title="Pos">
          <Pos />
        </Tab>
        <Tab eventKey="Transactions" title="Transactions" >
          <Transactions user={user} />
        </Tab>
        {user?user.userType=='owner'?<Tab eventKey="RegisterUser" title="RegisterUser" >
          <RegisterUser />
        </Tab>:null:null}
        
      </Tabs>
    
  </main>
);

export default Main;

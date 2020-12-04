import React from "react";
import { Switch, Route } from "react-router-dom";
import Inventory from "./Inventory";
import Pos from "./Pos";
import Transactions from "./Transactions";
import LiveCart from "./LiveCart";
import {Navbar, Tabs,Tab} from "react-bootstrap";
import Header from "./Header";


const Main = ({user,logout=f=>f}) => (
  <main>
    <Header user={user !== null ? true:false} logout={logout} />
      <Tabs defaultActiveKey="Pos" id="uncontrolled-tab-example">
        <Tab eventKey="Inventory" title="Inventory">
          <Inventory user={user} />
        </Tab>
        <Tab eventKey="Pos" title="Pos">
          <Pos />
        </Tab>
        <Tab eventKey="Transactions" title="Transactions" >
          <Transactions />
        </Tab>
        
      </Tabs>
    
  </main>
);

export default Main;

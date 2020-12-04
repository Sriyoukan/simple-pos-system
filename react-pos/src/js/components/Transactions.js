import React, { Component } from "react";
import {Link} from 'react-router-dom';

import "./App.css";
import Header from "./Header";
import CompleteTransactions from "./CompleteTransactions";
import axios from "axios";
import moment from "moment";
import {Tab} from 'react-bootstrap'
import {TabContainer} from 'react-bootstrap'
import {TabContent} from 'react-bootstrap'
import {TabPane} from 'react-bootstrap'
import {Row} from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {Nav,NavItem} from 'react-bootstrap'

import VerticalTabs from './VerticalTabs';




const HOST = "http://localhost:8001";
const url = HOST + `/api/all`;



class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      transactions: [],
      
      

      dates:[],
      dateIndex:0
     };
     this.handleDateTransaction0 = this.handleDateTransaction0.bind(this)
     this.handleDateTransaction1 = this.handleDateTransaction1.bind(this)
     this.handleDateTransaction2 = this.handleDateTransaction2.bind(this)
     this.handleDateTransaction3 = this.handleDateTransaction3.bind(this)
     this.handleDateTransaction4 = this.handleDateTransaction4.bind(this)
     this.handleDateTransaction5 = this.handleDateTransaction5.bind(this)
     this.handleDateTransaction6 = this.handleDateTransaction6.bind(this)

     for(var i=0;i<7;i++) {
        this.state.dates.push(moment().subtract(i,'days').format("DD-MMM-YYYY "))
     }
  }
  componentWillMount() {
    axios
      .get(url)
      .then(response => {
        this.setState({ transactions: response.data })})
      .catch(err => {
        console.log(err);
      });

   
  }
  handleDateTransaction0 = () =>{
    axios
      .get(url,{params:{data:0}})
      .then(response => {
        this.setState({ transactions: response.data })})
      .catch(err => {
        console.log(err);
      });
    
  }
  handleDateTransaction1 = () =>{
    axios
      .get(url,{params:{data:1}})
      .then(response => {
        this.setState({ transactions: response.data })})
      .catch(err => {
        console.log(err);
      });
  }
  handleDateTransaction2 = () =>{
    axios
      .get(url,{params:{data:2}})
      .then(response => {
        this.setState({ transactions: response.data })})
      .catch(err => {
        console.log(err);
      });
  }
  handleDateTransaction3 = () =>{
    axios
      .get(url,{params:{data:3}})
      .then(response => {
        this.setState({ transactions: response.data })})
      .catch(err => {
        console.log(err);
      });
  }
  handleDateTransaction4 = () =>{
    axios
      .get(url,{params:{data:4}})
      .then(response => {
        this.setState({ transactions: response.data })})
      .catch(err => {
        console.log(err);
      });
  }
  handleDateTransaction5 = () =>{
    axios
      .get(url,{params:{data:5}})
      .then(response => {
        this.setState({ transactions: response.data })})
      .catch(err => {
        console.log(err);
      });
  }
  handleDateTransaction6 = () =>{
    axios
      .get(url,{params:{data:6}})
      .then(response => {
        this.setState({ transactions: response.data })})
      .catch(err => {
        console.log(err);
      });
  }
  
  
  render() {
    var { transactions } = this.state;
    

    var rendertransactions = () => {
      if (transactions.length === 0) {
        return <p>No Transactions found</p>;
      } else {
        return transactions.map(transaction => (
          <CompleteTransactions {...transaction} />
        ));
      }
    };
   
    return (
      

      <div>
        
        <TabContainer id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
      
                    <NavItem eventKey={moment().format("DD-MMM-YYYY ")} onClick={this.handleDateTransaction0} >{moment().format("DD-MMM-YYYY ")}</NavItem>
                    <NavItem eventKey={moment().subtract(1,'days').format("DD-MMM-YYYY ")} onClick={this.handleDateTransaction1} >{moment().subtract(1,'days').format("DD-MMM-YYYY ")}</NavItem>
                    <NavItem eventKey={moment().subtract(2,'days').format("DD-MMM-YYYY ")} onClick={this.handleDateTransaction2} >{moment().subtract(2,'days').format("DD-MMM-YYYY ")}</NavItem>
                    <NavItem eventKey={moment().subtract(3,'days').format("DD-MMM-YYYY ")} onClick={this.handleDateTransaction3} >{moment().subtract(3,'days').format("DD-MMM-YYYY ")}</NavItem>
                    <NavItem eventKey={moment().subtract(4,'days').format("DD-MMM-YYYY ")} onClick={this.handleDateTransaction4} >{moment().subtract(4,'days').format("DD-MMM-YYYY ")}</NavItem>
                    <NavItem eventKey={moment().subtract(5,'days').format("DD-MMM-YYYY ")} onClick={this.handleDateTransaction5} >{moment().subtract(5,'days').format("DD-MMM-YYYY ")}</NavItem>
                    <NavItem eventKey={moment().subtract(6,'days').format("DD-MMM-YYYY ")} onClick={this.handleDateTransaction6} >{moment().subtract(6,'days').format("DD-MMM-YYYY ")}</NavItem>
                  
              </Nav>
            </Col>
            <Col sm={9}>
              <TabContent>
                <TabPane eventKey={moment().subtract(0,'days').format("DD-MMM-YYYY ")}>
                <table class="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Total</th>
                        <th>Products</th>
                        <th>Open</th>
                      </tr>
                    </thead>
                    <tbody>{rendertransactions()}</tbody>
                </table>
                </TabPane>
                <TabPane eventKey={moment().subtract(1,'days').format("DD-MMM-YYYY ")}>
                <table class="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Total</th>
                        <th>Products</th>
                        <th>Open</th>
                      </tr>
                    </thead>
                    <tbody>{rendertransactions()}</tbody>
                </table>
                </TabPane>
                <TabPane eventKey={moment().subtract(2,'days').format("DD-MMM-YYYY ")}>
                <table class="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Total</th>
                        <th>Products</th>
                        <th>Open</th>
                      </tr>
                    </thead>
                    <tbody>{rendertransactions()}</tbody>
                </table>
                </TabPane>
                <TabPane eventKey={moment().subtract(3,'days').format("DD-MMM-YYYY ")}>
                <table class="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Total</th>
                        <th>Products</th>
                        <th>Open</th>
                      </tr>
                    </thead>
                    <tbody>{rendertransactions()}</tbody>
                </table>
                </TabPane>
                <TabPane eventKey={moment().subtract(4,'days').format("DD-MMM-YYYY ")}>
                <table class="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Total</th>
                        <th>Products</th>
                        <th>Open</th>
                      </tr>
                    </thead>
                    <tbody>{rendertransactions()}</tbody>
                </table>
                </TabPane>
                <TabPane eventKey={moment().subtract(5,'days').format("DD-MMM-YYYY ")}>
                <table class="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Total</th>
                        <th>Products</th>
                        <th>Open</th>
                      </tr>
                    </thead>
                    <tbody>{rendertransactions()}</tbody>
                </table>
                </TabPane>
                <TabPane eventKey={moment().subtract(6,'days').format("DD-MMM-YYYY ")}>
                <table class="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Time</th>
                        <th>Total</th>
                        <th>Products</th>
                        <th>Open</th>
                      </tr>
                    </thead>
                    <tbody>{rendertransactions()}</tbody>
                </table>
                </TabPane>
               
              </TabContent>
            </Col>
          </Row>
        </TabContainer>
        
      </div>
      
      
    );
  }
}

export default Transactions;

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
import Chip from '@material-ui/core/Chip';
import VerticalTabs from './VerticalTabs';




const HOST = "http://localhost:8001";
const url = HOST + `/api/all`;



class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      transactions: [],
      total:0,
      actualTotal:0,
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
     this.removeFromList = this.removeFromList.bind(this)
     this.handleTransactions = this.handleTransactions.bind(this)

     for(var i=0;i<7;i++) {
        this.state.dates.push(moment().subtract(i,'days').format("DD-MMM-YYYY "))
     }
  }
  componentWillMount() {
    axios
      .get(url)
      .then(response => {
        this.setState({ transactions: response.data })
        this.handleTransactions(response.data)

      })
      .catch(err => {
        console.log(err);
      });


   
  }
  handleDateTransaction0 = () =>{
    axios
      .get(url,{params:{data:0}})
      .then(response => {
        this.setState({ transactions: response.data })
        this.handleTransactions(response.data)
      
      })
        
      .catch(err => {
        console.log(err);
      });
      
      
      
    
  }
  handleDateTransaction1 = () =>{
    axios
      .get(url,{params:{data:1}})
      .then(response => {
        this.setState({ transactions: response.data })
        this.handleTransactions(response.data)

      })
      .catch(err => {
        console.log(err);
      });
       

  }
  handleDateTransaction2 = () =>{
    axios
      .get(url,{params:{data:2}})
      .then(response => {
        this.setState({ transactions: response.data })
        this.handleTransactions(response.data)
      })
        
      .catch(err => {
        console.log(err);
      });
       

  }
  handleDateTransaction3 = () =>{
    axios
      .get(url,{params:{data:3}})
      .then(response => {
        this.setState({ transactions: response.data })
        this.handleTransactions(response.data)
      })
        
      .catch(err => {
        console.log(err);
      });
      

  }
  handleDateTransaction4 = () =>{
    axios
      .get(url,{params:{data:4}})
      .then(response => {
        this.setState({ transactions: response.data })
        this.handleTransactions(response.data)
      })
        
      .catch(err => {
        console.log(err);
      });
      

  }
  handleDateTransaction5 = () =>{
    axios
      .get(url,{params:{data:5}})
      .then(response => {
        this.setState({ transactions: response.data })
        this.handleTransactions(response.data)
      })
        
      .catch(err => {
        console.log(err);
      });
      

  }
  handleDateTransaction6 = () =>{
    axios
      .get(url,{params:{data:6}})
      .then(response => {
        this.setState({ transactions: response.data })
        this.handleTransactions(response.data)
      })
        
      .catch(err => {
        console.log(err);
      });
      

  }
  handleTransactions=(transactions)=>{
    var transactionNew = transactions
    if(transactionNew.length!==0){
      var actualTotal=0
      var total = 0
      transactionNew.map((transaction)=>{
        transaction.items.map((item)=>{
          actualTotal = actualTotal+ item.actualPrice*item.quantity
        })
        total = total+ transaction.total
      })
      this.setState({total:total})
      this.setState({actualTotal:actualTotal})
      
    }else{
      this.setState({total:0})
      this.setState({actualTotal:0})
    }
  }
  removeFromList = (id)=>{
    var oldTransactions = this.state.transactions
    var newTransactions = oldTransactions.filter(value=>value._id != id)
    this.setState({transactions:newTransactions})
    return newTransactions
  }

  
  
  
  
  render() {
    var { transactions } = this.state;
    
    

    var rendertransactions = () => {
      if (transactions.length === 0) {
        return <p>No Transactions found</p>;
      } else {
        return transactions.map(transaction => (
          <CompleteTransactions {...transaction} removeFromList={this.removeFromList} handleTransactions={this.handleTransactions} />
        ));
      }
    };
   
    return (
      
      

      <div>
        
        <TabContainer id="left-tabs-example" defaultActiveKey={moment().format("DD-MMM-YYYY ")}>
          
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
                
                <div style={{borderColor:"black",borderWidth:2}}>
                  <span ><h3>Total =  {this.state.total} Rs</h3></span>
                  <span><h3>ActualTotal =  {this.state.actualTotal} Rs</h3></span>
                  <span><h3>Benifit =  {this.state.total-this.state.actualTotal} Rs</h3></span>
                </div>
                
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
                        <th>Delete</th>
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

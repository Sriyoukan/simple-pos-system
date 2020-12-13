import React, { Component } from "react";
import {Link} from 'react-router-dom';
import "./App.css";
import Header from "./Header";
import CompleteTransactions from "./CompleteTransactions";
import axios from "axios";
import moment from "moment";
import {DropdownButton,Item} from 'react-bootstrap'

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
      dateIndex:0,
      date:moment().format("DD-MMM-YYYY ")
     };
    
     this.removeFromList = this.removeFromList.bind(this)
     this.handleTransactions = this.handleTransactions.bind(this)
     this.handleDateTransaction = this.handleDateTransaction.bind(this)

     for(var i=0;i<60;i++) {
        this.state.dates.push(moment().subtract(i,'days').format("DD-MMM-YYYY "))
     }
  }
  componentWillMount() {
    axios
      .post(url,{date:this.state.date})
      .then(response => {
        this.setState({ transactions: response.data })
        this.handleTransactions(response.data)

      })
      .catch(err => {
        console.log(err);
      });


   
  }
  
  handleDateTransaction= (date)=>{
    axios
    .post(url,{date:date})
    .then(response=>{
      this.setState({transactions:response.data})
      this.handleTransactions(response.data)
    })
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
        
        
            <DropdownButton style={{paddingTop:5}} id="dropdown-basic-button" title="Select Date">
              {this.state.dates.map((date)=>(
                <NavItem  key={date} onClick={()=>this.handleDateTransaction(date)}>{date}</NavItem>
              ))}
            </DropdownButton>
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
              
                
                <div className="text-center" style={{borderStyle:"solid",borderWidth:2}}>
                  <span ><h3><b>Total</b> =  {this.state.total} Rs</h3></span>
                  <span><h3><b>ActualTotal</b> =  {this.state.actualTotal} Rs</h3></span>
                  <span><h3><b>Benifit</b> =  {this.state.total-this.state.actualTotal} Rs</h3></span>
                </div>
                
            
        
      </div>
      
      
    );
  }
}

export default Transactions;

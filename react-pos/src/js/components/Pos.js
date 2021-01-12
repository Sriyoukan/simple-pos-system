import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import io from "socket.io-client";
import axios from "axios";
import moment from "moment";
import { Modal, Button, FormGroup, Form } from "react-bootstrap";
import LivePos from "./LivePos";
import TransactionDetail from './TransactionDetail'
import PrintComponents from "react-print-components";
import { isWidthDown } from "@material-ui/core";
import Suggesion from "./Suggesion";

const HOST = "http://localhost:8001";
const newHost = "http://kcmotorspareparts.online"

let socket = io.connect(HOST);

class Pos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products:[],
      searchProduct:[],
      items: [],
      items_dublicate:[],
      quantity: 1,
      id: 0,
      addItemModal: false,
      checkOutModal: false,
      amountDueModal: false,
      totalPayment: 0,
      total: 0,
      changeDue: 0,
      name: "",
      price: 0,
      bar_code:"",
      zeroItemModal:false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
    this.handleBarCodeSubmit = this.handleBarCodeSubmit.bind(this);
    this.handleNameSubmit = this.handleNameSubmit.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.keyPressed1 = this.keyPressed1.bind(this);
    this.checkoutKey = this.checkoutKey.bind(this);
    this.handleDynamicSearch=this.handleDynamicSearch.bind(this);
    this.setProduct = this.setProduct.bind(this);

  }
  componentDidUpdate() {
    if (this.state.items.length !== 0) {
      socket.emit("update-live-cart", this.state.items);
    }
  }

  componentWillMount() {
    var url = newHost + `/api/inventory/products`;
    axios.get(url).then(response => {
      this.setState({ products: response.data });
    });
  }

  handleSubmit = e => {
    this.setState({ addItemModal: false });

    const currentItem = {
      id: this.state.id++,
      name: this.state.name,
      price: this.state.price,
      quantity: this.state.quantity
    };
    var items = this.state.items;
    items.push(currentItem);
    this.setState({ items: items });
  };
  handleBarCodeSubmit = () => {
    axios
    .get(newHost + `/api/inventory/product/${this.state.bar_code}`)
    .then(response=>{
      if(response.data && response.data.quantity){
        const currentItem = {
          id:this.state.id++,
          _id:"",
          name: "",
          price: 0,
          actualPrice:0,
          quantity: this.state.quantity,
          quantityOnHand:0
        };
        currentItem.actualPrice = response.data.actualPrice
        currentItem._id = response.data._id
        currentItem.name = response.data.name
        currentItem.price = response.data.price
        currentItem.quantityOnHand=response.data.quantity
        var items = this.state.items;
        items.push(currentItem);
        this.setState({ items: items });
        this.setState({bar_code:""})
      }else{
        this.setState({zeroItemModal:true})
      }
      
     
    })
    
    
    
  }
  handleNameSubmit = () => {
    // axios
    // .get(HOST + `/api/inventory/productName/${this.state.name}`)
    // .then(response=>{
    //   if(response.data && response.data.quantity){
    //     const currentItem = {
    //       id:this.state.id++,
    //       _id:"",
    //       name: "",
    //       price: 0,
    //       actualPrice:0,
    //       quantity: this.state.quantity,
    //       quantityOnHand:0
    //     };
        var found = false

        this.state.products.map((result)=>{
          if(result.name==this.state.name){
            const currentItem = {
              id:this.state.id++,
              _id:result._id,
              name: result.name,
              price: result.price,
              actualPrice:result.actualPrice,
              quantity: this.state.quantity,
              quantityOnHand:result.quantity
            }
            var items = this.state.items;
            items.push(currentItem);
            this.setState({ items: items });
            this.setState({name:""})
            this.setState({searchProduct:[]})
            found=true

          }
        })
        // currentItem.actualPrice = response.data.actualPrice
        // currentItem._id = response.data._id
        // currentItem.name = response.data.name
        // currentItem.price = response.data.price
        // currentItem.quantityOnHand=response.data.quantity
        if(!found){
          this.setState({zeroItemModal:true})
        }
  }
  handleDynamicSearch(event){
    this.setState({name:event.target.value})
    var localProduct =[]

    this.state.products.map((value)=>{
      var value1= value.name.search(event.target.value)
      if(value1>=0 && event.target.value ){
        localProduct.push(value)
      }
      
      this.setState({searchProduct:localProduct})
    })

  }
 
  handleName = e => {
    this.setState({ name: e.target.value });
  };
  handlePrice = e => {
    this.setState({ price: e.target.value });
  };
  handlePayment = (event) => {
    event.preventDefault()
    this.setState({ checkOutModal: false });
    var amountDiff =
      parseInt(this.state.total, 10) - parseInt(this.state.totalPayment, 10);
    if (this.state.total <= this.state.totalPayment) {
      this.setState({ changeDue: amountDiff });
      this.setState({ receiptModal: true });
      this.handleSaveToDB();
      this.setState({items_dublicate:this.state.items})
      this.setState({ items: [] })
      socket.emit("update-live-cart", []);
    } else {
      this.setState({ changeDue: amountDiff });
      this.setState({ amountDueModal: true });
    }
  };
  handleChange = (id, value) => {
    var items = this.state.items;
    if (value === "delete") {
      var newitems = items.filter(function(item) {
        return item.id !== id;
      });
      this.setState({ items: newitems });
    } else {
      for (var i = 0; i < items.length; i++) {
        if (items[i].id === id ) {
          items[i].quantity = value;
          this.setState({ items: items });
        }
      }
    }
  };
  handleCheckOut = () => {
    this.setState({ checkOutModal: true });
    var items = this.state.items;
    var totalCost = 0;
    for (var i = 0; i < items.length; i++) {
      var price = items[i].price * items[i].quantity;
      totalCost = parseInt(totalCost, 10) + parseInt(price, 10);
    }
    this.setState({ total: totalCost });
  };
  handleSaveToDB = () => {
    const transaction = {
      date: moment().format("DD-MMM-YYYY HH:mm:ss"),
      total: this.state.total,
      items: this.state.items,
      totalPayment: this.state.totalPayment
    };
    axios.post(newHost + "/api/new", transaction).catch(err => {
      console.log(err);
    });
  };
  keyPressed(event) {
    if (event.key === "Enter") {
      this.handleBarCodeSubmit()
      // document.getElementById("myInput")
    }
  }
  keyPressed1(event) {
    if (event.key === "Enter") {
      this.handleNameSubmit()
    }
  }
  checkoutKey(event) {
    if (event.key === 32) {
      this.handleCheckOut()
    }
  }

  setProduct(name){
    this.setState({name:name})
    document.getElementById("myInput1").focus();
  }

  
  render() {
    var { quantity, modal, items,items_dublicate } = this.state;

    var renderZeroItem = () =>{
      return(
        <Modal show={this.state.zeroItemModal}>
          <Modal.Header closeButton>
            <Modal.Title>No Item in inventory</Modal.Title> 
          </Modal.Header>
          <Modal.Body>
            <h3>
              You cannot find product in inventory!
            </h3>
            
          </Modal.Body>
          <Modal.Footer>
            <Button autoFocus onClick={() => this.setState({ zeroItemModal: false })}>
              close
            </Button>
          </Modal.Footer>
        </Modal>

      )
    }

    var renderAmountDue = () => {
      return (
        <Modal show={this.state.amountDueModal}>
          <Modal.Header closeButton>
            <Modal.Title>Amount</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>
              Amount Due:
              <span className="text-danger">{this.state.changeDue}</span>
            </h3>
            <p>Customer payment incomplete; Correct and Try again</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ amountDueModal: false })}>
              close
            </Button>
          </Modal.Footer>
        </Modal>
      );
    };
    var renderReceipt = () => {
      
      return (
        <Modal show={this.state.receiptModal}>
          <Modal.Header closeButton>
            <Modal.Title>Receipt</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="panel panel-primary">
              <div className="panel-heading text-center lead">{moment().format()}</div> 
          <table className="receipt table table-hover">
                <thead>
                  <tr className="small">
                    <th> Quantity </th>
                    <th> Product </th>
                    <th> Price </th>
                  </tr>
                </thead>
                {renderItemDetails(items_dublicate)}
                
                
              </table>
              </div>
            <h3>
              Total:
              <span className="text-danger">{this.state.totalPayment}</span>
            </h3>
            <h3>
              Change Due:
              <span className="text-success">{this.state.changeDue}</span>
            </h3>
          </Modal.Body>
          <Modal.Footer>
          <PrintComponents
              trigger={<Button>Print</Button>}>
              <div className="panel panel-primary">
                <div className="panel-heading text-center lead">{moment().format()}</div> 
                  <table className="receipt table table-hover">
                    <thead>
                      <tr className="small">
                        <th> Quantity </th>
                        <th> Product </th>
                        <th> Price </th>
                      </tr>
                    </thead>    
                    {renderItemDetails(items_dublicate)}
                  </table>
                </div>
              <h3>
                Total:
                <span className="text-danger">{this.state.totalPayment}</span>
              </h3>
              <h3>
                Change Due:
                <span className="text-success">{this.state.changeDue}</span>
              </h3>             
          </PrintComponents>
          <Button autoFocus  onClick={() => this.setState({receiptModal: false })}>close</Button> 
              
          </Modal.Footer>
        </Modal>
      );
    };

    var renderLivePos = () => {
      if (items.length === 0) {
        return <tr>{items}</tr>;
      } else {
        return items.map(
          item => <LivePos {...item} onChange={this.handleChange} />
          
        );
      }
    };

    var renderItemDetails = items => {
      
      return items.map(item => <TransactionDetail {...item} />);
    };

    

    return (
      <div>
        
        <div className="container">
          <div className="text-center">
            <span className="lead">Total</span>
            <br />
            <span className="text-success checkout-total-price">
              ${this.state.total}
              <span />
            </span>
            <div>
              <input  type="text" id="myInput" value={this.state.bar_code} className="form-control" style={{width:500,display:"inline"}}  placeholder="BarCode" aria-label="Search" onChange={event =>this.setState({bar_code:event.target.value})} onKeyPress={this.keyPressed} />
              <button type="submit" id="myButton" className="btn btn-success" style={{marginBottom:3}} onClick={this.handleBarCodeSubmit}>Enter</button>
              <br/>
              <input  type="text" id="myInput1" value={this.state.name} className="form-control" style={{width:500,display:"inline"}}  placeholder="Name" aria-label="Search" onChange={this.handleDynamicSearch} onKeyPress={this.keyPressed1} />
              <button type="submit" id="myButton1" className="btn btn-success" style={{marginBottom:3}} onClick={this.handleNameSubmit}>Enter</button>
              <Suggesion  results={this.state.searchProduct} setProduct={this.setProduct}/>
              
            </div>
            
            <div >
            
              <button
                className="btn btn-success lead"
                id="checkoutButton"
                onClick={this.handleCheckOut}
                onKeyPress={this.checkoutKey}
                
                
              >
                <i className="glyphicon glyphicon-shopping-cart" />
                <br />
                <br />
                C<br />
                h<br />
                e<br />
                c<br />
                k<br />
                o<br />
                u<br />
                t
              </button>
              <div className="modal-body">
                <Modal show={this.state.checkOutModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Checkout</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div ng-hide="transactionComplete" className="lead">
                      <h3>
                        Total:
                        <span className="text-danger">
                          {" "}
                          {this.state.total}{" "}
                        </span>
                      </h3>

                      <form
                        className="form-horizontal"
                        name="checkoutForm"
                        onSubmit={this.handlePayment}
                      >
                        <div className="form-group">
                          <div className="input-group">
                            <div className="input-group-addon">$</div>
                            <input
                              autoFocus
                              type="number"
                              id="checkoutPaymentAmount"
                              className="form-control input-lg"
                              name="payment"
                              onChange={event =>
                                this.setState({
                                  totalPayment: event.target.value
                                })
                              }
                              min="0"
                            />
                          </div>
                        </div>

                        <p className="text-danger">Enter payment amount.</p>
                        <div className="lead" />
                        
                        <Button
                          className="btn btn-primary btn-lg lead"
                          onClick={this.handlePayment}
                        >
                          Get Receipt
                        </Button>
                      </form>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      onClick={() => this.setState({ checkOutModal: false })}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div> 
          </div>
          
          {renderAmountDue()}
          {renderReceipt()}
          {renderZeroItem()}
          <table className="pos table table-responsive table-striped table-hover">
            <thead>
              <tr>
                <td colSpan="6" className="text-center">
                  <span className="pull-left">
                    <button
                      onClick={() => this.setState({ addItemModal: true })}
                      className="btn btn-default btn-sm"
                    >
                      <i className="glyphicon glyphicon-plus" /> Add Item
                    </button>
                  </span>
                  <Modal show={this.state.addItemModal} onHide={this.close}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add item(Product)</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form
                        ref="form"
                        onSubmit={this.handleSubmit}
                        className="form-horizontal"
                      >
                        <div className="form-group">
                          <label className="col-md-2 lead" for="name">
                            Name
                          </label>
                          <div className="col-md-8 input-group">
                            <input
                              className="form-control"
                              name="name"
                              required
                              onChange={this.handleName}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="col-md-2 lead" for="price">
                            Price
                          </label>
                          <div className="col-md-8 input-group">
                            <div className="input-group-addon">$</div>

                            <input
                              type="number"
                              step="any"
                              min="0"
                              onChange={this.handlePrice}
                              className="form-control"
                              name="price"
                              required
                            />
                          </div>
                        </div>

                        <p className="text-danger">Enter price for item.</p>
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={this.handleSubmit}>Add</Button>
                      <Button
                        onClick={() => this.setState({ addItemModal: false })}
                      >
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
              <tr className="titles">
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Tax</th>
                <th>Total</th>
                <th />
              </tr>
            </thead>
            <tbody>{renderLivePos()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Pos;

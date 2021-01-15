import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Product from "./Product";
import axios from "axios";
import { Modal, Button ,Table} from "react-bootstrap";


const HOST = "http://localhost:8001/api";
const newHost = "http://kcmotorspareparts.online/api"

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      productsDuplicate:[],
      productFormModal: false,
      name: "",
      snackMessage: "",
      quantity: "",
      price: "",
      actualPrice:"",
      bar_code:"",
      alreadyExistModal:false,
      searchName:"",
      searchBarcode:""
    };
    this.componentWillMount=this.componentWillMount.bind(this);
    this.handleNewProduct = this.handleNewProduct.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleBarCode = this.handleBarCode.bind(this)
    this.handlePrice = this.handlePrice.bind(this);
    this.handleActualPrice = this.handleActualPrice.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleSnackbar = this.handleSnackbar.bind(this);
    this.searchProduct = this.searchProduct.bind(this);
    this.searchProductByBarcode=this.searchProductByBarcode.bind(this);
  }
  componentWillMount() {
    var url = newHost + `/inventory/products`;
    axios.get(url).then(response => {
      this.setState({ products: response.data });
      
    });
  }
  handleNewProduct = e => {
    e.preventDefault();
    this.setState({ productFormModal: false });
    var product;
    var found=false;
    for(product of this.state.products){
      if(product.name === this.state.name || product.bar_code === this.state.bar_code){
        this.setState({alreadyExistModal:true})
        found=true
        break
      }
    }
    if(!found){
      var newProduct = {
        name: this.state.name,
        bar_code: this.state.bar_code,
        quantity: this.state.quantity,
        price: this.state.price,
        actualPrice:this.state.actualPrice
      };
  
      axios
        .post(newHost + `/inventory/product`, newProduct)
        .then(
          response =>
            this.setState({ snackMessage: "Product Added Successfully!" }),
            this.componentWillMount(),
          this.handleSnackbar()
        )
        .catch(err => {
          console.log(err),
            this.setState({ snackMessage: "Product failed to save" }),
            this.handleSnackbar();
  
        });
    }
    
  };

  searchProduct(event){
    if(event.target.value){
      var searchProductList=[]
      this.state.products.map(value=>{
        if(value.name.search(event.target.value)>=0){
          searchProductList.push(value)
        }
      })
      this.setState({productsDuplicate:searchProductList})
    }else{
      this.setState({productsDuplicate:[]})
    }
  }
  searchProductByBarcode(event){
    if(event.target.value){
      var searchProductList=[]
      this.state.products.map(value=>{
        if(value.bar_code.search(event.target.value)>=0){
          searchProductList.push(value)
        }
      })
      this.setState({productsDuplicate:searchProductList})
    }else{
      this.setState({productsDuplicate:[]})
    }
  }
  handleEditProduct = editProduct => {
    axios
      .put(newHost + `/inventory/product`, editProduct)
      .then(response => {
        this.setState({ snackMessage: "Product Updated Successfully!" });
        this.handleSnackbar();
        return true;
      })
      .catch(err => {
        console.log(err);
        this.setState({ snackMessage: "Product Update Failed!" }),
          this.handleSnackbar();
        return false;
      });
  };

  handleName = e => {
    this.setState({ name: e.target.value });
  };
  handlePrice = e => {
    this.setState({ price: e.target.value });
  };
  handleQuantity = e => {
    this.setState({ quantity: e.target.value });
  };
  handleBarCode = e => {
    this.setState({ bar_code: e.target.value });
  };
  handleActualPrice = e => {
    this.setState({ actualPrice: e.target.value });
  };
  handleSnackbar = () => {
    var bar = document.getElementById("snackbar");
    bar.className = "show";
    setTimeout(function() {
      bar.className = bar.className.replace("show", "");
    }, 3000);
  };

  render() {
    
    var { products, snackMessage,productsDuplicate } = this.state;
    var user = this.props.user

    var renderProducts = () => {
      if (productsDuplicate.length !== 0) {
        return productsDuplicate.map(product => (
          <Product key={product.bar_code}  {...product} user={user} onEditProduct={this.handleEditProduct} />
        ));
      } else {
        return products.map(product => (
          <Product key={product.bar_code} {...product} user={user} onEditProduct={this.handleEditProduct} />
        ));
      }
    };

    return (
      <div>
        <Modal show={this.state.alreadyExistModal}>
          <Modal.Body>
            Product already Exist!
          </Modal.Body>
          <Modal.Footer>
            <Button autoFocus type="submit" onClick={()=>{this.setState({alreadyExistModal:false})}}>Ok</Button>
          </Modal.Footer>
        </Modal>

        <div className="container" style={{paddingTop:5}}>
          {user?user.userType=='owner'?<a
            className="btn btn-success pull-right"
            onClick={() => this.setState({ productFormModal: true })}
          >
            <i className="glyphicon glyphicon-plus" /> Add New Item
          </a>:null:null}
          <a
            className="btn btn-success pull-left"
            onClick={() => window.location.reload()}
          >
            Refresh
          </a>
          
          <br />
          <br />
          <div style={{paddingBottom:10}} className="text-center">
          <input  type="text" id="myInput" className="form-control" style={{width:500,display:"inline",paddingBottom:10}}  placeholder="BarCode" aria-label="Search" onChange={this.searchProductByBarcode}  />
          
          <input  type="text" id="myInput1"  className="form-control" style={{width:500,display:"inline",paddingBottom:10}}  placeholder="Name" aria-label="Search" onChange={this.searchProduct}   />
          
          </div>
          <Table striped bordered hover style={{paddingTop:10}}>
            <thead className="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Bar_code</th>
                <th scope="col">Price</th>
                <th scope="col">Actual_Price</th>
                <th scope="col">Quantity on Hand</th>
                <th />
              </tr>
            </thead>
            <tbody>{renderProducts()}</tbody>
          </Table>
        </div>

        <Modal show={this.state.productFormModal}>
          <Modal.Header>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal" name="newProductForm">
              <div className="form-group">
                <label className="col-md-4 control-label" for="barcode">
                  Barcode
                </label>
                <div className="col-md-4">
                  <input
                    id="barcode"
                    name="barcode"
                    placeholder="Barcode"
                    className="form-control"
                    onChange={this.handleBarCode}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" for="name">
                  Name
                </label>
                <div className="col-md-4">
                  <input
                    name="name"
                    placeholder="Name"
                    className="form-control"
                    onChange={this.handleName}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" for="price">
                  Price
                </label>
                <div className="col-md-4">
                  <input
                    name="price"
                    placeholder="Price"
                    className="form-control"
                    onChange={this.handlePrice}
                    type="number"
                    step="any"
                    min="0"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" for="actualPrice">
                  Actual_Price
                </label>
                <div className="col-md-4">
                  <input
                    name="actualPrice"
                    placeholder="ActualPrice"
                    className="form-control"
                    onChange={this.handleActualPrice}
                    type="number"
                    step="any"
                    min="0"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" for="quantity_on_hand">
                  Quantity On Hand
                </label>
                <div className="col-md-4">
                  <input
                    name="quantity_on_hand"
                    placeholder="Quantity On Hand"
                    onChange={this.handleQuantity}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" for="image">
                  Upload Image
                </label>
                <div className="col-md-4">
                  <input type="file" name="image" />
                </div>
              </div>
              <br /> <br /> <br />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ productFormModal: false })}>
              Close
            </Button>
            <Button onClick={this.handleNewProduct}>Submit</Button>
          </Modal.Footer>
        </Modal>
        <div id="snackbar">{snackMessage}</div>
      </div>
    );
  }
}

export default Inventory;

import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Product from "./Product";
import axios from "axios";
import { Modal, Button ,Table} from "react-bootstrap";


const HOST = "http://localhost:8001";

class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      productFormModal: false,
      name: "",
      snackMessage: "",
      quantity: "",
      price: "",
      actualPrice:"",
      bar_code:""
    };
    this.handleNewProduct = this.handleNewProduct.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleBarCode = this.handleBarCode.bind(this)
    this.handlePrice = this.handlePrice.bind(this);
    this.handleActualPrice = this.handleActualPrice.bind(this);
    this.handleQuantity = this.handleQuantity.bind(this);
    this.handleSnackbar = this.handleSnackbar.bind(this);
  }
  componentWillMount() {
    var url = HOST + `/api/inventory/products`;
    axios.get(url).then(response => {
      this.setState({ products: response.data });
    });
  }
  handleNewProduct = e => {
    e.preventDefault();
    this.setState({ productFormModal: false });
    var newProduct = {
      name: this.state.name,
      bar_code: this.state.bar_code,
      quantity: this.state.quantity,
      price: this.state.price,
      actualPrice:this.state.actualPrice
    };

    axios
      .post(HOST + `/api/inventory/product`, newProduct)
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
  };
  handleEditProduct = editProduct => {
    axios
      .put(HOST + `/api/inventory/product`, editProduct)
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
    var { products, snackMessage } = this.state;
    var user = this.props.user

    var renderProducts = () => {
      if (products.length === 0) {
        return <tr>{products}</tr>;
      } else {
        return products.map(product => (
          <Product {...product} user={user} onEditProduct={this.handleEditProduct} />
        ));
      }
    };

    return (
      <div>
        

        <div className="container">
          <a
            className="btn btn-success pull-right"
            onClick={() => this.setState({ productFormModal: true })}
          >
            <i className="glyphicon glyphicon-plus" /> Add New Item
          </a>
          <br />
          <br />

          <Table striped bordered hover>
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

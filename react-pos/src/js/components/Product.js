import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bar_code:"",
      price: 0,
      quantity: 0,
      productModal: false,
      actualPrice:0
    };
  }
  componentDidMount() {
    this.setState({ name: this.props.name });
    this.setState({ newName: this.props.name });
    this.setState({ bar_code: this.props.bar_code });
    this.setState({ newBar_code: this.props.bar_code });
    this.setState({ price: this.props.price });
    this.setState({ newPrice: this.props.price });
    this.setState({ quantity: this.props.quantity });
    this.setState({ newQuantity: this.props.quantity });
    this.setState({actualPrice:this.props.actualPrice});
    this.setState({newActualPrice:this.props.actualPrice})
  }
  handleName = e => {
    this.setState({ newName: e.target.value });
  };
  handleBar_code = e => {
    this.setState({ newBar_code: e.target.value });
  };
  handleActualPrice = e => {
    this.setState({ newActualPrice: e.target.value });
  };
  handlePrice = e => {
    this.setState({ newPrice: e.target.value });
  };
  handleQuantity = e => {
    this.setState({ newQuantity: e.target.value });
  };
  handleProduct = e => {
    e.preventDefault();
    this.setState({ productModal: false });
    console.log("id", this.props._id);
    var editProduct = {
      name: this.state.newName,
      bar_code:this.state.newBar_code,
      quantity: this.state.newQuantity,
      price: this.state.newPrice,
      actualPrice:this.state.newActualPrice,
      _id: this.props._id
    };
    


    this.props.onEditProduct(editProduct);
    this.setState({ name: this.state.newName });
    this.setState({ bar_code: this.state.newBar_code });
    this.setState({ quantity: this.state.newQuantity });
    this.setState({ price: this.state.newPrice });
    this.setState({actualPrice:this.state.newActualPrice})
  };
  render() {
    const {
      newName,
      newBar_code,
      newPrice,
      newActualPrice,
      newQuantity,
      name,
      bar_code,
      price,
      actualPrice,
      quantity
    } = this.state;
    var user = this.props.user
    return (
      <tr>
        <td>
          <a href=""> {name} </a>
        </td>
        <td>{bar_code}</td>
        <td> ${price} </td>
        <td> ${actualPrice} </td>
         <td> {quantity} </td>
         {
           user.userType === 'owner' ? 
           <td>
           <a
             className="btn btn-info"
             onClick={() => this.setState({ productModal: true })}
           >
             <i className="glyphicon glyphicon-pencil" />
           </a>
         </td> : null
             
              
              
          }
         
         
        
        <Modal show={this.state.productModal}>
          <Modal.Header>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form-horizontal" name="newProductForm">
              <div className="form-group">
                <label className="col-md-4 control-label" for="name">
                  Name
                </label>
                <div className="col-md-4">
                  <input
                    name="name"
                    placeholder="Name"
                    onChange={this.handleName}
                    className="form-control"
                    value={newName}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" for="name">
                  Bar_code
                </label>
                <div className="col-md-4">
                  <input
                    name="bar_code"
                    placeholder="Bar_code"
                    onChange={this.handleBar_code}
                    className="form-control"
                    value={newBar_code}
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
                    value={newPrice}
                    type="number"
                    step="any"
                    min="0"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-4 control-label" for="price">
                  ActualPrice
                </label>
                <div className="col-md-4">
                  <input
                    name="actualPrice"
                    placeholder="actualPrice"
                    className="form-control"
                    onChange={this.handleActualPrice}
                    value={newActualPrice}
                    type="number"
                    step="any"
                    min="0"
                  />
                </div>
              </div>
              <div className="form-group">
                <label
                  className="col-md-4 control-label"
                  for="quantity_on_hand"
                >
                  Quantity On Hand
                </label>
                <div className="col-md-4">
                  <input
                    name="quantity_on_hand"
                    placeholder="Quantity On Hand"
                    onChange={this.handleQuantity}
                    value={newQuantity}
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
            <Button onClick={() => this.setState({ productModal: false })}>
              Close
            </Button>
            <Button onClick={this.handleProduct}>Update</Button>
          </Modal.Footer>
        </Modal>
      </tr>
    );
  }
}

export default Product;

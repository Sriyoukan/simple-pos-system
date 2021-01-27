import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import TransactionDetail from "./TransactionDetail";
import axios from "axios";
const HOST = "http://localhost:8001/api";
const newHost = "http://kcmotorspareparts.online/api"

class CompleteTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionModal: false,
      deleteModal:false,
      totalquantity: 0,
      items: []
    };
    this.deleteTransaction = this.deleteTransaction.bind(this)
  }
  async deleteTransaction(id){
    const removeFromList = this.props.removeFromList
    var response =axios.delete(`${HOST}/transactions/${id}`)
    var newTransactions = removeFromList(id)
    const handleTransaction = this.props.handleTransactions
    handleTransaction(newTransactions)
  }

  render() {
    var { date, total, items,_id ,totalPayment} = this.props;
    var renderQuantity = items => {
      var totalquantity = 0;
      for (var i = 0; i < items.length; i++) {
        totalquantity =
          parseInt(totalquantity, 10) + parseInt(items[i].quantity, 10);
      }

      return totalquantity;
    };
    var renderItemDetails = items => {
      return items.map(item => <TransactionDetail {...item} />);
    };

    return (
      <tr>
        <td> {date}</td>
        <td> {total} </td>
        <td> {renderQuantity(items)} </td>
        <td>
          <a
            className="btn btn-info"
            onClick={() => this.setState({ transactionModal: true })}
          >
            <i className="glyphicon glyphicon-new-window" />
          </a>
        </td>
        <td>
          <a
            className="btn btn-info"
            onClick={()=>{this.setState({deleteModal:true})}}
          >
            <i className="glyphicon glyphicon-remove-sign" />
          </a>
        </td>
        <Modal show={this.state.deleteModal}>
          <Modal.Body>
            Want to delete??
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-danger" onClick={() => {this.deleteTransaction(_id);this.setState({ deleteModal: false })}}>
              delete
            </Button>
            <Button onClick={() => {this.setState({ deleteModal: false })}}>
              cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.transactionModal}>
          <Modal.Header>
            <Modal.Title>Transaction Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="panel panel-primary">
              <div className="panel-heading text-center lead">{date}</div>

              <table className="receipt table table-hover">
                <thead>
                  <tr className="small">
                    <th> Quantity </th>
                    <th> Product </th>
                    <th> Price </th>
                  </tr>
                </thead>
                {renderItemDetails(items)}
                <tbody>
                  <tr className="total">
                    <td />
                    <td>Total</td>
                    <td> {total} Rs</td>
                  </tr>
                  <tr>
                    <td />
                    <td>Payment</td>
                    <td> {totalPayment} Rs</td>
                  </tr>
                  <tr className="lead">
                    <td />
                    <td>Change</td>
                    <td> {totalPayment-total} Rs </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ transactionModal: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </tr>
    );
  }
}

export default CompleteTransactions;

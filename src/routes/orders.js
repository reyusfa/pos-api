const express = require('express');
const Route = express.Router();

const {
  getAllOrders,
  getOrder,
  postOrder,
  // putOrder,
  deleteOrder,

  getAllOrderItems,
  getOrderItem,
  // postOrderItem,
  // putOrderItem,
  // deleteAllOrderItems,
  // deleteOrderItem,

  // getAllOrderPayments,
  // getOrderPayment,
  // postOrderPayment,
  // putOrderPayment,
  // deleteAllOrderPayments,
  // deleteOrderPayment
} = require('../controller/orders');

Route
  .get('/', getAllOrders)
  .get('/:id', getOrder)
  .post('/', postOrder)
  // .put('/:id', putOrder)
  .delete('/:id', deleteOrder)

  .get('/:id/items', getAllOrderItems)
  .get('/:id/items/:item_id', getOrderItem) // (Optional)
  // .post('/:id/items', postOrderItem)
  // .put('/:id/items/:item_id', putOrderItem)
  // .delete('/:id/items', deleteAllOrderItems) // (Optional)
  // .delete('/:id/items/:item_id', deleteOrderItem)

  // .get('/:id/payments', getAllOrderPayments)
  // .get('/:id/payments/:payment_id', getOrderPayment) // (Optional)
  // .post('/:id/payments', postOrderPayment)
  // .delete('/:id/payments', deleteAllOrderPayments)
  // .delete('/:id/payments/:payment_id', deleteOrderPayment) // (Optional)
  ;

module.exports = Route;

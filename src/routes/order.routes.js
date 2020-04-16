const express = require('express');
const router = express.Router();
const OrderService = require('../services/order.service');
const { getOrderList,addOrder,updateOrder, deleteOrder } = require('../controllers/order.controller');

const orderService = new OrderService()
router.get('/', (req, res, next) => getOrderList(req, res,orderService));
router.post('/', (req, res, next) => addOrder(req,res,orderService));
router.patch('/:id',(req,res,next)=>updateOrder(req,res,orderService));
router.delete('/:id',(req,res,next)=>deleteOrder(req,res,orderService));
module.exports = router;


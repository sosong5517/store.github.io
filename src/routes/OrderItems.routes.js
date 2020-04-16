const express = require('express');
const router = express.Router();
const OrderItemService = require('../services/OrderItem.service');
const orderItemService = new OrderItemService();

const { GetAllorderItem } = require('../controllers/orderItem.controller');
router.get('/', (req, res, next) => GetAllorderItem(req, res, orderItemService));

module.exports = router
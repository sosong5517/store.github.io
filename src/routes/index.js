const express = require('express');
const router = express.Router();
const  basicAuth = require('../middlewares/basic-auth-helper');
const productRoutes = require('./product.route');
const categoryRoutes = require('./category.route');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const noRoute = require('./no.route');
const logRoute = require('./log.route');
const orderRoutes = require('./order.routes');
const orderItemRoutes = require('./OrderItems.routes');

router.use(basicAuth.init());
router.use(logRoute);
router.use('/auth', authRoutes);
router.use('/product', productRoutes);
router.use('/category', categoryRoutes);
router.use('/user', userRoutes);
router.use('/order', orderRoutes);
router.use('/orderItem',orderItemRoutes)
router.use(noRoute);

module.exports = router;
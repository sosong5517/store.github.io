const logEvent = require('../events/myEmitter');
const Order = require('../models/order.model');
const Product = require('../models/product.model');
const sequalize = require('../../dbConn');



class OrderService {


    async getAllOrder() {

        // console.log('order service')
        // let result;
        // try {
        //     result = null    
        //     //seq.query('SELECT * FROM `order`');

        // } catch (e) {
        //     logEvent.emit('APP-ERROR', {
        //         logTitle: 'GET ORDER SERVICE FAILED',
        //         logMessage: e

        //     })
        //     throw new Error(e);
        // }
        // return result
        let result;
        try {
            result = await Order.findAll({include:Product})

        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-ORDER-FAILED ',
                logMessage: e

            })
            throw new Error(e);
        }
return result
    }
    async createOrder(order) {
        let result;
        try {
            result = await Order.create(order)
        } catch (e) {

            logEvent.emit('APP-ERROR', {
                logTitle: 'CREATE-CATEGORY-SERVICE-FAILED',
                logMessage: e
            });
        }

    }

    async updateOrder(id, data) {
        const order = await Order.findByPk(id);
        order.outletCode = data.outletCode;

        let result;
        try {
            result = await order.save();
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'UPDATE-ORDDER-SERVICE-FAILED',
                logMessage: e
            });
        }
        return result;

    }

    async  deleteOrder(id) {

        const order = await Order.findByPk(id);
        let result;
        try {
            result = await order.destroy();
        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'DELETE-CATEGORY-SERVICE-FAILED',
                logMessage: e
            });

        }
        return result;
    }




}
module.exports = OrderService;

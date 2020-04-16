const logMessage = require('../events/myEmitter')
const OrderItem = require('../models/orderItem.model');
const Order = require('../models/order.model')
class OrdeItemService {
    async GetAllorderItem() {

        let result
        try {
            result = await OrderItem.findAll()

        } catch (e) {
            logEvent.emit('APP-ERROR', {
                logTitle: 'GET-ORDER ITEM-SERVICE-FAILED',
                logMessage: e
            })


        }
        return result
    }

}
module.exports = OrdeItemService
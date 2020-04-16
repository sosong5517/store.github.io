//const con = require('../../conQuery')
//const queryAllOrder =(req,res)=>{

//     con.query('select * from books', function (error, result) {
//         if (error) {
//             console.log('ini error',error)
//             hasil = error
//         } else {
//             console.log('bener')
//             res.json({
//                 data:result,
//                 keterangan:"bisa"
//             })
//         }
//     })

// }

const getOrderList = async (req, res, service) => {


    try {
        let order;
        console.log('order controler')
        if (req.query.id) {
            console.log('query id')
            const id = req.query.id;
            order = await service.getOrederByid(id);
        } else if (req.query.pageNo && req.query.rowPage) {
            console.log('page')
            order = await service.getAllOrderPaging(req.query.pageNo, req.query.rowPage);

        }
        else {
            console.log('order');
            order = await service.getAllOrder();
        }
        res.send(order)

    } catch (e) {
        console.log('orser servicse conteroller')
        res.sendStatus(500)

    }
}

const addOrder = async (req, res, service) => {
    const payload = req.body;
    const newOrder = await service.createOrder(payload);
    res.send(newOrder);

}
const updateOrder = async (req, res, service) => {
    const payload = req.body
    const id = req.params.id;
    const updatedOrder = await service.updateOrder(id, payload);
    res.send(updatedOrder)

}
const deleteOrder = async(req,res,service)=>{
    const id = req.params.id;
    const deletedOrder = await service.deleteOrder(id);
    res.send(deletedOrder)
}

module.exports = {
    getOrderList,
    addOrder,
    updateOrder,
    deleteOrder,
    //queryAllOrder
}
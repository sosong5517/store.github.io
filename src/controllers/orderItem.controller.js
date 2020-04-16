const GetAllorderItem = async (req, res, service) => {
    console.log("all tes get")
    try {
        let OrderItemData;
        OrderItemData = await service.GetAllorderItem();
        res.send(OrderItemData)

    } catch (e) {
        res.sendStatus(500);
    }

}
module.exports = {
    GetAllorderItem

}
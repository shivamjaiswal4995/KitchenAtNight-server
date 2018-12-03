const orderService = require('./order.service');

const addOrder = (orderObj, done) => {
    orderService.addOrder(orderObj, done);
}

const findPreviousOrders = (userId, done) => {
    orderService.findPreviousOrders(userId, done);
}

const getAllOrders = (done) => {
    orderService.getAllOrders(done);
}

const changeStateOfOrderToDispatched = (orderId) => {
    orderService.changeStateOforderToDispatched(orderId);
}

const changeStateOfOrderToCancelled = (orderId) => {
    orderService.changeStateOforderToCancelled(orderId);
}

const changeStateOfOrderToDelivered = (orderId) => {
    orderService.changeStateOforderToDelivered(orderId);
}
module.exports = {
    addOrder,
    findPreviousOrders,
    getAllOrders,
    changeStateOfOrderToCancelled,
    changeStateOfOrderToDelivered,
    changeStateOfOrderToDispatched
}
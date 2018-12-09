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

const changeStateOfOrderToDispatched = (orderId, done) => {
    orderService.changeStateOfOrderToDispatched(orderId, done);
}

const changeStateOfOrderToCancelled = (orderId, done) => {
    orderService.changeStateOfOrderToCancelled(orderId, done);
}

const changeStateOfOrderToDelivered = (orderId, done) => {
    orderService.changeStateOfOrderToDelivered(orderId, done);
}
module.exports = {
    addOrder,
    findPreviousOrders,
    getAllOrders,
    changeStateOfOrderToCancelled,
    changeStateOfOrderToDelivered,
    changeStateOfOrderToDispatched
}
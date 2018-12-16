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

const getInTheKitchenOrders = (done) => {
    orderService.getInTheKitchenOrders(done);
}

const getCancelledOrders = (done) => {
    orderService.getCancelledOrders(done);
}

const getDispatchedOrders = (done) => {
    orderService.getDispatchedOrders(done);
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
    getInTheKitchenOrders,
    getCancelledOrders,
    getDispatchedOrders,
    changeStateOfOrderToCancelled,
    changeStateOfOrderToDelivered,
    changeStateOfOrderToDispatched
}
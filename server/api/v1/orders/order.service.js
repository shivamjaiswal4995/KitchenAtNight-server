const orderDao = require('./order.dao');

const addOrder = (orderObj, done) => {
    orderDao.addOrder(orderObj, done);
}

const findPreviousOrders = (userId, done) => {
    orderDao.findPreviousOrders(userId, done);
}

const getAllOrders = (done) => {
    orderDao.getAllOrders(done);
}

const getInTheKitchenOrders = (done) => {
    orderDao.getInTheKitchenOrders(done);
}

const getCancelledOrders = (done) => {
    orderDao.getCancelledOrders(done);
}

const getDispatchedOrders = (done) => {
    orderDao.getDispatchedOrders(done);
}

const changeStateOfOrderToDispatched = (orderId, done) => {
    orderDao.changeStateOfOrderToDispatched(orderId, done);
}

const changeStateOfOrderToCancelled = (orderId, done) => {
    orderDao.changeStateofOrderToCancelled(orderId, done);
}

const changeStateOfOrderToDelivered = (orderId, done) => {
    orderDao.changeStateofOrderToDelivered(orderId, done);
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
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

const changeStateOfOrderToDispatched = (orderId) => {
    orderDao.changeStateOforderToDispatched(orderId);
}

const changeStateOfOrderToCancelled = (orderId) => {
    orderDao.changeStateOforderToCancelled(orderId);
}

const changeStateOfOrderToDelivered = (orderId) => {
    orderDao.changeStateOforderToDelivered(orderId);
}
module.exports = {
    addOrder,
    findPreviousOrders,
    getAllOrders,
    changeStateOfOrderToCancelled,
    changeStateOfOrderToDelivered,
    changeStateOfOrderToDispatched
}
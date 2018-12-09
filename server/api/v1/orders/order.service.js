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
    changeStateOfOrderToCancelled,
    changeStateOfOrderToDelivered,
    changeStateOfOrderToDispatched
}
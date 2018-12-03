const orderModel = require('./order.entity');
const uuidv4 = require('uuid/v4');

const addOrder = (orderObj,done) => {

    let newOrder = new orderModel({

        orderId: uuidv4(),
        userId: orderObj.userId,
        items: orderObj.items,//with items quantity of each item is required..
        state_Of_order: orderObj.state_Of_order,
        orderedOn: orderObj.orderedOn,
        totalCost: orderObj.totalCost,
        discount: orderObj.discount,
        tax: orderObj.tax,
        payabale_Amount: orderObj.payabale_Amount

    });

    newOrder.save((err, savedOrder) => {

        if(err){
            return done(err);
        }
        else{
            return done(null, savedOrder);
        }
    })
};

const findPreviousOrders = (userId, done) => {

    orderModel.find( {userId: userId}, (err, orders) => {
        if(err){
            return done(err);
        }
        else{
            return done(null, orders);
        }
    })
};
//can be used for analysis purpose.
const getAllOrders = (done) => {

    orderModel.find( (err,orders) => {
        if(err){
            return done(err);
        }
        else{
            return done(null, orders);
        }
    })
};

const changeStateOforderToDispatched = (orderId/*, done*/) => {
    orderModel.findOneAndUpdate(
        {orderId: orderId},
        {$set: {stateOfOrder : "Dispatched"}}
        )
}

const changeStateofOrderToCancelled = (orderId/*,done*/) => {
    orderModel.findOneAndUpdate(
        {orderId : orderId},
        {$set : {stateOfOrder : "Cancelled"}}
    )
}

const changeStateofOrderToDelivered = (orderId/*,done*/) => {
    orderModel.findOneAndUpdate(
        {orderId : orderId},
        {$set : {stateOfOrder : "Delivered "}}
    )
}
 
module.exports = {
    addOrder,
    findPreviousOrders,
    getAllOrders,
    changeStateofOrderToCancelled,
    changeStateofOrderToDelivered,
    changeStateOforderToDispatched
}
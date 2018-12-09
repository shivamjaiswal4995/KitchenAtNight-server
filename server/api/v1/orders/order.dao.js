const orderModel = require('./order.entity');
const uuidv4 = require('uuid/v4');

const addOrder = (orderObj,done) => {
    let newOrder = new orderModel({

        orderId: uuidv4(),
        userId: orderObj.userId,
        userName: orderObj.userName,
        items: orderObj.items,//with items quantity of each item is required.
        offerApplied: orderObj.offerApplied,
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
    console.log(userId);
    orderModel.find( {userId: userId}, (err, orders) => {
        if(err){
            return done(err);
        }
        else if(orders.length==0){
            let err = {
                message : 'You have no previous order. Order now and have great experience'
                 }
                 return done(err);
        }
        else{
            console.log(orders);
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

const changeStateOfOrderToDispatched = (orderId, done) => {
    orderModel.findOneAndUpdate(
        {orderId: orderId},
        {$set: {stateOfOrder : "Dispatched"}},
        {new:true},
        (err,updatedOrder) => {
            if(err){
                return done(err);
            }
            else{
                return done(null,updatedOrder);
            }
        })
};

const changeStateofOrderToCancelled = (orderId,done) => {
    orderModel.findOneAndUpdate(
        {orderId : orderId},
        {$set : {stateOfOrder : "Cancelled"}},
        {new: true},
        (err,updatedOrder) => {
            if(err){
                return done(err);
            }
            else{
                return done(null,updatedOrder);
            }
        })
};

const changeStateofOrderToDelivered = (orderId,done) => {
    orderModel.findOneAndUpdate(
        {orderId : orderId},
        {$set : {stateOfOrder : "Delivered"}},
        {new: true},
        (err,updatedOrder) => {
            if(err){
                return done(err);
            }
            else{
                return done(null,updatedOrder);
            }
        })
};
 
module.exports = {
    addOrder,
    findPreviousOrders,
    getAllOrders,
    changeStateofOrderToCancelled,
    changeStateofOrderToDelivered,
    changeStateOfOrderToDispatched
}
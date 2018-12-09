const router = require('express').Router();
const orderController = require('./order.controller');
const isAuthenticated = require('../auth/authController');

//this method will be accessed by admin only
router.get('/', /*isAuthenticated,*/ (req,res) => {
    orderController.getAllOrders((err, orders)=> {
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).json(orders);
        }
    })
});

//as we click Place Order button, this would be called.
router.post('/addOrder'/*, isAuthenticated*/, (req,res) => {
    
    let orderObj = {
        
        userId: req.body.userId,
        userName: req.body.userName,
        items: req.body.items,//with items quantity of each item is required...
        offerApplied: req.body.offerApplied,
        referralCode: req.body.referralCode,
        totalCost: req.body.totalCost,
        discount: req.body.discount,
        tax: req.body.tax,
        payabale_Amount: req.body.payabale_Amount
    }
    
    orderController.addOrder(orderObj, (err, savedOrder) => {
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).send(savedOrder);//what is use of sending saved order.
        }
    })
});

router.post('/previousOrder', /*isAuthenticated,*/ (req,res) => {

    let userId = req.body.userId;
    console.log(`router ${req.body.userId}`);
//here we are not mentoning done in arguments?
    orderController.findPreviousOrders(userId, (err,orders) => {
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).json(orders);
        }
    })
});

router.put('/cancelled', (req,res) => {

    let orderId = req.body.orderId;
    orderController.changeStateOfOrderToCancelled(orderId, (err,updatedOrder) => {
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).json(updatedOrder);
        }
    })
});

router.put('/delivered', (req,res) => {

    let orderId = req.body.orderId;
    orderController.changeStateOfOrderToDelivered(orderId,(err,updatedOrder) => {
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).json(updatedOrder);
        }
    })
});

router.put('/dispatched', (req,res) => {

    let orderId = req.body.orderId;
    orderController.changeStateOfOrderToDispatched(orderId, (err,updatedOrder) => {
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).json(updatedOrder);
        }
    })
});

module.exports = router;
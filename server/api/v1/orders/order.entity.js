const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
      
    orderId: {type: String, required: true},
    userId: {type: String, required: true},
    userName: {type: String, required: true},
    items: [{}],//with items quantity of each item is required.
    stateOfOrder: {type: String, required: true, default: "In the Kitchen"},
    orderedOn: {type: Date, default: Date.now},
    offerApplied: {type: String, required: true},
    referralCode: {type: String, required: false},
    totalCost: {type: Number, required:true},
    discount: {type: Number, required: true},
    tax: {type: Number, required: true},
    payabale_Amount: {type: Number, required: true}

});

//orderSchema.index({userId: 1, userName: 1, userEmail: 1}, {unique: true});

module.exports = mongoose.model('orders', orderSchema);
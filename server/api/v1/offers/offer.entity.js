const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({

    offerId: {type: String, required: true},
    offerName: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},// 2 types of offer.. a)flat and b)percentage c)adminside
    value : {type: Number, required: true},
    maximumDiscount: {type: Number, required: false},
    minimumAmount: {type: Number, required: false}
});

//offerSchema.index??

module.exports = mongoose.model('offers', offerSchema);
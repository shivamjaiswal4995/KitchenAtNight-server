const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
      
    userId: {type: String, required: true},
    userName: {type: String, required: true},
    userEmail: {type: String, required: true},
    password: {type: String, required: true},
    contact: {type: Number, required: true},
    isAdmin: {type: Boolean, required : true, default: false},
    addresses: [{}],
    orders: [{}],
    cart : [{}],
    referralCode : {type: String, required: true},
    referrralCouponCount : {type : Number, required : true , default : 0}
});

userSchema.index({userId: 1, userName: 1, userEmail: 1}, {unique: true});

module.exports = mongoose.model('users', userSchema);
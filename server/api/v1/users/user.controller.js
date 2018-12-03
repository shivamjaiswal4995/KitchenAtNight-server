const userService = require('./user.service');

const addUser = function(userObj, done) {
    userService.addUser(userObj, done);
}

const addAdmin = function(adminObj,done) {
    userService.addAdmin(adminObj,done);
}

const findUser = (userObj, done) => {
    userService.findUser(userObj, done);
}

const userProfile = (userId, done) => {
    userService.userProfile(userId, done);
}

const getAllUsers = (done) => {
    userService.getAllUsers(done);
};

const findUserByEmail = (userEmail, done) => {
    userService.findUserByEmail(userEmail,done);
}

const findUserByContactNo = (contactNo, done) => {
    userService.findUserByContactNo(contactNo,done);
}

const increaseReferralCoponcount = (referralCode) => {
    userService.increaseReferralCouponCount(referralCode);
}

const decreaseReferralCouponCount = (referralCode) => {
    userService.decreaseReferralCouponCount(referralCode);
}
module.exports = {
    addUser,
    addAdmin,
    findUser,
    userProfile,
    getAllUsers,
    findUserByEmail,
    findUserByContactNo,
    increaseReferralCoponcount,
    decreaseReferralCouponCount
}
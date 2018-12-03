const userDAO = require('./user.dao');

const addUser = (userObj, done) => {
    userDAO.addUser(userObj, done);
}

const addAdmin = (adminObj,done) => {
    userDAO.addAdmin(adminObj,done);
}
const findUser = (userObj, done) => {
    userDAO.findUser(userObj, done);
}

const userProfile = (userId, done) => {
    userDAO.userProfile(userId, done);
}

const getAllUsers = (done) => {
    userDAO.getAllUsers(done);
}

const findUserByEmail = (userEmail, done) => {
    userDAO.findUserByEmail(userEmail, done);
}

const findUserByContactNo = (contactNo, done) => {
    userDAO.findUserByContactNo(contactNo, done);
}

const increaseReferralCouponCount = (referralCode) =>{
    userDAO.increaseReferralCouponCount(referralCode);
}

const decreaseReferralCouponCount = (referralCode) => {
    userDAO.decreaseReferralCouponCount(referralCode);
}
//some places we have semicolon after defining function while at some places we donthave.
module.exports = {
    addUser,
    addAdmin,
    findUser,
    userProfile,
    getAllUsers,
    findUserByEmail,
    findUserByContactNo,
    increaseReferralCouponCount,
    decreaseReferralCouponCount
}
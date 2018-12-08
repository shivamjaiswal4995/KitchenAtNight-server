const userModel = require('./user.entity');
const signToken = require('../JWT').signToken;
const verifyToken = require('../JWT').verifyToken;
const bcrypt = require('bcryptjs');
const config = require('../../../config');
const uuidv4 = require('uuid/v4');

const addUser = (userObj, done) => {
    let hashedPassword = bcrypt.hashSync(userObj.password);
    let referralString = userObj.userName.trim().split(" ").join("");
    let val = Math.floor(1000 + Math.random() * 9000);
    let referralCode = referralString + val;
    let newUser = new userModel({
        userId: uuidv4(),
        userName: userObj.userName,
        userEmail: userObj.userEmail,
        password: hashedPassword,
        contact: userObj.contact,
        referralCode: referralCode
    });
    newUser.save((err, savedUser) => {
        if (err) {
            return done(err);
        } else {
            // generating token
            let payload = {
                userName: savedUser.userName,
                referralCode: savedUser.referralCode,
                contact: savedUser.contact,
                cart: savedUser.cart,
                userEmail: savedUser.userEmail,
                referralCouponCount: savedUser.referralCouponCount,
                userId: savedUser.userId
            }
            signToken(payload, config.secret, 43200, done);

        }
    });
};

const addAdmin = (adminObj, done) => {
    let hashedPassword = bcrypt.hashSync(adminObj.password);

    let newUser = new userModel({
        userId: uuidv4(),
        userName: userObj.userName,
        userEmail: userObj.userEmail,
        password: hashedPassword,
        contact: userObj.contact,
        isAdmin: true,

    });
    console.log(newUser);
    newUser.save((err, savedUser) => {
        if (err) {
            console.log("error occured at usr dao");
            return done(err);
        } else {
            // generating token
            let payload = {
                userName: savedUser.userName,
                userId: savedUser.userId
            }
            signToken(payload, config.secret, 43200, done);

        }
    });
};

const findUser = (userObj, done) => {
    userModel.findOne({ userEmail: userObj.userEmail }, (err, user) => {
        if (err) {
            return done(err);
        } else if (!user) {
            let errObj = {
                auth: false,
                token: null,
                message: 'No user found'
            };
            return done(errObj);
        } else {
            const validPassword = bcrypt.compareSync(userObj.password, user.password);
            if (!validPassword) {
                let errObj = {
                    auth: false,
                    token: null,
                    message: 'Incorrect password'
                };
                return done(errObj);
            } else {
                let payload = {
                    userName: user.userName,
                    userId: user.userId,
                    referralCode: user.referralCode,
                    contact: user.contact,
                    cart: user.cart,
                    userEmail: user.userEmail,
                    referralCouponCount: user.referralCouponCount
                };
                signToken(payload, config.secret, 43200, done);
            }
        }
    });
}

const userProfile = (userEmail) => {
    userModel.findOne({ userEmail: userEmail }, { password: 0 }, (err, user) => {
        if (err) {
            return err;
        } else if (!user) {
            let err = new Error('No user found!');
            return err;
        } else {
            return user;
        }
    });
}

const getAllUsers = (done) => {
    userModel.find({}, { password: 0 }, (err, users) => {
        if (err) {
            return done(err);
        } else {
            return done(null, users);
        }
    });
};

const findUserByEmail = (userEmail, done) => {
    userModel.find({ userEmail: userEmail }, (err, user) => {
        if (err) {
            return done(err);
        } else if (user.length == 0) {
            let err = new Error('No user found!');
            return done(err);
        } else {
            return done(null, user);
        }
    });
}

const findUserByContactNo = (contactNo, done) => {
    userModel.find({ contact: contactNo }, (err, user) => {

        if (err) {
            return done(err);
        } else if (user.length == 0) {
            let err = new Error('No user found!');
            return done(err);
        } else {
            return done(null, user);
        }
    });
}

const increaseReferralCouponCount = (referralCode) => {
    userModel.findOneAndUpdate(
        { referralCode: referralCode },
        { $inc: { "referrralCouponCount": 1 } }
    )
}

const decreaseReferralCouponCount = (userId) => {
    userModel.findOneAndUpdate(
        { referralCode: referralCode },
        { $inc: { "referralCouponCount": 1 } }
    )
}
//why are we using semicolon here and not in userProfile?

// const addAddressToUser = (userId, addressObj , done) => {
//     updateToUser
//     userModel.find
// }
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
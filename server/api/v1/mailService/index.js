const nodemailer = require('nodemailer');
const config = require('../../../config');
const logger = require('../../../logger');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'KitchenAtNight24.7@gmail.com',
        pass: 'shivnarayanjaiswal'
    }
});

const sendConfirmationMail = (details) => {
    const receiversName = details.receiversName;
    const orderId = details.orderId;
    const message= `<strong>Hello ${receiversName}</strong>, <br>Greetings to you.<br><br><p> We thought you'd like to know that your order with orderId ${orderId} has been confirmed,
    <br> and is in preparation phase in Kitchen.<br><br>We will love to improve your experience. Please provide feedback and suggestions.<br>
    <br>Have a great meal and good time.<br><br>With Regards,<br>BiteAtNightTeam<br>`;

    let mailOptions = {
        from: 'KitchenAtNight24.7@gmail.com',
        to: details.to,
        subject: `<strong>Order Confirmed :</strong> Order with orderId ${orderId}`,
        html: message
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            if(config.logging) {
                logger.error("Error occurred while sending notification mail: ", err);
            }
            console.log("Error occurred while sending notification mail: ", err);
        } else {
            console.log('Confirmation mail has been sent successfully!');
        }
    });
}

const sendDeliveryMail = (details) => {
    const receiversName = details.receiversName;
    const orderId = details.orderId;
    const message = `<strong>Dear ${receiversName}</strong>, <br>Greetings to you.<br><br>
    <p> Your order with orderId ${orderId} has been delivered.<br><br>Please provide your valuable feedback in feedback section of app<br>
    <br>We are dedicated towards enhancing your overall experience with BiteAtNight food delivery service.<br>
    <br>Have a great meal and good time.<br>
    <br><br>With Regards,<br>BiteAtNight Team`;
    
    let mailOptions = {
        from: 'KitchenAtNight24.7@gmail.com',
        to: details.to,
        subject: `<strong>Order Delivered : </strong>Order with orderId ${orderId}`,
        html: message
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            if(config.logging) {
                logger.error("Error occurred while sending notification mail: ", err);
            }
            console.log("Error occurred while sending notification mail: ", err);
        } else {
            console.log('Notification mail has been sent successfully!');
        }
    });
}

const sendReferralMail = (details) => {
    const receiversName = details.receiversName; /*receivers name is name of guy whose referral code have been used*/
    const referralCode = details.referralCode;
    const referralUsedBy = details.referralUsedBy;
    const message= `<strong>Hello ${receiversName}</strong>, <br>Wuhooo!!!<br><br>
    <p> Congratulations for earning referral coupon <strong>KitchenAtNight30</strong>!! <br>
    Your friend ${referralUsedBy} has used your referral code ${referralCode}<br>
    <br>You can use coupon code KitchenAtNight30 to avail <strong>30% off upto 100 rupees</strong> on your next order.<br>
    <br>Keep referring to friends and earn more referral coupon.<br>
    <br>Have a great meal and good time.<br><br>With Regards,<br>KitchenAtNightTeam<br>`;

    let mailOptions = {
        from: 'KitchenAtNight24.7@gmail.com',
        to: details.to,
        subject: `<strong>Referral Coupon Earned: KitchenAtNight30 </strong>`,
        html: message
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            if(config.logging) {
                logger.error("Error occurred while sending notification mail: ", err);
            }
            console.log("Error occurred while sending notification mail: ", err);
        } else {
            console.log('Confirmation mail has been sent successfully!');
        }
    });
}

module.exports = {
    sendDeliveryMail,
    sendConfirmationMail,
    sendReferralMail
}


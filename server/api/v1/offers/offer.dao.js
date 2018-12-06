const offerModel = require('./offer.entity');
const uuidv4 = require('uuid/v4');

const addOffer = (offerObj, done) => {

    let newOffer = new offerModel({

        offerId: uuidv4(),
        offerName: offerObj.offerName,
        description: offerObj.description,
        category: offerObj.category,
        value: offerObj.value,
        maximumDiscount: offerObj.maximumDiscount,
        minimumAmount: offerObj.minimumAmount
    })
    newOffer.save( (err, savedOffer) =>{

        if(err){
            return done(err);
        }
        else{
            return done(null, savedOffer);
        }

    })
};

const getAllOffers = (done) => {

    offerModel.find({}, (err, offers) => {
        if(err){
            return done(err);
        }
        else {
            return done(null, offers);
        }
    })
};

const removeOffer = (offerId, done) => {

    offerModel.findOneAndDelete({offerId : offerId}, (err, offer) =>{
        if(err){
            return done(err);
        }
        else if(!offer){

            let errObj = {
                message: 'Offer not found'
            }
            return done(errObj);
        }
        else{
            return done(null, offer);
        }
    })
};

module.exports = {
    addOffer,
    getAllOffers,
    removeOffer
}

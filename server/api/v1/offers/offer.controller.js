const offerService = require('./offer.service');

const addOffer = (offerObj, done) => {

    offerService.addOffer(offerObj, done);
}

const removeOffer = (offerId, done) => {
    offerService.removeOffer(offerId, done);
}

const getAllOffers = (done) => {
    offerService.getAllOffers(done);
}

module.exports = {

    addOffer,
    removeOffer,
    getAllOffers
}
const offerDAO = require('./offer.dao');

const addOffer = (offerObj, done) => {

    offerDAO.addOffer(offerObj, done);
}

const removeOffer = (offerId, done) => {
    offerDAO.removeOffer(offerId, done);
}

const getAllOffers = (done) => {
    offerDAO.getAllOffers(done);
}

module.exports = {

    addOffer,
    removeOffer,
    getAllOffers
}
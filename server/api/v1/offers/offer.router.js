const router = require('express').Router();
const offerController = require('./offer.controller');
const isAuthenticated = require('../auth/authController');

router.get('/allOffer', (req,res) => {
    offerController.getAllOffers((err, offers) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(offers);
        }
    })
});

router.post('/addOffer', /*isAuthenticated,*/ (req,res) => {

    let offerObj = {

        offerName: req.body.offerName, 
        description: req.body.description,
        category: req.body.category,
        value: req.body.value,
        maximumDiscount: req.body.maximumDiscount,
        minimumAmount: req.body.minimumAmount
    
    }
    offerController.addOffer(offerObj, (err, savedOffer) =>{
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).send(savedOffer);
        }
    })
});


router.delete('/removeOffer'/*, isAuthenticated*/, (req,res) => {

    let offerId = req.body.id;

    offerController.removeOffer(offerId, (err, deletedOffer) => {
        if(err){
            return res.status(500).send(err);
        }
        else{
            return res.status(200).send(deletedOffer);
        }
    })

});
module.exports = router;
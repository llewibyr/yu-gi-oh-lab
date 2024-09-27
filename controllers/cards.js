const Card = require('../models/Card');

const getAllCards = async (req, res) => {
    try {
        const allCards = await Card.find();
        console.log(allCards)
        res.render('cards/index', {cards: allCards, message: 'TBD'});
    } catch (err) {
        res.redirect('/');
    }
};

const getOneCard = async (req, res) => {
    try {
        const foundCard = await Card.findById(req.params.id);

        const contextData = {card: foundCard};
        res.render('cards/show', contextData);
    } catch (err) {
        console.log(err);
    }
}










module.exports = {
    getAllCards,
    getOneCard,
    createCard,
    deleteCard,
    editCard,
    getNewForm,
    getEditForm
};
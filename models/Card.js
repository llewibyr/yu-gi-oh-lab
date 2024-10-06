const mongoose = require('mongoose');
// Schema for Cards
const cardsSchema = new mongoose.Schema({
    name: String,
    level: String,
    type: String,
    attack: String,
    defense: String,
    readyForBattle: Boolean,
    image: [String]
})

const Card = mongoose.model('Card', cardsSchema)
module.exports = Card;



const mongoose = require('mongoose');

const decksSchema = new mongoose.Schema({
    name: { type: String, required: true },
    deckType: { type: String, required: true },
    cards: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Card'
    },
});

const Deck = mongoose.model('Deck', decksSchema);

module.exports = Deck;
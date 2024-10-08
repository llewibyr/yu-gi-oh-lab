const Card = require("../models/Card");
const Deck = require("../models/deck")

const getAllCards = async (req, res) => {
  try {
    const allCards = await Card.find();
    const deckId = req.query.deckId
    console.log(allCards);
    res.render("cards/index", { cards: allCards, deckId: deckId });
  } catch (err) {
    console.error(err);
    res.redirect("/?error=Failed to load cards");
  }
};

const getOneCard = async (req, res) => {
  try {
    const foundCard = await Card.findById(req.params.id);
    if (!foundCard) {
      return res.redirect("/?error=Card not found");
    }
    res.render("cards/show", { card: foundCard });
  } catch (err) {
    console.error(err);
    res.redirect("/?error=Failed to load card");
  }
};

const getNewForm = (req, res) => {
  res.render("cards/new", );
};

const createCard = async (req, res) => {
  req.body.readyForBattle = !!req.body.readyForBattle; 
  
  try {
     await Card.create(req.body);
     res.redirect('cards');
    
  } catch (err) {
    console.error(err);
    res.render("cards/new", { error: err.message, card: req.body }); 
  }
}

const deleteCard = async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.redirect("/cards");
  } catch (err) {
    console.error(err);
    res.redirect("/?error=Failed to delete card");
  }
};

const getEditForm = async (req, res) => {
  try {
    const cardToEdit = await Card.findById(req.params.id);
    if (!cardToEdit) {
      return res.redirect("/?error=Card not found");
    }
    res.render("cards/edit", { card: cardToEdit });
  } catch (err) {
    console.error(err);
    res.redirect("/?error=Failed to load edit form");
  }
};

const editCard = async (req, res) => {
  console.log('Editing card with ID', req.params.id);
  req.body.readyForBattle = req.body.readyForBattle === "on"; 
  try {
    const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCard) {
      return res.redirect(`/cards/${req.params.id}`);
    }
    res.redirect(`/cards/${updatedCard._id}`);
  } catch (err) {
    console.error(err);
    res.redirect(`/cards/${req.params.id}?error=Failed to update card`);
  }
};

const addCardToDeck = async (req, res) => {
  const {deckId } = req.params;
  const { cardId } = req.body;
  
  try {
    const deck = await Deck.findById(deckId);
    if(!deck) {
      return res.status(404).send('Deck not found');
    }

    const cardExists = await Card.findById(cardId);
    if(!cardExists) {
      return res.status(404).send('Card not found');
    }

    if (!deck.cards.includes(cardId)) {
      deck.cards.push(cardId);
      await deck.save();
    }

    res.redirect(`/decks/${deck._id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error')
  }
};
module.exports = {
  getAllCards,
  getOneCard,
  createCard,
  deleteCard,
  editCard,
  getNewForm,
  getEditForm,
  addCardToDeck
};

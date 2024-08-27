const Card = require('../models/Card');
const mongoose = require('mongoose');

const getCards = async (req, res) => {
  try {
    const user_id = req.user._id;
    const cards = await Card.find({user_id});
    res.status(200).json(cards);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getCardsByDate = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { date } = req.params;
    const dateObj = new Date(date)
    dateObj.setHours(0, 0, 0, 0)
    dateObj.setDate(dateObj.getDate() + 1)
    const cards = await Card.find({ user_id, date: dateObj });
    res.status(200).json(cards);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const getCard = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such card'})
    }
  
    const card = await Card.findById(id)
  
    if (!card) {
      return res.status(404).json({error: 'No such card'})
    }
    
    res.status(200).json(card)
  }

  const createCard = async (req, res) => {
    const {title, date, amountRequired} = req.body
  
    let emptyFields = []
  
    if(!title) {
      emptyFields.push('title')
    }
    if(!date) {
      emptyFields.push('date')
    }
    if(!amountRequired.toString()) {
      emptyFields.push('amountRequired')
    }
    if(emptyFields.length > 0) {
      console.log("Empty fields: ", emptyFields)
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
      const user_id = req.user._id
      const dateObj = new Date(date)
      dateObj.setHours(0, 0, 0, 0)
      dateObj.setDate(dateObj.getDate() + 1)
      const card = await Card.create({title, date: dateObj, amountRequired, user_id})
      console.log("Successfully created card: ", card)
      res.status(200).json(card)
    } catch (error) {
      console.log(error)
      res.status(400).json({error: error.message})
    }
  }

  const deleteCard = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such card'})
    }
  
    const card = await Card.findOneAndDelete({_id: id})
  
    if (!card) {
      return res.status(400).json({error: 'No such card'})
    }
  
    res.status(200).json(card)
    console.log("Successfully deleted card: ", card)
  }

  const updateCard = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such card'})
    }
  
    const card = await Card.findOneAndUpdate({_id: id}, req.body, {new: true})
    
  
    if (!card) {
      return res.status(400).json({error: 'No such card'})
    }
  
    res.status(200).json(card)
    console.log("Successfully updated card: ", card)
  }

  module.exports = {
    getCards,
    getCard,
    createCard,
    deleteCard,
    updateCard,
    getCardsByDate
  }
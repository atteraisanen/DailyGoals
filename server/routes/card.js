const express = require('express')
const {
  createCard,
  getCards,
  getCard,
  deleteCard,
  updateCard,
  getCardsByDate
} = require('../controllers/cardController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getCards)

router.get('/:id', getCard)

router.get('/date/:date', getCardsByDate)

router.post('/', createCard)

router.delete('/:id', deleteCard)

router.put('/:id', updateCard)



module.exports = router
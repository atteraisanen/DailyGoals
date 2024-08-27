import { createContext, useReducer } from 'react'

export const CardsContext = createContext()

export const cardsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CARDS': 
      return {
        cards: action.payload
      }
    case 'CREATE_CARD':
      return {
        cards: [action.payload, ...state.cards]
      }
    case 'DELETE_CARD':
      return {
        cards: state.cards.filter((w) => w._id !== action.payload._id)
      }
    case 'UPDATE_CARD':
      return {
        cards: state.cards.map((w) => w._id === action.payload._id ? action.payload : w)
      }
    default:
      return state
  }
}

export const CardsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cardsReducer, {
    cards: null
  })

  return (
    <CardsContext.Provider value={{...state, dispatch}}>
      { children }
    </CardsContext.Provider>
  )
}
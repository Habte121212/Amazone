import { Type } from './Action.type'

export const initialState = {
  cart: [],
  user: null,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_ITEM:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      }
    case Type.REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      }
    case Type.UPDATE_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
      }
    case Type.CLEAR_CART:
      return {
        ...state,
        cart: [],
      }
    case Type.SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case Type.LOGOUT:
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

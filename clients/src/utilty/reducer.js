import { Type } from './Action.type'

export const initialState = {
  cart: [],
  user: null,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_ITEM: {
      const existing = state.cart.find((item) => item.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item,
          ),
        }
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        }
      }
    }
    case Type.REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      }
    case Type.INCREMENT_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        ),
      }
    case Type.DECREMENT_ITEM:
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload.id && (item.quantity || 1) > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          )
          .filter((item) => (item.quantity || 1) > 0),
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

import React, { createContext, useReducer, useEffect } from 'react'
import { auth } from '../../utilty/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export const DataContext = createContext()

export const DataProvider = ({ children, reducer, initialState }) => {
  // Load persisted state from localStorage
  const persisted = {
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    user: JSON.parse(localStorage.getItem('user') || 'null'),
  }
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...persisted,
  })

  // Sync user state with Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch({
          type: 'SET_USER',
          user: {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            // add more fields if needed
          },
        })
      } else {
        dispatch({ type: 'LOGOUT' })
      }
    })
    return () => unsubscribe()
  }, [dispatch])

  // Persist cart and user to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
    localStorage.setItem('user', JSON.stringify(state.user))
  }, [state.cart, state.user])

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  )
}

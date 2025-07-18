import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../common/Spinner'
import './cart.scss'
import LayOut from '../../LayOut/LayOut'
import { DataContext } from '../../DataProvider/DataProvider'
import ProductCard from '../../products/ProductCard'
import CurrencyFormat from '../../currencyFormat/CurrencyFormat'
import { Link } from 'react-router-dom'

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = useContext(DataContext)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  // Calculate subtotal
  const total = cart.reduce(
    (amount, item) => amount + item.price * (item.quantity || 1),
    0,
  )

  return (
    <LayOut>
      <section className="cart-container">
        <div className="cart-left">
          <h2 className="cart-title">Shopping Cart</h2>
          <hr />
          {loading ? (
            <div style={{ textAlign: 'center', margin: '2rem 0' }}>
              <span className="order-spinner" />
            </div>
          ) : cart?.length === 0 ? (
            <p className="cart-empty">Opps! No item in your cart</p>
          ) : (
            <div className="cart-products-list">
              {cart?.map((item) => (
                <ProductCard
                  product={item}
                  key={item.id}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                  showQtyControls={true}
                  quantity={item.quantity}
                  onDecrement={() =>
                    dispatch({
                      type: 'DECREMENT_ITEM',
                      payload: { id: item.id },
                    })
                  }
                  onIncrement={() =>
                    dispatch({
                      type: 'INCREMENT_ITEM',
                      payload: { id: item.id },
                    })
                  }
                  onRemove={() =>
                    dispatch({
                      type: 'REMOVE_ITEM',
                      payload: { id: item.id },
                    })
                  }
                />
              ))}
            </div>
          )}
        </div>
        {cart?.length > 0 && (
          <div className="cart-right">
            <div className="cart-summary">
              <p className="cart-subtotal">
                Subtotal (<span className="cart-count">{cart?.length}</span>{' '}
                items):
                <span className="cart-total">
                  <CurrencyFormat amount={total} />
                </span>
              </p>
            </div>
            <span className="cart-gift">
              <input type="checkbox" id="gift" />
              <label htmlFor="gift">
                <small>This order contains a gift</small>
              </label>
            </span>
            <button
              className="cart-checkout-btn"
              onClick={(e) => {
                e.preventDefault()
                navigate('/payment')
              }}
            >
              Continue to checkout
            </button>
          </div>
        )}
      </section>
    </LayOut>
  )
}

export default Cart

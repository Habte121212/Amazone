import React, { useContext, useState } from 'react'
import './payment.scss'
import LayOut from '../../LayOut/LayOut'
import { DataContext } from '../../DataProvider/DataProvider'
import ProductCard from '../../products/ProductCard'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { toast } from 'react-toastify'
import { axios } from '../../../api/axios'
import ClipLoader from 'react-spinners/ClipLoader'
import { db } from '../../../utilty/firebase'
import { setDoc, doc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
const Payment = () => {
  const {
    state: { user, cart },
    dispatch,
  } = useContext(DataContext)

  // Total number of items (sum of quantities)
  const totalItems = cart?.reduce((sum, item) => sum + (item.quantity || 1), 0)

  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()

  const [processing, setProcessing] = useState(false)

  const handleChange = (e) => {
    if (e.error) {
      toast.error(e.error.message)
    }
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    if (!user || !user.uid) {
      toast.error('You must be signed in to complete payment.')
      setProcessing(false)
      return
    }
    try {
      setProcessing(true)
      // Get client secret from backend
      const totalCents = Math.round(
        cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0) *
          100,
      )
      const response = await axios({
        method: 'POST',
        url: `payment/create?total=${totalCents}`,
      })
      const clientSecret = response.data.clientSecret
      // Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      if (result.error) {
        toast.error(result.error.message)
      } else if (
        result.paymentIntent &&
        result.paymentIntent.status === 'succeeded'
      ) {
        toast.success('Payment successful!')
        // Save order to Firestore
        await setDoc(
          doc(
            collection(db, 'users', user.uid, 'orders'),
            result.paymentIntent.id,
          ),
          {
            items: cart,
            amount: result.paymentIntent.amount,
            created: result.paymentIntent.created,
          },
        )
      }
      // Clear cart after successful order
      if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
        if (typeof dispatch === 'function') {
          dispatch({ type: 'CLEAR_CART' })
        }
        if (typeof dispatch === 'function') {
          dispatch({ type: 'CLEAR_CART' })
        }
        setProcessing(false)
        navigate('/order')
        return
      }
      setProcessing(false)
    } catch (error) {
      toast.error('Payment failed.')
      console.error(error)
      setProcessing(false)
    }
  }

  return (
    <LayOut>
      <div className="paymentHeader">CheckOut {totalItems} items</div>
      {/* payment method */}
      <section className="payment">
        {/* address */}
        <div className="flex">
          <h3>Delivery Address</h3>
          <div>
            {user ? (
              <>
                <div>{user.email}</div>
                <div>{user.address?.line1 || 'No address on file'}</div>
                <div>{user.address?.city || ''}</div>
              </>
            ) : (
              <div>Please sign in to see your address</div>
            )}
          </div>
        </div>
        <hr />
        {/* products */}
        <div className="flex">
          <h3>Reviw items and deliver</h3>
        </div>
        <div>
          {cart.map((item) => (
            <ProductCard product={item} key={item.id} flex={true} />
          ))}
        </div>
        <hr />
        {/* card forms */}
        <div className="flex">
          <h3>Payment Method</h3>
          <div className="paymentMethod">
            <div className="paymentDetail">
              <form onSubmit={handlePayment}>
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className="paymentPrice">
                  <div>
                    <p>Total Price: $</p>
                    {cart
                      .reduce(
                        (sum, item) => sum + item.price * (item.quantity || 1),
                        0,
                      )
                      .toFixed(2)}
                  </div>
                  <button type="submit" disabled={processing}>
                    {processing ? (
                      <>
                        <ClipLoader
                          color="#888"
                          loading={processing}
                          size={20}
                        />
                        <span style={{ marginLeft: 8 }}>Please wait...</span>
                      </>
                    ) : (
                      <span>Pay Now</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  )
}

export default Payment

import React from 'react'
import { BrowserRouter as Router, Routes, Route   } from 'react-router-dom'
import Landing from './src/components/pages/landing/Landing'
import Signin from './src/components/pages/auth/Auth'
import Payment from './src/components/pages/payment/Payment'
import Order from './src/components/pages/orders/Order'
import Cart from './src/components/pages/cart/Cart'
import ProductDetail from './src/components/pages/peoductDetail/ProductDetail'
import Result from './src/components/pages/results/Result'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(
  'pk_test_51RkT1Z5Yz0LDOZ9LKRl6JAZemKZzgidDiIZMfWOyIaugu0aqilO7Hicp58Z4WBLKM4QXmkF6nvSX3M1RFPQ46SVX001aDZXmy5',
)

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment" element={
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        } />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:categoryName" element={<Result />} />
        <Route path="/auth" element={<Signin />} />
      </Routes>
    </Router>
  )
}

export default Routing




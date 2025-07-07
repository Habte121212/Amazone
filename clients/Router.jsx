import React from 'react'
import { BrowserRouter as Router, Routes, Route   } from 'react-router-dom'
import Landing from './src/components/pages/landing/Landing'
import SignUp from './src/components/pages/auth/SignUp'
import Payment from './src/components/pages/payment/Payment'
import Order from './src/components/pages/orders/Order'
import Cart from './src/components/pages/cart/Cart'
import ProductDetail from './src/components/pages/peoductDetail/ProductDetail'
import Result from './src/components/pages/results/Result'

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:categoryName" element={<Result />} />
        <Route path="/auth" element={<SignUp />} />
      </Routes>
    </Router>
  )
}

export default Routing




import React, { useContext, useEffect, useState } from 'react'
// import { FaSpinner } from 'react-icons/fa'
import './order.scss'
import LayOut from '../../LayOut/LayOut'
import { DataContext } from '../../DataProvider/DataProvider'
import { db } from '../../../utilty/firebase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import ProductCard from '../../products/ProductCard'

const Order = () => {
  const {
    state: { user },
  } = useContext(DataContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (user && user.uid) {
      const ordersRef = collection(db, 'users', user.uid, 'orders')
      const q = query(ordersRef, orderBy('created', 'desc'))
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        )
        setLoading(false)
      })
      return () => unsubscribe()
    } else {
      setOrders([])
      setLoading(false)
    }
  }, [user])

  return (
    <LayOut>
      <section className="container">
        <div className="orderContainer">
          <h2>Your Orders</h2>
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', margin: '2rem 0' }}>
                <span className="order-spinner" />
              </div>
            ) : orders.length === 0 ? (
              <p
                style={{ color: '#888', textAlign: 'center', margin: '2rem 0' }}
              >
                No orders found.
              </p>
            ) : (
              orders.map((eachOrder) => (
                <div key={eachOrder.id} className="order-card">
                  <hr />
                  <p className="order-id">Order ID: {eachOrder.id}</p>
                  <div className="order-products">
                    {eachOrder.data.items?.map((order) => (
                      <ProductCard flex={true} product={order} key={order.id} />
                    ))}
                  </div>
                  <div className="order-total">
                    Total: ${(eachOrder.data.amount / 100).toFixed(2)}
                  </div>
                  <div className="order-date">
                    Placed:{' '}
                    {new Date(eachOrder.data.created * 1000).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </LayOut>
  )
}

export default Order

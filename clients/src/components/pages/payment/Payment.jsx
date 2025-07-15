import React, { useContext } from 'react'
import './payment.scss'
import LayOut from '../../LayOut/LayOut'
import { DataContext } from '../../DataProvider/DataProvider'
import ProductCard from '../../products/ProductCard'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { toast } from 'react-toastify'


const Payment = () => {
  const {
    state: { user, cart },
  } = useContext(DataContext)

  // Total number of items (sum of quantities)
  const totalItems = cart?.reduce((sum, item) => sum + (item.quantity || 1), 0)

  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e ) =>{
    if (e.error) {
      toast.error(e.error.message);
    } else {
      toast.success("Card details are valid");
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
            <div className='paymentDetail'>
              <form action="">
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className='paymentPrice'> 
                  <div>
                    <p>Total Price: $</p>
                      {cart
                        .reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0,
                        )
                        .toFixed(2)}
                    
                  </div>
                  <button>
                    pay now
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

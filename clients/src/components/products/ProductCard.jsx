import React, { Profiler } from 'react'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../currencyFormat/CurrencyFormat'
import './product.scss'

const ProductCard = ({ product }) => {

  const { id, title, image, price, rating } = product
  return (
    <div className='card_container'>
      <a href="">
        <img src={image} alt={title} />
      </a>
      <div>
        <h3>{title}</h3>
        <div className='rating'>
          {/* rating */}
          <Rating value={rating.rate} precision={0.1} />
          {/* count*/}
          <small>{rating.count}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price} />
        </div>
        <button className='button'>Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductCard

import React from 'react'
import Rating from '@mui/material/Rating'
import CurrencyFormat from '../currencyFormat/CurrencyFormat'
import './product.scss'
import { Link } from 'react-router-dom'

const ProductCard = ({ product, flex, renderDesc }) => {
  const { id, title, image, price, rating, description } = product

  return (
    <div className={`card_container${flex ? ' product_flex' : ''}`}>
      <Link to={`/product/${id}`}>
        <img src={image || ''} alt={title || 'Product'} />
      </Link>
      <div>
        <h3>{title || 'No Title'}</h3>
        {renderDesc && (
          <div className="product_description">
            <span className="desc_label">Product Description:</span>
            <span className="desc_text">{description}</span>
          </div>
        )}
        <div className="rating">
          {/* rating */}
          <Rating value={rating?.rate || 0} precision={0.1} />
          {/* count*/}
          <small>{rating?.count || 0}</small>
        </div>
        <div>
          {/* price */}
          <CurrencyFormat amount={price || 0} />
        </div>
        <button className="button">Add to Cart</button>
      </div>
    </div>
  )
}

export default ProductCard

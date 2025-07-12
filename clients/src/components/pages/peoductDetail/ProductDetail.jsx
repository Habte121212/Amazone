import React, { useEffect, useState, useContext } from 'react'
import './productdetail.scss'
import LayOut from '../../LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../../api/endPoints'
import Loder from '../../../loder/Loder'
import { DataContext } from '../../DataProvider/DataProvider'
import { Type } from '../../../utilty/Action.type'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useContext(DataContext)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${productUrl}/products/${id}`)
      .then((res) => {
        setProduct(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
      })
  }, [id])

  const handleAddToCart = () => {
    dispatch({
      type: Type.ADD_ITEM,
      payload: product,
    })
  }

  return (
    <LayOut>
      {isLoading ? (
        <Loder />
      ) : (
        <div className="product-detail-container">
          <div className="product-detail-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-detail-info">
            <div className="product-title">{product.title}</div>
            <div className="product-rating">
              {product.rating && (
                <>
                  <span>⭐ {product.rating.rate}</span>
                  <span>({product.rating.count})</span>
                </>
              )}
            </div>
            <div className="product-price">${product.price}</div>
            <div className="product-description">{product.description}</div>
          </div>
          <div className="product-buy-box">
            <button className="product-buy-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <div className="product-buy-info">
              Ships from and sold by Amazon.
            </div>
          </div>
        </div>
      )}
    </LayOut>
  )
}

export default ProductDetail

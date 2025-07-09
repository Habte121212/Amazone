import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import './product.scss'
import ProductLoader from './ProductLoader'

const Product = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching products:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <ProductLoader />
  }

  return (
    <section className="product_container">
      {products?.map((singleProduct) => {
        return <ProductCard product={singleProduct} key={singleProduct.id} renderDesc={false} renderAdd={true} />
      })}
    </section>
  )
}

export default Product

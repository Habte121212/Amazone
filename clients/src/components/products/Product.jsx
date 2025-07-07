import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import './product.scss'

const Product = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
      axios.get('https://fakestoreapi.com/products').then((res) => {
        setProducts(res.data)
      }).catch((err) => {
        console.error('Error fetching products:', err)
      })
  })
  return (
    <section className='product_container'>
     {
      products.map((singleProduct)=>{
        return <ProductCard product={singleProduct} key={singleProduct.id}/>
      })
     }
    </section>
  )
}

export default Product

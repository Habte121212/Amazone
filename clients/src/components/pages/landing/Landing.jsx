import React from 'react'
import LayOut from '../../LayOut/LayOut'
import AmazonCarousel from '../../carousel/Carousel'
import Category from '../../category/Category'
import Product from '../../products/Product'

const Landing = () => {
  return (
    <LayOut>
      <AmazonCarousel />
      <Category />
      <Product />
    </LayOut>
  )
}

export default Landing

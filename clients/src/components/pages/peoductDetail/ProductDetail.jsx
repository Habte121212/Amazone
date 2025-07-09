import React, { useEffect, useState } from 'react'
import './productdetail.scss'
import LayOut from '../../LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../../api/endPoints'
import ProductCard from '../../products/ProductCard'
import Loder from '../../../loder/Loder'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${productUrl}/products/${id}`)
      .then((res) => {
        setProduct(res.data)
        setIsLoading(false)
        console.log('Product name:', res.data.title)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }, [id])

  return (
    <LayOut>
      {isLoading ? <Loder /> : <ProductCard product={product} flex={true}  renderDesc={true} renderAdd={true} />}
    </LayOut>
  )
}

export default ProductDetail

import React from 'react'
import SyncLoader from 'react-spinners/SyncLoader'
import '../../loder/Loder.scss'

const ProductLoader = () => (
  <div className="loder-center">
    <SyncLoader color="#ff9900" size={16} />
  </div>
)

export default ProductLoader

import React from 'react'
import './category.scss'

const CategoryCard = ({data}) => {
  return (
    <div className='categoryCard'>
      <a href="">
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imageLink} alt={data.title} />
        <p>Shop Now</p>
      </a>
    </div>
  )
}

export default CategoryCard

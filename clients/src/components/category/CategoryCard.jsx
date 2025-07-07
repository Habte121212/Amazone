import React from 'react'
import './category.scss'
import { Link } from 'react-router-dom'

const CategoryCard = ({ data }) => {
  return (
    <div className="categoryCard">
      <Link to={`/category/${encodeURIComponent(data.name.toLowerCase())}`}>
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imageLink} alt={data.title} />
        <p>Shop Now</p>
      </Link>
    </div>
  )
}

export default CategoryCard

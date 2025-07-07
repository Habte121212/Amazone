import React from 'react'
import { categoryInfos } from './cateroryData'
import CategoryCard from './CategoryCard'
import './category.scss'

const Category = () => {
  return (
    <section className='category_container'>
      {categoryInfos.map((infos) => (
        <CategoryCard key={infos.name} data={infos} />
      ))}
    </section>
  )
}

export default Category

import React from 'react'
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel'
import { img } from '../../data'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './carousel.scss'

const AmazonCarousel = () => {
  return (
    <div className="carouselContainer">
      <ResponsiveCarousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        stopOnHover={false}
      >
        {img.map((imageItem) => (
          <div key={imageItem.id}>
            <img src={imageItem.src} alt={imageItem.alt} />
          </div>
        ))}
      </ResponsiveCarousel>
      <div className="carouselBottom"></div>
    </div>
  )
}

export default AmazonCarousel

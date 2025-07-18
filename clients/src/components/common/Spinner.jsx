import React from 'react'
import './Spinner.scss'

const Spinner = ({ size = 48 }) => (
  <div className="spinner" style={{ width: size, height: size }}>
    <div className="spinner__circle" />
    <div className="spinner__inner" />
  </div>
)

export default Spinner

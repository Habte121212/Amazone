import React from 'react'

const Logo = ({ onClick }) => (
  <div className="headerLogo" onClick={onClick} style={{ cursor: 'pointer' }}>
    <img src="/headerLogo.png" alt="Amazon logo" />
  </div>
)

export default Logo

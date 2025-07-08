import React from 'react'
import SyncLoader from 'react-spinners/SyncLoader'
import './Loder.scss'

function Loder() {
  return (
    <div className="loder-center">
      <SyncLoader color="#ff9900" size={16} />
    </div>
  )
}

export default Loder

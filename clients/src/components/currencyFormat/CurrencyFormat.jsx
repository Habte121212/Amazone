import React from 'react'
import numeral from 'numeral'

const CurrencyFormat = ({ amount }) => {
  return (
    <div>
      {numeral(amount).format('$0,0.00')}
    </div>
  )
}

export default CurrencyFormat


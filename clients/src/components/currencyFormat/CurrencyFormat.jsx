import React from 'react'
import numeral from 'numeral'

const CurrencyFormat = ({ amount }) => {
  return <span>{numeral(amount).format('$0,0.00')}</span>
}

export default CurrencyFormat

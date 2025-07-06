import React from 'react'
import PropTypes from 'prop-types'
import './AccountDropdown.scss'

const AccountDropdown = ({ open, onClose, onSignIn }) => {
  if (!open) return null
  return (
    <div
      className="accountDropdown"
      onMouseLeave={onClose}
      role="menu"
      aria-label="Account and Lists"
    >
      <div className="accountDropdownCaret" />
      <div className="accountDropdownTop">
        <button
          className="accountSignInBtn"
          onClick={onSignIn}
          aria-label="Sign in to your account"
        >
          Sign in
        </button>
        <div className="accountDropdownNewCustomer">
          New customer?{' '}
          <a
            href="https://www.amazon.com/ap/register"
            target="_blank"
            rel="noopener noreferrer"
          >
            Start here.
          </a>
        </div>
      </div>
      <div className="accountDropdownColumns">
        <div className="accountDropdownSection">
          <div className="accountDropdownSectionTitle">Your Lists</div>
          <a href="#">Create a List</a>
          <a href="#">Find a List or Registry</a>
        </div>
        <div className="accountDropdownSection">
          <div className="accountDropdownSectionTitle">Your Account</div>
          <a href="#">Account</a>
          <a href="#">Orders</a>
          <a href="#">Recommendations</a>
          <a href="#">Browsing History</a>
          <a href="#">Watchlist</a>
          <a href="#">Video Purchases & Rentals</a>
          <a href="#">Kindle Unlimited</a>
          <a href="#">Content & Devices</a>
          <a href="#">Subscribe & Save Items</a>
          <a href="#">Memberships & Subscriptions</a>
          <a href="#">Music Library</a>
        </div>
      </div>
    </div>
  )
}

AccountDropdown.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSignIn: PropTypes.func,
}

export default AccountDropdown

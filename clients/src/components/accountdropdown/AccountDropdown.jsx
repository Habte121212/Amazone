import React from 'react'
import PropTypes from 'prop-types'
import './AccountDropdown.scss'
import { Link } from 'react-router-dom'

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
          <Link to="/lists">Create a List</Link>
          <Link to="/registry">Find a List or Registry</Link>
        </div>
        <div className="accountDropdownSection">
          <div className="accountDropdownSectionTitle">Your Account</div>
          <Link to="/account">Account</Link>
          <Link to="/order">Orders</Link>
          <Link to="/recommendations">Recommendations</Link>
          <Link to="/history">Browsing History</Link>
          <Link to="/watchlist">Watchlist</Link>
          <Link to="/video-purchases">Video Purchases & Rentals</Link>
          <Link to="/kindle-unlimited">Kindle Unlimited</Link>
          <Link to="/content-devices">Content & Devices</Link>
          <Link to="/subscribe-save">Subscribe & Save Items</Link>
          <Link to="/subscriptions">Memberships & Subscriptions</Link>
          <Link to="/music-library">Music Library</Link>
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

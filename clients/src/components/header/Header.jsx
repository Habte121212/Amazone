import PersonIcon from '@mui/icons-material/Person'
import Spinner from '../common/Spinner'
import React, { useContext, useEffect, useRef } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import './header.scss'
import CountryModal from '../countrymodal/CountryModal'
import AccountDropdown from '../accountdropdown/AccountDropdown'
import Logo from './Logo'
import { useNavigate, Link } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'

// Reusable SearchInput that adapts width to the selected category
const SearchInput = () => (
  <input
    className="searchInput"
    type="text"
    placeholder="Search Amazon"
    style={{ flex: 1, minWidth: 0 }}
  />
)

const Header = () => {
  // Mobile account dropdown toggle
  const [mobileAccountOpen, setMobileAccountOpen] = React.useState(false)
  const { state, dispatch } = useContext(DataContext)
  const { cart, user } = state

  const navigate = useNavigate()
  const [category, setCategory] = React.useState('all')
  const [langDropdown, setLangDropdown] = React.useState(false)
  const [showCountryPanel, setShowCountryPanel] = React.useState(false)
  const [selectedLang, setSelectedLang] = React.useState('en')
  const [selectedCurrency, setSelectedCurrency] = React.useState('USD')
  const [countryPanelSelected, setCountryPanelSelected] = React.useState('us')
  const [deliveryCountry, setDeliveryCountry] = React.useState('us')
  const [accountDropdown, setAccountDropdown] = React.useState(false)
  const languages = [
    { code: 'en', label: 'English - EN', flag: 'https://flagcdn.com/us.svg' },
    { code: 'es', label: 'Español - ES', flag: 'https://flagcdn.com/es.svg' },
    { code: 'de', label: 'Deutsch - DE', flag: 'https://flagcdn.com/de.svg' },
    { code: 'fr', label: 'Français - FR', flag: 'https://flagcdn.com/fr.svg' },
    { code: 'ja', label: '日本語 - JA', flag: 'https://flagcdn.com/jp.svg' },
    {
      code: 'zh',
      label: '中文 (简体) - ZH',
      flag: 'https://flagcdn.com/cn.svg',
    },
  ]
  const countries = [
    {
      code: 'us',
      label: 'United States',
      flag: 'https://flagcdn.com/us.svg',
      currency: 'USD',
      symbol: '$',
    },
    {
      code: 'de',
      label: 'Germany',
      flag: 'https://flagcdn.com/de.svg',
      currency: 'EUR',
      symbol: '€',
    },
    {
      code: 'fr',
      label: 'France',
      flag: 'https://flagcdn.com/fr.svg',
      currency: 'EUR',
      symbol: '€',
    },
    {
      code: 'jp',
      label: 'Japan',
      flag: 'https://flagcdn.com/jp.svg',
      currency: 'JPY',
      symbol: '¥',
    },
    {
      code: 'cn',
      label: 'China',
      flag: 'https://flagcdn.com/cn.svg',
      currency: 'CNY',
      symbol: '¥',
    },
  ]
  const countryModalRef = useRef(null)

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const handleLangSelect = (code) => {
    setSelectedLang(code)
    setLangDropdown(false)
  }

  const handleCountryCurrencyChange = (code) => {
    const country = countries.find((c) => c.code === code)
    if (country) setSelectedCurrency(`${country.symbol} - ${country.currency}`)
  }

  // For country panel
  const handleCountryPanelGo = () => {
    const country = countries.find((c) => c.code === countryPanelSelected)
  }

  // Close mobile account dropdown on outside click
  React.useEffect(() => {
    if (!mobileAccountOpen) return
    const handleClick = (e) => {
      if (
        !e.target.closest('.headerMobileAccountToggle') &&
        !e.target.closest('.accountDropdown')
      ) {
        setMobileAccountOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [mobileAccountOpen])
  // (Removed stray JSX and misplaced code fragments)

  // Click outside to close
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('countryModalOverlay'))
      setShowCountryPanel(false)
  }

  return (
    <>
      <header className="header">
        <div className="headerTop">
          {/* Mobile account icon toggle (top right) */}
          <button
            className="headerMobileAccountToggle"
            aria-label="Account menu"
            onClick={() => setMobileAccountOpen((v) => !v)}
            onMouseEnter={() => setMobileAccountOpen(true)}
            onMouseLeave={() => setMobileAccountOpen(false)}
          >
            <PersonIcon fontSize="large" />
            {/* Show dropdown or sign in button below icon on mobile */}
            {mobileAccountOpen && (
              <div
                className="accountDropdown"
                style={{
                  top: '110%',
                  right: 0,
                  left: 'auto',
                  minWidth: 220,
                  zIndex: 200,
                }}
              >
                {user ? (
                  <>
                    <div className="accountDropdownTop">
                      <span style={{ fontWeight: 'bold', fontSize: 16 }}>
                        Hello, {user.email?.split('@')[0] || 'User'}
                      </span>
                    </div>
                    <button
                      className="accountSignInBtn"
                      onClick={() => {
                        dispatch({ type: 'SET_USER', user: null })
                        setMobileAccountOpen(false)
                      }}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="accountSignInBtn"
                      onClick={() => {
                        setMobileAccountOpen(false)
                        navigate('/auth')
                      }}
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            )}
          </button>
          <div className="headerLogo">
            {/* header logo amazone */}
            <Logo onClick={() => navigate('/')} />
          </div>
          <div className="headerLocation">
            <span className="locationIcon">
              <img
                src={countries.find((c) => c.code === deliveryCountry)?.flag}
                alt={deliveryCountry.toUpperCase()}
                width="20"
                style={{ marginRight: 4 }}
              />
            </span>
            <div className="locationTextGroup">
              <span className="locationText">Deliver to</span>
              <span className="locationName">
                {countries.find((c) => c.code === deliveryCountry)?.label ||
                  'Ethiopia'}
              </span>
            </div>
          </div>
          <div className="headerSearchBar">
            <select
              className="searchCategory"
              value={category}
              onChange={handleCategoryChange}
              style={{
                width: (() => {
                  // Use a minimum width for short labels
                  const selected =
                    category === 'all'
                      ? 'All'
                      : {
                          'all-departments': 'All Departments',
                          'arts-crafts': 'Arts & Crafts',
                          automotive: 'Automotive',
                          baby: 'Baby',
                          'beauty-personal-care': 'Beauty & Personal Care',
                          'boys-fashion': "Boys' Fashion",
                          computers: 'Computers',
                          deals: 'Deals',
                          'digital-music': 'Digital Music',
                          electronics: 'Electronics',
                          'girls-fashion': "Girls' Fashion",
                          'health-household': 'Health & Household',
                          'home-kitchen': 'Home & Kitchen',
                          'industrial-scientific': 'Industrial & Scientific',
                          'movies-tv': 'Movies & TV',
                          software: 'Software',
                          'mens-fashion': "Men's Fashion",
                          'video-games': 'Video Games',
                          'womens-fashion': "Women's Fashion",
                          'sports-outdoors': 'Sports & Outdoors',
                          'toys-games': 'Toys & Games',
                          books: 'Books',
                          'kindle-store': 'Kindle Store',
                          'pet-supplies': 'Pet Supplies',
                        }[category] || ''
                  // 8px per character + 32px for padding/icon, but min 80px
                  return `max(${selected.length * 8 + 32}px, 80px)`
                })(),
                minWidth: 80,
              }}
            >
              <option value="all" hidden>
                All
              </option>
              <option value="all-departments">All Departments</option>
              <option value="arts-crafts">Arts & Crafts</option>
              <option value="automotive">Automotive</option>
              <option value="baby">Baby</option>
              <option value="beauty-personal-care">
                Beauty & Personal Care
              </option>
              <option value="boys-fashion">Boys' Fashion</option>
              <option value="computers">Computers</option>
              <option value="deals">Deals</option>
              <option value="digital-music">Digital Music</option>
              <option value="electronics">Electronics</option>
              <option value="girls-fashion">Girls' Fashion</option>
              <option value="health-household">Health & Household</option>
              <option value="home-kitchen">Home & Kitchen</option>
              <option value="industrial-scientific">
                Industrial & Scientific
              </option>
              <option value="movies-tv">Movies & TV</option>
              <option value="software">Software</option>
              <option value="mens-fashion">Men's Fashion</option>
              <option value="video-games">Video Games</option>
              <option value="womens-fashion">Women's Fashion</option>
              <option value="sports-outdoors">Sports & Outdoors</option>
              <option value="toys-games">Toys & Games</option>
              <option value="books">Books</option>
              <option value="kindle-store">Kindle Store</option>
              <option value="pet-supplies">Pet Supplies</option>
            </select>
            <SearchInput />
            <button className="searchButton">
              <SearchIcon />
            </button>
          </div>
          <div
            className="headerLang"
            onMouseEnter={() => setLangDropdown(true)}
            onMouseLeave={() => {
              setLangDropdown(false)
              // setShowCountryPanel(false) removed to prevent modal from closing on mouse leave
            }}
            tabIndex={0}
          >
            <img
              src={languages.find((l) => l.code === selectedLang)?.flag}
              alt={selectedLang.toUpperCase()}
              width="20"
              style={{ marginRight: 4 }}
            />
            <span>{selectedLang.toUpperCase()}</span>
            <ArrowDropDownIcon fontSize="small" />
            {langDropdown && (
              <div className="langDropdown">
                <div className="langCaret"></div>
                <div className="langSection">
                  {languages.map((lang) => (
                    <div
                      className={`langOption${
                        lang.code === selectedLang ? ' selected' : ''
                      }`}
                      key={lang.code}
                      onClick={() => handleLangSelect(lang.code)}
                    >
                      <img
                        src={lang.flag}
                        alt={lang.code.toUpperCase()}
                        width="20"
                      />
                      <span>{lang.label}</span>
                      <input
                        type="radio"
                        checked={lang.code === selectedLang}
                        readOnly
                      />
                    </div>
                  ))}
                </div>
                <div
                  className="currencySection"
                  style={{
                    padding: '8px 16px',
                    borderTop: '1px solid #eee',
                    marginTop: 8,
                  }}
                >
                  <div style={{ fontSize: 13, color: '#555', marginBottom: 4 }}>
                    Shop in
                  </div>
                  <div style={{ fontWeight: 'bold', marginBottom: 8 }}>
                    {selectedCurrency}
                  </div>
                  <div style={{ fontSize: 13, color: '#555', marginBottom: 4 }}>
                    Deliver to
                  </div>
                  <select
                    className="countrySelect"
                    onChange={(e) =>
                      handleCountryCurrencyChange(e.target.value)
                    }
                    style={{
                      width: '100%',
                      padding: '4px',
                      fontSize: 15,
                      borderRadius: 4,
                      border: '1px solid #ddd',
                    }}
                  >
                    {countries.map((country) => (
                      <option value={country.code} key={country.code}>
                        {country.label} ({country.symbol} {country.currency})
                      </option>
                    ))}
                  </select>
                </div>
                <div className="langFooter">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowCountryPanel((v) => !v)
                    }}
                  >
                    Change country/region
                  </a>
                </div>
              </div>
            )}
          </div>
          <div
            className="headerAccount headerAccountDesktop"
            onMouseEnter={() => setAccountDropdown(true)}
            onMouseLeave={() => setAccountDropdown(false)}
            tabIndex={0}
            aria-haspopup="menu"
            aria-expanded={accountDropdown}
            onClick={() => {
              if (!user) navigate('/auth')
            }}
          >
            {user ? (
              <>
                <span className="smallText">
                  Hello, {user.email?.split('@')[0] || 'User'}
                </span>
                <span className="boldText">
                  Account & Lists <ArrowDropDownIcon fontSize="small" />
                </span>
                {accountDropdown && (
                  <AccountDropdown
                    open={accountDropdown}
                    onClose={() => setAccountDropdown(false)}
                    onSignIn={() => navigate('/auth')}
                    user={user}
                    onSignOut={() => {
                      dispatch({ type: 'SET_USER', user: null })
                      setAccountDropdown(false)
                    }}
                  />
                )}
              </>
            ) : (
              <>
                <span className="smallText">Hello, sign in</span>
                <span className="boldText">
                  Account & Lists <ArrowDropDownIcon fontSize="small" />
                </span>
                {accountDropdown && (
                  <div
                    className="accountDropdown"
                    style={{
                      top: '110%',
                      right: 0,
                      left: 'auto',
                      minWidth: 220,
                      zIndex: 200,
                    }}
                  >
                    <button
                      className="accountSignInBtn"
                      onClick={() => {
                        setAccountDropdown(false)
                        navigate('/auth')
                      }}
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="headerOrders" onClick={() => navigate('/order')}>
            <span className="smallText">Returns</span>
            <span className="boldText">& Orders</span>
          </div>
          <div
            className="headerCart"
            onClick={() => {
              navigate('/cart')
            }}
          >
            <>
              <ShoppingCartIcon />
              <span className="cartCount">{cart.length}</span>
              <span className="cartText">Cart</span>
            </>
          </div>
        </div>
        <nav className="headerNav">
          <Link to="/" className="navLink">
            {' '}
            <MenuOutlinedIcon />
            All
          </Link>
          <Link to="/deals" className="navLink">
            Today's Deals
          </Link>
          <Link to="/customer-service" className="navLink">
            Customer Service
          </Link>
          <Link to="/registry" className="navLink">
            Registry
          </Link>
          <Link to="/gift-cards" className="navLink">
            Gift Cards
          </Link>
          <Link to="/sell" className="navLink">
            Sell
          </Link>
        </nav>
      </header>
      <CountryModal
        open={showCountryPanel}
        onClose={() => setShowCountryPanel(false)}
        countries={countries}
        selectedCountry={countryPanelSelected}
        onSelect={(code) => {
          setCountryPanelSelected(code)
          setDeliveryCountry(code)
        }}
        onGo={handleCountryPanelGo}
        onSignIn={() =>
          window.open('https://www.amazon.com/ap/signin', '_blank')
        }
        modalRef={countryModalRef}
        onOverlayClick={handleOverlayClick}
      />
    </>
  )
}

export default Header

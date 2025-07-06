import React, { useEffect, useRef, useState } from 'react'
import './CountryModal.scss'

const CountryModal = ({
  open,
  onClose,
  countries,
  selectedCountry,
  onSelect,
  onGo,
  onSignIn,
  modalRef,
  onOverlayClick,
}) => {
  const [search, setSearch] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const optionsRefs = useRef([])
  const buttonRef = useRef(null)

  const defaultOption = countries.find((c) => c.code === 'us') || countries[0]

  // Filter countries by search
  const filteredCountries = countries.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase()),
  )

  // Focus selected country or first option in filtered list when dropdown opens
  useEffect(() => {
    if (dropdownOpen) {
      const idx = filteredCountries.findIndex((c) => c.code === selectedCountry)
      setTimeout(() => {
        optionsRefs.current[idx >= 0 ? idx : 0]?.focus()
      }, 0)
    }
  }, [dropdownOpen, selectedCountry, filteredCountries])

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (
        dropdownOpen &&
        !modalRef?.current?.contains(e.target) &&
        !buttonRef.current?.contains(e.target)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [dropdownOpen, modalRef])

  function handleKeyDown(e, idx) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = (idx + 1) % filteredCountries.length
      optionsRefs.current[next]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev =
        (idx - 1 + filteredCountries.length) % filteredCountries.length
      optionsRefs.current[prev]?.focus()
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(filteredCountries[idx].code)
      setDropdownOpen(false)
      buttonRef.current?.focus()
    } else if (e.key === 'Escape') {
      setDropdownOpen(false)
      buttonRef.current?.focus()
    }
  }

  if (!open) return null
  const selected =
    countries.find((c) => c.code === selectedCountry) || defaultOption
  return (
    <div
      className="countryModalOverlay"
      ref={modalRef}
      onClick={onOverlayClick}
      tabIndex={-1}
    >
      <div
        className="countryModal"
        tabIndex={0}
        role="dialog"
        aria-modal="true"
      >
        <h2>Website (Country/Region)</h2>
        <p className="countryModalSub">
          Select your preferred country/region website:
        </p>
        <div className="countryModalDropdownWrapper">
          <button
            className="countryModalDropdownButton"
            ref={buttonRef}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen((v) => !v)}
          >
            <img
              src={selected.flag}
              alt={selected.label}
              width="24"
              style={{ marginRight: 8 }}
            />
            <span>{selected.label}</span>
            <span className="countryModalDropdownCaret">▼</span>
          </button>
          {dropdownOpen && (
            <div className="countryModalDropdown" role="listbox" tabIndex={-1}>
              <div
                className="countryModalList"
                role="radiogroup"
                aria-label="Select your preferred country/region website"
              >
                {filteredCountries.length === 0 && (
                  <div className="countryModalNoResults">
                    No countries found.
                  </div>
                )}
                {(search === '' ||
                  filteredCountries.length === countries.length) && (
                  <>
                    <label
                      className={`countryModalOption${
                        selectedCountry === defaultOption.code
                          ? ' selected'
                          : ''
                      }`}
                      key="default"
                      tabIndex={-1}
                      aria-checked={selectedCountry === defaultOption.code}
                      role="option"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelect(defaultOption.code)
                        setDropdownOpen(false)
                        buttonRef.current?.focus()
                      }}
                    >
                      <img
                        src={defaultOption.flag}
                        alt={defaultOption.label}
                        width="24"
                      />
                      <span>{defaultOption.label}</span>
                      {selectedCountry === defaultOption.code && (
                        <span className="selectedMark">✓</span>
                      )}
                      <span className="countryModalArrow" aria-hidden="true">
                        →
                      </span>
                    </label>
                    <div className="countryModalDivider" />
                  </>
                )}
                {filteredCountries.map((country, idx) => {
                  return (
                    <label
                      className={`countryModalOption${
                        country.code === selectedCountry ? ' selected' : ''
                      }`}
                      key={country.code}
                      tabIndex={-1}
                      aria-checked={country.code === selectedCountry}
                      role="option"
                      ref={(el) => (optionsRefs.current[idx] = el)}
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelect(country.code)
                        setDropdownOpen(false)
                        buttonRef.current?.focus()
                      }}
                      onKeyDown={(e) => handleKeyDown(e, idx)}
                    >
                      <input
                        type="radio"
                        checked={country.code === selectedCountry}
                        onChange={() => onSelect(country.code)}
                        style={{
                          position: 'absolute',
                          opacity: 0,
                          pointerEvents: 'none',
                        }}
                        tabIndex={-1}
                        aria-hidden="true"
                      />
                      <img src={country.flag} alt={country.label} width="24" />
                      <span>{country.label}</span>
                      {country.code === selectedCountry && (
                        <span className="selectedMark">✓</span>
                      )}
                    </label>
                  )
                })}
              </div>
            </div>
          )}
        </div>
        <div className="countryModalNote">
          <strong>Note:</strong> A new country/region website selection will
          open in a new tab.
        </div>
        <hr className="horizontal" />
        <div className="countryModalActions">
          <button className="countryModalCancel" onClick={onClose}>
            Cancel
          </button>
          <button className="countryModalGo" onClick={onGo}>
            Go to website
          </button>
        </div>
        <hr className="horizontalLine" />
        <div className="countryModalSignin">
          <h1>
            <strong>See personalized recommendations</strong>
          </h1>
          <button className="countryModalSignIn" onClick={onSignIn}>
            Sign in
          </button>
          <div>
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
      </div>
    </div>
  )
}

export default CountryModal

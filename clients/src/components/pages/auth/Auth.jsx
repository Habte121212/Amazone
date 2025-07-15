import React, { useState, useContext } from 'react'
import './Auth.scss'
import { auth } from '../../../utilty/firebase'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import { DataContext } from '../../DataProvider/DataProvider'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [registerMode, setRegisterMode] = useState(false)
  const [keepSignedIn, setKeepSignedIn] = useState(false)
  const navigate = useNavigate()
  const naveStateData = useLocation()

  const { dispatch } = useContext(DataContext)

  const validateEmail = (email) => {
    // Simple Gmail validation
    return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)
  }

  const authHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!validateEmail(email)) {
      toast.error('Please enter a valid Gmail address')
      setLoading(false)
      return
    }
    const persistence = keepSignedIn
      ? browserLocalPersistence
      : browserSessionPersistence
    await setPersistence(auth, persistence)
    if (!registerMode) {
      // firebase sign in
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          toast.success('Signed in successfully!')
          dispatch({ type: 'SET_USER', user })
          setTimeout(
            () => navigate(naveStateData?.state?.redirect || '/'),
            1200,
          )
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            toast.error('User not found')
          } else if (error.code === 'auth/wrong-password') {
            toast.error('Invalid password')
          } else {
            toast.error('Invalid email or password')
          }
        })
        .finally(() => setLoading(false))
    } else {
      // registration: check confirm password
      if (password !== confirmPassword) {
        toast.error('Passwords do not match')
        setLoading(false)
        return
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          toast.success('Account created successfully!')
          setTimeout(() => {
            setRegisterMode(false)
            setPassword('')
            setConfirmPassword('')
          }, 1200)
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            toast.error('Email already in use')
          } else if (error.code === 'auth/invalid-email') {
            toast.error('Invalid email address')
          } else if (error.code === 'auth/weak-password') {
            toast.error('Password should be at least 6 characters')
          } else {
            toast.error('Invalid email or password')
          }
        })
        .finally(() => setLoading(false))
    }
  }

  return (
    <section className="auth-section">
      <div className="logo">
        <img src="/signLogo.png" alt="Amazon" />
      </div>
      <div className="authContainer">
        <div className="authForm">
          <h2 className="auth-title">
            {registerMode ? 'Create account' : 'Sign-In'}
            {!registerMode && naveStateData?.state?.msg && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.92rem',
                  color: '#d32f2f',
                  fontWeight: 600,
                  background: 'rgba(211,47,47,0.08)',
                  borderRadius: '4px',
                  padding: '3px 10px',
                  margin: '6px 0',
                  boxShadow: '0 1px 4px rgba(211,47,47,0.08)',
                  animation: 'shake 0.4s',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ marginRight: 2 }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="12" r="12" fill="#d32f2f" />
                  <path
                    d="M12 7v5"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="16" r="1" fill="#fff" />
                </svg>
                {naveStateData.state.msg}
                <style>{`@keyframes shake {0%{transform:translateX(0);}20%{transform:translateX(-3px);}40%{transform:translateX(3px);}60%{transform:translateX(-2px);}80%{transform:translateX(2px);}100%{transform:translateX(0);}}`}</style>
              </span>
            )}
          </h2>
          <form className="auth-form" onSubmit={authHandler}>
            <label htmlFor="email">Email or mobile phone number</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="Email or mobile phone number"
              autoComplete="username"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              required
            />
            {registerMode && (
              <>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  required
                />
              </>
            )}
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading
                ? registerMode
                  ? 'Creating Account...'
                  : 'Signing In...'
                : registerMode
                ? 'Create your Amazon account'
                : 'Sign In'}
            </button>
          </form>
          <div className="auth-help-row">
            <input
              type="checkbox"
              id="keep-signed-in"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
            />
            <label htmlFor="keep-signed-in">Keep me signed in</label>
          </div>
          <p className="auth-terms">
            By continuing, you agree to Amazon's{' '}
            <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=468496">
              Conditions of Use
            </a>{' '}
            and{' '}
            <a href="https://www.amazon.com/gp/help/customer/display.html/ref=ap_signin_notification_privacy_notice?ie=UTF8&nodeId=468496">
              Privacy Notice
            </a>
            .
          </p>
          <div className="auth-divider">
            <span>
              {registerMode ? 'Already have an account?' : 'New to Amazon?'}
            </span>
          </div>
          <button
            className="create-account-btn"
            onClick={(e) => {
              e.preventDefault()
              setRegisterMode(!registerMode)
            }}
            disabled={loading}
          >
            {registerMode
              ? 'Sign in with your Amazon account'
              : 'Create your Amazon account'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Auth

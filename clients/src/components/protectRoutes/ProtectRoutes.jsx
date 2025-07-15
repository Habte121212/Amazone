import React, { useContext, useEffect } from 'react'
import { redirect, useLocation, useNavigate } from 'react-router-dom'
import { DataContext } from '../DataProvider/DataProvider'

const ProtectRoutes = ({ children, msg, redirect }) => {
  const navigate = useNavigate()
  const navStateData = useLocation();
  const {
    state: { user },
  } = useContext(DataContext)

  useEffect(() => {
    if (!user) {
      navigate('/auth', { state: { msg, redirect } })
    }
  }, [user])
  return <div>{children}</div>
}

export default ProtectRoutes

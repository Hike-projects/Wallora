// src/pages/logintest.jsx
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

function LoginTest() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()

  return (
    <div>
      <h2>Login Test Page</h2>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user.name}</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
        </>
      ) : (
        <button onClick={() => loginWithRedirect()}>Login</button>
      )}
    </div>
  )
}

export default LoginTest

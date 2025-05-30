import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'
import Home from './pages/home/Home'
import Login from './pages/login/Login'

function App() {
  return (
    <Auth0Provider
      domain="dev-rgnoztg4e1kdnz2l.us.auth0.com"
      clientId="KdPJ6MmGTlosoi1e2ICihXT74YMzXg8l"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  )
}

export default App
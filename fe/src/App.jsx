
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Signup } from './pages/Signup'
import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom'
import { Signin } from './pages/Signin'
// import { Home } from './pages/Home'
import { SendMoney } from './components/SendMoney'
import { Dashboard } from './pages/Dashboard'

function App() {

  return (
    <div>
      
      <BrowserRouter>
        <Routes>
        {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/send" element={<SendMoney/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

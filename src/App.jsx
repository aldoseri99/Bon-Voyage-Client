import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <div>
      <Nav />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/nav' element={<Nav />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

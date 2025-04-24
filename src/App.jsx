import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import View from './pages/View'
import Cart from './pages/Cart'
import Wish from './pages/Wish'
import Header from './components/Header'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Toaster/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/view/:id' element={<View/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/wish' element={<Wish/>} />
      </Routes>
    </div>
  )
}

export default App

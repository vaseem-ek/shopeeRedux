import React, { useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import { IoCartOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { search } from '../redux/slices/productSlice'

function Header() {
  const [key,setKey]=useState("")
  const dispatch=useDispatch()

const handleSearch=()=>{
  dispatch(search(key))
  
}

    const nav=useNavigate()
    const {wish}=useSelector(state=>state.wishReducer)
    const { cart } = useSelector((state) => state.cartReducer)
  return (
    <div className='z-50 py-2 border-b-2 px-2 md:px-16 flex justify-between items-center'>
      <img onClick={()=>nav('/')} src="https://images.cnbctv18.com/wp-content/uploads/2022/03/Shopee-768x768.png" className='h-16 w-16 rounded-full cursor-pointer' alt="" />
      <div className='flex gap-3'>
        <div>
          <input type="text" onChange={(e)=>{setKey(e.target.value)}} className='bg-slate-50 py-1  outline-1 rounded-full px-4 ' placeholder='search product...'/>
          <button onClick={handleSearch} className='shadow px-3 py-1 ms-2'>search</button>
        </div>
        <Link to={'/wish'}>
        <button className='px-3 py-1 flex rounded-full items-center gap-2 shadow  '>wish<CiHeart size={16}  className='text-red-600'/> <span className='text-red-800'>{wish.length==0?"":wish.length}</span>
        </button>
        </Link>
        <Link to={'/cart'}>
        <button className='px-3 py-1 flex items-center gap-2 rounded-full shadow'>cart<IoCartOutline size={16}  className='text-yellow-600' /><span className='text-orange-700'>{cart.length==0?"":cart.length}</span>
        </button>
        </Link>
      </div>
    </div>
  )
}

export default Header

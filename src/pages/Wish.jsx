import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeWish } from '../redux/slices/wishSlice'
import { removeCart } from '../redux/slices/cartSlice'
import { FaHeartBroken, FaShoppingCart } from 'react-icons/fa'

function Wish() {
    const { wish } = useSelector(state => state.wishReducer)
    const dispatch=useDispatch()

    return (
        <div className='flex justify-center items-center flex-wrap p-5'>
            {
                wish.length > 0 ?
                    wish.map((item, index) => (

                        <div key={index} className="card bg-base-100 w-96 shadow-lg">
                            <Link to={`/view/${item.id}`}>
                                <img
                                    src={item.thumbnail}
                                    alt="Shoes" />
                            </Link>
                            <div className="p-4">
                                <h2 className="card-title">{item.title}</h2>
                                <p>{item.description} </p>
                                <p>$ {item.price}</p>
                                <div className="flex justify-between">
                                    <button onClick={()=>{dispatch(removeWish(item))}} className=" text-red-800 p-3">
                                    <FaHeartBroken size={20}  />

                                    </button>
                                    <button onClick={()=>{dispatch(removeCart(item))}} className="p-3 text-green-700 ">
                                    <FaShoppingCart size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <p>product not added to wish list</p>
            }
        </div>
    )
}

export default Wish

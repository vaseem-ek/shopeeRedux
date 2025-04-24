import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeWish } from '../redux/slices/wishSlice'
import { addToCart, removeCart } from '../redux/slices/cartSlice'
import { FaHeartBroken, FaShoppingCart } from 'react-icons/fa'

function Wish() {
    const { wish } = useSelector(state => state.wishReducer)
    const dispatch = useDispatch()

    return (
        <div className='flex justify-center items-center flex-wrap p-5'>
            {
                wish.length > 0 ?
                    wish.map((item, index) => (
                        <div
                            key={index}
                            className="card w-80 m-4 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-white/20"
                        >
                            <Link to={`/view/${item.id}`} className="relative group">
                                <img
                                    src={item?.thumbnail}
                                    alt={item?.title}
                                    className="w-full h-52 object-cover rounded-t-2xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
                            </Link>
                            <div className="p-4 text-white">
                                <h2 className="text-xl font-bold mb-1">{item.title}</h2>
                                <p className="text-sm text-gray-700 mb-2 line-clamp-2">{item.description}</p>
                                <p className="text-lg font-semibold text-yellow-300 mb-4">$ {item.price}</p>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => dispatch(removeWish(item))}
                                        className="px-4 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white transition-all duration-200 hover:scale-105 shadow"
                                    >
                                        ❤️ Wish
                                    </button>
                                    <button
                                        onClick={() => dispatch(addToCart(item))}
                                        className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 hover:scale-105 shadow"
                                    >
                                        🛒 Cart
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

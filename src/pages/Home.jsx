import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAsyncThunck, nextPage, prevPage } from '../redux/slices/productSlice'
import { addWish } from '../redux/slices/wishSlice'
import { addToCart } from '../redux/slices/cartSlice'
import { FcNext } from 'react-icons/fc'
import { MdArrowBackIosNew } from 'react-icons/md'

const Home = () => {
  const dispatch = useDispatch()
  const { product, loading, error, producePerPage, currentPage } = useSelector((state) => state.ProductReducer)

  const totalPage = product.length / producePerPage
  const lastPeoductIndex = producePerPage * currentPage
  const firstProductIndex = lastPeoductIndex - producePerPage
  const visibleProduct = product.slice(firstProductIndex, lastPeoductIndex)


  useEffect(() => {
    dispatch(fetchAsyncThunck())
  }, [])
  // console.log(product);
  const next = () => {
    if (currentPage < totalPage) {
      dispatch(nextPage())
    }
  }
  const prev = () => {
    if (currentPage > 1) {
      dispatch(prevPage())
    }
  }

  if (error) { return <p className='flex justify-center items-center'>{error}</p> }

  return (
    <div>
      <div className='flex justify-center items-center flex-wrap p-5'>

        {
          loading ?


            <div className="flex-col gap-4 w-full min-h-screen flex items-center justify-center">
              <div
                className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full" >
                <div
                  className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                ></div>
              </div>
            </div>
            :

            visibleProduct.map((item, index) => (

              <div
                key={index}
                className="card w-90 m-4  rounded-2xl bg-white/10 backdrop-blur-md shadow-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl border border-white/20"
              >
                <Link to={`/view/${item.id}`} className="relative group">
                  <img
                    src={item?.thumbnail}
                    alt={item?.title}
                    className="w-full h-52 object-cover rounded-t-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
                </Link>
                <div className="p-4 ">
                  <h2 className="text-xl font-bold mb-1 ">{item?.title}</h2>
                  <p className="text-sm text-gray-800 mb-2 line-clamp-2">{item.description}</p>
                  <p className="text-lg font-semibold text-yellow-300 mb-4">$ {item.price}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => dispatch(addWish(item))}
                      className="px-4 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white transition-all duration-200 hover:scale-105 shadow"
                    >
                      Wish
                    </button>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 hover:scale-105 shadow"
                    >
                      Cart
                    </button>
                  </div>
                </div>
              </div>

            ))

        }
      </div>
      {
        visibleProduct ?

          <div className='text-center my-4 flex justify-center items-center'>
            <button onClick={prev} className='p-2 border shadow rounded'><MdArrowBackIosNew size={15} />

            </button>
            <p>{currentPage} / {Math.ceil(totalPage)}</p>
            <button onClick={next} className='p-2 border shadow rounded '><FcNext size={15} /></button>
          </div> : <></>
      }
    </div>
  )
}

export default Home

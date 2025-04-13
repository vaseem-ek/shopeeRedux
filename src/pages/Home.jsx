import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAsyncThunck, nextPage, prevPage } from '../redux/slices/productSlice'
import { addWish } from '../redux/slices/wishSlice'
import { addToCart } from '../redux/slices/cartSlice'

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

                        <div className="container ">
                            <div className="loader"></div>
                            <div className="loader"></div>
                            <div className="loader"></div>
                        </div>
                        :

                        visibleProduct.map((item, index) => (

                            <div key={index} className="card bg-base-100 w-96 mt-2 shadow-lg">
                                <Link to={`/view/${item.id}`}>
                                    <img
                                        src={item?.thumbnail}
                                        alt="Shoes" />
                                </Link>
                                <div className="p-4">
                                    <h2 className="card-title">{item.title}</h2>
                                    <p>{item.description}</p>
                                    <p>$ {item.price}</p>
                                    <div className="flex justify-between">
                                        <button onClick={() => dispatch(addWish(item))} className="shadow p-3 bg-slate-200 ">wish</button>
                                        <button onClick={() => dispatch(addToCart(item))} className="shadow p-3 bg-slate-200 ">cart</button>
                                    </div>
                                </div>
                            </div>
                        ))

                }
            </div>
            <div className='text-center my-4 flex justify-center items-center'>
                <button onClick={prev} className='p-2 border'>prev</button>
                <p>{currentPage} / {Math.ceil(totalPage)}</p>
                <button onClick={next} className='p-2 border'>next</button>
            </div>
        </div>
    )
}

export default Home

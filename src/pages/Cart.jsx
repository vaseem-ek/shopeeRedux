import React from "react";
import { FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { checkout, decreaseQuantiy, increaseQuantiy, removeCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart } = useSelector(state => state.cartReducer)
  const dispatch=useDispatch()
  const nav=useNavigate()

  const handleCheckout=()=>{
    dispatch(checkout())
    nav('/')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-6 p-6">
      {/* Left Column: Table */}

      {
        cart.length > 0 ?
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="text-left px-6 py-3 border-b">#</th>
                  <th className="text-left px-6 py-3 border-b">Name</th>
                  <th className="text-left px-6 py-3 border-b">image</th>
                  <th className="text-left px-6 py-3 border-b">Quanity</th>
                  <th className="text-left px-6 py-3 border-b">price</th>
                  <th className="text-left px-6 py-3 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {
                  cart.map((item, index) => (


                    <tr key={index}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 border-b">{index + 1}</td>
                      <td className="px-6 py-4 border-b">{item.title}</td>
                      <td className="px-6 py-4 border-b">
                        <img src={item.thumbnail} className="h-20 w-20" alt="" />
                      </td>
                      <td className="px-6 py-4 border-b">
                        <span className="shadow px-2 py-1" onClick={()=>dispatch(decreaseQuantiy(item.id))}>-</span> <input type="text" value={item.quantity} readOnly className="w-10 text-center outline-1" name="" id="" /><span className="shadow px-2 py-1" onClick={()=>dispatch(increaseQuantiy(item.id))}>+</span>
                      </td>
                      <td className="px-6 py-4 border-b">$ {item.price}</td>
                      <td className="px-6 py-4 border-b">
                        <FiTrash size={20} onClick={()=>dispatch(removeCart(item.id))} className="text-red-600 cursor-pointer" />
                      </td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
          :
          <p>not added</p>
      }

      {/* Right Column: Text Content */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <p className="text-gray-700 mb-2">
          total price :{cart.reduce((prev,item)=>prev+(item.quantity*item.price),0)}
        </p>
        <button className=" bg-slate-600 w-full rounded py-2 px-3 text-white font-extrabold" onClick={handleCheckout}>Check out</button>

      </div>
    </div>
  );
};

export default Cart;

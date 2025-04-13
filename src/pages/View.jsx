import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice';

function View() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch=useDispatch()

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('product') || '[]');
    const foundItem = products.find(item => item.id == id);
    setItem(foundItem || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-xl">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center p-6 gap-8 max-w-6xl mx-auto">
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="rounded-xl shadow-lg w-full max-w-md object-cover"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-red-600">{item.title}</h1>
        <p className="text-gray-700 text-justify">{item.description}</p>
        <p className="text-xl font-semibold text-green-700">$ {item.price}</p>
        <button onClick={()=>dispatch(addToCart(item))} className="mt-4 w-fit px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 shadow-md transition duration-300">
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default View;

import React, { useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { IoCartOutline } from 'react-icons/io5';
import { HiMenu, HiX } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { search } from '../redux/slices/productSlice';

function Header() {
  const [key, setKey] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wish } = useSelector((state) => state.wishReducer);
  const { cart } = useSelector((state) => state.cartReducer);

  const handleSearch = () => {
    if (key.trim()) {
      dispatch(search(key));
      setMenuOpen(false);
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-amber-200 border-b shadow-sm px-4 py-3 sm:px-6 md:px-12 z-50">
      <div className="flex items-center justify-between">
        
        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          src="https://images.cnbctv18.com/wp-content/uploads/2022/03/Shopee-768x768.png"
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full cursor-pointer hover:scale-105 transition"
          alt="Logo"
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="bg-white py-1.5 px-4 rounded-full shadow-sm outline-none focus:ring-2 ring-blue-400 transition"
              placeholder="Search product..."
            />
            <button
              onClick={handleSearch}
              className="bg-white hover:bg-gray-100 px-4 py-1.5 rounded-full shadow transition"
            >
              Search
            </button>
          </div>

          <Link to="/wish">
            <button className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow hover:bg-red-50 transition">
              <CiHeart size={18} className="text-red-600" />
              {wish.length > 0 && <span className="text-red-800 font-semibold">{wish.length}</span>}
            </button>
          </Link>

          <Link to="/cart">
            <button className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-full shadow hover:bg-yellow-50 transition">
               <IoCartOutline size={18} className="text-yellow-600" />
              {cart.length > 0 && <span className="text-orange-700 font-semibold">{cart.length}</span>}
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-3 animate-slideDown">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="bg-white py-2 px-4 rounded-full shadow-sm outline-none"
              placeholder="Search product..."
            />
            <button
              onClick={handleSearch}
              className="bg-white px-4 py-2 rounded-full shadow hover:bg-gray-100"
            >
              Search
            </button>
          </div>

          <Link to="/wish" onClick={() => setMenuOpen(false)}>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow hover:bg-red-50 transition">
               <CiHeart size={18} className="text-red-600" />
              {wish.length > 0 && <span className="text-red-800 font-semibold">{wish.length}</span>}
            </button>
          </Link>

          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow hover:bg-yellow-50 transition">
               <IoCartOutline size={18} className="text-yellow-600" />
              {cart.length > 0 && <span className="text-orange-700 font-semibold">{cart.length}</span>}
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;

import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import List from './pages/List';
import Order from './pages/Order';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency ='Rs'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('token', token);
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='flex-1 p-6'>
              <Routes>
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/order' element={<Order token={token} />} />
               
                
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;

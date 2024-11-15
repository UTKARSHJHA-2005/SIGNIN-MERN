import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleerror, handlesuccess } from '../utils';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [signupinfo, setsignupinfo] = useState({
    email: '',
    password: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setsignupinfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlesignup = async (e) => {
    e.preventDefault();
    const { email, password } = signupinfo;

    if (!email || !password) {
      handleerror('Email and password are required');
      return;
    }

    try {
      const uri = `http://localhost:5173/auth/login`;
      app.post(uri, async (req, res) => {
        try {
          const { email, password } = req.body;
          if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
          }
          const user = await findUserByEmail(email); // Example function
          if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
          }
          res.status(200).json({ success: true, message: 'Login successful' });
        } catch (error) {
          console.error(error); 
          res.status(500).json({ success: false, message: 'Server error' });
        }
      });      

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch');
      }

      const res = await response.json();
      const { success, message } = res;

      if (success) {
        handlesuccess(message);
        setTimeout(() => {
          navigate('/dashboard'); 
        }, 1000);
      } else {
        handleerror(message);
      }
    } catch (error) {
      handleerror(error.message || 'An error occurred during login');
    }
  };

  return (
    <div className='text-center justify-center ml-[400px] border h-[370px] shadow-black shadow-lg mt-[160px] w-[400px]'>
      <h1 className='text-[20px] text-slate-900 font-semibold'>LOGIN FORM</h1>
      <br />
      <form onSubmit={handlesignup}>
        <div>E-mail:
          <br />
          <input 
            onChange={handlechange} 
            type='text' 
            className='w-[350px] h-[38px] border-black' 
            name='email' 
            placeholder='Enter your e-mail...' 
            autoFocus 
            value={signupinfo.email} 
            aria-label="Email"
          />
        </div>
        <div className='mt-[10px]'>Password:
          <br />
          <div className='relative w-[340px]'>
            <input
              type={showPassword ? 'text' : 'password'}
              onChange={handlechange}
              className='w-full ml-6 h-[38px] border-black'
              name='password'
              placeholder='Enter your password...'
              value={signupinfo.password}
              aria-label="Password"
            />
            <span
              onClick={togglePasswordVisibility}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'
              aria-label="Toggle password visibility"
            >
              {showPassword ? '👁️' : '👁️‍🗨️'} 
            </span>
          </div>
        </div>
        <br />
        <button 
          type='submit' 
          className='mt-[25px] h-[30px] bg-black text-white w-[350px] hover:bg-gray-600'
          aria-label="Login"
        >
          LOGIN
        </button>
        <div className='mt-[20px]'>
          <p>New To The Platform?</p>
          <Link to='/signup'>
            <div 
              className='w-[350px] h-[30px] bg-red-600 text-white mt-[10px] ml-[24px] cursor-pointer hover:bg-red-400 hover:text-black'
              aria-label="Sign up"
            >
              SIGN-UP
            </div>
          </Link>
        </div>
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
}

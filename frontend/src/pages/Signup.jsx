import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleerror, handlesuccess } from '../utils';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [signupinfo, setsignupinfo] = useState({
    Name: '',
    email: '',
    Password: ''
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
    const { Name, email, Password } = signupinfo;

    if (!Name || !Password || !email) {
      handleerror('Name, email, and password are required');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5173/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupinfo),
      });

      if (!response.ok) {
        const errorData = await response.json();
        handleerror(errorData.message || "Failed to sign up. Please try again.");
        return;
      }

      const { success, message } = await response.json();

      if (success) {
        handlesuccess(message || "Signup successful!");
        setTimeout(() => navigate('/login'), 1000);
      } else {
        handleerror(message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      handleerror('An error occurred during signup. Please try again later.');
    }
  };

  return (
    <div className='text-center justify-center ml-[400px] border h-[370px] shadow-black shadow-lg mt-[160px] w-[400px]'>
      <h1 className='text-[20px] text-slate-900 font-semibold'>SIGN-UP FORM</h1>
      <br />
      <form onSubmit={handlesignup}>
        <div className='text-[15px]'>Name:
          <br /><input onChange={handlechange} type='text' className='w-[350px] h-[38px] border-black' name='Name' placeholder='Enter your name...' value={signupinfo.Name} />
        </div>
        <div>E-mail:
          <br /><input onChange={handlechange} type='email' className='w-[350px] h-[38px] border-black' name='email' placeholder='Enter your e-mail...' value={signupinfo.email} />
        </div>
        <div>Password:
          <br />
          <div className='relative w-[340px]'>
            <input
              type={showPassword ? 'text' : 'password'}
              onChange={handlechange}
              className='w-full ml-6 h-[38px] border-black'
              name='Password'
              placeholder='Enter your password...'
              value={signupinfo.Password}
            />
            <span
              onClick={togglePasswordVisibility}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer'
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
        </div>
        <button className='mt-[18px] h-[30px] bg-black text-white w-[350px] hover:bg-gray-600'>SIGN-UP</button>
        <br />
        <div>
          <p>Already Registered?</p>
          <Link to='/login'>
            <div className='w-[350px] h-[30px] bg-red-600 text-white mt-[10px] ml-[24px] cursor-pointer hover:bg-red-400 hover:text-black'>Login
            </div>
          </Link>
        </div>
      </form>
      <ToastContainer position="top-right" />
    </div>
  );
}
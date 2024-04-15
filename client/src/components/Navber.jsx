import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { getCookie } from '../lib/cookies';
import { toast } from 'react-toastify';


export default function Navber() {
  const token = getCookie('token');
  const user = JSON.parse(localStorage.getItem('user')) || [];
  const handleLogOut = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user/logout', {
        method: 'GET',
        credentials: 'include'
      })
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message)
        localStorage.removeItem('user')
        window.location.href = '/'
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <header className='flex justify-between items-center  p-2 shadow'>
      <h1 className='text-xl font-bold'>Logo</h1>
      <nav>
        <ul className='flex justify-around space-x-2'>
          <li className='border-r-2 pr-2 text-md font-semibold'>
            <NavLink style={({ isActive }) => {
              return {
                color: isActive ? 'red' : 'black'
              }
            }} to='/'>Home</NavLink>
          </li>
          <li className='border-r-2 pr-2 text-md font-semibold'>
            <NavLink style={({ isActive }) => {
              return {
                color: isActive ? 'red' : 'black'
              }
            }} to='/about'>About</NavLink>
          </li>
          <li className='text-md font-semibold'>
            <NavLink style={({ isActive }) => {
              return {
                color: isActive ? 'red' : 'black'
              }
            }} to='/profile'>Profile</NavLink>
          </li>
        </ul>
      </nav>
      {
        token ? (
          <div className='flex justify-between space-x-1 items-center'>
            <img width={45} src={`http://localhost:3000/${user.image}`} className='rounded-full' alt={user.userName} />
            <span className='text-md font-semibold'>{user.userName}</span>
            <button onClick={handleLogOut} className='bg-red-500 text-white px-2 py-1 rounded'>Logout</button>
          </div>
        ) : (
          <Link to='/signin' className='bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-2 py-1 rounded'>SignIn</Link>
        )
      }
    </header>
  )
}

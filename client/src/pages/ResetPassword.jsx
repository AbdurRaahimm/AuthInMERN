import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ResetPassword() {
    const { token } = useParams();
    const navigate = useNavigate();
    const handleResetPassword = async (e) => {
        e.preventDefault()
        try {
            const form = e.target;
            if (form.password.value === '' || form.confirmpassword.value === '') {
                toast.error('Please fill all the fields')
                return
            }
            if (form.password.value !== form.confirmpassword.value) {
                toast.error('Password does not match with confirm password')
                return
            }
            const formData = new FormData(form);
            const response = await fetch(`http://localhost:3000/api/user/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: formData.get('password')
                })
            })
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
                navigate('/signin');
                e.target.reset();
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <section className='bg-gradient-to-r from-emerald-400 to-cyan-400 h-screen'>
            <div className="bg-white w-8/12 mx-auto translate-y-1/3 py-8 rounded-md ">
                <h1 className='text-3xl font-bold text-center'> Reset Password</h1>
                <form className='w-1/3 mx-auto mt-5' onSubmit={handleResetPassword}>
                    <div className='mb-5'>
                        <div className="flex justify-between">
                            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                        </div>
                        <input type='password' id='password' name='password' className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                    </div>
                    <div className='mb-5'>
                        <div className="flex justify-between">
                            <label htmlFor='confirmpassword' className='block text-sm font-medium text-gray-700'>Confirm Password</label>
                        </div>
                        <input type='password' id='confirmpassword' name='confirmpassword' className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                    </div>

                    <button type='submit' className='w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-2 py-1 rounded'>
                        Reset Password
                    </button>
                </form>

            </div>
        </section>
    )
}

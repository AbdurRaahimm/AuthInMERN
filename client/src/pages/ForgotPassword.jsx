import React from 'react'

export default function ForgotPassword() {
    return (
        <section className='bg-gradient-to-r from-emerald-400 to-cyan-400 h-screen'>
            <div className="bg-white w-8/12 mx-auto translate-y-1/3 py-8 rounded-md ">
                <h1 className='text-3xl font-bold text-center'>SignIn</h1>
                <form className='w-1/3 mx-auto mt-5' >

                    <div className='mb-5'>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                        <input type='email' id='email' name='email' className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                    </div>
                   

                    <button type='submit' className='w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-2 py-1 rounded'>Submit</button>
                </form>
                
            </div>
        </section>
    )
}

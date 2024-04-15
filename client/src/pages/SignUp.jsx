import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function SignUp() {
    const [image, setImage] = React.useState(null);
    const navigate = useNavigate()
    const handleSignUp = async(e) => {
        e.preventDefault()
        try {
            const form = e.target;
            if(form.userName.value === '' || form.email.value === '' || form.password.value === '' || form.confirmpassword.value === '') {
                alert('Please fill all the fields')
                return
            }
            if(form.password.value !== form.confirmpassword.value) {
                alert('Password does not match with confirm password')
                return
            }
            const formData = new FormData(form);
            formData.append('photo', image)
            const response = await fetch('http://localhost:3000/api/user/register', {
                method: 'POST',
                body: formData
            })
            const data = await response.json();
            if(response.ok) {
                toast.success(data.message)
                navigate('/signin')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)  
        }
    }
    // preview image 
    const previewImage = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            const image = reader.result
            // console.log(image)
            setImage(image)
        }
        reader.readAsDataURL(file)
    }
    return (
        <section className='bg-gradient-to-r from-emerald-400 to-cyan-400 h-screen'>
            <div className="bg-white w-8/12 mx-auto translate-y-4 py-8 rounded-md ">
                <h1 className='text-3xl font-bold text-center'>SignUp</h1>
                <form className='w-1/3 mx-auto mt-5' onSubmit={handleSignUp}>
                    {/* username */}
                    <div className='mb-5'>
                        <label htmlFor='userName' className='block text-sm font-medium text-gray-700'>Username</label>
                        <input type='text' id='userName' name='userName' className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                        <input type='email' id='email' name='email' className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                        <input type='password' id='password' name='password' className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                    </div>
                    {/* confirmpassword */}
                    <div className='mb-5'>
                        <label htmlFor='confirmpassword' className='block text-sm font-medium text-gray-700'>Confirm Password</label>
                        <input type='password' id='confirmpassword' name='confirmpassword' className='mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
                    </div>
                    {/* profile */}
                    <div className="col-span-full mb-5">
                        <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                        <div className="mt-2 flex items-center gap-x-3">
                            {/* preview image */}
                            {
                                image ? <img src={image} alt="profile" loading='lazy' className='w-12 h-12 rounded-full' /> :
                                    <svg className="h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                    </svg>
                            }

                            <input type="file"
                                onChange={previewImage}
                                name="profileImg" id="profileImg" className='hidden' />
                            <label htmlFor='profileImg' className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Upload</label>
                        </div>
                    </div>
                    {/* profile images preview system like above */}
                    <button type='submit' className='w-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-2 py-1 rounded'>SignUp</button>
                </form>
                <p className='text-center'>
                    Already have an account? <Link to='/signin' className='text-blue-500'>SignUp</Link>
                </p>
            </div>
        </section>
    )
}

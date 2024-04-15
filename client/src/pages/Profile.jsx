import React, { useEffect } from 'react'
import { getCookie } from '../lib/cookies';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Profile() {
    const [user, setUser] = React.useState([]);
    const token = getCookie('token');
    const navigate = useNavigate()
    const fetchProfile = async () => {
        try {
            const response = await fetch('http://localhost:3000', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include'
            })
            const data = await response.json();
            console.log(data.user)
            
            if (response.ok) {
                // toast.success(data.message)
                setUser(data.user)
            } else {
                toast.error(data.message);
                navigate('/')
            }
        } catch (error) {
            toast.error(error.message)
        }
    
    }
    useEffect(() => {
        fetchProfile()
    }, [])
    return (
        <section className='text-center py-5'>
            <h1 className='text-3xl'>Profile Page </h1>
            <div className='flex justify-center items-center space-x-2 mt-5 border p-5'>
                <img src={`http://localhost:3000/${user.image}`} alt={user.username} className='rounded-full' width={100} />
                <div>
                    <h2 className='text-xl'>{user.username}</h2>
                    <p className='text-md'>{user.email}</p>
                </div>
            </div>
        </section>
    )
}

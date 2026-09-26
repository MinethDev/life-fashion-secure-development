import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3002/api/auth/signup', { 
                name, 
                email, 
                password, 
                role: 'customer'
            });
            if (response.data.success) {
                navigate('/login');
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error);
            } else {
                setError('Server Error');
            }
        }
    };

    return (
        <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-black from-50% to-gray-100 to-50% space-y-6">
            <h2 className="font-Lora text-3xl text-white">Life Fashion</h2>
            <div className="border shadow p-6 w-80 bg-white">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border"
                            placeholder="Enter Name"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border"
                            placeholder="******"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-black text-white py-2">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
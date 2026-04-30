import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onSuccess }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name);
            localStorage.setItem('role', data.role);
            if (onSuccess) onSuccess();
        } catch (err) { alert(err.response?.data?.msg || "Login Failed!"); }
    };

    return (
        <div className="w-full bg-[#1e293b] p-8 rounded-[2rem] border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-black text-white mb-6 text-center italic tracking-tighter">AUTHENTICATE</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required />
                <input type="password" className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} required />
                <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-black text-white transition-all shadow-lg shadow-indigo-500/20">ACCESS DASHBOARD</button>
            </form>
        </div>
    );
};

export default Login;
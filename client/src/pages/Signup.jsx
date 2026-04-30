import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onSuccess }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'member' });

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/register', formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name);
            localStorage.setItem('role', data.role);
            
            if (onSuccess) onSuccess(); // Modal band karne ke liye
            window.location.reload(); // Dashboard refresh karne ke liye
        } catch (err) {
            alert(err.response?.data?.msg || "Signup failed! Try another email.");
        }
    };

    return (
        <div className="w-full bg-[#1e293b] p-8 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden">
            <h2 className="text-2xl font-black text-white mb-6 text-center italic tracking-tighter">CREATE ACCOUNT</h2>
            <form onSubmit={handleSignup} className="space-y-4">
                <input 
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-indigo-500 outline-none" 
                    placeholder="Full Name" 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    required 
                />
                <input 
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-indigo-500 outline-none" 
                    placeholder="Email Address" 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                    required 
                />
                <input 
                    type="password" 
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-indigo-500 outline-none" 
                    placeholder="Password" 
                    onChange={e => setFormData({...formData, password: e.target.value})} 
                    required 
                />
                <select 
                    className="w-full p-4 bg-[#0f172a] border border-white/10 rounded-xl text-white text-sm outline-none" 
                    value={formData.role} 
                    onChange={e => setFormData({...formData, role: e.target.value})}
                >
                    <option value="member">Team Member</option>
                    <option value="admin">Project Admin</option>
                </select>
                <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-black text-white shadow-lg transition-all mt-2">
                    SIGN UP NOW
                </button>
            </form>
        </div>
    );
};

export default Signup;
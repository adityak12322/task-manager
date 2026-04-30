import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Target, User, Calendar, ShieldAlert } from 'lucide-react';
import axios from 'axios';

const AddTaskModal = ({ isOpen, onClose, refreshTasks }) => {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Normal',
    dueDate: '',
    assignedTo: '',
    project: 'General'
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http:https://task-manager-production-33e6.up.railway.app/api/auth/users', {
          headers: { 'x-auth-token': token }
        });
        setMembers(res.data.filter(u => u.role === 'member'));
      } catch (err) { console.error(err); }
    };
    if (isOpen) fetchUsers();
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/tasks', formData, {
        headers: { 'x-auth-token': token }
      });
      refreshTasks();
      onClose();
      setFormData({ title: '', description: '', priority: 'Normal', dueDate: '', assignedTo: '', project: 'General' });
    } catch (err) { alert("Deployment Failed!"); }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-xl bg-[#1e293b] border border-white/10 p-8 rounded-[2.5rem] relative">
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={20}/></button>
            <h2 className="text-3xl font-black italic text-white mb-6 uppercase tracking-tighter">New Task Deployment</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <input className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-indigo-500" placeholder="Task Title" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold ml-2">PROJECT REALM</label>
                  <select className="w-full p-4 bg-[#0f172a] border border-white/10 rounded-2xl text-white outline-none" value={formData.project} onChange={e => setFormData({...formData, project: e.target.value})}>
                    <option value="General">General</option>
                    <option value="MERN App">MERN App</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-gray-500 font-bold ml-2">ASSIGN OPERATIVE</label>
                  <select className="w-full p-4 bg-[#0f172a] border border-white/10 rounded-2xl text-white outline-none" required value={formData.assignedTo} onChange={e => setFormData({...formData, assignedTo: e.target.value})}>
                    <option value="">Select Member</option>
                    {members.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input type="date" className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none" required onChange={e => setFormData({...formData, dueDate: e.target.value})} />
                <select className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none" onChange={e => setFormData({...formData, priority: e.target.value})}>
                  <option value="Normal">Normal Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              <textarea className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white h-24 outline-none resize-none" placeholder="Task Intel/Description..." required onChange={e => setFormData({...formData, description: e.target.value})} />

              <button className="w-full py-5 bg-indigo-600 rounded-2xl font-black text-white hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-500/20">CONFIRM DEPLOYMENT</button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default AddTaskModal;

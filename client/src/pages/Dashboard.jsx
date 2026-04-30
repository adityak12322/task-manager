import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TaskCard from '../components/TaskCard';
import AddTaskModal from '../components/AddTaskModal';
import Login from './Login';
import Signup from './Signup';
import { motion, AnimatePresence } from 'framer-motion'; // CRITICAL: Check this import
import { LayoutDashboard, Clock, AlertCircle, Plus, Users } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]); // Added this to fix blank screen
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null);

  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name') || 'Chief';
  const role = localStorage.getItem('role') || 'member';

  const fetchData = async () => {
    if (!token) return;
    try {
      const headers = { headers: { 'x-auth-token': token } };
      const [taskRes, userRes] = await Promise.all([
        axios.get('http://localhost:5000/api/tasks', headers),
        axios.get('http://localhost:5000/api/auth/users', headers)
      ]);
      setTasks(taskRes.data);
      setMembers(userRes.data.filter(u => u.role === 'member'));
    } catch (err) { console.log("Fetch Error:", err); }
  };

  useEffect(() => { fetchData(); }, [token]);

  const handleAuthSuccess = () => {
    setAuthMode(null);
    window.location.reload();
  };

  const overdueCount = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'Completed').length;

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar onLoginClick={() => setAuthMode('login')} onSignupClick={() => setAuthMode('signup')} />

      <AnimatePresence>
        {authMode && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <div className="relative w-full max-w-sm">
              <button onClick={() => setAuthMode(null)} className="absolute -top-12 right-0 text-white font-bold">✕ CLOSE</button>
              {authMode === 'login' ? <Login onSuccess={handleAuthSuccess} /> : <Signup onSuccess={handleAuthSuccess} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AddTaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} refreshTasks={fetchData} />

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-black italic tracking-tighter uppercase">HI, {name} 👋</h1>
          <p className="text-gray-500 mt-2 text-lg">Status: <span className="text-indigo-500 font-bold uppercase">{role} ACCESS</span></p>
        </header>

        {/* Bento Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem]">
            <LayoutDashboard className="text-blue-400 mb-4" />
            <div className="text-4xl font-black">{token ? tasks.length : '0'}</div>
            <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">Assignments</div>
          </div>
          <div className="p-8 bg-red-500/5 border border-red-500/10 rounded-[2.5rem]">
            <AlertCircle className="text-red-500 mb-4" />
            <div className="text-4xl font-black text-red-500">{token ? overdueCount : '0'}</div>
            <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">Overdue</div>
          </div>
          <div className="p-8 bg-green-500/5 border border-green-500/10 rounded-[2.5rem]">
            <Clock className="text-green-400 mb-4" />
            <div className="text-4xl font-black text-green-400">{token ? tasks.filter(t => t.status === 'Completed').length : '0'}</div>
            <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">Completed</div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-black italic uppercase">Mission Control</h2>
          {token && role === 'admin' && (
            <button onClick={() => setIsTaskModalOpen(true)} className="bg-indigo-600 px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-indigo-500 transition-all">
              <Plus size={20} /> NEW DEPLOYMENT
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {token ? tasks.map(t => <TaskCard key={t._id} task={t} refreshTasks={fetchData} />) : <div className="col-span-full py-20 text-center text-gray-600 border border-dashed border-white/10 rounded-3xl uppercase font-black">Login to Access Board</div>}
        </div>

        {/* Member Management Section (Admin Only) */}
        {token && role === 'admin' && (
          <section className="mt-24 border-t border-white/5 pt-16">
            <div className="flex items-center gap-3 mb-10">
              <Users className="text-indigo-400" size={28} />
              <h2 className="text-3xl font-black italic uppercase tracking-tighter">Personnel Management</h2>
            </div>
            <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-gray-500 text-[10px] uppercase tracking-widest border-b border-white/5">
                    <th className="pb-4">Operative</th>
                    <th className="pb-4">Email</th>
                    <th className="pb-4">Tasks Assigned</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map(m => (
                    <tr key={m._id} className="border-b border-white/5">
                      <td className="py-4 font-bold">{m.name}</td>
                      <td className="py-4 text-gray-500">{m.email}</td>
                      <td className="py-4 text-indigo-400 font-black">{tasks.filter(t => t.assignedTo === m._id || t.assignedTo?._id === m._id).length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
import React from 'react';
import { Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import axios from 'axios';

const TaskCard = ({ task, refreshTasks }) => {
  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Completed';

  const updateStatus = async (newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${task._id}`, 
        { status: newStatus },
        { headers: { 'x-auth-token': token } }
      );
      refreshTasks();
    } catch (err) { alert("Status update failed"); }
  };

  const deleteTask = async () => {
    if(!window.confirm("Uda du task?")) return;
    try {
      await axios.delete(`https://task-manager-production-33e6.up.railway.app/api/tasks/${task._id}`, {
        headers: { 'x-auth-token': token }
      });
      refreshTasks();
    } catch (err) { alert("Delete failed"); }
  };

  return (
    <div className={`p-6 border rounded-[2.5rem] backdrop-blur-lg transition-all ${isOverdue ? 'bg-red-500/5 border-red-500/40 shadow-lg shadow-red-500/5' : 'bg-white/5 border-white/10'}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          {isOverdue && <span className="text-[10px] text-red-500 font-black uppercase flex items-center gap-1 mb-2"><AlertCircle size={10}/> Overdue</span>}
          <h3 className="text-xl font-bold text-white tracking-tight">{task.title}</h3>
        </div>
        {userRole === 'admin' && (
          <button onClick={deleteTask} className="text-gray-500 hover:text-red-500 transition-colors p-2">
            <Trash2 size={18} />
          </button>
        )}
      </div>
      <p className="text-gray-400 text-sm mb-6 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between mt-auto">
        <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${task.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
          {task.status}
        </span>

        {userRole === 'member' && task.status !== 'Completed' && (
          <button onClick={() => updateStatus('Completed')} className="flex items-center gap-2 bg-indigo-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-500 transition-all">
            <CheckCircle size={14} /> DONE
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

import React from 'react';

const Navbar = ({ onLoginClick, onSignupClick }) => {
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('name');

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-8 py-4 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center">
      <div className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent italic">
        TASK.IO
      </div>

      <div className="flex gap-6 items-center">
        {!token ? (
          <>
            <button onClick={onLoginClick} className="text-white text-sm font-bold hover:text-indigo-400 transition-all">Login</button>
            <button onClick={onSignupClick} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-indigo-500/20 transition-all">
              JOIN TEAM
            </button>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-xs font-bold bg-white/5 px-4 py-2 rounded-full border border-white/10">
              {userName}
            </span>
            <button onClick={handleLogout} className="text-red-400 text-sm font-bold hover:bg-red-500/10 px-3 py-2 rounded-lg transition-all">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
const Footer = () => (
  <footer className="mt-20 py-12 border-t border-white/5 bg-black/20">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-6 md:mb-0">
        <h3 className="text-xl font-black text-indigo-400">TASK.IO</h3>
        <p className="text-gray-500 text-sm mt-1">Enterprise Project Management Suite</p>
      </div>
      <div className="text-center md:text-right">
        <p className="text-gray-400 text-sm font-medium">Developed by <span className="text-white">Aditya Kumar</span></p>
        <p className="text-gray-600 text-xs mt-1">adityak12322@gmail.com | © 2026 All Rights Reserved</p>
        <div className="flex gap-4 mt-3 justify-center md:justify-end opacity-50 hover:opacity-100 transition-all">
           {/* Add your real links here */}
           <a href="https://www.linkedin.com/in/the-adityakumar/"
           target="_blank"
           rel="noopener noreferrer" className="hover:text-indigo-400 text-xs">LinkedIn</a>
           <a href="https://github.com/adityak12322"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 text-xs">GitHub</a>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
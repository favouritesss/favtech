import { Outlet } from 'react-router-dom';

const AuthLayout = ({ darkMode }) => {
  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden`}>
      <div className="radial-glow"></div>
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#0a192f 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="w-full max-w-md z-10 glass-panel p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white flex items-center justify-center gap-2">
            <span className="text-teal-base">Fav</span>Tech
          </h1>
          <p className="text-slate-base mt-2">Premium SMM Services</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

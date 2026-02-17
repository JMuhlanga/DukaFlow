import { useState } from 'react';
import * as authService from '../services/authService'; // Assuming you use your service logic

const RegisterStaff = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'staff' // Default role
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    try {
      await authService.registerUser(formData.username, formData.password, formData.role);
      setMessage({ type: 'success', text: `Hongera! ${formData.username} has been added.` });
      setFormData({ username: '', password: '', role: 'staff' }); // Reset form
    } catch (err) {
      setMessage({ type: 'error', text: err.message || "Something went wrong." });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Register New Staff</h2>
        <p className="text-slate-500">Add a new user to DukaFlow and assign their permissions.</p>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-lg border-l-4 ${
          message.type === 'success' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-6">
        {/* Username */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
          <input
            type="text"
            required
            value={formData.username}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-duka-green outline-none transition-all"
            placeholder="e.g. john_doe"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Temporary Password</label>
          <input
            type="password"
            required
            value={formData.password}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-duka-green outline-none transition-all"
            placeholder="••••••••"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Assign Role</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({...formData, role: 'staff'})}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                formData.role === 'staff' 
                ? 'border-duka-green bg-green-50' 
                : 'border-slate-100 bg-white hover:border-slate-200'
              }`}
            >
              <span className="block font-bold text-slate-800">Staff</span>
              <span className="text-xs text-slate-500">Can make sales and view inventory.</span>
            </button>

            <button
              type="button"
              onClick={() => setFormData({...formData, role: 'admin'})}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                formData.role === 'admin' 
                ? 'border-duka-green bg-green-50' 
                : 'border-slate-100 bg-white hover:border-slate-200'
              }`}
            >
              <span className="block font-bold text-slate-800">Admin</span>
              <span className="text-xs text-slate-500">Full access to reports and settings.</span>
            </button>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 active:scale-[0.99] transition-all shadow-lg"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default RegisterStaff;
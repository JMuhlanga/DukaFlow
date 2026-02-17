import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.username, credentials.password);
      navigate('/pos'); // Redirect to POS after success
    } catch (err) {
      alert("Login failed. Check your details, Mkubwa.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-duka-green mb-6">DukaFlow</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-duka-green outline-none"
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-duka-green outline-none"
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          />
          <button className="w-full bg-duka-green text-white py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all">
            Ingia (Login)
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
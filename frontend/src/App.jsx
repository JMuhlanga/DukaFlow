import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
// import POS from './pages/POS'; // You'll create this next

// 1. The ProtectedRoute wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) return <div className="flex justify-center items-center h-screen">Loading DukaFlow...</div>;
  
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route 
            path="/pos" 
            element={
              <ProtectedRoute>
                <div className="p-10 text-2xl">Welcome to the POS Page</div> 
                {/* Replace the div above with <POS /> once created */}
              </ProtectedRoute>
            } 
          />

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/pos" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
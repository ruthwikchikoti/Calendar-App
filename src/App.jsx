// frontend/src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          setIsAuthenticated={setIsAuthenticated} 
        />
        <Routes>
          <Route 
            path="/" 
            element={
              !isAuthenticated ? (
                <Home setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/dashboard" />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                <Dashboard setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/" />
              )
            } 
          />
          <Route
            path="/auth/callback"
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
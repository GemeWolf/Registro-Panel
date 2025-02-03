import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AuthLayout } from './components/AuthLayout';
import { ProductProvider } from "./contexts/ProductContext.tsx";

function App() {
  return (
    <>
      <Router>
        <ProductProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <AuthLayout>
                <Dashboard />
              </AuthLayout>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        </ProductProvider>
      </Router>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
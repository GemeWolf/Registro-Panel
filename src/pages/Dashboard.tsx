import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ProductSearch } from '../components/ProductSearch';
import { ProductForm } from '../components/ProductForm';
import { Product } from '../types';
import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export function Dashboard() {
  const navigate = useNavigate();
  const [foundProduct, setFoundProduct] = useState<Product | null>(null);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Signed out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Error signing out');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Product Management</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleSignOut}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Search Product</h2>
              <ProductSearch onProductFound={setFoundProduct} />
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {foundProduct ? 'Edit Product' : 'Create New Product'}
              </h2>
              <ProductForm
                existingProduct={foundProduct}
                onSuccess={() => setFoundProduct(null)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
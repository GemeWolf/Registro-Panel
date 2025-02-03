import { useState } from 'react';
import { Search } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';
import toast from 'react-hot-toast';

export function ProductSearch({ onProductFound }: { onProductFound: (product: Product | null) => void }) {
  const [searchId, setSearchId] = useState('');
  const [searchName, setSearchName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let query = supabase
        .from('products')
        .select('*');

      if (searchId) {
        query = query.eq('id', searchId);
      } else if (searchName) {
        query = query.ilike('name', `%${searchName}%`);
      }

      const { data, error } = await query.maybeSingle();

      if (error) {
        throw error;
      }

      if (!data) {
        onProductFound(null);
        toast.error('Product not found');
        return;
      }

      onProductFound(data);
      toast.success('Product found');
    } catch (error) {
      console.error('Error searching product:', error);
      toast.error('Error searching product');
      onProductFound(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="productId" className="block text-sm font-medium text-gray-700">
            Product ID
          </label>
          <input
            type="text"
            id="productId"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter product ID"
          />
        </div>
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter product name"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading || (!searchId && !searchName)}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? (
          'Searching...'
        ) : (
          <>
            <Search className="w-4 h-4 mr-2" />
            Search Product
          </>
        )}
      </button>
    </form>
  );
}
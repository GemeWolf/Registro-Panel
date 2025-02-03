// contexts/ProductContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { Product } from '../types';

interface ProductContextType {
    foundProduct: Product | null;
    setFoundProduct: (product: Product | null) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
    const [foundProduct, setFoundProduct] = useState<Product | null>(null);

    return (
        <ProductContext.Provider value={{ foundProduct, setFoundProduct }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProductContext() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
}
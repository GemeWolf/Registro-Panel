export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url: string;
  user_id: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
}
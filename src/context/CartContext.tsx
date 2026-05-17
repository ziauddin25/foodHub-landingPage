import { createContext, useContext, useState, type ReactNode } from "react";

// Product Type
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity?: number;
}

// Context Type
interface CartContextType {
  cartItems: Product[];
  addToCart: (product: Product) => void;
}

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider Props Type
interface CartProviderProps {
  children: ReactNode;
}

// Provider
export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Add To Cart
  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: (item.quantity || 1) + 1,
              }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
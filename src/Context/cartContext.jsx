import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCartUrl, addToCartUrl } from '../Utils/Urls/BooksUrl';
import { AuthContext } from './UserContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const getCartData = async () => {
        const res = await fetch(getCartUrl(user.email));
        const data = await res.json();
        setCartData(data.data);
      };
      getCartData();
    }
  }, [user,cartData]);

  return (
    <CartContext.Provider value={{ cartData, setCartData, }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

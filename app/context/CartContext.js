"use client";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  const addItemToCart =  ({
    productId,
    name,
    size,
    color,
    price,
    image,
    stock,
    quantity = 1,
  }) => {
    console.log(productId, name, size, color, price, image, stock);
    const item = {
      productId,
      name,
      size,
      color,
      price,
      image,
      stock,
      quantity,
    };
    const isItemExist = cart?.cartItems?.find(
      (i) => i.productId === item.productId
    );
    let newCartItems;
    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.productId === isItemExist.productId ? item : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.productId !== id)
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  }

  useEffect(() => {
    setCartToState();
  }, []);
  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,deleteItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;

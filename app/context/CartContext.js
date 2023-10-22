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

  const addItemToCart = ({
    productId,
    name,
    size,
    color,
    price,
    image,
    stock,
    quantity = 1,
  }) => {
    // check if a product with same id and color and size already exists
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
      (i) =>
        i.productId === item.productId &&
        i.color === item.color &&
        i.size === item.size
    );

    let newCartItems;
    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.productId === isItemExist.productId &&
        i.color === isItemExist.color &&
        i.size === isItemExist.size
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const updateQuantity = (productId,color,size, qty) => {
    const updatedCartItems = cart.cartItems.map((item) => {
      if (item.productId === productId && item.color === color && item.size === size) {
        return { ...item, quantity: qty };
      }
      return item;
    });

    localStorage.setItem(
      "cart",
      JSON.stringify({ cartItems: updatedCartItems })
    );
    setCartToState();
  };

  const deleteItemFromCart = (productId, color, size) => {
    const newCartItems = cart?.cartItems?.filter(
      (i) => !(i.productId === productId && i.color === color && i.size === size)
    );
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
};


  useEffect(() => {
    setCartToState();
  }, []);
  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        deleteItemFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartContext;

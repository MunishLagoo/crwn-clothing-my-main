
import { createContext, useState,useEffect } from 'react';

const addCartItem =(cartItems, productToAdd) => {
    const existingItems = cartItems.find((cartItem)=> cartItem.id === productToAdd.id);

    //if esiting increment quantity
    if(existingItems) {
      return  cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }

//if new product, take previous cart items and add new product with 1 quantity
    return [...cartItems, {...productToAdd, quantity:1}]

};


export const CartContext = createContext({
            isCartOpen: false,
            setIsCartOpen: () =>{},
            cartItems: [],
            addItemToCart: () => {},
            cartCount:0,
    });

    
export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems ] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce(
                (total,cartItem)=> total + cartItem.quantity,
                0
            );
            setCartCount(newCartCount);
        }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));
    };

    const value = {isCartOpen,setIsCartOpen, addItemToCart, cartItems, cartCount};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}

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

const removeCartItem = (cartItems,removeItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === removeItem.id );

    //Remove the Item from cart if quantity === 1
    if (existingItem.quantity === 1) {
        return cartItems.filter((cartItem)=> cartItem.id !== removeItem.id);
    }

    return cartItems.map((cartItem) => cartItem.id === removeItem.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem);

};

const clearCartItem = (cartItems,clearItem) => {
        return cartItems.filter((cartItem)=> cartItem.id !== clearItem.id);
};


export const CartContext = createContext({
            isCartOpen: false,
            setIsCartOpen: () =>{},
            cartItems: [],
            addItemToCart: () => {},
            removeItemFromCart: () =>{},
            clearItemFromCart: () => {},
            checkoutTotalFromCart: () => {},
            cartCount:0,
            checkoutTotal:0,
    });

    
export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems ] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [checkoutTotal, setCheckoutTotal] = useState(0);

    useEffect(()=>{
        const newCartCount = cartItems.reduce(
                (total,cartItem)=> total + cartItem.quantity,
                0
            );
            setCartCount(newCartCount);
            
        }, [cartItems]);

        useEffect(() => {
            const newCheckoutTotal = cartItems.reduce(
                (checkoutTotal,cartItem) => checkoutTotal + (cartItem.quantity*cartItem.price),
                0
            );
            setCheckoutTotal(newCheckoutTotal);
            
        }, [cartItems]);
   

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));
    };

    const removeItemFromCart = (removeItem) => {
        setCartItems(removeCartItem(cartItems,removeItem));
    }

    const clearItemFromCart = (clearItem) => {
        setCartItems(clearCartItem(cartItems,clearItem));
    }

    const value = {isCartOpen,setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, clearItemFromCart, cartCount, checkoutTotal};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}
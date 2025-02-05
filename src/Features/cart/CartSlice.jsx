import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
    cartItems: [],
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 500,
    tax: 0,
    orderTotal: 0,
};

const getCartFromLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    return cart ? cart : defaultState;
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: getCartFromLocalStorage(),
    reducers: {
        addItem: (state, action) => {
            const { product } = action.payload;
               // Ensure product.amount is a valid number
            const amount = product.amount || 1;

            const existingItem = state.cartItems.find((i) => i.cartID === product.cartID);

            if (existingItem) {
                existingItem.amount += product.amount || 1;
            } else {
                const cartID = product.cartID || `${product.productID || "product"}-${Date.now()}`;
                state.cartItems.push({ ...product, amount: product.amount || 1, cartID });
            }

            // Update numItemsInCart safely
            state.numItemsInCart = state.cartItems.reduce(
                (total, item) => total + (item.amount || 0),
                0
            );

            state.cartTotal = state.cartItems.reduce((total, item) => {
                console.log('Item Price:', item.price, 'Item Amount:', item.amount);
                return total + item.price * item.amount;
              }, 0);
              
              cartSlice.caseReducers.calculateTotals(state); // Ensure totals are recalculated
              localStorage.setItem('cart', JSON.stringify(state));
              toast.success('Item added to cart');
        },

        clearCart: (state) => {
            localStorage.setItem('cart', JSON.stringify(defaultState));
            return defaultState;
        },
        removeItem: (state, action) => {
            const { cartID } = action.payload;
            const product = state.cartItems.find((i) => i.cartID === cartID);
          
            if (!product) {
              console.error("Product not found for cartID:", cartID);
              return;
            }
          
            state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
            state.numItemsInCart -= product.amount;
            state.cartTotal -= product.price * product.amount;
          
            cartSlice.caseReducers.calculateTotals(state);
            toast.error('Item removed from cart');
          },
          
          editItem: (state, action) => {
            const { cartID, amount } = action.payload;
            const item = state.cartItems.find((i) => i.cartID === cartID);
          
            if (!item) {
              console.error("Item not found for cartID:", cartID);
              return;
            }
          
            state.numItemsInCart += amount - item.amount;
            state.cartTotal += item.price * (amount - item.amount);
            item.amount = amount;
          
            cartSlice.caseReducers.calculateTotals(state);
            toast.success('Cart updated');
          },
          
        calculateTotals: (state) => {
            state.tax = 0.1 * state.cartTotal;
            state.orderTotal = state.cartTotal + state.shipping + state.tax;
            localStorage.setItem('cart', JSON.stringify(state));
        },
    },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;
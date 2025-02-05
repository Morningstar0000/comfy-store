import { useSelector } from 'react-redux';
import CartItems from './CartItems';

const CartItemsList = () => {
  const cartItems = useSelector((state) => state.cartState.cartItems);
  console.log("Cart Items:", cartItems);
cartItems.forEach(item => console.log("Cart Item ID:", item.cartID));

  return (
    <>
      {cartItems.map((item) => {
        return <CartItems key={item.cartID} cartItem={item} />;
      })}
    </>
  );
};
export default CartItemsList;
import React from 'react'
import Button from '../Button/Button'
import './Cart.css'

function Cart({ cartItems, onCheckout }) {

  const totalPrice = cartItems.reduce((a, c) => a + 1 * c.quantity, 0)

  return (
    <div className='cart_container'>
      {cartItems.length === 0 ? "No items in cart. " : ""}
      <br /> {cartItems.length === 0 ? "" : <span className=''>Total Price: ${totalPrice.toFixed(2)}</span>}
      <Button
        title={`${cartItems.length === 0 ? "Try it !" : "Play"}`}
        type={"checkout"}
        disable={cartItems.length === 0 ? true : false}
        onClick={onCheckout}
      />
    </div>
  )
}

export default Cart

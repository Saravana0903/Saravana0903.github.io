// Write your code here

import {Component} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

class CartSummary extends Component {
  render() {
    return (
      <CartSummary.Consumer>
        {value => {
          const {cartList} = value
          const calOrderSum = () => {
            let sum = 0
            cartList.forEach(item => {
              sum += item.price * item.quantity
            })
            return sum
          }
          const itemsCount = () => {
            if (cartList.length === 0) {
              return 'No items in Cart'
            }
            return `${cartList.length} items in Cart`
          }
          return (
            <div className="cart-summary">
              <div className="order-con">
                <p>Order Total:</p>
                <p>Rs {this.calOrderSum()}/-</p>
              </div>
              <div>
                <p>{this.itemsCount()}</p>
              </div>
              <button className="btn btn-primary">Checkout</button>
            </div>
          )
        }}
      </CartSummary.Consumer>
    )
  }
}
export default CartSummary

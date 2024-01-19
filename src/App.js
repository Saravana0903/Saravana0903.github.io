import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const idx = cartList.findIndex(pro => pro.id === id)
    cartList.splice(idx, 1)
    this.setState({cartList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const idx = cartList.findIndex(pro => pro.id === id)
    const pro = cartList[idx]
    pro.quantity += 1
    cartList.splice(idx, 1, pro)
    this.setState({cartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const idx = cartList.findIndex(pro => pro.id === id)
    const pro = cartList[idx]
    pro.quantity -= 1
    if (pro.quantity === 0) {
      cartList.splice(idx, 1)
    } else {
      cartList.splice(idx, 1, pro)
    }
    this.setState({cartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const idx = cartList.findIndex(each => each.id === product.id)
    if (idx === -1) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
      //   TODO: Update the code here to implement addCartItem
    } else {
      const newPro = product
      newPro.quantity = product.quantity + cartList[idx].quantity
      cartList.splice(idx, 1, newPro)
      this.setState({cartList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

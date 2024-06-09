import React, { useState, useContext, useEffect } from "react"
import classes from "../cart/Cart.module.scss"
import SearchField from "../../components/searchField/SearchField"
import Nav from "../../components/nav/Nav"
import axios from "axios"
import { useParams } from "react-router-dom"
import { MyCart } from "../../App"
import { Value } from "sass"

function Cart() {
  const [visible, setVisible] = useState(false)
  const { cart } = useContext(MyCart)

  const uniqueArr = cart.filter((item, index) => cart.indexOf(item) === index)

  function countItem(value) {
    return cart.reduce(
      (count, current) => (current === value ? count + 1 : count),
      0
    )
  }

  function totalPrice(item) {
    return item.saleInfo?.retailPrice?.amount * countItem(item)
  }

  return (
    <div className={classes.cartWrapper}>
      <Nav visible={visible} setVisible={setVisible} />
      <SearchField />
      <h1 className={classes.title}>Корзина</h1>
      {uniqueArr.map((item) => (
        <div key={item.id} className={classes.cartItem}>
          <h2 className={classes.itemTitle}>{item.volumeInfo?.title}</h2>
          <p className={classes.itemQuantity}>Кол-во: {countItem(item)}</p>
          <p className={classes.itemPrice}>Стоимость: {totalPrice(item)}</p>
        </div>
      ))}
    </div>
  )
}
export default Cart

import React, { useState, useContext, useEffect } from 'react'
import classes from '../cart/Cart.module.scss'
import SearchField from '../../components/searchField/SearchField'
import Nav from '../../components/nav/Nav'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { MyCart } from '../../App'
import { Value } from 'sass'

function Cart() {
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
      <h1>Корзина</h1>
      {uniqueArr.map((item) => (
        <div>
          <h1>{item.volumeInfo?.title}</h1>
          <h1>Кол-во: {countItem(item)}</h1>
          <h1>Стоимость:{totalPrice(item)}</h1>
        </div>
      ))}
    </div>
  )
}
export default Cart

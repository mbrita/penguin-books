import React, { useState, useContext } from "react"
import classes from "../cart/Cart.module.scss"
import classNames from "classnames"
import SearchField from "../../components/searchField/SearchField"
import Nav from "../../components/nav/Nav"
import { MyCart } from "../../App"
import Plus from "../../assets/cart/plus.svg"
import Cross from "../../assets/cart/cross.svg"
import { Link } from "react-router-dom"
function Cart() {
  const [visible, setVisible] = useState(false)
  const [visibleInputs, setVisibleInputs] = useState({
    promo: true,
    giftCard: true,
    discountCard: true,
  })

  const { cart, setCart } = useContext(MyCart)

  const uniqueArr = cart.filter((item, index) => cart.indexOf(item) === index)

  function countItem(value) {
    return cart.reduce(
      (count, current) => (current === value ? count + 1 : count),
      0
    )
  }

  function totalPrice(item) {
    if (
      item.saleInfo?.retailPrice?.amount &&
      !isNaN(item.saleInfo.retailPrice.amount)
    ) {
      return item.saleInfo.retailPrice.amount * countItem(item)
    } else {
      return 0
    }
  }

  function cartPrice() {
    return cart.reduce((total, item) => total + totalPrice(item), 0)
  }
  function quantityItems() {
    return cart.length
  }
  function openInpt(input) {
    setVisibleInputs((prevState) => ({
      ...prevState,
      [input]: !prevState[input],
    }))
  }

  function deleteItem(index) {
    return setCart(
      uniqueArr.filter((item, i, arr) => arr.indexOf(item) !== index)
    )
  }

  return (
    <div className={classes.cartWrapper}>
      <Nav visible={visible} setVisible={setVisible} />
      <SearchField />
      <h1 className={classes.title}>Корзина</h1>
      <div className={classes.container}>
        <div className={classes.cartItems}>
          {uniqueArr.length > 0 ? (
            uniqueArr.map((item, index) => (
              <div key={item.id} className={classes.cartItem}>
                <div>
                  <img src={item.volumeInfo.imageLinks.smallThumbnail} alt="" />
                </div>
                <div className={classes.cartItemContent}>
                  <Link to={`/book/${item.id}`} className={classes.itemLink}>
                    <h2 className={classes.itemTitle}>
                      {item.volumeInfo?.title}
                    </h2>
                  </Link>

                  <p className={classes.itemQuantity}>
                    Кол-во: {countItem(item)}
                  </p>
                  <p className={classes.itemPrice}>
                    Стоимость: {totalPrice(item)}
                  </p>
                </div>
                <img
                  key={index}
                  src={Cross}
                  alt=""
                  className={classes.deleteImg}
                  onClick={() => deleteItem(index)}
                />
              </div>
            ))
          ) : (
            <p>Вы не выбрали ни одной книги</p>
          )}
        </div>

        <div className={classes.totalPriceContainer}>
          <p className={classes.totalPriceText}>Сумма заказа: {cartPrice()} </p>
          <div className={classes.discountContainer}>
            <div className={classes.discountItem}>
              <div className={classes.inputWithIcon}>
                <p>Промокод</p>
                <img
                  src={Plus}
                  alt="Добавить"
                  className={classes.icon}
                  onClick={() => openInpt("promo")}
                />
              </div>
              <input
                type="text"
                className={classNames(
                  classes.discountInput,
                  !visibleInputs.promo && classes.discountInputActive
                )}
              />
            </div>
            <div className={classes.discountItem}>
              <div className={classes.inputWithIcon}>
                <p>Подарочный сертификат</p>
                <img
                  src={Plus}
                  alt="Добавить"
                  className={classes.icon}
                  onClick={() => openInpt("giftCard")}
                />
              </div>

              <input
                type="text"
                className={classNames(
                  classes.discountInput,
                  !visibleInputs.giftCard && classes.discountInputActive
                )}
              />
            </div>
            <div className={classes.discountItem}>
              <div className={classes.inputWithIcon}>
                <p>Скидочная карта</p>
                <img
                  src={Plus}
                  alt="Добавить"
                  className={classes.icon}
                  onClick={() => openInpt("discountCard")}
                />
              </div>
              <input
                type="text"
                className={classNames(
                  classes.discountInput,
                  !visibleInputs.discountCard && classes.discountInputActive
                )}
              />
            </div>
          </div>
          <div className={classes.finalPriceContainer}>
            <p className={classes.finalPriceText}>Итого: {cartPrice()}</p>
            <p className={classes.finalPriceAmount}>Кол-во:{quantityItems()}</p>
          </div>
          <button className={classes.orderButton}>Оформить заказ</button>
        </div>
      </div>
    </div>
  )
}

export default Cart

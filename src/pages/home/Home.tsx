import React, { useState, useEffect, useContext } from 'react'
import Nav from '../../components/nav/Nav'
import classes from '../home/Home.module.scss'
import axios from 'axios'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Bookmark from '../../assets/contentItem/bookmark.svg'
import Cart from '../../assets/cart/cart.svg'
import ArrowRight from '../../assets/contentItem/arrowRight.png'
import ArrowLeft from '../../assets/contentItem/arrowLeft.png'
import SearchField from '../../components/searchField/SearchField'
import { FavoriteBookContext } from '../../App'
import { MyCart } from '../../App'
import Carousel from '../../components/carousel/Carousel'

function Home() {
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <div className={classes.pageContainer}>
      <Nav visible={visible} setVisible={setVisible} />
      <div className={classes.searchField}>
        <SearchField />
      </div>
      <div className={classes.contentContainer}></div>
      <Carousel />
    </div>
  )
}

export default Home

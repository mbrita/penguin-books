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
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Swiper as SwiperType } from 'swiper'

function Home() {
  const [books, setBooks] = useState<any[]>([])
  const [popularBooks, setPopularBooks] = useState<any[]>([])
  const [previousValue, setPreviousValue] = useState<any[]>([])
  const [newBooks, setNewBooks] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeBtn, setACtiveBtn] = useState(false)
  const [visible, setVisible] = useState<boolean>(false)

  const popularBookApi = async () => {
    const responce = await axios(
      'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&key=AIzaSyBTpPuZir6oCiyUril5eBdKo0_dr91yAh0'
    )
    setPopularBooks(responce.data.items)
  }

  const bookApi = async () => {
    const responce = await axios(
      'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&key=AIzaSyBTpPuZir6oCiyUril5eBdKo0_dr91yAh0'
    )
    setNewBooks(responce.data.items)
    setBooks(responce.data.items)
  }

  useEffect(() => {
    bookApi()
    popularBookApi()
  }, [])

  const showNewBooks = () => {
    setPreviousValue(books)
    setBooks(newBooks)
    setCurrentIndex(0)
  }

  const showPopularBooks = () => {
    setPreviousValue(books)
    setBooks(popularBooks)
    setCurrentIndex(0)
  }
  const handleNext = () => {
    if (currentIndex + 4 < books.length) {
      setCurrentIndex(currentIndex + 1)
    }
  }
  const handleBack = () => {
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(0)
    }
  }
  const visibleBooks = books.slice(currentIndex, currentIndex + 4)

  const { favoriteBook, setFavoriteBook } = useContext(FavoriteBookContext)
  const { cart, setCart } = useContext(MyCart)

  const createIdArray = (book: any) => {
    if (!favoriteBook.includes(book)) {
      const updatedFavoriteBook = [...favoriteBook, book]
      setFavoriteBook(updatedFavoriteBook)
      console.log(updatedFavoriteBook)
    }
  }
  const createCartArr = (book: any) => {
    const updatedCart = [...cart, book]
    setCart(updatedCart)
  }

  return (
    <div className={classes.pageContainer}>
      <Nav visible={visible} setVisible={setVisible} />
      <div className={classes.searchField}>
        <SearchField />
      </div>
      <div className={classes.contentContainer}>
        <div className={classes.bookItemsBtns}>
          <button className={classNames(classes.itemBtn)}>Новинки</button>
          <button className={classes.itemBtn} onClick={showPopularBooks}>
            Хиты
          </button>
          <div>
            <button className={classes.itemBtn} onClick={handleBack}>
              <img src={ArrowLeft} alt="" />
            </button>
            <button className={classes.itemBtn} onClick={handleNext}>
              <img src={ArrowRight} alt="" />
            </button>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation={{ clickable: true }}
          onSwiper={(swiper: SwiperType) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          className={classes.bookItems}
        >
          {visibleBooks.map((book: any, i: number) => (
            <SwiperSlide key={i}>
              <div className={classes.imgs}>
                <img
                  src={Bookmark}
                  alt="Bookmark"
                  className={classes.bookmark}
                  onClick={() => createIdArray(book)}
                />
              </div>
              <div className={classes.bookImgs}>
                <Link to={`/book/${book.id}`}>
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt=""
                    className={classes.bookImg}
                  />
                </Link>
              </div>
              <h5>{book.volumeInfo.authors}</h5>
              <h3>{book.volumeInfo.title}</h3>
              <h3>
                {book?.saleInfo?.retailPrice?.amount
                  ? book.saleInfo.retailPrice.amount
                  : 'Не для продажи'}
                {book?.saleInfo?.retailPrice?.currencyCode
                  ? book.saleInfo.retailPrice.currencyCode
                  : ''}
              </h3>
              <img
                src={Cart}
                alt="Cart"
                className={classes.cart}
                onClick={() => createCartArr(book)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default Home

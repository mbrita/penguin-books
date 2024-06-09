import React, { useState, useEffect, useContext } from 'react'
import classes from './Carousel.module.scss'
import axios from 'axios'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Star from '../../assets/contentItem/star.svg'
import Cart from '../../assets/contentItem/cart.svg'
import ArrowRight from '../../assets/contentItem/arrowRight.png'
import ArrowLeft from '../../assets/contentItem/arrowLeft.png'
import SearchField from '../searchField/SearchField'
import { FavoriteBookContext } from '../../App'
import { MyCart } from '../../App'

const Carousel: React.FC = () => {
  const [books, setBooks] = useState<any[]>([])
  const [popularBooks, setPopularBooks] = useState<any[]>([])
  const [newBooks, setNewBooks] = useState<any[]>([])
  const [currentNewIndex, setCurrentNewIndex] = useState<number>(0);
  const [currentPopularIndex, setCurrentPopularIndex] = useState<number>(0);

  const popularBookApi = async () => {
    const response = await axios.get(
      'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&key=AIzaSyBTpPuZir6oCiyUril5eBdKo0_dr91yAh0'
    )
    setPopularBooks(response.data.items)
  }

  const bookApi = async () => {
    const response = await axios.get(
      'https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=newest&key=AIzaSyBTpPuZir6oCiyUril5eBdKo0_dr91yAh0'
    )
    setNewBooks(response.data.items)
  }

  useEffect(() => {
    bookApi()
    popularBookApi()
  }, [])

  const handleBackNew = () => {
    if (currentNewIndex - 1 >= 0) {
      setCurrentNewIndex(currentNewIndex - 1);
    }
  };
  const handleNextNew = () => {
    if (currentNewIndex + 4 < newBooks.length) {
      setCurrentNewIndex(currentNewIndex + 1);
    }
  };

  const handleNextPopular = () => {
    if (currentPopularIndex + 4 < popularBooks.length) {
      setCurrentPopularIndex(currentPopularIndex + 1);
    }
  };

  const handleBackPopular = () => {
    if (currentPopularIndex - 1 >= 0) {
      setCurrentPopularIndex(currentPopularIndex - 1);
    }
  };


  const { favoriteBook, setFavoriteBook } = useContext(FavoriteBookContext)
  const { cart, setCart } = useContext(MyCart)

  const createIdArray = (book: any) => {
    if (!favoriteBook.includes(book)) {
      const updatedFavoriteBook = [...favoriteBook, book]
      setFavoriteBook(updatedFavoriteBook)
    }
  }

  const createCartArr = (book: any) => {
    const updatedCart = [...cart, book]
    setCart(updatedCart)
  }

  return (
    <div className={classes.carouselContainer}>
      <div className={classes.buttonsContainer}>
        <button className={classes.button} onClick={ handleBackNew}>
          <img src={ArrowLeft} alt="Back" />
        </button>
        <div>
          <button className={classes.button}>Новинки</button>
        </div>
        <button className={classes.button} onClick={handleNextNew}>
          <img src={ArrowRight} alt="Next" />
        </button>
      </div>

      <div className={classes.booksContainer}>
        {newBooks.slice(currentNewIndex, currentNewIndex + 4).map((book, i) => (
          <div key={i} className={classNames(classes.bookItem)}>
            <Link to={`/book/${book.id}`} className={classes.link}>
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                className={classes.bookCover}
              />
            </Link>
            <div className={classes.description}>
              <p className={classes.authors}>{book.volumeInfo.authors}</p>
              <p className={classes.title}>{book.volumeInfo.title}</p>
              <p className={classes.price}>
                {book?.saleInfo?.retailPrice?.amount
                  ? book.saleInfo.retailPrice.amount
                  : 'Не для продажи'}
                {book?.saleInfo?.retailPrice?.currencyCode
                  ? book.saleInfo.retailPrice.currencyCode
                  : ''}
              </p>
            </div>
            <div className={classes.imgs}>
              <img
                src={Star}
                alt="Bookmark"
                className={classes.icon}
                onClick={() => createIdArray(book)}
              />
              <img
                src={Cart}
                alt="Cart"
                className={classes.icon}
                onClick={() => createCartArr(book)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={classes.buttonsContainer}>
        <button className={classes.button} onClick={handleBackPopular }>
          <img src={ArrowLeft} alt="Back" />
        </button>
        <div>
          <button className={classes.button}>Классика</button>
        </div>
        <button className={classes.button} onClick={handleNextPopular }>
          <img src={ArrowRight} alt="Next" />
        </button>
      </div>
      <div className={classes.booksContainerGrid}>
        {popularBooks.slice(currentPopularIndex,currentPopularIndex + 3).map((book, i) => (
          <div key={i} className={classNames(classes.bookItem)}>
            <Link to={`/book/${book.id}`} className={classes.link}>
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                className={classes.bookCover}
              />
            </Link>
            <div className={classes.description}>
              <p className={classes.authors}>{book.volumeInfo.authors}</p>
              <p className={classes.title}>{book.volumeInfo.title}</p>
              <p className={classes.price}>
                {book?.saleInfo?.retailPrice?.amount
                  ? book.saleInfo.retailPrice.amount
                  : 'Не для продажи'}
                {book?.saleInfo?.retailPrice?.currencyCode
                  ? book.saleInfo.retailPrice.currencyCode
                  : ''}
              </p>
            </div>
            <div className={classes.imgs}>
              <img
                src={Star}
                alt="Bookmark"
                className={classes.icon}
                onClick={() => createIdArray(book)}
              />
              <img
                src={Cart}
                alt="Cart"
                className={classes.icon}
                onClick={() => createCartArr(book)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Carousel

import React, { useState, useEffect } from 'react'
import Nav from '../../components/nav/Nav'
import classes from '../home/Home.module.scss'
import axios from 'axios'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Bookmark from '../../assets/contentItem/bookmark.svg'
import ArrowRight from '../../assets/contentItem/arrowRight.png'
import ArrowLeft from '../../assets/contentItem/arrowLeft.png'
import SearchField from '../../components/searchField/SearchField'
import Modal from '../../components/modal/Modal'
import Footer from '../../components/footer/Footer'
import { title } from 'process'
import Context from '../Context'
import { Value } from 'sass'

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

  const handleClick = () => {
    setACtiveBtn(!activeBtn)
    showNewBooks()
  }

  const value = 'что-то'

  return (
    <Context.Provider value={Value}>
      <div className={classes.pageContainer}>
        <Nav visible={visible} setVisible={setVisible} />
        <div className={classes.searchField}>
          <SearchField />
        </div>
        <div className={classes.contentContainer}>
          <div className={classes.bookItemsBtns}>
            <button
              onClick={handleClick}
              className={classNames(
                classes.itemBtn,
                !activeBtn && classes.itemBtnActive
              )}
            >
              Новинки
            </button>
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
          <div className={classes.bookItems}>
            {visibleBooks.map((book: any, i: number) => (
              <div className={classes.bookItem} key={i}>
                <img src={Bookmark} alt="" className={classes.bookmark} />
                <div className={classes.bookImgs}>
                  <Link to="/book">
                    <img
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt=""
                      className={classes.bookImg}
                    />
                  </Link>
                </div>
                <h5>{book.volumeInfo.authors}</h5>
                <h3>{book.volumeInfo.title}</h3>
              </div>
            ))}
          </div>
        </div>
        {/* <Footer/> */}
      </div>
    </Context.Provider>
  )
}

export default Home

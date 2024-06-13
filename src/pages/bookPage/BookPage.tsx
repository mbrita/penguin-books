import React, { useEffect, useState, useContext } from 'react'
import Nav from '../../components/nav/Nav'
import SearchField from '../../components/searchField/SearchField'
import classes from '../bookPage/BookPage.module.scss'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Ibook } from '../../types/types'
import { Header } from '../../components/Header/Header'
import { MyCart } from '../../App'
import { FavoriteBookContext } from '../../App'
const BookPage: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<Ibook>()
  const [] =  useState<boolean>(false)
  const { id } = useParams()
  const { cart, setCart } = useContext(MyCart)
  const { favoriteBook, setFavoriteBook } = useContext(FavoriteBookContext)

  const selectedBooks = async () => {
    const responce = await axios(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyBTpPuZir6oCiyUril5eBdKo0_dr91yAh0`
    )
    console.log(responce.data)
    setSelectedBook(responce.data)
  }

  useEffect(() => {
    if (id) {
      selectedBooks()
    } else {
    }
  }, [id])

  const createCartArr = (book: any) => {
    const updatedCart = [...cart, book]
    setCart(updatedCart)
  }

  const createIdArray = (book: any) => {
    if (!favoriteBook.includes(book)) {
      const updatedFavoriteBook = [...favoriteBook, book]
      setFavoriteBook(updatedFavoriteBook)
    }
  }
  return (
    <div className={classes.pageWrapper}>
     <Header/>
     <>      <div className={classes.bookPageContent}>
        <h1>{selectedBook?.volumeInfo?.title}</h1>
        <h2>Автор: {selectedBook?.volumeInfo?.authors}</h2>
        <div>
          <img
            src={selectedBook?.volumeInfo?.imageLinks?.thumbnail}
            alt=""
            className={classes.bpImg}
          />
        </div>
        <p
          dangerouslySetInnerHTML={{
            __html: selectedBook?.volumeInfo?.description || '',
          }}
          className={classes.bpDesc}
        ></p>
      </div>
      <div className={classes.pageBtns}> <button className={classes.pageBtn}>Читать отрывок</button>
      <button className={classes.pageBtn} onClick={()=>createCartArr(selectedBook)}>Купить</button>
      <button className={classes.pageBtn} onClick={()=>createIdArray (selectedBook)}>Избранное</button>
      <div className={classes.bookSnippet}>{selectedBook?.searchInfo?.textSnippet || 'отрывок не найден'} </div></div>
      </>

    </div>
  )
}

export default BookPage

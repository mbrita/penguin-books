import React, { useState, useContext, useEffect } from 'react'
import classes from './FavoriteBooks.module.scss'
import SearchField from '../../components/searchField/SearchField'
import Nav from '../../components/nav/Nav'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { FavoriteBookContext } from '../../App'

function FavoriteBooks() {
  const [visible, setVisible] = useState<boolean>(false)
  const { favoriteBook } = useContext(FavoriteBookContext)
  console.log(favoriteBook)
  return (
    <div className={classes.favBooksWrapper}>
      <Nav visible={visible} setVisible={setVisible} />
      <SearchField />
      <h1>Мои любимые книги</h1>
      <div>
        {favoriteBook.length > 0 ? (
          favoriteBook.map((book: any, index: number) => (
            <div key={index} className="book">
              {book.volumeInfo?.imageLinks && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt="Обложка книги"
                />
              )}
              {book.volumeInfo?.title && <h2>{book.volumeInfo.title}</h2>}
              {book.volumeInfo.authors && (
                <p>Авторы: {book.volumeInfo.authors.join(', ')}</p>
              )}
            </div>
          ))
        ) : (
          <p>Загрузка...</p>
        )}
      </div>
    </div>
  )
}
export default FavoriteBooks

import React, { useState, useContext} from 'react'
import classes from './FavoriteBooks.module.scss'
import { Header } from '../../components/Header/Header'
import { FavoriteBookContext } from '../../App'
import { Link } from 'react-router-dom'

function FavoriteBooks() {

  const { favoriteBook } = useContext(FavoriteBookContext)

  return (
    <div className={classes.favBooksWrapper}>
      <Header/>
      <h1 className={classes.title}>Мои любимые книги</h1>
      <div className={classes.booksContainer}>
        {favoriteBook.length > 0 ? (
          favoriteBook.map((book: any, index: number) => (
            <Link to={`/book/${book.id}`} key={index} className={classes.book}>
              {book.volumeInfo?.imageLinks && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt="Обложка книги"
                  className={classes.bookCover}
                />
              )}
              {book.volumeInfo?.title && (
                <h2 className={classes.bookTitle}>{book.volumeInfo.title}</h2>
              )}
              {book.volumeInfo.authors && (
                <p className={classes.bookAuthors}>
                  Авторы: {book.volumeInfo.authors.join(', ')}
                </p>
              )}
            </Link>
          ))
        ) : (
          <p className={classes.noBooks}>Нет любимых книг...</p>
        )}
      </div>
    </div>
  )
}
export default FavoriteBooks

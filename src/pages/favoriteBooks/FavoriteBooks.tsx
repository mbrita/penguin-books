import React, { useState, useContext, useEffect } from 'react'
import classes from './FavoriteBooks.module.scss'
import SearchField from '../../components/searchField/SearchField'
import Nav from '../../components/nav/Nav'
import { FavoriteBookContext } from '../../App'

function FavoriteBooks() {
  const [visible, setVisible] = useState<boolean>(false)
  const { favoriteBook } = useContext(FavoriteBookContext)

  return (
    <div className={classes.favBooksWrapper}>
      <Nav visible={visible} setVisible={setVisible} />
      <SearchField />
      <h1 className={classes.title}>Мои любимые книги</h1>
      <div className={classes.booksContainer}>
        {favoriteBook.length > 0 ? (
          favoriteBook.map((book: any, index: number) => (
            <div key={index} className={classes.book}>
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
            </div>
          ))
        ) : (
          <p className={classes.noBooks}>Нет любимых книг...</p>
        )}
      </div>
    </div>
  )
}
export default FavoriteBooks

import React, { FC, useState, useEffect } from 'react'
import axios from 'axios'
import classNames from 'classnames'
import classes from './SearchField.module.scss'
import Basket from '../../assets/searchField/basket.png'
import Bookmark from '../../assets/searchField/bookmark.svg'
import Person from '../../assets/searchField/person.png'
import { Link } from 'react-router-dom'
const SearchField = () => {
  const [searchBooks, setSearchBooks] = useState<string>('')
  const [popularBooks, setPopularBooks] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const popularBookApi = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchBooks}&key=AIzaSyBTpPuZir6oCiyUril5eBdKo0_dr91yAh0`
      )
      setPopularBooks(response.data.items)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (searchBooks) {
      popularBookApi()
    }
  }, [searchBooks])

  const filtredBooks =
    searchBooks.trim() !== ''
      ? popularBooks.filter(
          (book) =>
            book.volumeInfo.title
              .toLowerCase()
              .includes(searchBooks.toLowerCase()) ||
            book.volumeInfo.authors?.some((author: string) =>
              author.toLocaleLowerCase().includes(searchBooks.toLowerCase())
            )
        )
      : popularBooks

  return (
    <>
      <div className={classes.SearchFieldWrapper}>
        <div className={classes.SearchFieldBtn}>
          <p>Каталог</p>
        </div>
        <div>
          <input
            type="text"
            placeholder="Поиск на полках"
            className={classes.SearchFieldInpt}
            onChange={(e) => setSearchBooks(e.target.value)}
          />
          <div className={classes.bookSearch}>
            <div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                searchBooks.length > 0 &&
                filtredBooks.map((book: any, index: number) => (
                  <Link
                    to={`/book/${book.id}`}
                    className={classes.bookSearchItem}
                    key={book.id}
                  >
                    <img src={book.volumeInfo.imageLinks?.thumbnail} alt="" />
                    <h3>{book.volumeInfo.title}</h3>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
        <div className={classes.icons}>
          <Link to="/cart" className={classes.iconsBtn}>
            <button className={classes.iconsBtn}>
              <img src={Basket} alt="" className={classes.iconImg} />
            </button>
          </Link>
          <Link to="/favbooks">
            <button className={classes.iconsBtn}>
              <img src={Bookmark} alt="" className={classes.iconImg} />
            </button>
          </Link>
          <button className={classes.iconsBtn}>
            <img src={Person} alt="" className={classes.iconImg} />
          </button>
        </div>
      </div>
    </>
  )
}

export default SearchField

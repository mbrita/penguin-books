import React, { useEffect, useState } from 'react'
import Nav from '../../components/nav/Nav'
import SearchField from '../../components/searchField/SearchField'
import classes from '../bookPage/BookPage.module.scss'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Ibook } from '../../types/types';

const BookPage: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [selectedBook, setSelectedBook] = useState<Ibook>()
  const { id } = useParams();
  
  const selectedBooks= async () => {
    const responce = await axios(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyBTpPuZir6oCiyUril5eBdKo0_dr91yAh0`
    )
     setSelectedBook(responce.data)
  }


  useEffect(() => {
    selectedBooks()
  }, [])


  return (
      <div className={classes.pageWrapper}>
        <Nav visible={visible} setVisible={setVisible} />
        <SearchField />
        <div className={classes.bookPageContent}>
        <div>{selectedBook?.volumeInfo.title}</div>
        </div>
      </div>
  )
}

export default BookPage

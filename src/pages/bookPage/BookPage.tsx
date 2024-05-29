import React, { useState } from 'react'
import Nav from '../../components/nav/Nav'
import SearchField from '../../components/searchField/SearchField'
import classes from '../bookPage/BookPage.module.scss'


const BookPage: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false)

  return (
      <>
        <Nav visible={visible} setVisible={setVisible} />
        <SearchField />
        <div className={classes.bookPageContent}>
          <h1></h1>
          <p></p>
        </div>
      </>
  )
}

export default BookPage

import React from 'react'
import classNames from 'classnames'
import classes from './SearchField.module.scss'
import Basket from '../../assets/searchField/basket.png'
import Bookmark from '../../assets/searchField/bookmark.svg'
import Person from '../../assets/searchField/person.png'
function SearchField() {
  return (
    <div className={classes.SearchFieldWrapper}>
      <div className={classes.SearchFieldBtn}>
        <p>Каталог</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Поиск на полках"
          className={classes.SearchFieldInpt}
        />
      </div>
      <div className={classes.icons}>
        <button className={classes.iconsBtn}>
          <img src={Basket} alt="" className={classes.iconImg} />
        </button>
        <button className={classes.iconsBtn}>
          <img src={Bookmark} alt="" className={classes.iconImg} />
        </button>
        <button className={classes.iconsBtn}>
          <img src={Person} alt="" className={classes.iconImg} />
        </button>
      </div>
    </div>
  )
}

export default SearchField

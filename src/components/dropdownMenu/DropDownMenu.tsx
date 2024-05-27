import React from 'react'
import classes from './DropDownMenu.module.scss'
import DropDownItems from '../dropdownMenu/DropDownItems'
import { Link } from 'react-router-dom'
function DropDownMenu() {
  return (
    <div className={classes.menuWrapper}>
      {DropDownItems.map((item, i) => (
        <div className={classes.categoriesWrapper} key={i}>
          {item.items.map((el, j) => (
            <div className={classes.topic} key={j}>
              <h1>{el.title}</h1>
              <Link to={el.link} className={classes.customList}>
                {el.categories &&
                  el.categories
                    .filter((category: string | null) => category !== null)
                    .map((e, k: number) => <li key={k}> {e}</li>)}
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
export default DropDownMenu

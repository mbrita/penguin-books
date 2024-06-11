import { useState } from 'react'
import Nav from '../nav/Nav'
import SearchField from '../searchField/SearchField'
import classes from './Header.module.scss'

export const Header = ()=>{
  const [activeMenu, setActiveMenu] = useState(true)
    return(
        <div className={classes.wrapper} >
        <Nav activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <SearchField activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        </div>
    )
}

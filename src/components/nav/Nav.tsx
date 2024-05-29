import React, { useState, useEffect, FC } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/nav/logoOG.png'
import NavLinks from './NavLinks'
import classes from './Nav.module.scss'
import Modal from '../modal/Modal'
import SearchField from '../../components/searchField/SearchField'

interface INav {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const Nav: FC<INav> = ({ visible, setVisible}) => {

const [selectCity, setSelectCity] = useState<string>('Санкт-Петербург')


  return (
    <div className={classes.navWrapper}>
      <div>
        <img src={Logo} alt="Logo" className={classes.navLogo} />
      </div>
      <div className={classes.navContent}>
        <div
          className={classes.citySelector}
          onClick={() => setVisible(!visible)}
        >
          {selectCity} 
        </div>

        <div className={classes.navLinksContainer}>
          {NavLinks.map((link, i) => (
            <Link to={link.link} className={classes.navLink} key={i}>
              {link.title}
            </Link>
          ))}
        </div>
      </div>
      <Modal selectCity={selectCity} setSelectCity={setSelectCity} visible={visible} setVisible={setVisible} /> 
    </div>
  )
}

export default Nav

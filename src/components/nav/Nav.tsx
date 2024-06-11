import React, { useState, useEffect, FC } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import Logo from '../../assets/nav/logoOG.png'
import NavLinks from './NavLinks'
import classes from './Nav.module.scss'
import Modal from '../modal/Modal'
import SearchField from '../../components/searchField/SearchField'

interface INav {
  activeMenu: boolean
  setActiveMenu: any
}

const Nav: FC<INav> = ({activeMenu,setActiveMenu}) => {
  const [selectCity, setSelectCity] = useState<string>('Санкт-Петербург')
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <div className={classes.navWrapper}>
      <Link to="/">
        <img src={Logo} alt="Logo" className={classes.navLogo} />
      </Link>
      <div className={classes.navContent}>
        <div
          className={classes.citySelector}
          onClick={() => setVisible(!visible)}
        >
          {selectCity}
        </div>

        <div className={classNames(classes.navLinksContainer, !activeMenu &&  classes.navLinksContainerActive)}>
          {NavLinks.map((link, i) => (
            <Link to={link.link} className={classes.navLink} key={i}>
              {link.title}
            </Link>
          ))}
        </div>
      </div>

      <Modal
        selectCity={selectCity}
        setSelectCity={setSelectCity}
        visible={visible}
        setVisible={setVisible}
      />
    </div>
  )
}

export default Nav

import React from 'react'
import classes from './Nav.module.scss'
import { Link } from 'react-router-dom'
import { title } from 'process'
import { link } from 'fs'
import Logo from '../../assets/nav/logo.png'
import Fb from '../../assets/nav/facebook.png'
import Inst from '../../assets/nav/inst.png'
import X from '../../assets/nav/x.png'
import Yt from '../../assets/nav/youtube.png'
import Search from '../../assets/nav/search.png'
const navItems = [
  {
    title: 'Features',
    link: '/',
    img: null,
  },
  {
    title: 'Books',
    link: '/',
    img: null,
  },
  {
    title: 'Authors',
    link: '/',
    img: null,
  },
  {
    title: 'About Us',
    link: '/',
    img: null,
  },
  {
    title: 'Penguin Shop',
    link: '/',
    img: null,
  },
  { title: null, link: '/', img: Logo, height: '100px', width: '100px' },
]

const icons = [
  { title: null, link: '/', img: Fb },
  { title: null, link: '/', img: Inst },
  { title: null, link: '/', img: X },
  { title: null, link: '/', img: Yt },
]

function Nav() {
  return (
    <div className={classes.wrapper}>
      {navItems.map((item, index) => (
        <Link to={item.link} className={classes.iconsLink}>
          {item.title}
        </Link>
      ))}
      <img src={Logo} alt="" className={classes.logoImg} />
      {icons.map((icon) => (
        <div>
          <img src={icon.img} alt="" className={classes.iconImg} />
        </div>
      ))}
      <div className={classes.inptWrapper}>
        <img src={Search} alt="" className={classes.inptIcon} />
        <input type="text" placeholder="Search" className={classes.inpt} />
      </div>
    </div>
  )
}
export default Nav

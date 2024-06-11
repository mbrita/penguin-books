import React from 'react'
import classes from '../home/Home.module.scss'
import Carousel from '../../components/carousel/Carousel'
import Footer from '../../components/footer/Footer'
import { Header } from '../../components/Header/Header'


function Home() {

  return (
    <div className={classes.pageContainer}>
      <Header/>
      <div className={classes.contentContainer}></div>
      <Carousel />
      <Footer/>
    </div>
  )
}

export default Home

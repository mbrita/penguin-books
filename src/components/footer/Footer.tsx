import React from "react";
import classNames from "classnames";
import classes from './Footer.module.scss'
import FooteLeft from '../../assets/footer/footer01.png'
import FooteRight from '../../assets/footer/footer02.png'

const Footer = ()=>{
    return (
        <div className={classes.footerWrapper}>
            <div className={classes.footerImgs}>
                <div className={classes.footerImg} >              
                  <img src={FooteLeft} alt="" /></div>
            <div className={classes.footerImg}>
                  <img src={FooteRight} alt=""  /></div>
            </div>
        </div>
    )
}
 export default Footer

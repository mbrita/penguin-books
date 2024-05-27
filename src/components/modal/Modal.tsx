import React, { FC, useEffect, useState } from 'react'
import classes from './Modal.module.scss'
import classNames from 'classnames'
const cities = [
 {name: 'Москва',  adress: 'Москва, Литейный пр., 57'},
 {name: 'Казань',  adress: 'Казань, Литейный пр., 57'},
 {name: 'Санкт-Петербург',  adress: 'Санкт-Петербург, Литейный пр., 57'},
 {name: 'Воронеж',  adress:'Воронеж, Литейный пр., 57'},
 {name: 'Екатерингбург',  adress: 'Екатерингбург, Литейный пр., 57'},
 {name: 'Краснодар',  adress: 'Екатерингбург, Литейный пр., 57'},
 {name: 'Красноярск',  adress: 'Екатерингбург, Литейный пр., 57'},
 {name: 'Новосибирск', adress: 'Екатерингбург, Литейный пр., 57'},
 {name: 'Пермь',  adress: 'Екатерингбург, Литейный пр., 57'},
 {name: 'Ростов-на-Дону',  adress: 'Екатерингбург, Литейный пр., 57'},
 {name:  'Самара',  adress: 'Екатерингбург, Литейный пр., 57'},
 {name:  'Сочи',  adress: 'Екатерингбург, Литейный пр., 57'},
 {name:  'Тюмень', adress: 'Екатерингбург, Литейный пр., 57'},
 {name:   'Уфа',  adress: 'Екатерингбург, Литейный пр., 57'},
 {name:  'Рязань', adress: 'Екатерингбург, Литейный пр., 57'},
 {name:  'Тула', adress: 'Екатерингбург, Литейный пр., 57'},
 {name:  'Калининград',  adress: 'Екатерингбург, Литейный пр., 57'},
]

interface IModal {
  visible: boolean
  setVisible: (visible: boolean) => void
}

interface ICity {
  selectCity: string
  setSelectCity: (selectCity: string) => void
}
type Props = IModal & ICity

const Modal: FC<Props> = ({ visible, setVisible,selectCity, setSelectCity  }) => {

const [search, setSearch] =useState('')

const filtredCity = cities.filter(city=>{
  return city.name.toLowerCase().includes(search.toLowerCase())})

  const changeCity = (cityName: string)=>{
    setSelectCity(cityName)
    setVisible(false)
  }

  return (
    <div
      className={classNames(
        classes.modalContent,
        visible && classes.modalContentActive
      )}
    >
      <h2 className={classes.modalTitle}>Выберите город</h2>
      <input
        type="text"
        placeholder="Например: Москва"
        className={classes.modalInput}
        onChange={e=> setSearch(e.target.value)}

      />
      <div  className={classes.cityTags}>
        {filtredCity.map((city) => (
          <div  onClick={()=>changeCity(city.name)}  className={classes.cityTag}>{city.name}</div>
        ))}

      </div>
    </div>
  )
}

export default Modal

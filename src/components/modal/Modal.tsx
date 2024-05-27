import React, { FC, useState } from 'react'
import classes from './Modal.module.scss'
import classNames from 'classnames'
const cities = [
  'Москва',
  'Казань',
  'Санкт-Петербург',
  'Воронеж',
  'Екатерингбург',
  'Краснодар',
  'Красноярск',
  'Новосибирск',
  'Пермь',
  'Ростов-на-Дону',
  'Самара',
  'Сочи',
  'Тюмень',
  'Уфа',
  'Рязань',
  'Тула',
  'Калининград',
]
interface IModal {
  visible: boolean
  setVisible: (visible: boolean) => void
}

const Modal: FC<IModal> = ({ visible, setVisible }) => {
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
      />
      <div className={classes.cityTags}>
        {cities.map((city) => (
          <div className={classes.cityTag}>{city}</div>
        ))}
      </div>
    </div>
  )
}

export default Modal

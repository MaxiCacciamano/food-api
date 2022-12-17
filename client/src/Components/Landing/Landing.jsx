import React from 'react'
import {Link} from 'react-router-dom';
import style from './Landing.module.css';


export const Landing = () => {
  return (
    <div className={style.im}>
    <div className={style.landing}>
      <p>All about <strong>FOOD</strong></p>
      <button className={style.but}>
          <Link to="/recipe">Home</Link>
      </button>
    </div>
    </div>
  )
}

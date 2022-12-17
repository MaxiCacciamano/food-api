import React from 'react'
import {SearchName} from '../SearchName/SearchName';
import { useEffect } from 'react'
import {useDispatch } from 'react-redux'
import {getAllrecipes} from '../../Redux/Action/Index';
import k from '../../img/k.png';
import style from './Navbar.module.css';

export const Navbar = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllrecipes());
    },[dispatch])
  return (
    <div className={style.foo}>
      <div className={style.search}>
        <SearchName/>
      </div>
      <div className={style.but}>
      <button onClick={()=>dispatch(getAllrecipes())}>
          <img src={k}/>
     </button>
      </div>
    </div>

  )
}

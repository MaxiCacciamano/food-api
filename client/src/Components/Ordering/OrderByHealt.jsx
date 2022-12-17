import React from 'react'
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {orderByHealthscore} from '../../Redux/Action/Index';
import style from './OrderByHealt.module.css';

export const OrderByHealt = () => {
    const dispatch= useDispatch();
    const[currentPage, setCurrentPage] = useState(1);
    const [order, setOrder] = useState("");

    function handleScore(e){
        e.preventDefault();
        dispatch(orderByHealthscore(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado${e.target.value}`);
    }
  return (
    <div className={style.Ohealt}>
     <h3>Order by healt score</h3>
     <select onChange={h=>handleScore(h)}>
        <option value="all">all healt score</option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
     </select>
    </div>
  )
}

import React from 'react'
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {orderByName} from '../../Redux/Action/Index';
import style from './OrderByCard.module.css';

export const OrderByCard = () => {

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [order, setOrder] = useState("");

    function handleName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado${e.target.value}`);

    }

  return (
    <>
    <div className={style.Oname}>
      <h3>Order by name</h3>
      <select onChange={e=>handleName(e)}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>
    </>
  )
}

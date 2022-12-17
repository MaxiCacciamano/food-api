import React from 'react';
import {Link} from "react-router-dom";
import style from './Card.module.css';
import{deleteById, getAllrecipes} from '../../Redux/Action/Index'
import { useEffect } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
export const Card = ({ id,name, img, diets, healthScore,createdInDb }) => {
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(deleteById(id));
  // },[dispatch])

  function handleDelte(e){
      dispatch(deleteById(id))
      dispatch(getAllrecipes())
      alert("Delete recipe")
}

  return (
    <div className = {style.main}>
          <div  className = {style.box}>
                <div className = {style.content}>
                <img src={img} alt="IMAGE NOT FOUND"/>
                <h1>{name}</h1>
                {/* <p>tipo de dieta:</p> */}
                <div className= {style.diets}>
                 {diets?.map(e=>{
                   return(
                     <p className={style.h} >{e.name}</p>
                  )
                 })}
                </div>
                         <div>
                </div>
                 {/* <h5>health score:</h5>
                 <h5>{healthScore}</h5>  */}
                </div>
                 <Link className={style.link} to={`/detail/${id}`}>
                  <button className={style.bo}>
                  see more
                  </button>
              </Link>
          {
            createdInDb===true? (
              <button onClick={(e)=>handleDelte(e)}>x</button>
            ):null
          }
          </div>
    </div>
  )
}
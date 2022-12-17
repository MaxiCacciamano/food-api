import React from 'react';
import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import {getFoodsById, removeDetail} from '../../Redux/Action/Index';
import style from './Detail.module.css';

export const Detail = (props) => {
  const dispatch = useDispatch();
  const {recipeDetail} = useSelector((state)=>state);
  const {id} = useParams();

  

  useEffect(()=>{
    dispatch(getFoodsById(id));
    return (()=>{
      dispatch(removeDetail());
    })
  },[])
  
  // function handleDelte(e){
  //   e.preventDefault();
  //   dispatch(deleteById(id))
  // }


  // console.log(getFoodsById(id));
  return (
    <>
    {
    recipeDetail.length > 0 ? (
      <div className={style.detail}>
        <div className={style.margin}>
        <div className={style.title}>
          <h1>{recipeDetail[0].name}</h1>
        </div>
        <div className={style.log}>
          <img src={recipeDetail[0].img}/>
        </div>
        <div className={style.summ}>
         <p className={style.text}>{recipeDetail[0].summary?.replace(/<[^>]*>/g, '')}</p>
        </div>
        <div className={style.diet}>
          <br/>
          <h2>Diets</h2>
          {recipeDetail[0].diets?.map(e=>{
            return (<p key={e}>{e.name}</p>)
          })}
        </div>
        {/* <div className={style.type}>
          <br/>
          <h2>Diets Type</h2>
          {
          recipeDetail[0].Types?.map(e=>{
            return(<p key={e}>{e}</p>)
          })
          }
        </div> */}
        <div className={style.healt}>
         <h3  >{recipeDetail[0].healthScore}<br/>Health Score</h3>
        </div>
        {/* <div className={style.scor}>
        <h3 >Score: {recipeDetail[0].score}</h3>
        </div> */}
        </div>
        {/* <div className={style.summ}>
        <h3>Summary: </h3>
         <p className={style.text}>{recipeDetail[0].summary?.replace(/<[^>]*>/g, '')}</p>
        </div> */}
        <div className={style.step}>
         <h3 >Steps: </h3>
         <ul className="steps">{Array.isArray(recipeDetail[0].steps) ? recipeDetail[0].steps.map(e => (

                <h3>{e.steps.map(f=>f.steps)} </h3> 
                 
         )) :
         <li>{recipeDetail[0].steps}</li>
         }</ul>
     </div>
        <div >
        <Link to="/recipe"><button className={style.botom}>Back</button></Link>
        </div>
      </div>
    ):(
      <h1>Loading..</h1>
    )
    }
 </>
)      
}

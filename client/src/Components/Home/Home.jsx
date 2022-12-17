import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import {Link,useParams} from 'react-router-dom';
import style from './Home.module.css';


import {filterByDiets} from '../../Redux/Action/Index';
import {getAllrecipes,getDietsType} from '../../Redux/Action/Index';

import {Card} from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import {FliterByDiet} from '../Filter/FliterByDiet';
import {OrderByCard} from '../Ordering/OrderByCard';
import {OrderByHealt} from '../Ordering/OrderByHealt';
import {Navbar} from '../Navbar/Navbar.jsx';
import search from '../../img/search.gif';


export const Home = (props)=> {
  const dispatch = useDispatch();
  const{ recipes }= useSelector(state=> state);
  const {id} = useParams();
  const [currentPage, setCurrentPage] =useState(1);
  const [foodsPerPage] = useState(10);
  const indexLastFoods = currentPage * foodsPerPage;
  const indexFirstFoods = indexLastFoods - foodsPerPage;
  const currentFoods = recipes.slice(indexFirstFoods, indexLastFoods); 

  useEffect(()=>{
    dispatch(getAllrecipes());
  },[dispatch])
  
  useEffect(()=>{
    dispatch(getDietsType());
  },[])


  const pagination = function(e){
    setCurrentPage(e)
  }


function handleDietTypeFilter(e) {
  e.preventDefault();
  dispatch(filterByDiets(e.target.value))
  setCurrentPage(1);
}


  return (
    <div className={style.bod}>
     <Navbar/>
      <div className={style.filtros}>
      <div>
      <div className={style.filter}>
       <h3>Filter by Diets</h3>
       <select name="diets" onChange={e => handleDietTypeFilter(e)}>
          <option value="all">all Recipe</option>
          <option value="gluten free">Gluten Free</option>
          <option value="ketogenic">Ketogenic</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="lacto vegetarian">Lacto-Vegetarian</option>
          <option value="ovo vegetarian">Ovo-Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="pescetarian">Pescetarian</option>
          <option value="paleo">Paleo</option>
          <option value="primal">Primal</option>
          <option value="low FODMAP">Low FODMAP</option>
          <option value="whole30">Whole30</option>
                </select>
    </div>
        {/* <FliterByDiet/> */}
      </div>
      <div>
        <OrderByCard/>
      </div>
      <div>
        <OrderByHealt/>
      </div>
      <div className={style.create}>
        {/* <h3>Create recipe</h3> */}
           <Link to='/Create_food'>
               <button> Create recipe </button>
            </Link>
        </div>
      </div>
      <div>

    </div>
        <div className={style.cardHome}>
      {
        currentFoods.length===0?(
          <img className={style.gif} src={search} alt="gif"/>
          // <h1>Cargando...</h1>
          
          ): (
            currentFoods?.map(food=>{
              return(
                <Card key={food.id} id={food.id} name={food.name} img={food.img} diets={food.diets} createdInDb={food.createdInDb}/>
                )
              })
            )
      }
        </div>
        <Paginado
       foodsPerPage={foodsPerPage}
       recipes={recipes.length}
       pagination={pagination}
      />
    </div>
  )
}
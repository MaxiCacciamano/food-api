import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {filterByDiets} from '../../Redux/Action/Index';
import style from './FilterByDiet.module.css';

export const FliterByDiet = () => {
  const diets = useSelector((state) =>state.diets);
const dispatch = useDispatch();
const [page, setPage] = useState(1);

 function handletypeFilter  (e) {
        dispatch(filterByDiets(e.target.value));
        setPage(1);
  }

  return (
    <div className={style.filter}>
       <h3>Filter by Diets</h3>
       <select name="diets" onChange={e => handletypeFilter(e)}>
        {/* <option  defaultValue value>Select</option> */}
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
  )
}

// {name: 'gluten free'},
// {name:'ketogenic'},
// {name:'vegetarian'},
// {name:'lacto vegetarian'},
// {name:'ovo vegetarian'},
// {name:'vegan'},
// {name:'pescetarian'},
// {name:'paleo'},
// {name:'primal'},
// {name:'low FODMAP'},
// {name:'whole30'}
// 'Gluten Free',
// 'Ketogenic',
// 'Vegetarian',
// 'Lacto-Vegetarian',
// 'Ovo-Vegetarian',
// 'Vegan',
// 'Pescetarian',
// 'Paleo',
// 'Primal',
// 'Low FODMAP',
// 'Whole30'
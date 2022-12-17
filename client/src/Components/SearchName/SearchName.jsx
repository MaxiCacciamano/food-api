import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {searchfoodsByName} from '../../Redux/Action/Index'
import style from './SearchName.module.css';

export const SearchName = () => {
    const dispatch = useDispatch();
    const [Input,setInput] = useState('');


    function handleChange(e){
      
          e.preventDefault();
          dispatch(searchfoodsByName(Input));
    }


    function handleInput(e){
        e.preventDefault();
        setInput(e.target.value);
        // console.log(Input)
    }

  return (
    <div className={style.search}>
      {/* <h5> Search by name:</h5> */}
      <form onSubmit={e=>handleChange(e)}>
      <input 
      placeholder="Search food..."
      onChange={e=>handleInput(e)}
      />
      <button className={style.search} type="submit">🔍</button>
      </form>
    </div>
  )
}

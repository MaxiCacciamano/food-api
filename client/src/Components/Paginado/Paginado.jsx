import React from 'react'
import style from './Paginado.module.css';

export default function Paginado  ({foodsPerPage,recipes, pagination}) {
    const pageNumbers = [];
    const paginadoo = Math.ceil(recipes/foodsPerPage);
    for(let i = 1;i <= paginadoo;i++) {
        pageNumbers.push(i);
    }
  return (
    <div className={style.paginado}>
              <ul>{
                pageNumbers?.map(e=>(    
                    <li key={e}>
                        <p onClick={()=>pagination(e)}>{e}</p>
                    </li>
                ))
                }</ul>
            
    </div>
  )
}

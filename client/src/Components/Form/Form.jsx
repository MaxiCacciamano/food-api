import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import{addFoods, getDietsType} from '../../Redux/Action/Index';
import style from './Form.module.css';

export const Form = () => {
  const dispatch = useDispatch();
  const diets = useSelector(state=>state.dietss)
  const [errors, setErrors] = useState(true);
  const [input, setInput] = useState({
    name:"",
    summary:"",
    score:"",
    healthScore:"",
    steps:"",
    img:"",
    diets:[]
  });
  useEffect(() => {
    dispatch(getDietsType());
}, [dispatch]);

function validate(input){
  let regexheightWeight = /\d{1,2}/gi;
  let regexName = /[a-zA-Z0-9:-\s’']/;
  let regexDescription = /^.{1,300}$/;

  let errors = {};
  if(input.name.trim()){
    errors.name = "A name is required"
  }else if(!regexName.test(input.name.trim())){
    errors.name = "The name field only accepts letters, numbers and characters"
  }
  if(input.healthScore < 1 || input.healthScore > 100)errors.healthScore =" The score must be a number between 1 and 100"
  if(input.score < 1 || input.score > 100) errors.score ="The score must be a number between 1 and 100"
  if(input.summary.trim())errors.summary = " A summary is required"


  if(input.diets.length === 0){
    errors.diets = "A diets is required"
  }
  return errors
}

function handleChange(e){
  setInput({
    ...input,
    [e.target.name]:e.target.value
  })
  setErrors(validate({
    ...input,
    [e.target.name]: e.target.value
  }))
}

function handleDelete(e){
  setInput({
    ...input,
    diets: input.diets.filter((diets)=> diets !== e)
  })
}

function handleDiets(d){
  !input.diets.includes(d.target.value)?
  setInput({
    ...input,
    diets:[...input.diets, d.target.value]
  }):alert("repeated diets are not allowed");
}

function handleSubmit(e){
  e.preventDefault()
  if(
    input.name.length > 0&&
    input.summary.length >0&&
    input.diets.length >0 
  ){
    alert("food created successfully")
    dispatch(addFoods(input))
    setInput({
      name:"",
      summary:"",
      score:"",
      img:"",
      healthScore:"",
      steps:"",
      img:"",
      diets:[]

    })
  }else{
    return alert("You must complete some fields before submitting the information");
  }

}
  return (
    <div className={style.all}>
    <div>
      <h1 className={style.t}>Create food</h1>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <div className={style.form}>
          <div className={style.formcontent}>
            <div className={style.name}>
             <p className={style.p}>Name</p>
              <input 
              className={style.nameinput}
               type="text"
               value={input.nombre}
               name="name"
               placeholder={errors.name}
               onChange={e=>handleChange(e)}
               />
            </div>
          <div className={style.img}>
            <p className={style.p}>Imagen</p>
            <input
            className={style.nameinput}
            type="text"
            name="img"
            value={input.imagen}
            onChange={e=>handleChange(e)}
            placeholder="http://myimageontheweb.com"
            />
          </div>
          <div className={style.summary}>
            <p className={style.p}>summary</p>
            <textarea
            className={style.nameinput}
            type="text"
            value={input.summary}
            placeholder={errors.summary}
            onChange={e=>handleChange(e)}
            name="summary"
            />
          </div>
          <div>
            <p className={style.p}>score</p>
            <input
            className={style.nameinput}
            type="number"
            placeholder="Between 1 and 100"
            value={input.score}
            onChange={e=>handleChange(e)}
            name="score"
            />
          </div>
          {
            errors.score&&(
              <span>{errors.score}</span>
            )
          }
          <div>
            <p className={style.p}>Healt Score</p>
            <input
            className={style.nameinput}
            type="number"
            value={input.healthScore}
            onChange={e=>handleChange(e)}
            name="healthScore"
            placeholder="Between 1 and 100"
            />
          </div>
            {
              errors.healthScore&&(
                <span>{errors.healthScore}</span>
              )
            }
          <div>
            <p className={style.p}>Steps</p>
            <textarea
            className={style.nameinput}
            type="text"
            value={input.steps}
            rows="4"
             cols="40"
            onChange={e=>handleChange(e)}
            name="steps"
            />
          </div>
          <div>
            <p className={style.p}>Diet Types:</p>
            <select onChange={d=>handleDiets(d)}>
              {
                diets.map((diets)=>{
                  return(
                  <option key={diets} className={style.nameinput} value={diets.name}>
                    {diets}
                  </option>
                  )
                })
              }
            </select>
          </div>
          <div>
            <h3>You have selected:</h3>
            {
              input.diets.map((d)=>(
                <ul key={d} className={style.lista}>
                  <li>{d}</li>
                  <button className={style.but} onClick={()=>handleDelete(d)}>x</button>
                </ul>
              ))
            }
            {
              errors.diets&&(
                <span>{errors.diets}</span>
              )
            }
          </div>
          </div>
        </div>
         <div >
         <Link to="/recipe">
          <button className={style.sub}>Back</button>
          </Link>
         </div>
          <button className={style.sub} type="submit">Submit Recipe</button>
      </form>
    </div>
    </div>
  )
}

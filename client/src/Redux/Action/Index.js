import axios from "axios";
const GET_RECIPES = 'GET_RECIPES';
const GET_DIETS = 'GET_DIETS';
const GET_NAME = 'GET_NAME'
const baseUrl = process.env
// export function getAllrecipes(){
//     return function(dispatch){
//         axios.get(`http://localhost:3001/recipe/`)
//         .then((res)=>{
//             return dispatch({type: 'GET_RECIPES', payload: res.data})
//         })
//         .catch(err=>{
//             console.log(err)
//         })
//     }
// }

export function getAllrecipes(){
    return async function(dispatch){
        var json = await axios.get(`https://api-food-maxi.herokuapp.com/recipe/`);
        return dispatch({
            type : 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function getDietsType(){
    return function (dispatch){
        axios.get(`https://api-food-maxi.herokuapp.com/diets/`)//saque un salsh
        .then((res)=>{
            return dispatch({
                type:'GET_DIETS',
                payload:res.data.map(e=>e.name)
            })
        })
        .catch(err=>{
            console.log("Algo salio mal en el action de getDietsType");
        })
    }
}

export function searchfoodsByName(payload){
    return async function(dispatch){
        try{
        var recName = await axios.get(`https://api-food-maxi.herokuapp.com/recipe?name=${payload}`);
        return dispatch({
                type:'GET_NAME',
                payload: recName.data
            })
        }
        catch(err){
            console.log("Algo salio mal en la action searchfoodsByName", err);
            alert("Recipe not found")
        }
        }
}

// export function getFoodsById(payload){
//     try{
//         return async function(dispatch) {
//             var response = await axios.get(`http://localhost:3001/recipe/${payload}`);
//             return dispatch({
//                 type: 'GET_FOODS_ID',
//                 payload: response.data
//             })
//         }
//     }
//     catch(err){
//         console.log(" error en el getFoodsById ",err)
//     }
// }
export function getFoodsById(id){
    try{
        return function (dispatch){
            axios.get(`https://api-food-maxi.herokuapp.com/recipe/${id}`)
            .then((res)=>{
                return dispatch({
                    type:'GET_FOODS_ID',
                    payload: res.data
                })
            })
            .catch((err)=>{
                console.log("error en el action de getFoodsById", err)
            })
        }
    }
    catch(err){
        console.log("error al traer recipe por id", err)
    }
}
export function deleteById(id){
    try{
        return async function(dispatch){
           const delFood = await axios.delete(`https://api-food-maxi.herokuapp.com/recipe/delete/${id}`);
           return dispatch({
            type: 'DELETE_RECIPE',
            payload: delFood
           })
        }
    }
    catch(err){
        alert("algo salio mal al eliminar recipe")
        console.log("error al eliminar recipe")
    }
}
export function addFoods(payload){
    try{
        return async function (dispatch){
            try{
                const resAddFood = await axios.post(`https://api-food-maxi.herokuapp.com/recipe/recipe`, payload)
                return resAddFood;
            }
            catch(err){
                console.log("error al crear foods", err)
            }
        }
    }
    catch(err){
        console.log("error al agregar recipe", err)
    }
}

export function filterByDiets(payload){
    try{
        return{
            type:'FILTER_DIET',
            payload
    
        }
    }
    catch(err){
        console.log("Algo salio mal", err)
    }
}

export function removeDetail(){
    return{
        type:'REMOVE_DETAIL',
        payload:{}
    }
}

export function orderByName(payload){
    return{
        type:"ORDER_NAME", 
        payload
    }
}

export function orderByHealthscore(payload){
    return{
        type:"HEALTH_SCORE", 
        payload
    }
}
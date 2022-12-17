
const initialState = {
    recipes:[],
    dietss:[],
    allRecipe:[],
    recipeDetail:[],
    delete:[]
}

export default function rootReducer(state=initialState, action){
    console.log(action.payload)
    switch(action.type){
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                allRecipe: action.payload
            }
        
        case 'GET_DIETS':
            return{
                ...state,
                dietss: action.payload
            }
        case 'GET_NAME':
            return{
                ...state,
                recipes: action.payload
            }
        case 'GET_FOODS_ID':
            return{
                ...state,
                recipeDetail: action.payload
            }
        case 'POST_FOOD':
            return{
                ...state
            }
        case 'DELETE_RECIPE':
            return{
                ...state,
                delete: action.payload

            }
        case 'REMOVE_DETAIL':
            return{
                ...state,
                recipeDetail: action.payload
            }
        case 'FILTER_DIET':
            let allRec = state.allRecipe;
            let dietsFilter = action.payload === 'all'?
            allRec:
            allRec.filter(e=>{
                return e.diets.find(i=>{
                    return i.name.includes(action.payload)
                })
            })
            console.log("diets filter")
            console.log(dietsFilter)
            console.log("all rec")
            console.log(allRec)
            return{
                ...state,
                allRecipe:allRec,
                recipes:dietsFilter
            }
        case 'ORDER_NAME':
            const setOrder =  action.payload === "asc"?state.recipes.sort(function(a,b){
                if(a.name>b.name)return 1
                if(b.name>a.name)return -1
                return 0;
            }):
            state.recipes.sort(function(a,b){
                if(a.name>b.name) return -1;
                return 0
            })
            return{
                ...state,
                recipes:setOrder
            }
        case 'HEALTH_SCORE':
            const allRecipe = state.allRecipe;
            const healthFilter = action.payload === "asc"?
            allRecipe.sort(function (a,b){
                if(a.healthScore < b.healthScore) return -1;
                if(a.healthScore > b.healthScore)return 1;
                return 0
            }):
            allRecipe.sort(function(a,b){
                if(a.healthScore<b.healthScore)return 1;
                if(a.healthScore>b.healthScore)return -1
            })
            return{
                ...state,
                recipes:healthFilter
            }
            default:
                return state;
    }
}

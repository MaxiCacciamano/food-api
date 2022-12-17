const { default: axios } = require('axios');
require('dotenv').config();
const {KEY_API} = process.env
const {Diets, Recipe} = require('../db');
// const KEY_API = f7686d9cd3ee41778ef68e2a103cef06;


const getAllRecipeApi = async()=>{
    try{
        const Info = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${KEY_API}&addRecipeInformation=true&number=100`);
        const resultInfo = await Info.data.results.map(res=>{
            //Eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            return {
                id: res.id,
                name: res.title,
                vegetarian: res.vegetarian,
                img:res.image,
                vegan: res.vegan,
                glutenFree: res.glutenFree,
                summary: res.summary,
                healthScore: res.healthScore,
                diets:res.diets?.map(e=>{return{name:e}}),
                Types: res.dishTypes.map(element => element), 
                steps:(res.analyzedInstructions[0] && res.analyzedInstructions[0].steps?res.analyzedInstructions[0].steps.map(item=>item.step).join(""):'')
            }
        })
        return resultInfo;
    }
    catch(e){
        console.log("Algo salio mal al traer los recipe de api",e);
    }
}

const GetRecipeDb = async()=>{
    try{
        const dataDb= await Recipe.findAll({
            include:{
                model: Diets,
                attributes:['name'],
                through: {
                    attributes: []
                }
            }
        })

 
        return  dataDb;
    }
    catch(e){
        console.log("Algo salio mal al traer el getDb",e)
    }
}

const getAll = async()=>{
    try{
        const recipeApi = await getAllRecipeApi();
        const recipeDb = await GetRecipeDb();
        const allRecipe = recipeApi.concat(recipeDb)
        return allRecipe;
    }
    catch(e){
        console.log("error en el get all",e);
    }
}

const getRecipe = async(req,res)=>{
    const name = req.query.name;
    try{
        let recipeAll = await getAll();
        // console.log(recipeAll);
        if(name){
        // console.log(recipeAll);
            let recipeName = recipeAll.filter(r => r.name.toLowerCase().includes(name.toLowerCase()));
            if(recipeName.length){
               return res.status(200).send(recipeName);
            }else{
                return res.status(404).send("Algo salio mal en la busqueda por nombre");
            }
        }else{
            return res.status(200).send(recipeAll);
        }
    }
    catch(e){
        res.status(404).send("error en el getRecipe");
        console.log("error en el getRecipe");
    }
}

const idRecipe = async(req,res)=>{
    const id = req.params.id;
    const allRecipe = await getAll();
    try{
        if(id){
            let recipid = await allRecipe.filter(e=>e.id == (id))
            recipid.length?
            res.status(200).send(recipid):
            res.status(404).send("no se encontro  la comida")
        }
    }
    catch(e){
        console.log("comida no encontrada",e)
    }
}


const postRecipe = async(req,res)=>{
    try{
        const {name, summary, spoonacularScore, healthScore, steps, img, diets} = req.body;
        // if(name&&summary&&score&&healthscore&&step&&diets){
            const createRecipe = await Recipe.create({
                name,
                summary,
                spoonacularScore,
                healthScore,
                steps,
                img,
            })
            let dietsDb = await Diets.findAll({ 
                where:{
                    name:diets
                }
            })
            createRecipe.addDiets(dietsDb);
            res.status(200).send('food game created successfully')
            console.log(createRecipe);
        // }
    }
    catch(e){
        res.status(404).send('Algo salio mal al crear comida')
        console.log('error en el post de recipe', e)
    }
}

const deleteRecipe = async(req,res)=>{
    const {id} = req.params;
    try{
       const dbFoods = await Recipe.findAll({
            where:{ 
                id:id
            }
        });
        if(dbFoods){
            await Recipe.destroy({
                where:{ 
                    id:id
                }
            })
            return res.status(200).send("successfully delete");
        }
        return res.status(404).send("algo salio mal en el delte")
    }
    catch(err){
        console.log(err, "error al eliminar recipe");
        res.status(404).send("Algo salio mal al eliminar por delete");
    }
}

module.exports={
    getRecipe,
    idRecipe,
    postRecipe,
    deleteRecipe
    
}
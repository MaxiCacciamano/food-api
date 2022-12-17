const { KEY_API } = process.env;
const { Router } = require('express');
const router = Router();
const axios = require('axios').default;
const { Diets, Recipe } = require('../db');
const {DietsDb} = require('../Controls/DietsC');

router.get('/',async(req,res)=>{
    try{
        DietsDb.forEach(e=>{
            Diets.findOrCreate({ 
                where:{name:e.name}
            })
        });
        const dietTypes = await Diets.findAll();
        res.send(dietTypes)
    }
    catch(e){
        console.log("error al cargar dietas en DB",e)
        res.status(404).send("Algo salio mal al cargar datos de DB");
    }
});

module.exports= router;
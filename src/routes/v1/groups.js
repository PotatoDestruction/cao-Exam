const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');
const { dbConfig } = require('../../config');
const { authCheck } = require("../../middlewares/auth");


const router = express.Router();

const postSchema = Joi.object({
    name: Joi.string().required()
});

router.get('/', async (req, res) => {
    try{
        const con = await mysql.createConnection(dbConfig);
        const [resp] = await con.query("SELECT * FROM `groups`");
        con.end();
        res.send(resp);

    }catch(err){
        res.status(500).send( { error: 'Something went wrong' } );
    }
});

router.post('/', authCheck, async (req, res) => {
    let newGroup = req.body;

    try{
        newGroup = await postSchema.validateAsync(newGroup);
    }catch(err){
        res.status(400).send(err.details[0].message);
    };

    try{
        const con = await mysql.createConnection(dbConfig);
        const [group] = await con.query('INSERT INTO `groups` SET ?', [newGroup]);
        con.end();
        res.send(group);
    }catch(err){
        res.status(500).send( { error: 'Something went wrong' } );
    }
});

module.exports = router;

////TEST user
// {
//     "email": "test@test9999",
//     "password": "123"
// }
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY1ODQyMDQwN30.-XTdHKmgSuOAU1lIRwk8m3sHfswFjNRR4IISAILkpZM
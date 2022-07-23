const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');
const { dbConfig } = require('../../config');
const { authCheck } = require("../../middlewares/auth")

const router = express.Router();

const accountsSchema = Joi.object({
    group_id: Joi.number().required(),
    user_id: Joi.number().required()
});

router.post('/', authCheck, async (req, res) => {
    let groupId = req.body //group id
    
    let userIdFromToken = req.user; //id from token
  
     let newAccount = {
        ...groupId,
        ...userIdFromToken
     }; // finall object to DB;
     console.log(newAccount)
     
     try{
        newAccount = await accountsSchema.validateAsync(newAccount);
     }catch(err){
        res.status(400).send( err.details[0].message )
        return;
     };
     
    try{
        const con = await mysql.createConnection(dbConfig);
        const [resp] = await con.query('INSERT INTO accounts SET ?', [newAccount]);
        con.end();
        res.send( {user_id: newAccount.user_id } );
    }catch(err){
        res.status(500).send(err);
    };
});

router.get('/', authCheck, async (req, res) => {
    let userIdFromToken = req.user.user_id; //id from token

    try{
        const con = await mysql.createConnection(dbConfig);
        const [userGroups] = await con.query('SELECT accounts.user_id, accounts.group_id, `groups`.name FROM accounts LEFT JOIN `groups` ON `groups`.id = accounts.group_id WHERE accounts.user_id = ?', [userIdFromToken]);
        con.end();
        res.send(userGroups);
    }catch(err){
        res.status(500).send(err);
    };
});

module.exports = router;
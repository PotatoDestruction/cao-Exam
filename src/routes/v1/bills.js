const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');
const { dbConfig } = require('../../config');
const { authCheck } = require("../../middlewares/auth");

const router = express.Router();

const billsSchema = Joi.object({
    group_id: Joi.number().required(),
    amount: Joi.number().required(),
    description: Joi.string().required()
})

router.get('/:group_id', async (req, res) => {
    let groupId = req.params.group_id;

    try{
        const con = await mysql.createConnection(dbConfig);
        const [bills] = await con.query('SELECT * FROM bills WHERE group_id = ?', [groupId]);
        con.end();
        res.send(bills)
    }catch(err){
        res.status(500).send(err);
    };
});

router.post('/', async (req, res) => {
    let newBill = req.body;

    try{
        newBill = await billsSchema.validateAsync(newBill);
    }catch(err){
        res.status(400).send(err.details[0].message);
        return;
    }

    try{

        const con = await mysql.createConnection(dbConfig);
        const [addBill] = await con.query('INSERT INTO bills SET ?', [newBill]);
        con.end();
        res.send(addBill)

    }catch(err){
        res.status(500).send(err);
    };
});

module.exports = router;
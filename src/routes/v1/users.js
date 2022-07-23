const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const { dbConfig, jwtSecret } = require('../../config');


const router = express.Router();

const userRegistrationSchema = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    reg_timestamp: Joi.string()
});

const userLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});



router.get('/', async (req, res) => {
    try {

        const con = await mysql.createConnection(dbConfig);
        const [resp] = await con.query('SELECT * FROM users');
        con.end();
        res.send(resp);

    }catch(err){
        res.status(500).send( { error: 'Something went wrong' } )
    }
});

router.post('/register', async (req, res) => {
    let newUser = req.body

    try {
        newUser = await userRegistrationSchema.validateAsync(newUser);
    } catch (err) {
        res.status(400).send(err.details[0].message);
        return;
    }

    try {
        const hashPassword = bcrypt.hashSync(newUser.password);
        newUser.password = hashPassword;

        const con = await mysql.createConnection(dbConfig);
        const [addUser] = await con.query('INSERT INTO users SET ?', [newUser]);
        con.end();
        res.send(addUser)

    }catch(err){
        res.status(500).send( { error: 'Something went wrong' } );
    };
});

router.post('/login', async (req, res) => {
    let userLogin = req.body;

    try{
        userLogin = await userLoginSchema.validateAsync(userLogin);
    }catch(err){
        res.status(500).send(err.details[0].message);
        return;
    }


    try {
        
        const con = await mysql.createConnection(dbConfig);
        const [login] = await con.query('SELECT id, password FROM users WHERE email = ?', [userLogin.email]);

        con.end();

        if(!login.length) {
            return res.status(400).send({error: 'Wrong email or password'});
        }

        const passwordCheck = bcrypt.compareSync(userLogin.password, login[0].password);
        if(!passwordCheck) {
            return res.status(400).send({error: 'Invalid email or password'});
        }
        const token = jwt.sign({user_id: login[0].id}, jwtSecret);
        
        res.send( { token, user_id: login[0].id } );
    }catch(err){
        res.status(500).send( { error: 'Something went wrong' } );
    }
});



module.exports = router;
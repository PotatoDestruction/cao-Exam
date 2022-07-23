const jwt = require("jsonwebtoken");
const { jwtSecret } = require('../config')

const authCheck = (req, res, next) => {
    const auth = req.headers.authorization;

    if(!auth) {
        return res.status(400).send( { error: "Token is required" } );
    }
    const token = auth.split(' ')[1];

    try {
     const tokenInfo = jwt.verify(token, jwtSecret);

    req.user = {
       user_id: tokenInfo.user_id,
    }

    // console.log(tokenInfo)
    next();
    }catch(err){
        res.status(401).send( {error: "Unauthorized"} )
    }

    // console.log(token)

};

module.exports = { authCheck };



// {
//     "full_name": "main test",
//     "email": "m@m",
//     "password": "123",
//     "reg_timestamp": "1111-11-11"
//  }
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJpYXQiOjE2NTg0MjM5MjV9._ULyDO5-eRY14UK5NqbtUPld2RllzMhs3fdpvDjqHBA
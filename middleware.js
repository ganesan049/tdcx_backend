const jwt = require('jsonwebtoken');
const jwtSecret = 'helloworld';

const generateToken = (req,res) => {
    const {apiKey,name} = req.body;
    console.log(req.body)
    if(!apiKey || apiKey.length == 0){
        res.status(401).send('Authorization information is missing or invalid');
    }
    let token = jwt.sign(apiKey,jwtSecret);
    console.log(token)
    let body = {
        token:{
            name,
            token,
        },
        image:'image',
    }
    res.status(200).send(body);
}

const validateToken = (req,res,next) => {
    let token = req.header("x-access-token");
    let isValid = false;
    if(token){
        token = token.replace("Bearer ","");
        jwt.verify(token,jwtSecret,(err,decoded) => {
            if(err){
                return;
            }
            isValid = true;
            req.body.id = decoded;
        });
    }
    if(isValid){
        next();
    }else{
        return res.status(401).send('Authorization information is missing or invalid');
    }
}

module.exports = {generateToken,validateToken};
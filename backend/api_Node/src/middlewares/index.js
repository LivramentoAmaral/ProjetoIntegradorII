const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")


const validateToken = asyncHandler(async(req, res, next) =>{
    let token  
    let autHeader =  req.headers.Authorization || req.headers.authorization
    if(autHeader && autHeader.startsWith("Bearer")){
        token = autHeader.split(" ")[1]
        
        jwt.verify(token, process.env.JWT_SECRET, (e, decoded) =>{
            if (e){
                if(e.expiredAt){
                    return res.status(401).json({mensagem: "Tempo de 30 minutos expirado"})
                } else if(e.name === "JsonWebTokenError"){
                    return res.status(401).json({mensagem: "Não autorizado"})
                }
            }
            req.user = decoded.user
            next()
        })
        if(!token){
            return res.status(401).json({
                mensagem: "O usuário não está autorizado ou o token está faltando"
            })
        }
    }
})

module.exports = validateToken
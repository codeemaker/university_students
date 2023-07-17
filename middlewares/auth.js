import Jwt from "jsonwebtoken"

const auth = (req,res,next)=>{
    try{
        const isTokenValid = Jwt.verify(req.headers.authorization,process.env.SECRET_KEY);
        req.univId=isTokenValid.id;
        next();
    }
    catch(err){
        console.log(err);
        res.status(403).json({status:false,message:"Token expired"});
    }
}

export default auth;
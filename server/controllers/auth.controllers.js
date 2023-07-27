const User = require('../models/user.model')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')

const test= async (req, res, next) => {
    res.json('Testing successful')
}


// Registe End Point
const register= async (req,res)=>{
    try {
            const {name, email, password} = req.body;
            // console.log(req.body);

            if(!name){
              return   res.json({error:'Name is required'});
            }
            if(!email){
                return res.json({error:'Email is required'});
            }
            // check email
            const existingEmail = await User.findOne({email: email});
            if(existingEmail){
                return res.json({error:'Email already taken'});
            }
            if(!password || password.length < 6){
                return res.json({error:'Password length must be at least 6 characters'});
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const user= await User.create({
                name: name,
                email:email,
                password:hashedPassword
            });
         return res.json(user);

     } catch (err) {
        console.log(err);
     }
    
}


// Login Endpoint

const login= async (req, res) => {
        try{
            const {email, password} = req.body;
                // check user by email
                const user= await User.findOne({email: email});
                if(!user){
                   
                    return res.json({error:"User not found registered by this email"});
                }
                // check if password matches
                 await bcrypt.compare(password, user.password)
                .then(matched=>{
                    if(!matched){
                        return res.json({error:"Password is incorrect"});
                    }
                  const token= jwt.sign({email: user.email, id: user._id, name: user.name},process.env.JWT_SECRET_KEY, {expiresIn: "5h"});
                  
                  req.session.token=token;
                  req.session.user=user;
                
                   res.json({token:token, user:user});
                });
               
        }
        catch(err){
            console.log(err);
        }
};



module.exports ={
    test,
    register,
    login,
}
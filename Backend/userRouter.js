const express = require("express")
const jwt = require("jsonwebtoken")
const { userModel } = require("./Schema/userSchema")
const {authorization} = require("./Authorization")
const bcrypt = require("bcrypt")


const userRouter = express.Router();

userRouter.post("/register", async (req,res)=>{
    const {name, age, email, password} = req.body;
    try{
        bcrypt.hash(password,5, async(err,hash)=>{
            const user = new userModel({email, password:hash, age , name});
            await user.save();
            res.status(200).send("user has been registered successfully");
        })
    }
    catch(error){
        console.log("Error from register route", error);
    }
})

userRouter.post("/login", async(req,res)=>{
    const { email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, function(err,result){
                if(result){
                    const token = jwt.sign({authorID: user.id, author:user.name},"secret");
                    res.status(200).send({msg : "login successfully", token:token});
                }
                else{
                    res.status(200).send({msg:"wrong credentials"});
                }
            })
        }
        else{
            res.status(200).send({msg: "wrong credentials"});
        }
        


    } catch (error) {
        res.status(400).send({error:error.message});
    }
})

// code without bcrypt 

// userRouter.post("/login", async(req,res)=>{
//     const { email, password } = req.body;
//     try{
//         const user = await userModel.findOne({email, password:password});
//         console.log(user);
//         if(user){
//             const token = jwt.sign({course:"backend"},"secret");
//             res.status(200).send({msg:"login success", token:token});
//         }
//         else{
//             res.status(200).send({msg:"password and email combination is not correct"});
//         }
//     }
//     catch(error){
//         console.log("unsucessfull login",error);
//     }
    
// });


module.exports = {
    userRouter
}





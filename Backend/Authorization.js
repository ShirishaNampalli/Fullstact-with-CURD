const express = require("express")
const jwt = require("jsonwebtoken");

const authorization = (req, res, next)=>{
    const token = req.headers.authorization.split(" ")[1];
    try {
        if(token){
            const decoded = jwt.verify(token, "secret");
            if(decoded){
                // console.log(decoded);
                req.body.authorID = decoded.authorID,
                req.body.author = decoded.author
                next();
            }
            else{
                console.log("Please login");
            }
        }
        else{
            console.log("Please login");
        }
    } catch (error) {
        console.log("Error-->", error);
    }
}

module.exports = {
    authorization
}
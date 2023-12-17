const mongoose=require('mongoose');
const users=require('../models/registration');
var bcrypt = require('bcryptjs');
var jwt=require('jsonwebtoken');
const secret_key="finalyearproject";

module.exports.signup=async (req, res)=>{
    try {
        console.log(req.body);
         const {fullname, username, email, password}=req.body;
         const becrypt_password=await bcrypt.hash(password,10);
        const user=await new users({fullname:fullname, username:username, email:email, password:becrypt_password});
         await user.save();
        res.send({response:"data is stored successfully...", status:200});
        console.log("user............");
    } catch (error) {
        res.send(error);
    }

}

module.exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.findOne({ email: email });

        if (user) {
            // Compare passwords asynchronously
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    // Handle error
                    res.status(500).send('Error comparing passwords');
                } else if (result) {
                    // Passwords match, allow access
                    var token=jwt.sign({_id:user._id}, secret_key, { expiresIn: '1h' });
                    res.send({status:200,Token:token, response:'Password is correct. Allow access.'});
                } else {
                    // Passwords do not match, deny access
                    res.send('Password is incorrect. Deny access.');
                }
            });
        } else {
            res.send('Email is not correct.');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
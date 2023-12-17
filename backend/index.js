const express=require('express');
const app=express();
require('./db');
var cors = require('cors')
const usersRegistration=require("./controllers/userscontroller");
app.use(express.json());
app.use(cors());

app.post('/signup', usersRegistration.signup);
app.post('/signin', usersRegistration.signin);

app.listen(6500,()=>{
    console.log("connected successfull ");
})
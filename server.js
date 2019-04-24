//importing node modules//
const express=require('express');
const app =express();
const bodyparser=require('body-parser');
//ended///


//importing from other folder
require('./databse/db');
//ended///



//import routes from other folders//
const {auth_route}=require('./authentication/authenticate');
const {driver_route}=require('./drivers/driver');
const {user_route}=require('./users/user');
//ended///




//middleware used by routes//
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
//ended///

//using routes imported from other folders//
app.use('/authentication',auth_route);
app.use('/driver',driver_route);
app.use('/user',user_route);
//ended///







app.listen(process.env.PORT||3002);
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
//ended///




//middleware used by routes//
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
//ended///

//using routes imported from other folders//
app.use('/authentication',auth_route);
//ended///







app.listen(process.env.PORT||3002);
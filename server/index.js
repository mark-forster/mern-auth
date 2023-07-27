const express= require('express');
require('dotenv').config();
const app = express();
const AuthRoute= require('./routes/auth.route')
const cors= require('cors');
const bodyParser = require('body-parser');
const cookieParser= require('cookie-parser')
const mongoose= require('mongoose');
//session
const session=require('express-session');
const mongodbsession=require('connect-mongodb-session')(session);
// db connection
mongoose.connect(process.env.DB_URL,{useUnifiedTopology:true, useNewUrlParser:true}).then(()=>{
    console.log('Database connection established');
});

//store session
const store=new mongodbsession({
    uri:process.env.DB_URL,
    collection:"sessions"
});
app.use(session({
    secret:'hello sesison ',
    resave:false,
    saveUninitialized:false,
    store:store
})); 


// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

 app.use('/', AuthRoute)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on ${process.env.PORT}`);
});
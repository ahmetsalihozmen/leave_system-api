const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const addleave = require('./controllers/addleave');
const addmyob = require('./controllers/addmyob');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '26042000',
      database : 'leave_system'
    }
  });

const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cors());


const key ={
    username: 'ahmet',
    password: '3131'
}
 
app.get('/',(req,res)=>{
    res.send('Working')
})

app.get('/staff',(req,res)=>{
    db('staff')
    .returning('*')
    .then(resp =>{
        res.json(resp);
    })
    .catch(err => res.status(400).json('unable to get staff'))
})

app.get('/myob',(req,res)=>{
    db('leaves')
    .where('myob', '=', false)
    .returning('*')
    .then(resp =>{
        return res.json(resp);
    })
    .catch(err => res.status(400).json('unable to get staff'))
})

app.get('/history',(req,res)=>{
    db('leaves')
    .where('myob', '=', true)
    .returning('*')
    .then(resp =>{
        return res.json(resp);
    })
    .catch(err => res.status(400).json('unable to get staff'))
})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db)})

app.post('/leave',(req,res)=>{addleave.handleLeave(req,res,db)})

app.post('/login',(req,res)=>{
    const {username,password} = req.body;
    if(key.username===username && key.password===password){
        return res.send(true);
    }
    else{
        res.send(false)
        return res.status(400).json('unable to get staff');
    }
})

app.post('/addmyob',(req,res)=>{addmyob.handleMyob(req,res,db)})


app.listen(3000,()=>{
    console.log('server is running on port 3000')
})
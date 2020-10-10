const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyparser.json())
app.use(cors())
const database ={
    users:[
        {
            id:'1',
            name:'deepak',
            email:'123@gmail.com',
            password:'123',
            entries:[],
            join:new Date()

        }
    ]
}

app.get( '/' ,(req, res)=>{

    res.send(database.users)
} )

app.post('/signin', (req, res)=>{
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json('sucess')
       }else{
           res.status(400).json('error')
       }   

})

app.post('/siginup', (req, res)=>{

    const {email , name, password} = req.body
    database.users.push({
        id:'',
        name:name,
        email:email,
        password:password,
        entries:[],
        join:new Date()

    })
        res.json(database.users[database.users.length-1])
})
app.get('/profile/:id', (req, res) =>{
    const {id} = req.params
    const found = false
    database.users.forEach(user =>{
    if(user.id === id){
        found=true
        res.json(user)
    }
})
if(!found){
    res.status(400).json('not found')
}
})

app.post('/todolist', (req, res)=>{
    const {id} = req.params
    const found = false
    database.users.forEach(user =>{
    if(user.id === id){
        found=true
        user.entries
        res.json(user.entries)
    }
})
if(!found){
    res.status(400).json('not found')
}
})


app.listen(3000, ()=>{
    
})
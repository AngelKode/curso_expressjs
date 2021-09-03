const express = require('express')
const router = express.Router()
const users = [{name:'Angel'},{name:'Juan'}]

router.get('/',(req,res) => {
    const nameQuery = req.query.name
    const userFind = users.find((user) => user.name === `${nameQuery}`)
    
    if(userFind){
        res.status(200).json({message:"Encontrado"})
    }else{
        res.status(500).json({message:"No encontrado"})
    }
})

router.get('/new',(req,res) => {
    res.render("users/new",{primerNombre : "Escriba el nombre..."})
})

router.post('/',(req,res) => {
    const isValid = true
    if(isValid){
        users.push({name:req.body.primerNombre})
        res.redirect(`/users/${users.length - 1}`)
    }else{
        res.render('users/new',{name:req.body.primerNombre})
    }
})

router.route('/:id')
    .get((req,res)=>{
        console.log(req.user)
        res.send('User with id:'+req.params.id)
    })
    .put((req,res)=>{
        
    })
    .delete((req,res)=>{
        
    })

router.param("id",(req,res,next,id)=>{
    req.user = users[id]
    next()
})

module.exports = router
// const{Team,Player}=require('./models')
require('dotenv').config()
const sequelize = require('./db/connect')
const express = require('express')
const api_routes = require('./routes/api_routes')

const app = express()
const PORT = process.env.PORT||3333

app.use(express.json())
app.use('/api', api_routes)

sequelize.sync({force: false})
.then(()=>{
    app.listen(PORT,() => {
        console.log('Server running on port: ', PORT)
    })
})

// const redbulls = await Team.create({
//     manager: 'Jesse Marsch',
//     name:'Red Bulls',
//     type:'soccer'
// console.log(fusion.get({plain: true}))
    // const julie = await Player.findByPk(2,{
    //     include: Team
    // })
    // console.log(julie.get({plain: true}))
    // fusion.addPlayer(john)
    // julie.addTeam(fusion)
    // const fusion = await Team.create({
    //   name: 'Fusion',
    //   type: 'soccer',
    //   manager: 'Will Gallagher'  
    // })
    // const user = await Player.create(
    //     {email: 'fun@test.com',
    //     password: '23ljhdfdfdflkhklh',
    //     first_Name: 'Julie',
    //     last_Name: 'Tester',
    //     age: 30
    // }) 
    
    //     const user = await User.findOne(
    //         {where:{email:'test2@test.com'}, include: Note
    // })

        // user.createNote({
        //     text:'this is a note'
        // })
        // const note = await Note.destroy(
        //     {where:{id:3}}
        // )
       
        // console.log(user)
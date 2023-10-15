const express = require("express")
const app = express()


const userRoute  = require("./route/userRoute")
const organizationRoute  = require("./route/organizationRoute")
const { Server } = require("socket.io")
const { users } = require("./model/index")
app.use(require('cookie-parser')())

// require database 
require("./model/index")

app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    res.render("home")
})

app.use("",userRoute)
app.use("",organizationRoute)



const server = app.listen(3000,()=>{
    console.log("Nodejs has started at port 3000")
})

const io = new Server(server)

io.on("connection",(socket)=>{
    socket.on("register",async (data)=>{
        const {username,password,email} = data
        await users.create({
            username,
            password,
            email
        })
        socket.emit("response",{status : 200,message : 'Registered '})
    })


    // socket.on("hello",(data)=>{
    //     console.log(data)
    //     socket.emit("response","Your data was received in backend")
    // })
})

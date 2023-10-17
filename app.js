const express = require("express")
const app = express()


const userRoute  = require("./route/userRoute")
const organizationRoute  = require("./route/organizationRoute")
const { Server } = require("socket.io")
const { users, sequelize } = require("./model/index")
const { QueryTypes } = require("sequelize")
app.use(require('cookie-parser')())

// require database 
require("./model/index")

app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    res.render("home")
})

// chat page here 
app.get("/chat/:id",(req,res)=>{

    sequelize.query(`CREATE TABLE IF NOT EXISTS chats (
        id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        senderId INT REFERENCES users(id),
        receiverId INT REFERENCES users(id),
        messages VARCHAR(255) NOT NULL

    ) `,{
        type : QueryTypes.CREATE
    })
    res.render("chat")
})

// receiver list 
app.get("/users",async (req,res)=>{
    const usersList  = await users.findAll()
    res.render("users",{usersList})
})

app.use("",userRoute)
app.use("",organizationRoute)



const server = app.listen(3000,()=>{
    console.log("Nodejs has started at port 3000")
})

const io = new Server(server)

io.on("connection",(socket)=>{
    console.log("socketId",socket.id)
    socket.on("message",async(msg)=>{
        // table ma insert
        console.log(msg)
        await sequelize.query(`INSERT INTO chats(senderId,receiverId,messages) VALUES(?,?,?)`,{
            type : QueryTypes.INSERT,
            replacements : [msg.senderId,msg.receiverId,msg.message]
        })

        // token decrypt hannu parney hunchah ani userId grab garnu parney hunchha

        io.emit("broadCastMessage",msg) // broadcast to all connected clients
    })
})

// io.on("connection",(socket)=>{

//         console.log("User connected")
//     socket.on("register",async (data)=>{
//         const {username,password,email} = data
//         await users.create({
//             username,
//             password,
//             email
//         })
//         socket.emit("response",{status : 200,message : 'Registered '})
        
//     })
//     socket.on("disconnect",()=>{
//         console.log("User disconnected")
//     })

//     // socket.on("hello",(data)=>{
//     //     console.log(data)
//     //     socket.emit("response","Your data was received in backend")
//     // })
// })

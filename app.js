const express = require("express")
const app = express()


const userRoute  = require("./route/userRoute")
const organizationRoute  = require("./route/organizationRoute")
app.use(require('cookie-parser')())

// require database 
require("./model/index")

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get("/",(req,res)=>{
    res.send("I am alive")
})

app.use("",userRoute)
app.use("",organizationRoute)



app.listen(3000,()=>{
    console.log("Nodejs has started at port 3000")
})
const express = require('express')
bodyParser  = require("body-parser")
require('./db/mongoose')
const userRouter = require('./routers/user')

const app = express()
const port = process.env.PORT || 3000

//Use routers
// app.use(express.json())
app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({  
    extended: true
  }));
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
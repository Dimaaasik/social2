const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require('./routes/auth_routes')

const app = express();
const PORT = config.get("serverPort");
const URL = config.get("url")

app.use(express.json())
app.use('/api/auth', authRouter)

const start = async () => {
    try{
        await mongoose.connect(URL);
        app.listen(PORT, () => {
            console.log('server started on port', PORT);
        })
    }catch (error){
        console.log(error)
    }
}

start()

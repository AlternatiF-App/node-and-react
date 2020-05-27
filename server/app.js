const express = require('express')
const app = express()
const mongoose =  require('mongoose')
const {MONGOURI} = require('./keys')
const PORT = 5000

require("./models/user")
app.use(express.json())
app.use(require("./routes/auth"))

mongoose.connect(MONGOURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on("connected", () => {
    console.log("connected to mongodb")
})
mongoose.connection.on("error", (err) => {
    console.log("errpr connecting", err)
})

app.listen(PORT, () => {
    console.log("Server is running on", PORT)
})
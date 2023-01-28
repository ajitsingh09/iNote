const connectToMongo=require("./db") 
const express = require('express')

//data base connected
connectToMongo()

const app = express()
const port = 3000

//middlewhere to get the request and to send response between client and backend-database
app.use(express.json())

//Available Routes
app.use("/api/auth" , require("./routes/auth"))
app.use("/api/note" , require("./routes/note"))

app.get('/', (req, res) => {

    res.send('Hello World!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
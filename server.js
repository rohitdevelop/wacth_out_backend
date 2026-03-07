require('dotenv').config()
const app = require("./src/app")
const Dbconnect = require("./src/config/database")

const port = 3000

Dbconnect()   // database connection runs here

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
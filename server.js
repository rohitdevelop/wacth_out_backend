const app = require("./src/app")
const connect =  require("./src/config/database")
require('dotenv').config()

 const port = 3000
connect()
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

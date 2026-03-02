require('dotenv').config()
const app = require("./src/app")
// const dns = require("dns")
const Dbconnect =  require("./src/config/database")
const port = 3000
Dbconnect()



// dns.setServers(["1.1.1.1","8.8.8.8"])

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

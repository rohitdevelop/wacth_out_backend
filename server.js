require('dotenv').config()
const app = require("./src/app")
const Dbconnect =  require("./src/config/database")
const authRouter = require("./src/routes/auth.routes")

 const port = 3000
Dbconnect()

app.use('/api', authRouter);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

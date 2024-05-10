const express = require("express")
const app = express()
const port = process.env.PORT || 3500
const cors = require('cors')

const db = require("./config/db")
const router = require('./routes/index')
const loginRouter = require('./routes/authRouter')
const sequelize = require('./config/db')

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use('/login', loginRouter)
app.get('/', (req, res) => {
    res.status(200).json({ message: 'helo' })
})

const start = async () => {
    try {

        await sequelize.authenticate()
        await sequelize.sync({ alter: true })
        app.listen(port, () => console.log('11'))
    } catch (e) {
        console.log(e)
    }
}
start()
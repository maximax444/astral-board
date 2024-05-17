const express = require("express")
const app = express()
const port = process.env.PORT || 3500
const cors = require('cors')

const db = require("./config/db")
const router = require('./routes/index')
const loginRouter = require('./routes/authRouter')
const setupRouter = require('./routes/setupRouter')
const sequelize = require('./config/db')
const { Settings } = require("./entity/Settings")

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))
app.use('/api', router)
app.use('/login', loginRouter)
app.use('/setup', setupRouter)
app.get('/', (req, res) => {
    res.status(200).json({ message: 'helo' })
})

const start = async () => {
    try {

        await sequelize.authenticate()
        await sequelize.sync({ alter: true })
        Settings.findOne({ where: { slug: "title" } }).then((set1 => {
            if (!set1) {
                Settings.create({
                    title: "Название сайта",
                    descr: "Title",
                    slug: "title",
                    val: ""
                })
            }
        }))
        Settings.findOne({ where: { slug: "descr" } }).then((set2 => {
            if (!set2) {
                Settings.create({
                    title: "Краткое описание",
                    descr: "Description",
                    slug: "descr",
                    val: ""
                })
            }
        }))
        Settings.findOne({ where: { slug: "reading" } }).then((set3 => {
            if (!set3) {
                Settings.create({
                    title: "Количество постов",
                    descr: "Количество постов блога, выводящихся на странице",
                    slug: "reading",
                    val: "10"
                })
            }
        }))
        app.listen(port, () => console.log('11'))
    } catch (e) {
        console.log(e)
    }
}
start()
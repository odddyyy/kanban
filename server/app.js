require(`dotenv`).config()
const cors = require(`cors`)
const express = require(`express`)
const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended:false }))
app.use(cors())
app.use(express.json())


app.get(`/`,(req, res, next) => {
    res.status(200).json({
        message:`HELLO WORLD GW BISA DEPLOY NEH - ODDY -`
    })
})




app.listen(port, () => {
    console.log(`Listening on port:${port}`)
})
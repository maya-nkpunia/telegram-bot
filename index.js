const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
require("dotenv").config()

const app = express();
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}))

app.post("/new-message", function(req, res) {
    const {message} = req.body

    if(!message || message.text.toLowerCase().indexOf("marco") < 0){
        return res.end()
    }

    axios.post(
        `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
        {
            chat_id: message.chat.id,
            text: "Polo!!",
        }
    )
    .then((response) => {
        console.log("Message posted")
        res.end("OK")
    })
    .catch((err) => {
        console.log("Error :", err)
        res.status(500).send("Error :", err)
    })
})

app.listen(3000, function() {
    console.log("Telegram app listening on port 3000!")
})
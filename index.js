const express = require("express");
const path = require("path")
const { connectToMongoDB } = require("./connect")

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")

const URL = require("./models/url")
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/', staticRoute)
app.use("/url", urlRoute);
app.use("/user", userRoute)

const PORT = 8000;

connectToMongoDB('mongodb://localhost:27017/short-url').then(() => console.log("mongoDB connected"))


app.set('view engine', "ejs");
app.set('views', path.resolve("./views"))

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: {timestamp: Date.now()}} },
        { new: true }
    );
    if (!entry) return res.status(404).send("Short URL not found");
    return res.redirect(entry.redirectURL);
})

app.listen(PORT, () => {
    console.log(`App is Running in Port ${PORT}`);

})
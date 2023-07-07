const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDatabase = require("./config/database")

const app = express();
const env = require("dotenv");

// routes kkkkkkkkkkkkkk
// const defaultroutes = require("./routes/index");
// const adminRoutes = require("./routes/admin/auth")


// env config
env.config();


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

// Connecting to database
connectDatabase();

app.get('/', (req, res) => {
    res.status(200).send({
        data: 'Default Route',
    })
})
app.use("/api", defaultroutes)
app.use("/api", adminRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
})
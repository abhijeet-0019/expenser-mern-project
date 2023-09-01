const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const app = express();
const cors = require("cors");

// micddlewares
app.use(cors());
app.use(express.json());

const routes = require("./routes/transactions");
app.use("/api/v1/", routes);

const dbConnect = require("./config/database")
dbConnect();

app.listen(PORT, ()=>{
    console.log('hello world from localhost:4000');
});

app.get("/", (req, res)=>{
    res.send(`<h2>hello there mate</h2>`);
    console.log("-->");
})
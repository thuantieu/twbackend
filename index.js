const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const router= require("./router/user.router");
dotenv.config();
require('./db_connection/mongodb.connection')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT;

app.get("/", (req, res) => res.send("TW Social Api"));
app.use("/api/users", router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

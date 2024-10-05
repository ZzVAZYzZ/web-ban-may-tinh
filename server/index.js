const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const bodyParser = require("body-parser");


require("dotenv").config();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', require("./routes/postTransactionRoute"))
app.use('/', require("./routes/checkTransactionRoute"));

const {connectDb} = require('./databases/mongodb/connectMongo')






connectDb()



app.get("/test", (req, res) => {
  res.send("Hello World!");
});

app.get("/checkTransaction", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

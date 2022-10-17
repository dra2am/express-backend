const express = require("express");
var cors = require("cors");
require("./database/db");
const userRouter = require("./routers/userRouter");

const app = express();
const port = process.env.port || 3002;

//use CORS
app.use(cors());
//parse incoming JSON
app.use(express.json());
//register routers
app.use(userRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

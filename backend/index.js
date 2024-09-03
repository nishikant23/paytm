const express = require("express");
const cors = require("cors");
const { router } = require("./routes");
const mainRouter = require("./routes/index");;
const app = express();
app.use(cors());
app.use(express.json());
app.listen(3001);

app.use("/api/v1", mainRouter);



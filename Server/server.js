const express = require("express");
require("./config/db").connectDB();
require("dotenv").config();
const app = express();
const User_api = require("./routes/userRoute");
const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/user", User_api);
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

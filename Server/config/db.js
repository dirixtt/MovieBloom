const mongoose = require("mongoose");
exports.connectDB = async () => {
  await mongoose
    .connect("mongodb://localhost:27017/farali")
    .then(() => console.log("Mongodb ga ulanish hosil qilindi"))
    .catch((err) => {
      console.log("Malumot Bazasiga ulanishda hatolik bor");
      console.log(err);
      process.exit();
    });
};

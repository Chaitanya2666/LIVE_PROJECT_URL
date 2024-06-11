const { default: mongoose } = require("mongoose");

const useSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  Email: {
    type: String,
  },
  Password: {
    type: String,
  },
});
const Login = mongoose.model("Login", useSchema);
module.exports = Login;

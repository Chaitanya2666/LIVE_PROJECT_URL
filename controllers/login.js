const Login = require("../models/login");

const { setUser } = require("../service/auth");

const handleLogin = async (req, res) => {
  const { Name, Email, Password } = req.body;

  await Login.create({
    Name: Name,
    Email: Email,
    Password: Password,
  });
  return res.redirect("login");
};

const handleLoginCheck = async (req, res) => {
  const { Email, Password } = req.body;

  const data = await Login.findOne({ Email, Password });
  if (!data) return res.render("login", { err: "invalid data" });

  const token = setUser(data);
  // res.cookie("token", token);
  return res.json(token);
};

module.exports = { handleLogin, handleLoginCheck };

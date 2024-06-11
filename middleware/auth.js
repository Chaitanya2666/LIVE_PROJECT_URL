const { getUser } = require("../service/auth");
const restrictionForLoginUser = (req, res, next) => {
  const userId = req.headers["authorization"];
  // if (!userId) return res.redirect("/login");
  const token = userId.split("Bearer")[1];
  const user = getUser(userId);
  // if (!user) return res.redirect("/login");
  req.user = user;
  console.log(user);
  next();
};

module.exports = { restrictionForLoginUser };

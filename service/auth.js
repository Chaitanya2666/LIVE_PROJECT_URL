const jwt = require("jsonwebtoken");
const Skey = "Chai%rtan&ya@";

const setUser = (data) => {
  return jwt.sign(
    {
      Name: data.Name,
      Email: data.Email,
    },
    Skey
  );
};

const getUser = (token) => {
  if (!token) return null;

  return jwt.verify(token, Skey);
};

module.exports = { setUser, getUser };

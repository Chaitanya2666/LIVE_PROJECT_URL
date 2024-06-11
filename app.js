require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const path = require("path");
const app = express();
const cookies = require("cookie-parser");
const StaticROuter = require("./routes/StaticRoute");
const Route = require("./routes/Login");
const cookieParser = require("cookie-parser");
const { restrictionForLoginUser } = require("./middleware/auth");

// console.log("PORT:", process.env.PORT);
// console.log("MONGO_URL:", process.env.MONGO_URL);

const PORT = process.env.PORT;

connectToMongoDB(process.env.MONGO_URL)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", urlRoute);
app.use("/", StaticROuter);
app.use("/user", Route);

app.get("/ola/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: { visitHistory: { timestamp: Date.now() } },
    }
  );

  res.redirect(entry.redirectURL);
});
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));

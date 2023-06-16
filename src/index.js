require("dotenv").config();
const express = require("express");
const app = express();
const route = require("./routes/route");
const upload = require("./middleware/multer");
const { verifyToken } = require("./middleware/validate");
const cors = require("cors");

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/", route);
app.use("/assets", express.static("public/images"));
app.post("/upload", upload.single("avatar"), (req, res) => {
  res.status(201).json({ message: "Upload successfully" });
});
app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected Route" });
});

app.get("/", (req, res) => {
  res.json({
    message: "API Success",
  });
});

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});

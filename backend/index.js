const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 8000;

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());

let latestUser = null;

app.post("/api/user", (req, res) => {
  const { firstName, lastName, dob } = req.body;
  if (!firstName || !lastName || !dob) {
    return res.json({ success:false,message: "All fields are required" });
  }
  latestUser = { firstName, lastName, dob };
  res.json({success:true, message: "User saved successfully" });
});

app.get("/api/user", (req, res) => {
  if (!latestUser) {
    return res.json({success:true, message: "No user found" });
  }
  res.json(latestUser);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

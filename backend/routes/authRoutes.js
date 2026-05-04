const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");

// ---------------- MULTER CONFIG ----------------
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ----------- SIGNUP -----------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json("User already exists");

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashed });
    await user.save();

    res.json("User Registered Successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// --------- LOGIN ---------
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json("User not found");

        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) return res.status(400).json("Invalid password");

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json(err.message);
    }
});
// ------------ PROFILE ------------

router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
});

// ------------------- IMAGE UPLOAD -------------------
router.post("/upload", auth, upload.single("image"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.image = req.file.filename;
    await user.save();

    res.json({
      message: "Image uploaded",
      file: req.file.filename
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
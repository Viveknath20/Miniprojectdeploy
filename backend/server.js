const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

//static folder for images
app.use("/uploads", express.static("uploads"));

//routes
app.use("/api/auth", require("./routes/authRoutes"));

app.listen(process.env.PORT,()=>
    console.log(`Server Running on Port $(process.env.PORT)`)
);
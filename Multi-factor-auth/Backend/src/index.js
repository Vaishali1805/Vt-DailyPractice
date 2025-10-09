import express, { urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import authRoute from "./routes/authRoutes.js";

dotenv.config(); //it can fetch values from dotenv file
dbConnect();

const app = express();

//Middlewares
const corsOption = {
  origin: ["http://localhost:3001"],
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json({ limit: "100mb" }));
app.use(urlencoded({ limit: "100mb", extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/api/auth',authRoute);

//Listen
const PORT = process.env.PORT || 4401;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT: ${PORT}`);
});

import express from "express";
import routes from "./routes";
import passport from "passport";
import passportConfig from "./config/passport";
import dotenv from "dotenv";
dotenv.config();
const PORT = 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passportConfig(passport);

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

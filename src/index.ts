import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import routes from "./routes";
const PORT = 8000;

const app = express();
app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

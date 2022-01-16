import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class AuthController {
  static login = async (req: Request, res: Response) => {
    return res.status(200).send("Login Route");
  };
}

export default AuthController;

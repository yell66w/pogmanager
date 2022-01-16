import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

export const userSelect = {
  username: true,
  id: true,
  role: true,
  created_at: true,
  updated_at: true,
  profile: true,
};

class AuthController {
  static login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).send("Please input your username and password.");
    }
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user) {
        return res.status(404).send("Incorrect username or password.");
      }
      if (!this.isPasswordValid(password, user.password)) {
        return res.status(401).send("Incorrect username or password.");
      }
      if (process.env.JWT_SECRET) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return res.status(200).send({
          token: `${token}`,
          user: {
            id: user.id,
            role_id: user.role_id,
            username: user.username,
          },
        });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  };

  static register = async (req: Request, res: Response) => {
    const { username, password, IGN } = req.body;
    if (!username || !password) {
      return res.status(400).send("Please input your username and password.");
    }
    if (!IGN) {
      return res.status(400).send("Please input your IGN");
    }
    try {
      const user = await prisma.user.create({
        data: {
          username,
          password: this.hashPassword(password),
          profile: {
            create: {
              IGN,
            },
          },
        },
        select: userSelect,
      });
      return res.status(200).send(user);
    } catch (error: any) {
      if (error.code === "P2002") {
        return res.status(400).send("Username already taken.");
      }
      if (error.message) {
        return res.status(400).send(error.message);
      }
      return res.status(400).send("Something went wrong. Please try again.");
    }
  };

  static profile = async (req: Request, res: Response) => {
    try {
      return res.status(200).send(req.user);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  };

  static editProfile = async (req: Request, res: Response) => {
    const { old_password, new_password, IGN } = req.body;
    const authUser = req.user as { id: number };
    let data = {};

    if (old_password && new_password) {
      const _user = await prisma.user.findUnique({
        where: { id: authUser.id },
      });
      if (
        _user?.password &&
        this.isPasswordValid(old_password, _user?.password)
      ) {
        data = {
          password: this.hashPassword(new_password),
        };
      } else {
        return res.status(401).send("Invalid Password");
      }
    }
    if (IGN) {
      data = {
        ...data,
        profile: {
          update: {
            IGN,
          },
        },
      };
    }

    if (Object.keys(data).length === 0) {
      return res.status(200).send("Nothing to change.");
    }
    try {
      const user = await prisma.user.update({
        data,
        where: {
          id: authUser.id,
        },
        select: userSelect,
      });
      return res.status(200).send(user);
    } catch (error: any) {
      return res.status(400).send(error.message);
    }
  };

  static isPasswordValid(unencryptedPassword: string, password: string) {
    return bcrypt.compareSync(unencryptedPassword, password);
  }

  static hashPassword(password: string) {
    return bcrypt.hashSync(password, 8);
  }
}

export default AuthController;

import { PrismaClient } from "@prisma/client";
import { Strategy, ExtractJwt } from "passport-jwt";
const prisma = new PrismaClient();

let opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
export default (passport: any) => {
  passport.use(
    new Strategy(opts, async function (jwt_payload, done) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: jwt_payload.id,
          },
          select: {
            username: true,
            id: true,
            role: true,
            created_at: true,
            updated_at: true,
            profile: true,
          },
        });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
};

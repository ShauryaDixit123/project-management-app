/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";
import * as bcrpt from "bcrypt";

export const userValidation = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
});

export const allowedURLs = [
  "api/post/ping",
  "/api/user/create",
  "/api/user/signIn",
];

export const hashPassword = (password: string): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return bcrpt.hashSync(password, 4);
};

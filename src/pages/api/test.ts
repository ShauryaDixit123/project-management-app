/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { type NextApiRequest, type NextApiResponse } from "next";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { TRPCError } from "@trpc/server";
import { createTRPCContext } from "../../server/api/trpc";
import { UserDaos } from "../../server/daos/user";
import { Prisma } from "@prisma/client";
import { userValidation } from "../../server/validations/user";
import { api } from "~/utils/api";
import { appRouter, createCaller } from "~/server/api/root";

const testHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const ctx = createTRPCContext({ req, res });
  const caller = createCaller(ctx);
  try {
    const body: Prisma.UserCreateInput = req.body;
    const resp = await caller.user.createAdmin({
      email: body.email,
      name: body.name ?? "",
      password: body.password,
    });
    res.status(200).json(resp);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    res.status(500).json(cause);
  }
};
export default testHandler;

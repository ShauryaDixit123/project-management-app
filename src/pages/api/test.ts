/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { type NextApiRequest, type NextApiResponse } from "next";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { TRPCError } from "@trpc/server";
import { createTRPCContext } from "../../server/api/trpc";
import { createCaller } from "~/server/api/root";
import { Prisma } from "@prisma/client";

const testHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const ctx = createTRPCContext({ req, res });
  const caller = createCaller(ctx);
  // let dd: Date = new Date();
  try {
    const body = req.body;
    // if (typeof body.dueDate === "string") {
    //   dd = new Date(body.dueDate); // Convert string to Date
    // } else {
    //   dd = body.dueDate; // Already a Date, no conversion necessary
    // }
    const resp = await caller.task.createStory({
      id: undefined,
      dueDate: new Date(body.dueDate as string),
      title: body.title,
      des: body.des ?? undefined, // Ensure this is not null
      stage: body.stage,
      priority: body.priority,
      teamId: body.teamId, // Add this
      createdBy: body.createdBy,
    });
    res.status(200).json(resp);
  } catch (cause) {
    console.log(cause, "xzczxcxzc");
    if (cause instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    res.status(500).json(cause);
  }
};
export default testHandler;

import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

// FIREBASE ADMIN
import firebaseAdmin from "config/firebase-admin";

export const authenticated = (fn: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const token = req.headers.authorization;

  try {
    await firebaseAdmin.auth().verifyIdToken(token);

    return await fn(req, res);
  } catch (error) {
    res.status(401).json({ message: "Sorry you are not authenticated" });
  }
};

import { NextApiRequest, NextApiResponse } from "next";

// FIREBASE
import firebaseAdmin from "config/firebase-admin";

// MIDDLEWARE
import { authenticated } from "middleware/auth";

// MODEL
import { Blog } from "model/Blog";

export default authenticated(
  async (req: NextApiRequest, res: NextApiResponse<Blog[]>) => {
    const data = firebaseAdmin.firestore().collection("blog");
    const response: Blog[] = [];

    const snapshot = await data.get();

    snapshot.forEach((v) => {
      const blog = v.data() as Blog;

      response.push({ ...blog, id: v.id });
    });

    res.status(200).json(response);
  }
);

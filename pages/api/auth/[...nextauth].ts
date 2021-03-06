import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// FIREBASE
import firebase from "config/firebase";

import firebaseAdmin from "config/firebase-admin";

const providers = [
  Providers.Credentials({
    id: "email",
    name: "email",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials: any) => {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(credentials.email, credentials.password);

        const token = await response.user.getIdToken();
        const email = response.user.email;
        const userUID = response.user.uid;

        const checkAdmin = await (
          await firebaseAdmin
            .firestore()
            .collection("admin")
            .where("uid", "==", userUID)
            .get()
        ).docs[0];

        return {
          status: "success",
          data: {
            email,
            token,
            isAdmin: !!checkAdmin,
          },
        };
      } catch (e) {
        console.log(e);
        return {
          status: "failure",
          data: null,
        };
      }
    },
  }),
];

const callbacks = {
  async signIn(user) {
    if (user.status === "failure") {
      return false;
    }

    return true;
  },

  async jwt(token, user) {
    if (user) {
      token.accessToken = user.data.token;
      token.email = user.data.email;
      token.isAdmin = user.data.isAdmin;
    }

    return token;
  },

  async session(session, token) {
    session.user = {
      accessToken: token.accessToken,
      email: token.email,
      isAdmin: token.isAdmin,
    };

    return session;
  },
};

const options = {
  providers,
  callbacks,
};

export default (req, res) => NextAuth(req, res, options);

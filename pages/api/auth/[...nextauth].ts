import NextAuth from "next-auth";
import Providers from "next-auth/providers";

// FIREBASE
import firebase from "config/firebase";

const providers = [
  Providers.Credentials({
    id: "email",
    name: "email",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    authorize: async (credentials: any) => {
      console.log(credentials);
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(credentials.email, credentials.password);

        const token = await response.user.getIdToken();
        const email = response.user.email;

        if (response) {
          return {
            status: "success",
            data: {
              email,
              token,
            },
          };
        }
      } catch (e) {
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
      token.accessToken = await user.token;
    }

    return token;
  },

  async session(session, token) {
    session.accessToken = token.accessToken;

    return session;
  },
};

const options = {
  providers,
  callbacks,
  pages: {
    error: "/signin", // Changing the error redirect page to our custom login page
  },
};

export default (req, res) => NextAuth(req, res, options);

export default {
  // FIREBASE
  FIREBASE: {
    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    AUTH_DOMAIN: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    STORAGE_BUCKET: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    APP_ID: process.env.NEXT_PUBLIC_APP_ID,
  },
  FIREBASE_ADMIN: {
    PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    PRIVATE_KEY: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(
      /\\n/g,
      "\n"
    ),
    CLIENT_EMAIL: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  },
  APP: {
    API: process.env.NEXT_PUBLIC_BACKEND_API,
  },
  URL: {
    POST: {
      MAIN_ROUTE: "blog",
      GET_POST: "api/blogs",
    },
  },
};

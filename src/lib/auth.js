import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";
// import { jwt } from "better-auth/plugins";

const client = new MongoClient(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.tfpkery.mongodb.net/?appName=Cluster0`,
);
const db = client.db("startup");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
  user: {
    additionalFields: {
      role: {
        default: "Collaborator",
      },
      plan: {
        default: "free",
      },
      isBlocked: {
        default: false,
      },
    },
  },
  plugins: [admin()],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  // session: {
  //   cookieCache: {
  //     enabled: true,
  //     strategy: "jwt",
  //     // max 7 days
  //     maxAge: 7 * 24 * 60 * 60,
  //   },
  // },
  // plugins: [jwt()],
});

import express from 'express';
import HelloRoutes from './Hello.js';
import Lab5 from './Lab5/index.js';
import UserRoutes from "./Kanbas/Users/routes.js"
import cors from "cors";
import "dotenv/config";
import session from "express-session"; // import new server session library


const app = express();
app.use(
    cors({
        credentials: true,                                          // support cookies
        origin: process.env.NETLIFY_URL || "http://localhost:3000", // restrict cross origin resource
    }));                                                            // sharing to the react application
    const sessionOptions = {
        secret: process.env.SESSION_SECRET || "kanbas",
        resave: false,
        saveUninitialized: false,
    };
    if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
    }
    app.use(session(sessionOptions));

app.use(express.json());

// Register routes
UserRoutes(app);

Lab5(app);
HelloRoutes(app);


app.listen(process.env.PORT || 4000);
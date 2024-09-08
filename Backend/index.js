import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import Db_Connect from './Utils/Db.js';  // Correct path and syntax for default import
import userrouter from './Router/user.route.js';
import companyrouter from './Router/Company.route.js';
import jobrouter from './Router/job.route.js';
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsoption = {
    origin: "http://localhost:5173",  // Corrected to a valid URL format
    credentials: true
};

app.use(cors(corsoption));

const port = process.env.PORT;
app.use("/api/v1/user", userrouter)
app.use("/api/v2/company", companyrouter)
app.use("/api/v3/jobs", jobrouter)
app.listen(port, () => {
    Db_Connect();  // This should work if the import is correct
    console.log(`App is running on port ${port}`);
});

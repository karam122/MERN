import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./Routes/index.js";
import {signUp,signIn} from './controllers/userController.js'
import {UserProfile} from './controllers/userProfile.js'
import { AddNewDev,GetDeveloper } from "./controllers/devController.js";
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors({origin: true, credentials: true}));

app.use('/signUp', signUp)
app.use('/signIn', signIn)
app.use('/user-profile/:id', UserProfile)
app.use('/add-developer',AddNewDev)
app.use('/getAll-developes/:paginate',GetDeveloper)

// database mongoDB connecting

const CONNECTION_URL =
  "mongodb+srv://karam:karam123@cluster0.af3ytx0.mongodb.net/test";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server is Running on PORT ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error.message);
  });
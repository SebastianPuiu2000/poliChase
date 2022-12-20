import express from "express"
import bodyParser from "body-parser"

import { connectMongo } from "./mongo"
import { register } from "./handlers/register"
import { login } from "./handlers/login"

const main = async () => {
  await connectMongo();

  const app = express();

  app.use(bodyParser.json());

  app.post('/register', register);
  app.post('/login', login);

  app.listen(3000, () => console.log("server started"));
}

main()

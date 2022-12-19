import express from "express"
import bodyParser from "body-parser"

import { connectMongo } from "./mongo"
import { register } from "./handlers/register"

const main = async () => {
  await connectMongo();

  const app = express();

  app.use(bodyParser.json());

  app.post('/register', register);

  app.listen(3000, () => console.log("server started"));
}

main()

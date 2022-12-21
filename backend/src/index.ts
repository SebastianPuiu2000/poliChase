import express from "express"
import bodyParser from "body-parser"
import user from "./models/user"

import { connectMongo } from "./mongo"
import { register } from "./handlers/register"
import { login } from "./handlers/login"

const main = async () => {
  await connectMongo();

  const app = express();

  app.use(bodyParser.json());

// TESTING ZONE START //
  // const persons = [
  //   { name: "Mihnea1", email: "mihnea1@yahoo.com", password: "parola", coordinates: [125.4, 15.4] },
  //   { name: "Sebastian1", email: "sebi1@yahoo.com", password: "password", coordinates: [1.3, 3.6] }
  // ];

  // for (const person of persons) {
  //   user.methods.createUser(person.name, person.email, person.password, person.coordinates);
  //   console.log(`Created user ${person.name} ${person.email}`);
  // }
// TESTING ZONE END //

  app.post('/register', register);
  app.post('/login', login);

  app.listen(3000, () => console.log("server started"));
}

main()

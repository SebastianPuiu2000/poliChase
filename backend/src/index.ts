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
  //   { name: "Mihnea2", email: "mihnea2@yahoo.com", password: "parola", coordinates: [125.4, 15.4], bomb: false, cooldown: 0, score: 0 },
  //   { name: "Sebastian2", email: "sebi2@yahoo.com", password: "password", coordinates: [1.3, 3.6], bomb: false, cooldown: 0, score: 0 }
  // ];

  // for (const person of persons) {
  //   user.methods.createUser(person.name, person.email, person.password, person.coordinates, person.bomb, person.cooldown, person.score);
  //   console.log(`Created user ${person.name} ${person.email}`);
  // }
// TESTING ZONE END //

  app.post('/register', register);
  app.post('/login', login);

  app.listen(3000, () => console.log("server started"));
}

main()

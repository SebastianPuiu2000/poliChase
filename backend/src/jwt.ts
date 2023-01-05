import jwt from "jsonwebtoken";
import { parse } from "url";

const jwtSecret: string = process.env.JWT_SECRET || "123456";
const tokenExpirationInSeconds = 36000;

export const getToken = (url: string | undefined): string | null => {
  const token = parse(url || "", true).query.token;

  if (!token) return null;

  return token.toString();
};

export const sign = (id: any, name: string) => {
  return jwt.sign({ id: id, name: name }, jwtSecret, {
    expiresIn: tokenExpirationInSeconds,
  });
};

export const verify = (token: string) => {
  let payload = jwt.verify(token, jwtSecret);

  if (typeof payload == "string") {
    throw new Error();
  }

  return payload
};

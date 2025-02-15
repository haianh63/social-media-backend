import sql from "./db.js";
import bcrypt from "bcrypt";
const createUser = async ({ username, password, email }) => {
  const user = await findUserByUsername(username);
  if (user.length > 0) {
    throw new Error(`Username ${username} exists!`);
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const result = await sql`
  INSERT INTO Users (username, password, email) 
  VALUES (${username}, ${hashedPassword}, ${email})

  returning username, email
  `;

  return result;
};

const findUserByUsername = async (username) => {
  const result = await sql`
    SELECT * 
    FROM Users 
    WHERE username = ${username}
    `;

  return result;
};

export { createUser, findUserByUsername };

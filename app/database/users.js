import sql from "./db.js";
import bcrypt from "bcrypt";
const createUser = async ({ username, password, name }) => {
  const user = await findUserByUsername(username);
  if (user.length > 0) {
    throw new Error(`Username ${username} exists!`);
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const result = await sql`
  INSERT INTO Users (username, password, name) 
  VALUES (${username}, ${hashedPassword}, ${name})

  returning username, name
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

const findUserByName = async (keyword) => {
  const result = await sql`
  SELECT user_id, avatar_src, name 
  FROM Users
  WHERE name ILIKE ${keyword + "%"}
  `;

  return result;
};
const findUserByUserId = async (userId) => {
  const result = await sql`
    SELECT user_id, name, avatar_src, cover_src 
    FROM Users 
    WHERE user_id = ${userId}
    `;

  return result;
};

const updateUserProfile = async (user) => {
  const columns = [];
  if (user.name) {
    columns.push("name");
  }

  if (user.avatar_src) {
    columns.push("avatar_src");
  }

  if (user.cover_src) {
    columns.push("cover_src");
  }
  const result = await sql`
  UPDATE users
  SET ${sql(user, columns)}
  WHERE user_id = ${user.user_id}`;

  return result;
};
export {
  createUser,
  findUserByUsername,
  findUserByUserId,
  updateUserProfile,
  findUserByName,
};

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByUsername } from "../database/users.js";
const signUp = async (req, res) => {
  try {
    const result = await createUser(req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: error.message,
    });
  }
};

const signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);

    if (user.length == 0) {
      return res.status(401).json({
        success: false,
        data: "Invalid username or password",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user[0].password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        data: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user[0].user_id,
        name: username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      data: error.message,
    });
  }
};

export { signUp, signIn };

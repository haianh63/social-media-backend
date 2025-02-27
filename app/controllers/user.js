import {
  findUserByName,
  findUserByUserId,
  updateUserProfile,
} from "../database/users.js";

const uploadPath = "uploads";
const searchUser = async (req, res) => {
  try {
    const keyword = req.query.name;
    const result = await findUserByName(keyword);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getUserInfo = async (req, res) => {
  const userId = req.params.id;
  try {
    let user = await findUserByUserId(userId);
    user.length === 0 ? (user = null) : (user = user[0]);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: error.message,
    });
  }
};

const editProfile = async (req, res) => {
  const userId = req.params.id;
  if (!req.body.name && !req.files["avatar"] && !req.files["cover"]) {
    res.sendStatus(400);
  }

  const name = req.body.name || null;

  let avatarFile = req.files["avatar"];
  if (avatarFile) avatarFile = avatarFile[0];
  let coverFile = req.files["cover"];
  if (coverFile) coverFile = coverFile[0];
  const avatarFilePath = avatarFile ? avatarFile.path : null;

  const coverFilePath = coverFile ? coverFile.path : null;

  try {
    const result = await updateUserProfile({
      user_id: userId,
      name: name,
      avatar_src: avatarFilePath,
      cover_src: coverFilePath,
    });

    return res.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
};

export { searchUser, getUserInfo, editProfile };

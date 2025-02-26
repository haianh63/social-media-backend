import {
  createPost,
  createPostReaction,
  deletePostByPostId,
  getAllPost,
  getPostByUserId,
  getPostReaction,
} from "../database/posts.js";
import deleteFile from "../utils/deleteFile.js";
const uploadPath = "uploads";

const getPosts = async (req, res) => {
  try {
    const result = await getAllPost();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

const getUserPosts = async (req, res) => {
  try {
    const result = await getPostByUserId(req.params.id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400);
  }
};

const createUserPost = async (req, res) => {
  if (!req.body.content && !req.file) {
    return res.sendStatus(400);
  }

  const content = req.body.content || null;
  const file = req.file;
  const filePath = file ? `${uploadPath}/${req.file.filename}` : null;

  try {
    const result = await createPost({
      userId: req.params.id,
      content,
      image: filePath,
    });
    console.log(result);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(400);
  }
};

const reactPost = async (req, res) => {
  try {
    const userId = req.userId;
    const postId = req.body.postId;
    const reactionId = req.body.reactionId;

    await createPostReaction({ userId, postId, reactionId });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
};

const getReaction = async (req, res) => {
  try {
    const postId = req.params.postId;
    const result = await getPostReaction(postId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const result = await deletePostByPostId(postId);
    if (result.length > 0) {
      deleteFile(`public/${result[0].img_src}`);
    }
    return res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(400);
  }
};
export {
  getPosts,
  getUserPosts,
  createUserPost,
  reactPost,
  getReaction,
  deletePost,
};

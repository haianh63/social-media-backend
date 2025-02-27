import {
  createPost,
  createPostReaction,
  deletePostByPostId,
  getAllPost,
  getPostByUserId,
  getPostReaction,
} from "../database/posts.js";

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

  const content = req.body.content || "";
  const file = req.file;
  const filePath = file ? file.path : null;

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
    await deletePostByPostId(postId);
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

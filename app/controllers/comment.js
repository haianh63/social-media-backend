import {
  createComment,
  deleteComment,
  getComment,
} from "../database/comments.js";
const getPostComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const result = await getComment(postId);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

const postComment = async (req, res) => {
  try {
    const { content, parent_comment_id } = req.body;
    const user_id = req.userId;
    const post_id = req.params.postId;
    const result = await createComment({
      content,
      parent_comment_id,
      user_id,
      post_id,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

const deletePostComment = async (req, res) => {
  try {
    await deleteComment({
      postId: req.params.postId,
      commentId: req.params.commentId,
      userId: req.userId,
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

export { getPostComment, postComment, deletePostComment };

import sql from "./db.js";
const createComment = async ({
  content,
  parent_comment_id,
  user_id,
  post_id,
}) => {
  const result = await sql`
  INSERT INTO comments(content, parent_comment_id, user_id, post_id)
  VALUES (${content}, ${parent_comment_id}, ${user_id}, ${post_id})
  returning comment_id, content, created_at, parent_comment_id, user_id`;

  return result;
};

const getComment = async (postId) => {
  const result = await sql`
    SELECT comment_id, content, comments.created_at, parent_comment_id, comments.user_id, name, avatar_src
    FROM comments
    INNER JOIN users ON comments.user_id = users.user_id
    WHERE post_id = ${postId};
    `;

  return result;
};

const deleteComment = async ({ postId, commentId, userId }) => {
  await sql`
  DELETE FROM comments
  WHERE comment_id = ${commentId} AND user_id = ${userId} AND post_id = ${postId}
  `;
};

export { createComment, getComment, deleteComment };

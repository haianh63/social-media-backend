import sql from "./db.js";
const createPost = async ({ userId, content, image }) => {
  const result = await sql`
    INSERT INTO Posts (user_id, content, img_src) 
    VALUES (${userId}, ${content}, ${image})

    returning user_id, content, img_src
    `;
  return result;
};

const getPostByUserId = async (userId) => {
  const result = await sql`
    SELECT *
    FROM Posts
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    `;
  return result;
};

const deletePostByPostId = async (postId) => {
  const result = await sql`
  DELETE FROM Posts
  WHERE post_id = ${postId}

  returning img_src
  `;
  return result;
};

const createPostReaction = async ({ userId, postId, reactionId }) => {
  await sql`
    INSERT INTO user_post_reactions (user_id, post_id, reaction_id)
    VALUES (${userId}, ${postId}, ${reactionId})
    ON CONFLICT (user_id, post_id)
    DO UPDATE SET reaction_id = EXCLUDED.reaction_id;
  `;
};

const getPostReaction = async (postId) => {
  const result = sql`
  SELECT user_post_reactions.user_id, reaction_id, name, avatar_src
  FROM user_post_reactions
  INNER JOIN users ON user_post_reactions.user_id = users.user_id
  WHERE post_id = ${postId}
  `;

  return result;
};

const getAllPost = async () => {
  const result = await sql`
  SELECT post_id, users.user_id, content, img_src, avatar_src, Posts.created_at
  FROM Posts
  INNER JOIN users ON Posts.user_id = users.user_id
  ORDER BY Posts.created_at DESC
  `;

  return result;
};
export {
  createPost,
  getPostByUserId,
  deletePostByPostId,
  createPostReaction,
  getPostReaction,
  getAllPost,
};

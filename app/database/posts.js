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

export { createPost, getPostByUserId, deletePostByPostId };

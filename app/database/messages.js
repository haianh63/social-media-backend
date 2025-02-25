import sql from "./db.js";
const saveMessages = async ({ sender_id, receiver_id, content }) => {
  const result = await sql`
    INSERT INTO messages(sender_id, receiver_id, content)
    VALUES (${sender_id}, ${receiver_id}, ${content})
    returning *
    `;

  return result;
};

const getMessages = async ({ sender_id, receiver_id }) => {
  const result = await sql`
    SELECT sender_id, receiver_id, name, avatar_src, content
    FROM messages
    INNER JOIN users ON messages.sender_id = users.user_id
    WHERE (sender_id = ${sender_id} and receiver_id = ${receiver_id}) or (sender_id = ${receiver_id} and receiver_id = ${sender_id})
    ORDER BY messages.created_at
    `;

  return result;
};

const getUserSendMessage = async ({ userId }) => {
  const result = await sql`
  SELECT DISTINCT receiver_id, name, avatar_src
  FROM messages
  INNER JOIN users ON messages.receiver_id = users.user_id
  WHERE messages.sender_id = ${userId};
  `;

  return result;
};
export { saveMessages, getMessages, getUserSendMessage };

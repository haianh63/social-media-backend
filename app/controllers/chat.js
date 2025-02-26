import { getUserSendMessage, getMessages } from "../database/messages.js";
const getChatUser = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await getUserSendMessage({ userId });
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

const getChatMessage = async (req, res) => {
  try {
    const sender_id = req.userId;
    const receiver_id = req.params.userId;
    const result = await getMessages({ sender_id, receiver_id });
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};

export { getChatUser, getChatMessage };

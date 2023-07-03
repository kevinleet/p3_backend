const { Message, User, Chat } = require("../models");


const getAllMessages = async (req, res) => {
  try {
    let messages = await Message.find({chat: req.params.chatId});
    res.json(messages);
  } catch (error) {
    res.send(error);
  }
};

const sendMessage = async (req, res) => {
  const { sender, content, chat } = req.body;

  let newMessage = {
    sender: sender,
    content: content,
    chat: chat,
  }

  try {
    let message = await (await Message.create(newMessage)).populate(['sender', 'chat'])
    //add this created message to the corresponsing chat 'latest message' attribute
    res.send(message)
  } catch (error) {
    
    res.status(400)
  }
}



module.exports = {
  getAllMessages,
  sendMessage
};

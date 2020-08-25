const express = require("express");
const app = express();
app.use(express.json());

message1 = {
  creationDate: Date(),
  owner: "1",
  receiver: "2",
  subject: "hey mate",
  message: "how are u?",
  status: false,
};
message2 = {
  creationDate: Date(),
  owner: "2",
  receiver: "1",
  subject: "hey mate",
  message: "fine thank u",
  status: false,
};
message3 = {
  creationDate: Date(),
  owner: "2",
  receiver: "1",
  subject: "hey mate",
  message: "fine thank u",
  status: true,
};
const user1 = [message1];
const user2 = [message2, message2, message3];
const users = [user1, user2];


app.get("/api/messages/:user", (req, res) => {
  const userIndex = users.findIndex((u) => u[0].owner === req.params.user);
  const userMessages = users[userIndex];
  res.send(userMessages);
});

app.get("/api/unread-messages/:user", (req, res) => {
  const userIndex = users.findIndex((u) => u[0].owner === req.params.user);
  const userUnreadMessages = users[userIndex].filter((u) => u.status === false);
  res.send(userUnreadMessages);
});

app.get("/api/messages/:user/:msg", (req, res) => {
  const userIndex = users.findIndex((u) => u[0].owner === req.params.user);
  const userMessages = users[userIndex];
  res.send(userMessages[req.params.msg]);
  userMessages[req.params.msg].status = false;
});

app.post("/api/messages", (req, res) => {
  const newMessage = {
    creationDate: Date(),
    sender: req.body.owner,
    receiver: req.body.receiver,
    subject: req.body.subject,
    message: req.body.message,
    status: false,
  };

  const userIndex = users.findIndex((u) => u[0].owner === req.body.owner);

  if (userIndex > 0) {
    users[userIndex].push(newMessage);
  } else {
    const newUser = [];
    newUser.push(newMessage);
    users.push(newUser);
  }

  const receiverIndex = users.findIndex(
    (u) => u[0].owner === req.body.receiver
  );

  users[receiverIndex].push(newMessage);

  res.send("sent");
});

app.delete("/api/messages/:user/:msg", (req, res) => {
  const userIndex = users.findIndex((u) => u[0].owner === req.params.user);
  const userMessages = users[userIndex];
  delete userMessages[req.params.msg];
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

import Message from "./message";

export default class ChatApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.wsStart = this.wsStart.bind(this);
    this.getUser = this.getUser.bind(this);
    this.addUsers = this.addUsers.bind(this);
    this.clearUsers = this.clearUsers.bind(this);
    this.usersDiv = document.createElement("div");
    this.usersDiv.classList.add("users-div");
    this.users = document.createElement("div");
    this.usersDiv.appendChild(this.users);
    this.users.classList.add("users");
    this.chatDiv = document.createElement("div");
    this.chatDiv.classList.add("chat");
    this.chatMessageInput = document.createElement("input");
    this.chatMessageInput.classList.add("chat_input");
    this.chatMessageInput.placeholder = "Type your message here";
    this.chatDiv.appendChild(this.chatMessageInput);
  }

  getUser(userP) {
    this.user = userP;
  }

  addMessage(message, user) {
    let messageDiv = document.createElement("div");
    let info = document.createElement("p");
    let text = document.createElement("p");
    info.classList.add("message-info");
    text.classList.add("message-text");
    text.textContent = message.text;
    info.textContent =
      user.nickname +
      ", " +
      new Date(message.created).toLocaleString().replace(",", "").slice(0, -3);
    messageDiv.appendChild(info);
    messageDiv.appendChild(text);
    messageDiv.classList.add("message-div");
    if (user.nickname == this.user.nickname) {
      info.textContent =
        "You" +
        ", " +
        new Date(message.created)
          .toLocaleString()
          .replace(",", "")
          .slice(0, -3);
      info.classList.add("red");
      messageDiv.classList.add("right");
    }
    this.chatDiv.appendChild(messageDiv);
  }

  addUsers(users) {
    console.log(users);
    for (let user of users) {
      console.log(this.user);
      if (user.nickname === this.user.nickname) {
        let textNode = document.createTextNode("YOU");
        this.users.appendChild(textNode);
        this.users.appendChild(document.createElement("br"));
      } else {
        this.users.appendChild(document.createTextNode(user.nickname));
        this.users.appendChild(document.createElement("br"));
      }
    }
  }

  clearUsers() {
    this.users.replaceChildren();
  }

  addToDOM() {
    document.body.appendChild(this.usersDiv);
    document.body.appendChild(this.chatDiv);
  }

  removeFromDOM() {
    this.usersDiv.remove();
    this.chatDiv.remove();
  }

  wsStart() {
    const ws = new WebSocket('wss://' + this.apiUrl + '/ws');

    document.addEventListener("keydown", (e) => {
      if (e.code == "Enter") {
        const message = new Message(this.user, this.chatMessageInput.value);

        if (!message) return;

        ws.send(JSON.stringify(message));

        this.chatMessageInput.value = "";
      }
    });

    ws.addEventListener("open", (e) => {
      console.log(e);
      ws.send(JSON.stringify({ newUser: this.user }));

      console.log("ws open");
    });

    ws.addEventListener("close", (e) => {
      console.log(e);
      ws.send(JSON.stringify({ delUser: this.user }));
      console.log("ws close");
    });

    ws.addEventListener("error", (e) => {
      console.log(e);

      console.log("ws error");
    });

    ws.addEventListener("message", (e) => {
      console.log(e);
      const data = JSON.parse(e.data);
      const { chat: messages } = data;
      if (messages) {
        messages.forEach((message) => {
          this.addMessage(message, message.user);
        });
      }

      const { id } = data;
      console.log(id);
      if (id) {
        this.user.id = id;
      }

      const { allUsers: users } = data;
      if (users) {
        this.clearUsers();
        this.addUsers(users);
      }
      console.log("ws message");
    });
  }
}

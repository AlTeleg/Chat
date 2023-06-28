import ChatApi from "./chatApi";
import Authorization from "./authorization";

const chat = new ChatApi();
const auth = new Authorization("https://chatserverrus.onrender.com/", chat);
auth.addToDom();
auth.addEventListeners();

import ChatApi from "./chatApi";
import Authorization from "./authorization";
const protocol = 's' || '';
const apiUrl = "chatserverrus.onrender.com";

const chat = new ChatApi(apiUrl, protocol);
const auth = new Authorization(apiUrl, chat, protocol);
auth.addToDom();
auth.addEventListeners();

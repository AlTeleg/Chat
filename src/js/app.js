import ChatApi from "./chatApi";
import Authorization from "./authorization";

const apiUrl = "chatserverrus.onrender.com";
const chat = new ChatApi(apiUrl);
const auth = new Authorization(apiUrl, chat);
auth.addToDom();
auth.addEventListeners();

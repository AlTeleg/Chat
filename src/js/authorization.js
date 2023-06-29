import User from "./user";

export default class Authorization {
  constructor(apiUrl, chat, protocol) {
    this.apiUrl = apiUrl;
    this.chat = chat;
    this.protocol = protocol;
    this.onBtnClickAuth = this.onBtnClickAuth.bind(this);
    this.nicknameInputDiv = document.createElement("div");
    this.nicknameInputTitle = document.createElement("h3");
    this.nicknameInputTitle.textContent = "Выберите псевдоним";
    this.nicknameInputTextarea = document.createElement("textarea");
    this.nicknameInputButton = document.createElement("button");
    this.nicknameInputButton.textContent = "Продолжить";
    this.nicknameInputDiv.classList.add("nickname-input-div");
    this.nicknameInputTitle.classList.add("nickname-input-div_title");
    this.nicknameInputTextarea.classList.add("nickname-input-div_textarea");
    this.nicknameInputButton.classList.add("nickname-input-div_button");
    this.nicknameInputDiv.appendChild(this.nicknameInputTitle);
    this.nicknameInputDiv.appendChild(this.nicknameInputTextarea);
    this.nicknameInputDiv.appendChild(this.nicknameInputButton);
  }

  addToDom() {
    document.body.appendChild(this.nicknameInputDiv);
  }

  removeOutDOM() {
    this.nicknameInputDiv.remove();
  }

  async onBtnClickAuth(e) {
    let nickname = e.target.previousElementSibling.value;
    if (nickname != "" || undefined) {
      console.log('Authorization request sended!');
      const request = fetch(
        "http" + `${this.protocol}` + "://" + this.apiUrl + "/authorization/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nickname: nickname }),
        }
      );

      const result = await request;

      if (!result.ok) {
        console.error("Ошибка");

        return;
      }

      const json = await result.json();
      console.log(json);
      if (json.auth) {
        console.log("Welcome");
        const id = json.auth;
        this.user = new User(nickname, id);
        this.chat.getUser(this.user);
        this.removeOutDOM();
        this.chat.addToDOM();
        this.chat.wsStart();
      } else {
        console.log("Error");
      }
    }
  }

  addEventListeners() {
    this.nicknameInputButton.addEventListener("click", this.onBtnClickAuth);
  }
}

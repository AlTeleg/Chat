export default class User {
  constructor(nickname, id) {
    this.nickname = nickname;
    this.entered = Date.now();
    this.id = id;
  }
}

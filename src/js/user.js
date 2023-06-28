export default class User {
  constructor(nickname) {
    this.nickname = nickname;
    this.entered = Date.now();
  }
}

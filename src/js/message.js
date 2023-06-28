export default class Message {
  constructor(user, text) {
    this.user = user;
    this.created = Date.now();
    this.text = text;
  }
}

export default class Message {
  axios = require("axios");
  apiUrl = "http://node-messenger.vaiserr-projects.ru/api/message/";

  async getLast(id) {
    console.log("getting message");
    const response = await this.axios(`${this.apiUrl + id}?_limit=1`);
    console.log("done");
    return response.data;
  }

  async send(message) {
    console.log("sending message");
    const response = await this.axios.post(this.apiUrl, message);
    console.log("done");
    return response.data;
  }

  async getAll(id) {
    console.log("getting messages");
    const response = await this.axios.get(`${this.apiUrl + id}`);
    console.log("done");
    return response.data;
  }
}

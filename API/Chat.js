export default class Chat {
  axios = require("axios");
  apiUrl = "http://node-messenger.vaiserr-projects.ru/api";

  async getAll(id) {
    console.log("getting chats");
    const response = await this.axios.get(
      `${this.apiUrl}/chat/getByUser/${id}`
    );
    console.log("done");
    return response.data;
  }

  async getPrivate(members) {
    console.log("getting chat");
    const response = await this.axios.post(`${this.apiUrl}/chat/getPrivate`, {
      members: members,
    });
    console.log("done");
    return response.data;
  }
  async createPrivateChat(data) {
    console.log("creating chat");
    const response = await this.axios.post(
      `${this.apiUrl}/chat/createPrivate`,
      data
    );
    console.log("done");
    return response.data;
  }

  async delete({ chatId, userId }) {
    console.log("deleting chat");
    const response = await this.axios.delete(`${this.apiUrl}/chat/${chatId}`, {
      userId: userId,
    });
    console.log("done");
    return response.data;
  }
}

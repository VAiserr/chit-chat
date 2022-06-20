import AsyncStorage from "@react-native-async-storage/async-storage";

export default class User {
  axios = require("axios");
  apiUrl = "http://node-messenger.vaiserr-projects.ru/api";

  async getData() {
    try {
      const jsonValue = await AsyncStorage.getItem("@user");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return e;
    }
  }

  async setData(user) {
    try {
      console.log("setting data");
      const jsonValue = JSON.stringify(user);
      // console.log(user.contacts);
      await AsyncStorage.setItem("@user", jsonValue);
    } catch (error) {}
    console.log("done");
  }

  async register(user) {
    console.log("register");
    const response = await this.axios.post(
      `${this.apiUrl}/auth/register`,
      user
    );
    console.log("done");
    return response.data;
  }

  async login(data) {
    console.log("login");
    const response = await this.axios.post(`${this.apiUrl}/auth/login`, data);
    console.log("done");
    return response.data;
  }

  async logOut() {
    console.log("logout");
    try {
      const jsonValue = JSON.stringify(null);
      await AsyncStorage.setItem("@user", jsonValue);
    } catch (e) {
      return console.log(error);
    }
    console.log("done");
  }

  async getPhone(phone) {
    const response = await this.axios.get(
      `${this.apiUrl}/users/phone/${phone}`
    );
    if (response.data) return true;
    return false;
  }

  async getByPhone(phone) {
    console.log("getting user");
    const response = await this.axios.get(
      `${this.apiUrl}/users/phone/${phone}`
    );
    console.log("done");
    return response.data;
  }

  async getUserById(id) {
    console.log("getting user");
    const response = await this.axios.get(`${this.apiUrl}/users/` + id);
    console.log("done");
    return response.data;
  }

  async update(data) {
    console.log("updating");
    const response = await this.axios.put(
      `${this.apiUrl}/users/${data?.userId}`,
      data
    );
    console.log("done");
    return response.data;
  }
}

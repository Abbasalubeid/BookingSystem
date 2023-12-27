export default class User {
    constructor(data) {
      this.id = data.id;
      this.username = data.username;
      this.admin = data.admin;
    }
  
    greet() {
      return `Hello, ${this.username}! ${this.admin ? "You are an admin." : "You are not an admin."}`;
    }
  
  }
  
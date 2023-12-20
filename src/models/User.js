// Class to represent a User
export class User {
    constructor(id, username, admin) {
      this.id = id;
      this.username = username;
      this.admin = admin;
    }
  
    greet() {
      return `Hello, ${this.username}! ${this.admin}`;
    }
  
  }
  
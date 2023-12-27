export default class Reservation {
  constructor(data) {
    this.id = data.id;
    this.listId = data.list_id;
    this.userId = data.user_id;
    this.coopId = data.coop_id || null;
    this.sequence = data.sequence;
    this.username = data.username; // Username who made the reservation
    
  }

  // Check if the reservation is cooperative (i.e., has a coopId)
  isCooperative() {
    return this.coopId !== null;
  }
}
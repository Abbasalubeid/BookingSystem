export default class Reservation {
  constructor(data) {
    this.id = data.id;
    this.listId = data.list_id;
    this.userId = data.user_id;
    this.coopId = data.coop_id || null;
    this.sequence = data.sequence;
    this.username = data.username; // Username who made the reservation
    this.start = new Date(data.start); // Start time of the list
    this.interval = data.interval; // Interval between slots
  }

  // Calculate the start time of this reservation
  calculateStartTime() {
    const slotTime = new Date(this.start.getTime());
    slotTime.setMinutes(slotTime.getMinutes() + this.interval * this.sequence);
    return `${slotTime.toLocaleDateString()} ${slotTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  }

  // Check if the reservation is cooperative (i.e., has a coopId)
  isCooperative() {
    return this.coopId !== null;
  }
}
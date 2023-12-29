export default class Reservation {
  constructor(data) {
    this.id = data.id;
    this.listId = data.list_id;
    this.userId = data.user_id;
    this.coopId = data.coop_id || null;
    this.sequence = data.sequence;
    this.userUsername = data.user_username;
    this.coopUsername = data.coop_username;
    this.description = data.description; // Description of the list
    this.start = new Date(data.start); // Start time of the list
    this.interval = data.interval; // Interval of the list
    this.courseTitle = data.course_title;
    this.location = data.location;
  }

  // Check if the reservation is cooperative (i.e., has a coopId)
  isCooperative() {
    return this.coopId !== null;
  }

  getReservationStartTime() {
    const startTime = new Date(this.start);
    startTime.setMinutes(startTime.getMinutes() + this.interval * this.sequence);
    return startTime;
  }

  getReservationEndTime() {
    const endTime = new Date(this.getReservationStartTime());
    endTime.setMinutes(endTime.getMinutes() + this.interval);
    return endTime;
  }

  formatTime(time) {
    const formattedDate = time.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${formattedDate}, ${formattedTime}`;
  }
}
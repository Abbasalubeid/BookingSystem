import Reservation from './Reservation';
export default class List {
    constructor(data) {
      this.id = data.id;
      this.courseId = data.course_id;
      this.adminId = data.admin_id;
      this.description = data.description;
      this.location = data.location;
      this.start = new Date(data.start);
      this.interval = data.interval;
      this.maxSlots = data.max_slots;
      this.courseTitle = data.course_title;
      this.reservations = data.reservations ? data.reservations.map(r => new Reservation(r)) : [];
    }

    formatStartTime() {
      return `${this.start.toLocaleDateString()} ${this.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    getAvailableSlots() {
      return this.maxSlots - this.reservations.length;
    }

    isFull() {
      return this.getAvailableSlots() === 0;
    }
}

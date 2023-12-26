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

    // Find the next available slot
    nextAvailableSlot() {
          const bookedSlots = new Set(this.reservations.map(reservation => reservation.sequence));
          for (let sequence = 0; sequence < this.maxSlots; sequence++) {
              if (!bookedSlots.has(sequence)) {
                  const nextSlotTime = new Date(this.start.getTime());
                  nextSlotTime.setMinutes(nextSlotTime.getMinutes() + this.interval * sequence);
                  return nextSlotTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
          }
          return null; // Return null if no slots are available
      }
}

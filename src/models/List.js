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
    this.reservations = data.reservations
      ? data.reservations.map((r) => new Reservation(r))
      : [];
  }

  formatStartTime() {
    return `${this.start.toLocaleDateString()} ${this.start.toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    )}`;
  }

  getAvailableSlots() {
    return this.maxSlots - this.reservations.length;
  }

  getNextSequence() {
    return this.reservations.length;
  }

  isFull() {
    return this.getAvailableSlots() === 0;
  }

  // Find the next available slot
  nextAvailableSlot() {
    const bookedSlots = new Set(
      this.reservations.map((reservation) => reservation.sequence)
    );
    for (let sequence = 0; sequence < this.maxSlots; sequence++) {
      if (!bookedSlots.has(sequence)) {
        const nextSlotTime = new Date(this.start.getTime());
        nextSlotTime.setMinutes(
          nextSlotTime.getMinutes() + this.interval * sequence
        );
        return nextSlotTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
    }
    return null; // Return null if no slots are available
  }

  // Check if a user has an existing booking (either as primary booker or as a teammate) and return its start time
  userHasBooking(userId) {
    const userReservation = this.reservations.find(reservation => 
      reservation.userId === userId || reservation.coopId === userId
    );

    if (userReservation) {
      const slotTime = new Date(this.start.getTime());
      slotTime.setMinutes(slotTime.getMinutes() + this.interval * userReservation.sequence);
      return `${slotTime.toLocaleDateString()} ${slotTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }

    return null;
  }
}

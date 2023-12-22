// src/app/models/List.js
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
    }
  
    // Add any methods that are relevant for a List
    formatStartTime() {
      // Example method to format the start time
      return this.start.toLocaleString();
    }
  }
  
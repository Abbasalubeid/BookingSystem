export default class Reservation {
    constructor(data) {
      this.id = data.id;
      this.listId = data.list_id;
      this.userId = data.user_id;
      this.coopId = data.coop_id;
      this.sequence = data.sequence;
    }

}
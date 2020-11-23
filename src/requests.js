import { firestore, auth } from "./firebase";
import "firebase/firestore";

const db = firestore.collection("/items");

class CalendarDataService {
  getAllEvents() {
    return db;
  }

  createEvent(event) {
    return db.add(event);
  }

  updateEvent(id, value) {
    return db.doc(id).update(value);
  }

  deleteEvent(id) {
    return db.doc(id).delete();
  }
}

export default new CalendarDataService();
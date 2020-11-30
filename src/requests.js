// import firebase from 'firebase/app'
// import "firebase/firestore";

import Firebase from "./components/Firebase/firebase";
// // import firebase from 'firebase/app';
// import 'firebase/firestore';

const firebase = new Firebase();

class CalendarDataServiceClass extends Firebase {
  getAllEvents() {
    return this.dbCalendar;
  }

  createEvent(event) {
    return this.dbCalendar.add(event);
  }

  updateEvent(id, value) {
    return this.dbCalendar.doc(id).update(value);
  }

  deleteEvent(id) {
    return this.dbCalendar.doc(id).delete();
  }
}

class WishlistDataServiceClass extends Firebase{
  getAllItems() {
    return this.dbWishlist;
  }

  createItem(item) {
    return this.dbWishlist.add(item);
  }

  updateItem(id, value) {
    return this.dbWishlist.doc(id).update(value);
  }

  deleteItem(id) {
    return this.dbWishlist.doc(id).delete();
  }
}

const CalendarDataService = new CalendarDataServiceClass();
const WishlistDataService = new WishlistDataServiceClass();

export { CalendarDataService, WishlistDataService }
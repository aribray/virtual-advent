import { firestore, auth } from "./firebase";
import "firebase/firestore";

const db = firestore.collection("/events");

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


// const APIURL = "https://virtual-advent.uc.r.appspot.com";
// const axios = require("axios");
// export const getCalendar = () => axios.get(`${APIURL}/calendar`);
// export const addCalendar = data => axios.post(`${APIURL}/calendar`, data);
// export const editCalendar = data =>
//   axios.put(`${APIURL}/calendar/${data.id}`, data);
// export const deleteCalendar = id => axios.delete(`${APIURL}/calendar/${id}`);
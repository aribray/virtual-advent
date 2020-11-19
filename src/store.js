import { observable, action, makeObservable } from "mobx";
class CalendarStore {

  constructor() {
    this.calendarEvents = []

    makeObservable(this, {
        calendarEvents: observable,
        setCalendarEvents: action
    })
  }

  setCalendarEvents(calendarEvents) {
      this.calendarEvents = calendarEvents
    }
}

export { CalendarStore };
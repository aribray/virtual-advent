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

class WishlistStore {

  constructor() {
    this.wishlistItems = []

    makeObservable(this, {
        wishlistItems: observable,
        setWishlistItems: action
    })
  }

  setWishlistItems(wishlistItems) {
      this.wishlistItems = wishlistItems
    }
}

export { CalendarStore, WishlistStore };
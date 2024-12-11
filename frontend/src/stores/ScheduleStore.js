import { makeAutoObservable } from 'mobx';

class ScheduleStore {
  bookings = [];

  constructor() {
    makeAutoObservable(this);
  }

  setBookings(bookings) {
    this.bookings = bookings;
  }

  addBooking(booking) {
    this.bookings.push(booking);
  }

  removeBooking(id) {
    this.bookings = this.bookings.filter((b) => b.id !== id);
  }

  updateBooking(updatedBooking) {
    this.bookings = this.bookings.map((booking) =>
      booking.id === updatedBooking.id ? updatedBooking : booking
    );
  }

}



const scheduleStore = new ScheduleStore();
export default scheduleStore;


module.exports = {
    "userBooking": [],
    "tripsDB": [
        {
            id: 1,
            destination: "Paris",
            price: 1000,
            availableSeats: 5,
            departureCity: "London",
            duration: 2,
            departureTime: "2024-11-15T10:00:00Z",
            country: "UK"
        },
        {
            id: 2,
            destination: "New York",
            price: 500,
            availableSeats: 2,
            departureCity: "London",
            duration: 8,
            departureTime: "2024-11-18T15:00:00Z",
            country: "UK"
        },
        {
            id: 3,
            destination: "Tokyo",
            price: 1200,
            availableSeats: 3,
            departureCity: "Los Angeles",
            duration: 10,
            departureTime: "2024-11-15T10:00:00Z",
            country: "USA"
        },
    ],

    getAllTrips() {
        // return this.tripsDB.filter(trip => trip.availableSeats > 0);
        return this.tripsDB;
    },

    getTripById(id) {
        return this.tripsDB.find(trip => trip.id === id) || "Invalid. ID not found."
    },

    bookTrip(name, userId, tripId,) {
        const trip = this.getTripById(tripId);
        if (trip && trip.availableSeats > 0) {
            trip.availableSeats -= 1;
            this.userBooking.push({ userId, tripId, name, bookingDate: new Date().toString() });
            return `Your booking to ${trip.destination} is successful! Seats left: ${trip.availableSeats}`;
        }
        return "Booking failed. Seats are fully booked out";
    },

    cancelBooking(userId, tripId) {
        const bookingIndex = this.userBooking.findIndex(booking => booking.userId == userId && booking.tripId == tripId);
        const booking = this.userBooking.find(booking => booking.userId == userId && booking.tripId == tripId);
        if (bookingIndex == -1) {
            return "No such booking was found.";
        }

        this.userBooking.splice(bookingIndex, 1);

        const currentTrip = this.getTripById(tripId)

        if (currentTrip) {
            currentTrip.availableSeats += 1;
        }

        return `Hi ${booking.name}, your booking trip to ${currentTrip.destination} has been successfully cancelled.`

    },

    updateBooking(userId, oldTripId, newTripId) {
        const booking = this.userBooking.find(booking => booking.userId == userId && booking.tripId == oldTripId);
        if (!booking) {
            return "No such booking exist to be updated.";
        }

        const newTrip = this.getTripById(newTripId);
        if (!newTrip && newTrip.availableSeats <= 0) {
            return "This trip is already booked up";
        }

        this.cancelBooking(userId, oldTripId);

        this.bookTrip(booking.name, userId, newTripId);

    },

    searchBooking(searchDestination) {
        const query = searchDestination.toLowerCase();

        const results = this.tripsDB.filter(trip => trip.destination.toLowerCase().startsWith(query) && trip.availableSeats > 0);

        if (results.length == 0) {
            return "No such trips.";
        }
        return results;
    }

}

// Generate random unique id(both userID & tripID)
// Auto check current location and put departueCity and country
// Filter options in search
// Create Admin POV
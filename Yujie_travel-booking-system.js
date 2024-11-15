module.exports = {
    //Data
    userBookings: [],
    bookingIdCounter: 1,

    tripsDB: [
        {
            id: 1,
            destination: "Argentina",
            price: 1000,
            availableSeats: 5,
            departureCity: "London",
            duration: 2, // note: duration is simply the number of hours the flight takes to reach the destination
            departureTime: "2024-11-15T11:00:00Z",
            country: "UK",
            status: "one-way",
            returnTime: null
        },
        {
            id: 2,
            destination: "New York",
            price: 500,
            availableSeats: 2,
            departureCity: "London",
            duration: 8,
            departureTime: "2024-11-18T15:00:00Z",
            country: "UK",
            status: "one-way",
            returnTime: null
        },
        {
            id: 3,
            destination: "Tokyo",
            price: 1200,
            availableSeats: 3,
            departureCity: "Los Angeles",
            duration: 10,
            departureTime: "2024-11-25T10:00:00Z",
            country: "USA",
            status: "round-trip",
            returnTime: "2024-12-05T10:00:00Z"
        },
        {
            id: 4,
            destination: "Mexico",
            price: 1200,
            availableSeats: 3,
            departureCity: "Singapore",
            duration: 10,
            departureTime: "2024-11-28T10:00:00Z",
            country: "Singapore",
            status: "round-trip",
            returnTime: "2024-12-12T10:00:00Z"
        }
    ],

    //Retrives all flight trips that are currently available from tripsDB
    getAllAvailTrips() {
        return this.tripsDB.filter(trip => trip.availableSeats > 0); //Filters out 
    },

    //If the trip id is found from the tripsDB, it will return that specific trip ticket. Otherwise, it will show an error message indicating that the
    //ID isn't found
    getTripById(id) {
        return this.tripsDB.find(trip => trip.id === id) || "Invalid. ID not found.";
    },

    //This function will retrive the dateTime of when the trip ticket ends. Even if its a one-way trip, the ticket ends when you have 
    //reached the destination
    getTripEndDate(trip) { //Note: To be relied by other functions
        if (trip.status === "round-trip" && trip.returnTime) {
            return new Date(trip.returnTime);
        }
        const departureDate = new Date(trip.departureTime); //originally was in string format => converting into date
        return new Date(departureDate.getTime() + trip.duration * 60 * 60 * 1000); //converting duration in hour => millieseconds
    },

    //This function helps to check and determine whether there is any overlapping in date with any previous bookings that were recently made
    isBookingOverlapping(newTripId, newDepartureTime, newEndTime) { //Note: To be relied by other functions
        const newTrip = this.getTripById(newTripId);
        if (!newTrip) return false; //Checks if object exists

        const newStart = new Date(newDepartureTime); //Converts into date format
        const newEnd = new Date(newEndTime);

        for (const booking of this.userBookings) { //Go through every object present in the userBookings DB
            const existingTrip = this.getTripById(booking.tripId);
            if (!existingTrip) continue;

            const existingStart = new Date(existingTrip.departureTime);
            const existingEnd = this.getTripEndDate(existingTrip); //Gets start and end time of every object in userBooking in dateTime format

            if (
                (newStart >= existingStart && newStart <= existingEnd) || //Scenario where the new trip STARTS inbetween a pre-existing booking timeline
                (newEnd >= existingStart && newEnd <= existingEnd) || //Scenario where the new trip ENDS inbetween existing trip
                (existingStart >= newStart && existingEnd <= newEnd)//Scenario where new trip is completely within an existing's trip timeline
            ) {
                return true;
            }
        }
        return false;
    },

    //This functions enables the user to book an available flight tickets
    bookTrip(tripId, passengerNames) {
        const trip = this.getTripById(tripId); //obtain specified object via tripId
        const booked = this.userBookings.find(booking => booking.tripId === tripId);
        if (!trip) {
            return "Invalid trip ID."; //Check if the trip id specified exist within the DB
        }

        if (booked) {
            return "U have already booked for this flight ticket."; //Checks if pre-existing booking of the same flight ticket is present
        }

        const pax = passengerNames.length; //Get the length of "passengerNames" since it is in an array
        if (pax > trip.availableSeats) {
            return "Booking failed. Not enough seats available."; //Checks if enough seats are available to fulfil pax request
        }

        const departureTime = new Date(trip.departureTime);
        const endTime = this.getTripEndDate(trip);

        if (this.isBookingOverlapping(tripId, departureTime, endTime)) { //checks for overlapping in timeline (via boolean)
            return "Booking failed. The travel dates overlap with an existing booking.";
        }

        trip.availableSeats -= pax; //if there aren't any overlaps, pre-existing data of availableseats from tripsDB will be reduced

        bookingId = this.bookingIdCounter++; //This serves as a auto-increment function which acts as a "primary key"
        this.userBookings.push({ bookingId, tripId, passengerNames, pax, bookingDate: new Date().toISOString() });// data will then be added to the userBookingsDB

        return `Booking to ${trip.destination} confirmed for ${pax} passenger(s). Seats left: ${trip.availableSeats}`;
    },

    //Checks for every single existing object present in the userBookingsDB
    checkBookings() {
        return this.userBookings;
    },

    //This function allows cancellation of existing bookings
    cancelBooking(bookingId) {
        const bookingIndex = this.userBookings.findIndex(booking => booking.bookingId === bookingId); //finding the exact index in the array of objects through bookingId
        if (bookingIndex === -1) return "No such booking was found."; //It will always return "-1" if no such index was found in the DB

        const booking = this.userBookings[bookingIndex]; //Getting object data from userBookingsDB based off the index that was found
        const trip = this.getTripById(booking.tripId); //Getting object data from tripsDB

        if (trip) {
            trip.availableSeats += booking.pax; //If the object exists within tripsDB, it will add back the seats that was taken
        }

        this.userBookings.splice(bookingIndex, 1); //Removing the object from the specified index
        return `Booking to ${trip.destination} for ${booking.pax} passenger(s) has been canceled.`;
    },

    //This function helps to change flight bookings tickets (e.g. user decides to change to a different timeslot due to emergencies)
    //Functions are pretty similar to bookTrip()
    updateFlight(bookingId, newTripId) {
        const bookingIndex = this.userBookings.findIndex(booking => booking.bookingId === bookingId);
        if (bookingIndex === -1) return "Booking not found for update.";
        if (bookingId == newTripId) return "Update failed. Please do not update to the same ticket.";

        const booking = this.userBookings[bookingIndex];
        const newTrip = this.getTripById(newTripId);
        if (!newTrip) {
            return "Invalid trip ID for update.";
        }

        const pax = booking.pax;
        if (newTrip.availableSeats < pax) {
            return "Update failed. Not enough seats available on the new trip.";
        }

        const departureTime = new Date(newTrip.departureTime);
        const endTime = this.getTripEndDate(newTrip);

        if (this.isBookingOverlapping(newTripId, departureTime, endTime)) {
            return "Update failed. The travel dates overlap with an existing booking.";
        }

        this.cancelBooking(bookingId);
        this.bookTrip(newTripId, booking.passengerNames);

        return `Booking updated to ${newTrip.destination} for ${pax} passenger(s).`;
    },

    //Created a search function for user to filter out what type of tickets they are looking for.
    //The parameter for filters are optional
    searchTrips(destination, filters = {}) {
        const query = destination.toLowerCase(); //convert string into lowercasing

        let results = this.tripsDB.filter(trip =>
            destination === "" || trip.destination.toLowerCase().startsWith(query) //Acts like a search bar for destinations => empty = show everything, "T" = show everything that starts with T.
        ).filter(trip => trip.availableSeats > 0); //ensures that it do not show any tickets that are unavailable for booking

        if (filters.departureDate) {
            results = results.filter(trip => {
                const tripDate = new Date(trip.departureTime).toISOString().split("T")[0];
                return tripDate === filters.departureDate; // Match only the date part
            });
        }

        else if (filters.status) {
            results = results.filter(trip => trip.status === filters.status); //Filter for status => {status: "round-trip"} or {status: "one-way"}
        }

        else if (filters.price) {
            results.sort((a, b) => filters.price === "asc" ? a.price - b.price : b.price - a.price); //Filter for price in "asc" or "desc" order
        }

        else if (filters.duration) {
            results.sort((a, b) => filters.duration === "asc" ? a.duration - b.duration : b.duration - a.duration); //Filter for durarion in "asc" or "desc" order
        }



        return results.length ? results : "No matching trips found.";
    }
};

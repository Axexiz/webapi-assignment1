#### Yujie's Assignment

# Travel Booking System

The **Travel Booking System** is a Node.js solution for managing and booking flight tickets.

Note: All the functions listed below are for the end-user only. No admin functions were created in this assignment. This is in the perspective of a single user trying to book flight tickets.

## Content

1. [Setup](#setup)
2. [Functions & Usage](#functions-usage)
3. [References](#references)

## Setup

#### **Step 1: Clone the Repository**

Clone the repository using the command:

```bash
git clone https://github.com/Axexiz/webapi-assignment1
```

#### **Step 2: Ensure that `app.js` file is present**

1. Import the file onto `app.js`:

   ```javascript
   const travelSystem = require("./Yujie_travel-booking-system");
   ```

#### **Step 3: Run app.js**

Run the application using Node:

```bash
node app.js
```

**OR**

Run the application using Nodemon (ensure you have nodemon installed):

```bash
nodemon app.js
```

## Functions-Usage

### **1. getAllAvailTrips**

#### Usage

```javascript
getAllAvailTrips();
```

#### Explanation

- Retrieves all trips with available seats.
- **Returns:** Array of available trips.

---

### **2. getTripById**

#### Usage

```javascript
getTripById(id);
```

#### Explanation

- Fetches details of a specific trip by `id`.
- **Parameter:** `id` (int) - Trip ID.
- **Returns:** Trip details or error message.

---

### **3. getTripEndDate**

#### Usage

```javascript
getTripEndDate(trip);
```

#### Explanation

- Calculates the trip's end date.
- **Parameter:** `trip` (Object) - Trip object retrieved from `getTripById()`.
- **Returns:**
  - For a one-way trip: The arrival date/time at the destination.
  - For a round-trip: The return date/time from the destination.

---

### **4. isBookingOverlapping**

#### Usage

```javascript
isBookingOverlapping(newTripId, newDepartureTime, newEndTime);
```

#### Explanation

- Checks if the new booking's travel dates overlap with existing bookings.
- **Parameters:**
  - `newTripId` (int) - ID of the new trip to be booked.
  - `newDepartureTime` (Date/String) - Start date/time of the new trip.
  - `newEndTime` (Date/String) - End date/time of the new trip.
- **Returns:**
  - `true` if there is a date overlap with an existing booking.
  - `false` if there is no overlap.

---

### **5. bookTrip**

#### Usage

```javascript
bookTrip(tripId, passengerNames);
```

#### Explanation

- Books a trip for specified passengers.
- **Parameters:**
  - `tripId` (int) - ID of the trip.
  - `passengerNames` (Array<string>) - List of passenger names.
- **Returns:** Booking confirmation or error message.

---

### **6. checkBookings**

#### Usage

```javascript
checkBookings();
```

#### Explanation

- Retrieves all bookings made by the user.
- **Returns:** Array of bookings.

---

### **7. cancelBooking**

#### Usage

```javascript
cancelBooking(bookingId);
```

#### Explanation

- Cancels a booking by its `bookingId`.
- **Parameter:** `bookingId` (int) - Unique ID of the booking.
- **Returns:** Cancellation confirmation or error message.

---

### **8. updateFlight**

#### Usage

```javascript
updateFlight(bookingId, newTripId);
```

#### Explanation

- Updates an existing booking to a new trip.
- **Parameters:**
  - `bookingId` (int) - ID of the current booking.
  - `newTripId` (int) - ID of the new trip.
- **Returns:** Update confirmation or error message.

---

### **9. searchTrips**

#### Usage

```javascript
searchTrips(destination, filters);
```

#### Explanation

- Searches for trips by destination and optional filters.
- **Parameters:**
  - `destination` (string) - Destination keyword.
  - `filters` (Object) - Optional filters:
    - `departureDate` (string): Filter by departure date.
    - `status` (string): Filter by trip status ("one-way" or "round-trip").
    - `price` (string): Sort by price ("asc" or "desc").
    - `duration` (string): Sort by duration ("asc" or "desc").
    - `departureTime` (string): Sort by departure time ("asc" or "desc").
- **Returns:** Array of trips or error message.

## Example Workflow

Note: Do not copy these codes word for word. This is just a mere example of how to use them.

1. **View all available trips:**
   ```js
   console.log(booking.getAllAvailTrips());
   ```
2. **Book a trip:**
   ```js
   console.log(booking.bookTrip(1, ["Alice", "Bob"]));
   ```
3. **Check bookings:**
   ```js
   console.log(booking.checkBookings());
   ```
4. **Cancel a booking:**
   ```js
   console.log(booking.cancelBooking(1));
   ```
5. **Update flight booking:**
   ```js
   console.log(booking.updateFlight(1, 3));
   ```
6. **Search trips:**
   ```js
   console.log(
     booking.searchTrips("New York", { price: "asc", status: "one-way" })
   );
   ```

## References

1. [Javascript Array Object](https://www.w3schools.com/jsref/jsref_obj_array.asp)
2. [Javascript String Reference](https://www.w3schools.com/jsref/jsref_obj_string.asp)
3. [Javascript Date function](https://www.w3schools.com/jsref/jsref_obj_date.asp)

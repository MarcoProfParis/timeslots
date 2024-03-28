window.function = async function(json) {
  
  if (json.value === undefined) return "Enter your json";
  console.log(`No schedule found for date:`);
  console.log(json);
  const jsonData = {
  "schedule": {
    "2024-03-28": {
      "available_slots": [
        {"start_time": "10:00", "end_time": "14:00"},
        {"start_time": "16:00", "end_time": "17:30"},
        {"start_time": "18:00", "end_time": "19:00"}
      ],
      "bookings": [
        {"start_time": "10:00", "end_time": "11:00", "booking_id": "BK123", "customer_name": "John Doe", "contact_number": "+1234567890", "email": "john.doe@example.com"},
        {"start_time": "11:00", "end_time": "12:00", "booking_id": "BK124", "customer_name": "Alice Smith", "contact_number": "+0987654321", "email": "alice.smith@example.com"},
        {"start_time": "16:30", "end_time": "17:30", "booking_id": "BK125", "customer_name": "marc hugh", "contact_number": "+098712321", "email": "marc.hugh@example.com"}
      ]
    },
    "2024-03-29": {
      "available_slots": [
        {"start_time": "09:00", "end_time": "12:00"},
        {"start_time": "13:00", "end_time": "19:00"}
      ],
      "bookings": [
        {"start_time": "09:30", "end_time": "10:30", "booking_id": "BK125", "customer_name": "Emma Brown", "contact_number": "+1122334455", "email": "emma.brown@example.com"}
      ]
    }
  }
};
console.log(jsonData);
  const allAvailableTimeSlots = {};

  for (const date in jsonData.schedule) {
    console.log(`Processing date: ${date}`);
    const schedule = jsonData.schedule[date];
    if (!schedule) {
      console.log(`No schedule found for date: ${date}`);
      return []; // If the date is not found in the schedule, return an empty array
    }
    const availableSlots = schedule.available_slots;
    const bookedSlots = schedule.bookings;

    console.log(`Available slots for date ${date}:`, availableSlots);
    console.log(`Booked slots for date ${date}:`, bookedSlots);

    // Convert booked slots to milliseconds for easier comparison
    const bookedSlotsInMs = bookedSlots.map(slot => {
      const start = new Date(`${date}T${slot.start_time}`).getTime();
      const end = new Date(`${date}T${slot.end_time}`).getTime();
      return { start, end };
    });

    console.log(`Booked slots in milliseconds for date ${date}:`, bookedSlotsInMs);

    // Filter available slots based on booked slots
    const availableTimeSlots = availableSlots.filter(slot => {
      const slotStart = new Date(`${date}T${slot.start_time}`).getTime();
      const slotEnd = new Date(`${date}T${slot.end_time}`).getTime();

      // Check if the slot overlaps with any booked slots
      for (const bookedSlot of bookedSlotsInMs) {
        if (slotStart >= bookedSlot.start && slotEnd <= bookedSlot.end) {
          return false; // Slot is booked
        }
      }
      return true; // Slot is available
    });

    console.log(`Available time slots for date ${date}:`, availableTimeSlots);

    allAvailableTimeSlots[date] = availableTimeSlots;
  }

  console.log("All available time slots:", allAvailableTimeSlots);
  return JSON.stringify(allAvailableTimeSlots);
}

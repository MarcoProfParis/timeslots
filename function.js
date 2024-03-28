window.function = async function(json) {
  
  if (json.value === undefined) return "Enter your json";
  console.log(`No schedule found for date:`);
  console.log(json);
  let jsonData = json;
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
  return allAvailableTimeSlots;
}

window.function = async function(jsonData) {
  if (jsonData.value === undefined) return "Enter your jsonData";
function getAvailableTimeSlots(jsonData, date) {
  const schedule = jsonData.schedule[date];
  if (!schedule) {
    return []; // If the date is not found in the schedule, return an empty array
  }

  const availableSlots = schedule.available_slots;
  const bookedSlots = schedule.bookings;

  // Convert booked slots to milliseconds for easier comparison
  const bookedSlotsInMs = bookedSlots.map(slot => {
    const start = new Date(`${date}T${slot.start_time}`).getTime();
    const end = new Date(`${date}T${slot.end_time}`).getTime();
    return { start, end };
  });

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

  return availableTimeSlots;
}

function getAllAvailableTimeSlots(jsonData) {
  const allAvailableTimeSlots = {};

  for (const date in jsonData.schedule) {
    const availableSlots = getAvailableTimeSlots(jsonData, date);
    allAvailableTimeSlots[date] = availableSlots;
  }

  return allAvailableTimeSlots;
}

// Example usage:

const allAvailableTimeSlots = getAllAvailableTimeSlots(jsonData);
return allAvailableTimeSlots;
}

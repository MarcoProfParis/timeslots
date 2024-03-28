function removeBookingsFromAvailableSlots(data) {
  const newData = {};
  for (const date in data) {
    const availableSlots = data[date].available_slots;
    const bookings = data[date].bookings;
    
    // Filter out bookings from available slots
    newData[date] = { "new_available_slots": availableSlots.filter(slot => !bookings.includes(slot)) };
  }
  
  return JSON.stringify(newData);
}

window.function = async function(json) {
    if (json.value === undefined) return "Enter your json";
    let jsonData = JSON.parse(json.value);

    const result = removeBookingsFromAvailableSlots(jsonData);
    return result;
}

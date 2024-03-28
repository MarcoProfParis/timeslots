function convertToTimeSlot(slot) {
    return {
        "start_time": `${Math.floor(slot / 4) + 9}:${slot % 4 === 0 ? "00" : slot % 4 * 15}`,
        "end_time": `${Math.floor(slot / 4) + 9}:${slot % 4 === 0 ? "15" : (slot % 4 + 1) * 15}`
    };
}

function removeBookingsFromAvailableSlots(data) {
  const newData = {};
  for (const date in data) {
    if (data.hasOwnProperty(date)) {
      const availableSlots = data[date].available_slots;
      const bookings = data[date].bookings;
      
      if (!Array.isArray(availableSlots) || !Array.isArray(bookings)) {
        console.error("Invalid data format. availableSlots and bookings must be arrays.");
        continue;
      }
      
      console.log(`Processing date: ${date}`);
      
      const continuousSlots = [];
      let currentSlot = null;
      for (const slot of availableSlots) {
          if (!bookings.includes(slot)) {
              if (currentSlot === null) {
                  currentSlot = [slot];
              } else if (currentSlot[currentSlot.length - 1] + 1 === slot) {
                  currentSlot.push(slot);
              } else {
                  continuousSlots.push(currentSlot);
                  currentSlot = [slot];
              }
          }
      }
      if (currentSlot !== null) {
          continuousSlots.push(currentSlot);
      }
      
      console.log(`Continuous Slots for ${date}:`, continuousSlots);
      
      newData[date] = { "new_available_slots": continuousSlots.map(slot => convertToTimeSlot(slot[0])) };
    }
  }
  
  console.log("Processed data:", newData);
  return newData;
}



window.function = async function(json) {
  
  if (json.value === undefined) return "Enter your json";
  let jsonData = JSON.parse(json.value);
  
const result = removeBookingsFromAvailableSlots(jsonData);
console.log(`Result:`, result);
return JSON.stringify(result);}

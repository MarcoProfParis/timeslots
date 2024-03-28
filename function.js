function splitArrayIntoConsecutive(arr) {
    var result = [];
    var currentChunk = [];
    
    for (var i = 0; i < arr.length; i++) {
        if (i === 0 || arr[i] === arr[i - 1] + 1) {
            currentChunk.push(arr[i]);
        } else {
            result.push(currentChunk);
            currentChunk = [arr[i]];
        }
    }
    
    if (currentChunk.length > 0) {
        result.push(currentChunk);
    }
    
    return result;
}

function removeBookingsFromAvailableSlots(data) {
  const newData = {};
  for (const date in data) {
    const availableSlots = data[date].available_slots;
    const bookings = data[date].bookings;
    
    // Filter out bookings from available slots
    newData = splitArrayIntoConsecutive(newData);
console.log('new ',newData);
  }
  
  return JSON.stringify(newData);
}

window.function = async function(json) {
    if (json.value === undefined) return "Enter your json";
    let jsonData = JSON.parse(json.value);

    const result = removeBookingsFromAvailableSlots(jsonData);
    return result;
}

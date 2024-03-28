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
  for (const date in data) {
    const availableSlots = data[date].available_slots;
    const bookings = data[date].bookings;
    
    // Filter out bookings from available slots
    const filteredSlots = availableSlots.filter(slot => !bookings.includes(slot));
    
    // Sort the filtered slots
    const sortedSlots = filteredSlots.sort((a, b) => a - b);
    
    // Split the sorted slots into smaller arrays containing consecutive numbers
    let consecutiveArrays = [];
    let tempArray = [];
    for (let i = 0; i < sortedSlots.length; i++) {
      if (tempArray.length === 0 || sortedSlots[i] === tempArray[tempArray.length - 1] + 1) {
        tempArray.push(sortedSlots[i]);
      } else {
        consecutiveArrays.push(tempArray);
        tempArray = [sortedSlots[i]];
      }
    }
    if (tempArray.length > 1) {
      consecutiveArrays.push(tempArray);
    }
    
    // Update data with consecutive arrays
    data[date].available_slots = consecutiveArrays;
  }
  
  return JSON.stringify(newData);
}

window.function = async function(json) {
    if (json.value === undefined) return "Enter your json";
    let jsonData = JSON.parse(json.value);

    const result = removeBookingsFromAvailableSlots(jsonData);
    return result;
}

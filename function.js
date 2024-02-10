window.function = async function(url,pwd,email) {
  if (url.value === undefined) return undefined;
  if (email.value === undefined) return "Enter your email";
  if (pwd.value === undefined) return undefined;
let webhook = url.value;
  const ch = email.value;
  const raw = JSON.stringify([
    {
        "params": {
            "pwd": {
                "type": "string",
                "value": pwd.value
            },
            "email": {
                "type": "string",
                "value": ch
            }
        }
    }
]);

  const requestOptions = {
    method: 'POST',
    bodyType: 'raw',
    body: raw,
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow'
  };

 / Return temporary message immediately
    let tempMessage = "Please checkkkk your email";

    try {
        // Fetch data asynchronously
        const response = await fetch(`${webhook}`, requestOptions);
      
        // Read the response body as plain text
        const data = await response.text();
        
        // Update the temporary message with the actual data
        tempMessage = data;
    } catch (error) {
        console.error('Error:', error);
        // Handle errors if any
        tempMessage = "Error occurred"; // Update temporary message with an error message
    }

    return tempMessage; // Return temporary message
};

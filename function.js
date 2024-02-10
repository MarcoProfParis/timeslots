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

 // Return temporary data immediately
    let tempData = "Please Check your email";

    fetch(`${webhook}`, requestOptions)
    .then(response => {
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Read the response body as plain text
        return response;
    })
    .then(data => {
        // Once the response is received, update the return value with the actual data
        tempData = data.text();
    })
    .catch(error => {
        console.error('Error:', error);
    });

    return tempData; // Return temporary data
};

const express = require("express");
const app = express();

app.get("/sse", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const intervalId = setInterval(() => {
    // SSE format: data: <message>\n\n
    res.write(`data: ${new Date().toLocaleTimeString()}\n\n`);
  }, 1000);

  req.on("close", () => {
    console.log("Connection closed by client.");
    clearInterval(intervalId);
  });
});

// provide a simple html page
app.get("/", (req, res) => {
  res.send(`
    <h1>SSE Timer</h1>
    <div id='clock'></div>
    <br/>
    <button onclick="closeConnection()">Close</button>
    <button onclick="openConnection()">Open</button>
    <style>
      body {
        font-family: Arial, sans-serif;
        text-align: center;
        margin-top: 50px;
      }
      #clock {
        font-size: 2em;
        color: #333;
      }
      button {
        margin: 5px;
        padding: 10px 20px;
        font-size: 1em;
      }
      button:hover {
        background-color: #f0f0f0;
      }
    </style>
    <script>
      const clock = document.getElementById('clock');
      let eventSource;
      function openConnection() {
        eventSource = new EventSource('/sse');
        eventSource.onmessage = function(event) {
          clock.innerText = event.data;
        };
        eventSource.onerror = function(event) {
          console.error("EventSource failed:", event);
        };
        eventSource.onopen = function(event) {
          console.log("Connection to server opened.");
        };
        console.log("Connection opened.");  
      }
      
      openConnection();

      function closeConnection() {
        eventSource.close();
        console.log("Connection closed.");
      }
        
    </script>
  `);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
// To run this cod e, make sure you have Node.js and Express installed.
// You can run it using the command: node index.js
// Open your browser and navigate to http://localhost:3000 to see the SSE in action.

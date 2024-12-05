// Import the app
import app from "./app";

// Set the port number for the server
const port = 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`Server is running on http://localhost:${port}`);
});

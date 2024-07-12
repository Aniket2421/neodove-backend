Backend
models/User.js: Defines the user schema and methods for password hashing and comparison.
controllers/authController.js: Handles user registration and login.
routes/authRoutes.js: Defines routes for user registration and login.
wsServer.js: Sets up WebSocket server with authentication.
server.js: Main server file that initializes Express and WebSocket servers.
In this chat application, WebSockets provide the foundation for real-time communication. The integration involves:

Setting up a WebSocket server: This server is capable of handling multiple client connections simultaneously.
Authenticating connections: Each client connection is authenticated using a JWT token to ensure only legitimate users can access the chat.
Handling messages: The server broadcasts messages from any connected client to all other clients, maintaining a real-time chat experience.
Client-side management: The client establishes a WebSocket connection and handles sending and receiving messages, updating the user interface in real-time.
This implementation ensures secure, efficient, and real-time communication between users in the chat application.

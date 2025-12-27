# LazeyStore: Full-Stack E-Commerce Store

Lazeystore is a full-stack e-commerce platform designed to provide a seamless shopping experience. It includes features like JWT authentication, an admin panel, and Docker support for easy deployment.

## Features

- **Full-Stack Architecture**: Combines a robust backend with a dynamic frontend.
- **JWT Authentication**: Secure user authentication and session management.
- **Admin Panel**: Manage products, users, and orders efficiently.
- **Docker Support**: Simplified containerized deployment.
- **Routing**: Intuitive navigation for users.
- **Responsive Design**: Optimized for all devices.

## Tech Stack

- **Frontend**: React, Redux, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Docker

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ksrscharan/lazeystore.git
   cd lazeystore
   ```

2. Install dependencies:

   ```bash
   npm install
   cd server
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `server` directory with the following:
     ```
     MONGO_URI=your_mongodb_connection_string
     ```

4. Start the development servers:

   ```bash
   # Start the frontend
   npm run dev

   # Start the backend
   cd server
   npm run dev
   ```

5. Access the application:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

## Docker Deployment

1. Build and run the Docker containers:

   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

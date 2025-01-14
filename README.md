# WebApp Express 🎬

A simple web application built with Express.js, MySQL, and Node.js. This project demonstrates basic CRUD operations, middleware usage, and database interactions.

## Features ✨

- Retrieve all movies with average reviews 🎥
- Retrieve details of a single movie by ID 🔍
- Add a review to a movie 📝
- Handle 404 errors and general errors 🚫

## Installation 🛠️

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/webapp-express.git
   cd webapp-express
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory and add your database configuration:**
   ```
   DB_HOST=your_db_host
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   ```

## Usage 🚀

1. **Start the server:**

   ```bash
   npm start
   ```

2. **The server will run on `http://localhost:3000`.**

## API Endpoints 📡

- `GET /movies`: Retrieve all movies
- `GET /movies/:id`: Retrieve a single movie by ID
- `POST /movies/:id/reviews`: Add a review to a movie

## Middleware 🛡️

- `notFound`: Handles 404 errors
- `errorHandler`: Handles general errors

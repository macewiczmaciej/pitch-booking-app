# Pitch Booking App

## Overview
Pitch Booking App is a modern web application designed to simplify the process of booking sports pitches. Users can browse available pitches, check their details, and make reservations through an intuitive interface. Administrators can manage users, pitches, and reservations with ease.

## Features
### User Features
- User registration and login with secure password hashing.
- View available pitches with details like name, city, and address.
- Book pitches by selecting time slots through a calendar view.
- View and manage personal reservations.

### Admin Features
- Manage users, including adding, editing, and deleting accounts.
- Add, edit, and delete pitches with associated information.
- View, filter, and delete reservations.

## Technologies Used

### Backend
- **Node.js**: Server-side runtime environment.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM for MongoDB.
- **JWT (JSON Web Token)**: Used for user authentication.
- **Bcrypt.js**: Password hashing.

### Frontend
- **React.js**: For building a dynamic and responsive user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client for API communication.
- **React Router**: For routing and navigation.

## Installation and Setup
### Prerequisites
- **Node.js**: Installed on your local machine.
- **MongoDB**: Set up a local or cloud database.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/macewiczmaciej/pitch-booking-app.git
   cd pitch-booking-app
   ```
2. Set up the backend:
   ```bash
   cd api
   npm install
   ```
   Create a `.env` file in the `api` directory with the following variables:
   ```env
   MONGO=<Your MongoDB URI>
   JWT_SECRET=<Your Secret Key>
   FRONT_URL=http://localhost:3000
   API_URL=http://localhost:8800
   PORT=8800
   ```
   Start the backend server:
   ```bash
   npm start
   ```
3. Set up the frontend:
   ```bash
   cd ../client
   npm install
   ```
   Create a `.env` file in the `client` directory with the following variables:
   ```env
   REACT_APP_API_URL=http://localhost:8800/api
   REACT_APP_FRONTEND_URL=http://localhost:3000
   ```
   Start the frontend server:
   ```bash
   npm start
   ```

## Folder Structure
```
pitch-booking-app/
    api/                # Backend code
        controllers/    # Logic for API endpoints
        models/         # Mongoose schemas
        routes/         # API routes
        utils/          # Helper functions
    client/             # Frontend code
        src/
            components/ # Reusable React components
            pages/      # React pages for routing
            context/    # Global state management
```

## Usage
1. Access the application at `http://localhost:3000`.
2. Register as a new user or log in with existing credentials.
3. Explore available pitches and make reservations.
4. Administrators can log in to access admin-specific features, such as managing users and reservations.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
Created by **Maciej Macewicz**. For any inquiries, please contact [macewicz.maciej@gmail.com](mailto:macewicz.maciej@gmail.com).


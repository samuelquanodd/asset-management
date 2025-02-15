# Asset Management System

## Overview
This project provides a robust asset management solution with real-time capabilities using Socket.io and MongoDB. The system allows you to manage assets, assign and remove tags, and group assets based on their properties (such as manufacturer or category). Real-time updates ensure seamless collaboration and synchronization across connected clients.

## Features
Real-time updates: All changes (e.g., tag removal) are broadcasted to connected clients using Socket.io.
Asset Management: Easily manage and manipulate asset data stored in MongoDB.
Tag Management: Add and remove tags associated with assets.
Group Assets: View assets grouped by their category or manufacturer.
Pagination: Assets are paginated to improve the user experience when dealing with large datasets.
Error Handling: Handles potential errors with clear responses.

## Technologies Used

### Backend:
Node.js with Express
Socket.io for real-time communication
MongoDB for persistent asset storage
Mongoose for MongoDB object modeling
Faker.js for generating dummy asset data

### Frontend:
React.js with Material-UI for a clean and modern UI.
Real-time asset updates via Socket.io.

## Installation
### Prerequisites
Node.js
MongoDB (local or cloud)
### Steps
Run the backend
`cd backend`
`npm install `
`nodemon server.js`

Run the frontend
`cd frontend`
`npm install`
`npm start`
Open your browser and navigate to `http://localhost:3000`

# Booking System

This project is a booking system developed as part of a  back-end development course. It's designed to manage course bookings and user interactions efficiently.

## Tech Stack and Design

The application is built using:

- **Frontend:** React.js
- **Backend:** Next.js with a PostgreSQL database
- **MVP Architecture:** The project adheres to the Model-View-Presenter (MVP) pattern for separation of concerns

### Layers:

- **Components/**: Holds reusable React components that are used to build the user interface.
- **Models/**: Contains the application's business logic, data structures, and functions. It is responsible for managing the application's data and state without concern for user interface or presentation logic.
- **Presenters/**: Functions as the coordinator between the `components` (View) and `models`. It retrieves data from the `models`, and formats it for display in the `components`.
- **Views/**: This layer displays the user interface by stacking UI components, which the `presenters` render after utilizing data from the `models`.
- **app/**: A Special directory for Next.js page routing, API endpoints and more.
- **app/api**: A RESTful API for all interaction with the database.


## Concepts Studied

While working on this project, the following key concepts were studied:

1. **Authentication and Session Management:** Implementation of JWT tokens.
2. **Password Hashing:** Using bcrypt for secure password storage.
3. **Protected Routes:** Utilizing Next.js middleware to safeguard routes.
4. **Authorization:** Restricting admin routes access via Higher Order Components.
5. **Real-time Updates:** Leveraging websockets for immediate booking or deletion updates.
6. **RESTful API:** Creating and managing CRUD operations using Next.js's `route.js` files in the **app/api** folder and following the RESTful principles.
7. **Error Handling and Form Validation:** Ensuring user-friendly interfaces.

## Features

### User

- **Log In:** Access the system with credentials.
- **Course Access:** View registered courses.
- **Booking Management:** Fetch, create, and delete reservation slots for courses.
- **Feedback Submission:** Rate courses through a feedback system.

### Admin

- **User Account Management:** Create user accounts.
- **Course Access Control:** Assign user access to various courses with specific roles (student, teacher, TA, etc.).
- **Booking List Management:** Create and oversee booking lists for courses.
- **Reservation Oversight:** View, delete, or create reservations for any user.
- **Feedback Review:** Access and review all user feedback.

## ERD

![ERD](ERD.png)

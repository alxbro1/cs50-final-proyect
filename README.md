# Medic App
## Video Demo:  <URL HERE>
## Description:
### Overview
Medic App is a web application tailored for the medical industry, focusing on enabling users to schedule appointments with healthcare professionals efficiently. The application is designed to streamline the process for patients and medical clinics alike. For the primary client, typically a medical clinic, the app provides a robust platform where administrators can oversee all appointment-related activities, including viewing, confirming, canceling, or marking appointments as pending. Additionally, the admin dashboard allows for the management of professionals and clients, including the ability to add new professionals and monitor client interactions with the clinic.

### Features and User Experience
The application ensures a seamless and intuitive user experience, requiring users to register and log in to access its features. Non-authenticated users are restricted from accessing protected routes and are automatically redirected to the login page. The login interface includes a link to the registration page for new users, accessible via a "Don't have an account?" prompt. Upon successful login, a token is stored in localStorage for authentication, valid for one hour, as configured in the `session.ts` file. This token facilitates quick access to protected routes and API interactions.

Once logged in, users are redirected based on their role: patients to the appointment booking page and administrators to the control panel. The home page ("/") features a top navigation bar with options to log out or navigate to the appointment creation page ("/appointments"). Logging out clears the token from localStorage, prompting re-authentication. The home page body displays a summary of the user's appointments, including details such as the professional’s name, date, time, and a button to cancel the appointment if needed.

The appointment booking page is divided into three key sections: a dropdown to select a professional, a calendar for choosing a date, and a set of buttons displaying available time slots for the selected professional and date. The calendar restricts selections to business days, ensuring appointments align with clinic schedules. The time selector dynamically updates to show only available slots, enhancing usability. A submit button sends the appointment request to the backend for processing.

The admin dashboard, accessible only to users with the "admin" role, provides comprehensive management tools. Administrators can view and modify appointment statuses (e.g., confirm, cancel, or mark as pending), manage user accounts, delete appointments or professionals, and add new professionals to the system. This centralized control ensures efficient clinic operations.

### Technical Architecture
#### Backend
The backend is built using **TypeScript** and **Node.js** (version 23.2.1) and follows a view-controller model for structured organization. All endpoints are logically divided into routes, controllers, and services to maintain clean code and scalability. The backend leverages **Express** to create a lightweight and fast API, ideal for solo development. **Prisma** is used for database management, providing an efficient ORM for handling data operations. A key endpoint, `/session/login`, validates user credentials and issues a one-hour JWT token for secure session management.

#### Frontend
The frontend is developed with **TypeScript**, **React.js**, and **Vite.js** for rapid development and optimized performance. It emphasizes reusable components and utilizes **React-router** for seamless navigation. To enhance development efficiency, several frameworks are integrated:
- **Formik**: Simplifies form creation and error handling.
- **React-Calendar**: Provides an intuitive interface for date selection.
- **Axios**: Manages API calls to the backend.

Guard components protect routes, ensuring only authenticated users can access sensitive pages. If unauthorized access is attempted, users are redirected to the login page.

#### Database Schema
The database is designed for simplicity and speed, comprising three main entities:
- **User**: `id`, `name`, `email`, `password`, `createdAt`, `updatedAt`, `role`.
- **Professional**: `id`, `name`, `createdAt`, `updatedAt`.
- **Appointment**: `id`, `userId`, `date`, `time`, `status`, `createdAt`, `updatedAt`, `professionalId`.

The **Appointment** entity serves as the core, linking users and professionals to facilitate appointment management. This schema supports the application’s primary goal of efficient appointment scheduling and management for both patients and clinics.

### Conclusion
Medic App combines a user-friendly interface with a robust technical foundation to deliver a reliable solution for medical appointment management. Its focus on reusable components, secure authentication, and a simple database structure ensures scalability and ease of use for both patients and administrators, making it an effective tool for medical clinics.

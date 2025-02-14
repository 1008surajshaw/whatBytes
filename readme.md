# Patient Management API

This is a TypeScript-based Express API for managing patient records. It provides endpoints for authentication, adding, retrieving, updating, and deleting patient data.

---

## Installation

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <https://github.com/1008surajshaw/whatBytes.git>
cd <cd whatBytes>
```

---

### 2. Set Up Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
PORT=3000
DATABASE_URL=your_database_url_here
JWT_SECRET=your_jwt_secret_here
```

- **`PORT`**: The port on which the server will run (default is `3000`).
- **`DATABASE_URL`**: The connection URL for your database (e.g., `postgres://user:password@localhost:5432/dbname`).
- **`JWT_SECRET`**: A secret key for signing JSON Web Tokens (JWT).

---

### 3. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

---

### 4. Build the Project

Compile the TypeScript code into JavaScript using the TypeScript compiler (`tsc`):

```bash
npx tsc
```

This will generate a `dist` folder containing the compiled JavaScript files.

---

### 5. Run the Server

Start the server using the compiled JavaScript files:

```bash
node dist/src/server.js
```

The server will start running on `http://localhost:3000` (or the port specified in your `.env` file).

---



# API Documentation

This document provides detailed information about the API routes for authentication, patient management, doctor management, and appointment mappings. Each section includes the route, expected request, and possible responses.

## Table of Contents
1. [Authentication](#authentication)
   - [Register](#register)
   - [Login](#login)
2. [Doctor Management](#doctor-management)
   - [Add Doctor](#add-doctor)
   - [Get All Doctors](#get-all-doctors)
   - [Get Doctor by ID](#get-doctor-by-id)
   - [Delete Doctor](#delete-doctor)
   - [Update Doctor](#update-doctor)
3. [Patient Management](#patient-management)
   - [Get All Patients](#get-all-patients)
   - [Delete Patient](#delete-patient)
   - [Add Patient](#add-patient)
   - [Update Patient](#update-patient)
   - [Get Patient by ID](#get-patient-by-id)
4. [Appointment Mappings](#appointment-mappings)
   - [Create Mapping](#create-mapping)
   - [Get All Mappings](#get-all-mappings)
   - [Update Mapping](#update-mapping)
   - [Delete Mapping](#delete-mapping)

## Authentication

### Register
- **Route:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "name": "Suraj Shaw",
    "email": "user@example.com",
    "password": "SecurePass123"
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "User registered successfully",
    "userId": "12345"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Email already in use"
  }
  ```

### Login
- **Route:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "email": "user1@example.com",
    "password": "123456"
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "Login successful",
    "token": "jwt.token.here"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

## Doctor Management

### Add Doctor
- **Route:** `POST /api/doctors/create`
- **Request Body:**
  ```json
  {
    "name": "doctor4",
    "specialization": "loomk",
    "experience": 2
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "Doctor added successfully",
    "doctorId": "67890"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Invalid input"
  }
  ```

### Get All Doctors
- **Route:** `GET /api/doctors/`
- **Success Response:**
  ```json
  [
    {
      "id": "1",
      "name": "doctor1",
      "specialization": "cardiology",
      "experience": 5
    },
    {
      "id": "2",
      "name": "doctor2",
      "specialization": "neurology",
      "experience": 10
    }
  ]
  ```
- **Error Response:**
  ```json
  {
    "error": "No doctors found"
  }
  ```

### Get Doctor by ID
- **Route:** `GET /api/doctors/:id`
- **Success Response:**
  ```json
  {
    "id": "2",
    "name": "doctor2",
    "specialization": "neurology",
    "experience": 10
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Doctor not found"
  }
  ```

### Delete Doctor
- **Route:** `DELETE /api/doctors/:id`
- **Success Response:**
  ```json
  {
    "message": "Doctor deleted successfully"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Doctor not found"
  }
  ```

### Update Doctor
- **Route:** `PUT /api/doctors/:id`
- **Request Body:**
  ```json
  {
    "name": "doctor01",
    "specialization": "looxlk",
    "experience": 12
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "Doctor updated successfully"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Invalid input"
  }
  ```

## Patient Management

### Get All Patients
- **Route:** `GET /api/patients/`
- **Success Response:**
  ```json
  [
    {
      "id": "1",
      "name": "John Doe",
      "age": 30,
      "gender": "male",
      "medicalHistory": ["Diabetes", "Hypertension"]
    },
    {
      "id": "2",
      "name": "Jane Doe",
      "age": 25,
      "gender": "female",
      "medicalHistory": ["Asthma"]
    }
  ]
  ```
- **Error Response:**
  ```json
  {
    "error": "No patients found"
  }
  ```

### Delete Patient
- **Route:** `DELETE /api/patients/:id`
- **Success Response:**
  ```json
  {
    "message": "Patient deleted successfully"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Patient not found"
  }
  ```

### Add Patient
- **Route:** `POST /api/patients/create`
- **Request Body:**
  ```json
  {
    "name": "Doe Doe",
    "age": 30,
    "gender": "male",
    "medicalHistory": ["Diabetes", "Hypertension"]
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "Patient added successfully",
    "patientId": "54321"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Invalid input"
  }
  ```

### Update Patient
- **Route:** `PUT /api/patients/:id`
- **Request Body:**
  ```json
  {
    "name": "Doe Doe",
    "age": 20,
    "gender": "male"
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "Patient updated successfully"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Invalid input"
  }
  ```

### Get Patient by ID
- **Route:** `GET /api/patients/:id`
- **Success Response:**
  ```json
  {
    "id": "1",
    "name": "John Doe",
    "age": 30,
    "gender": "male",
    "medicalHistory": ["Diabetes", "Hypertension"]
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Patient not found"
  }
  ```

## Appointment Mappings

### Create Mapping
- **Route:** `POST /api/mappings`
- **Request Body:**
  ```json
  {
    "patientId": "2",
    "doctorId": "1",
    "appointmentDate": "2024-08-25T14:00:00Z"
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "Mapping created successfully",
    "mappingId": "98765"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Invalid input"
  }
  ```

### Get All Mappings
- **Route:** `GET /api/mappings`
- **Success Response:**
  ```json
  [
    {
      "id": "1",
      "patientId": "2",
      "doctorId": "1",
      "appointmentDate": "2024-08-25T14:00:00Z"
    },
    {
      "id": "2",
      "patientId": "1",
      "doctorId": "2",
      "appointmentDate": "2024-09-01T10:00:00Z"
    }
  ]
  ```
- **Error Response:**
  ```json
  {
    "error": "No mappings found"
  }
  ```

### Update Mapping
- **Route:** `PUT /api/mappings/update/:id`
- **Request Body:**
  ```json
  {
    "patientId": "1",
    "doctorId": "2",
    "appointmentDate": "2024-08-25T14:00:00Z"
  }
  ```
- **Success Response:**
  ```json
  {
    "message": "Mapping updated successfully"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Invalid input"
  }
  ```

### Delete Mapping
- **Route:** `DELETE /api/mappings/:id`
- **Success Response:**
  ```json
  {
    "message": "Mapping deleted successfully"
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Mapping not found"
  }
  ```

---

This concludes the API documentation. For further assistance, please refer to the API source code or contact the development team.  generate .md code for auth routes only and i want only .md file
# nodejs_task

The task relies on creating a simple REST API for returning reservations from a given object. You
will get the data from two files amenity.csv and reservations.csv.

## Table of Contents

1. Endpoint that takes the amenity object id and the timestamp of the day as parameters,
   and returns a list of all bookings from amenity with the given id and the selected day. The list of
   reservations is sorted in ascending order by start time and contain the following data:
- reservation id
- user id
- start time in HH: MM format
- duration in minutes
- name of the amenity object
2. Endpoint that takes the user id as parameter, and returns a list of all bookings for this
   user grouped by days.
3. Endpoint that accepts a CSV file and returns data from this file, parsed to JSON. The data in the first row of a file are always headers.
4. A simple username - password authentication. User is able to create a new
   account and login to existing one.
5. An access control for endpoint in task no 3. It is available only for
   authenticated users. The other endpoints in the app are accessible for everyone (for both
   unauthenticated and authenticated users).

## Getting Started

## Endpoints

### 1. POST /auth/signup

**Description:** This endpoint is used for user registration. It allows a new user to create an account by providing a unique username and a password.

**Request Body:**
- `username`: The chosen username for the new account.
- `password`: The password associated with the account.

**Response:**
- If successful, the server responds with a message indicating that the account has been created successfully.

### 2. POST /auth/login

**Description:** This endpoint is used for user authentication. It allows an existing user to log in by providing their username and password.

**Request Body:**
- `username`: The username of the user attempting to log in.
- `password`: The password associated with the account.

**Response:**
- If authentication is successful, the server responds with a JSON web token (JWT) or another form of authentication token.

### 3. POST /auth/logout

**Description:** This endpoint is used to log out a user, effectively invalidating their authentication token.

**Request Headers:**
- `Authorization`: The authentication token obtained during login.

**Response:**
- If successful, the server responds with a message indicating that the logout was successful.

### 4. GET /amenities/:amenityId/bookings

**Description:** This endpoint retrieves bookings for a specific amenity based on the provided amenityId and timestamp.

**Request Parameters:**
- `amenityId`: The unique identifier for the amenity.

**Query Parameters:**
- `timestamp`: A timestamp to filter bookings based on a specific date or time.

**Response:**
- Returns a list of bookings associated with the specified amenity, potentially filtered by the provided timestamp.

### 5. GET /users/:userId/bookings

**Description:** This endpoint retrieves bookings for a specific user based on the provided userId.

**Request Parameters:**
- `userId`: The unique identifier for the user.

**Response:**
- Returns a list of bookings associated with the specified user.

### 6. POST /csv/parse-csv

**Description:** This endpoint is used to parse a CSV file. It requires authorization through an authentication token.

**Request Headers:**
- `Authorization`: The authentication token obtained during login.

**Request Body:**
- `csvFile`: A form-data field containing the CSV file to be parsed.

**Response:**
- If successful, the server responds with a data from the CSV file.



### Prerequisites

- Node.js
- MongoDB

or
- Docker

Use ```docker-compose build```
and
```docker-compose up```


### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pavelsamonin/nodejs_task.git
   cd nodejs_task

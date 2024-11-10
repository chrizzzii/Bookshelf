# Notes App

Welcome to the Notes App! 🎉
This project is part of the Dicoding course, aiming to build an API for a Notes App using JavaScript and the Hapi.js framework.

## Getting Started

The Notes App Back-End is an API application that allows users to create, read, update, and delete notes. This API is built using Hapi.js, a powerful and flexible framework for building web applications and APIs.

This project serves as both a learning exercise for building RESTful APIs using Hapi.js and a way to fulfill the requirements of the Dicoding course.

### Prerequisites

The following software and tools are required to build, test, and run this project:

- Node.js - JavaScript runtime environment
- npm - Node.js package manager
- Hapi.js - Web framework for building APIs
- Postman - API testing tools

### Installing

Follow these steps to get your development environment up and running:

Clone the repository:

    git clone https://github.com/chrizzzii/notes-app-back-end.git

Navigate to the project directory:

    cd notes-app-back-end

Install the required dependencies:

    npm install

Start the server:

    npm start

Test the API:

    The server will be running at http://localhost:5000.
    You can use Postman or Insomnia to interact with the API.

## Example Usage

- POST /notes - Create a new note
- GET /notes - Retrieve all notes
- GET /notes/{id} - Get a specific note by ID
- PUT /notes/{id} - Update a note by ID
- DELETE /notes/{id} - Delete a note by ID

### Sample Tests

Here are the types of tests included:

Functional Tests: Ensure that the API routes are working as expected (e.g., creating, reading, updating, and deleting notes).

    POST /notes
    Content-Type: application/json
    {
    "title": "Catatan A",
    "tags": ["Android", "Web"],
    "body": "Isi dari catatan A"
    }

Validation Tests: Ensure that the inputs meet the expected format and constraints (e.g., checking the presence of required fields).

    PUT /notes/1
    Content-Type: application/json
    {
    "title": "Catatan A Revised",
    "tags": ["Android", "Web"],
    "body": "Isi dari Catatan A Revised"
    }

## Built With

- Hapi.js - Web framework for building APIs
- [Creative Commons](https://creativecommons.org/) - Used to choose
  the license

## Authors

- **Agustinus Adven Christo** - [chrizzzii](https://github.com/chrizzzii)

## Acknowledgments

- Bangkit
- Dicoding

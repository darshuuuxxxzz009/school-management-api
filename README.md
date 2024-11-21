School Management API
The School Management API is a Node.js application that provides functionality to manage school data, including adding schools and retrieving a sorted list of schools based on proximity to a user-specified location.

Features
Add School API:
Add a new school to the database with details such as name, address, latitude, and longitude.
List Schools API:
Retrieve a list of all schools sorted by proximity to a user-specified location using geographical distance.
Technologies Used
Backend: Node.js, Express.js
Database: MySQL
Hosting: [https://school-management-api-lime.vercel.app/?vercelToolbarCode=-0_8IllARUpQA5v]
Testing: Postman
API Endpoints
1. Add School API
Endpoint: /addSchool
Method: POST
Description: Adds a new school to the database.
Request
Headers:
Content-Type: application/json
Body:
json
{
  "name": "Sunrise High School",
  "address": "123 Main Street",
  "latitude": 40.7128,
  "longitude": -74.0060
}
Response
Success:
json
{
  "message": "School added successfully!"
}
Failure:
json
{
  "error": "Validation error or server issue."
}
Validation:
Name, address, latitude, and longitude are required.
Latitude and longitude must be valid geographical coordinates.
2. List Schools API
Endpoint: /listSchools
Method: GET
Description: Fetches all schools and sorts them by proximity to the provided latitude and longitude.
Request
Query Parameters:
latitude: Latitude of the user’s location.
longitude: Longitude of the user’s location.
Example URL:
GET /listSchools?latitude=40.7128&longitude=-74.0060
Response
Success:
json
[
  {
    "id": 1,
    "name": "Greenwood High",
    "address": "123 Elm Street",
    "latitude": 40.7306,
    "longitude": -73.9352,
    "distance": 5.12
  },
  {
    "id": 2,
    "name": "Sunrise Academy",
    "address": "456 Oak Avenue",
    "latitude": 40.7127,
    "longitude": -74.0156,
    "distance": 2.47
  }
]
Failure:
json
{
  "error": "Latitude and longitude are required."
}
Validation:
Latitude and longitude are required.
Latitude and longitude must be valid numbers.
Distance Calculation:
Uses the Haversine formula to calculate the distance between the user’s location and each school.
Database Schema
Schools Table
Field	Type	Description
id	INT (Primary)	Unique identifier for the school.
name	VARCHAR	Name of the school.
address	VARCHAR	Address of the school.
latitude	FLOAT	Latitude of the school's location.
longitude	FLOAT	Longitude of the school's location.

Setup Instructions
1. Clone the Repository
bash
git clone <repository-url>
cd <repository-folder>

2. Install Dependencies :
bash
npm install
4. Set Up Environment Variables
Create a .env file in the root folder and add the following:

makefile
DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
PORT=3000
4. Set Up the Database
Run the following SQL command to create the schools table:

sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
5. Run the Application
bash
node index.js
# or
npx nodemon index.js
The server should start at http://localhost:3000.

Postman Collection
Import the Postman collection to test the APIs.

Collection Link: [Postman Shared Link]
Exported JSON File: [Attach the file]
Live API
The API is hosted and accessible at:

Base URL: [Your Hosted URL]
Testing Instructions
Use Postman or any REST client to test the APIs.
For /addSchool, ensure the payload is valid.
For /listSchools, pass valid latitude and longitude as query parameters.
Contributing
Feel free to fork the repository and contribute via pull requests.

License
This project is licensed under the MIT License.

# Bug Tracker Application

This is a full-stack bug tracking application built with React (client) and Node.js/Express (server). It allows users to create, view, update, and delete bugs.

## Technologies Used

* React
* Vite
* Node.js
* Express
* MongoDB
* Axios
* CSS

## Installation and Setup

1.  Clone the repository:

    ```bash
    git clone <your-repository-url>
    ```

2.  Navigate to the project directory:

    ```bash
    cd BugTracker
    ```

3.  **Install MongoDB:**

    * Follow the official MongoDB installation instructions for your operating system: [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)

4.  **Start MongoDB:**

    * Start the MongoDB server. Refer to the MongoDB documentation for instructions.

5.  Install server dependencies:

    ```bash
    cd server
    npm install
    ```

6.  **Configure MongoDB Connection:**

    * Create a `.env` file in the `server` directory.
    * Add your MongoDB connection string to the `.env` file:

      ```
      MONGODB_URI=mongodb://localhost:27017/bugtracker
      ```

      * Replace `mongodb://localhost:27017/bugtracker` with your actual MongoDB connection string.

7.  Start the server:

    ```bash
    cd server
    npm run start # or node server.js
    cd ..
    ```

8.  Install client dependencies:

    ```bash
    cd client
    npm install
    cd ..
    ```

9.  Start the client:

    ```bash
    cd client
    npm run dev
    cd ..
    ```

10. Open the application in your browser:

    ```bash
    http://localhost:5173/
    ```

## Project Structure

```
BugTracker/
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── BugDetails.jsx
│   │   │   ├── BugDetails.css
│   │   │   ├── BugForm.jsx
│   │   │   ├── BugForm.css
│   │   │   ├── BugList.jsx
│   │   │   ├── BugList.css
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── server/
│   ├── server.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
├── LICENSE
└── README.md```

# Collaborative Project Management App

A full-stack MERN application that allows teams to manage projects, tasks, and collaborations in real-time. This tool is designed to be secure, performant, and user-friendly, featuring user authentication, role-based access, and live updates using Socket.io.

**Live Demo:** [Link to your deployed application on Vercel/Render]

---

## Features

-   **User Authentication**: Secure user registration and login using JWT.
-   **Project Management**: Create, update, delete, and view projects.
-   **Task Management**: Kanban-style board with ToDo, InProgress, and Done columns.
-   **Real-Time Collaboration**: Task updates are broadcast to all project members instantly using Socket.io.
-   **Dashboard Overview**: At-a-glance view of all projects and tasks with a chart for task statuses.
-   **Search & Filter**: Easily find tasks by title or filter them by assignee.
-   **Protected Routes**: API is secured to ensure users can only access their own data.

---

## Tech Stack

-   **Frontend**: React, Vite, React Router, Axios, Chart.js, Socket.io Client
-   **Backend**: Node.js, Express.js, Mongoose
-   **Database**: MongoDB (via MongoDB Atlas)
-   **Authentication**: JSON Web Tokens (JWT), bcrypt
-   **Testing**: Jest, Supertest

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:
-   [Node.js](https://nodejs.org/) (v18.x or later recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)
-   [Git](https://git-scm.com/)

### Local Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/subha0319/Project-Manager](https://github.com/subha0319/Project-Manager)
    cd your-repo-name
    ```

2.  **Install Backend Dependencies:**
    ```sh
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```sh
    cd ../frontend
    npm install
    ```

4.  **Set Up Environment Variables:**
    -   In the `backend` folder, create a new file named `.env`.
    -   Copy the contents from the example below and replace the placeholder values with your own.

---

## Environment Variables

The backend requires the following environment variables. Create a `.env` file in the `/backend` directory:

```env
# The port your server will run on
PORT=5001

# Your MongoDB Atlas connection string
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/yourDatabaseName?retryWrites=true&w=majority

# A long, random string used to sign JWTs
JWT_SECRET=your_super_secret_jwt_string
```

---

## Available Scripts

### Backend

-   `npm start`: Runs the server with `nodemon`, which automatically restarts on file changes.
-   `npm test`: Runs the Jest test suite.

### Frontend

-   `npm run dev`: Starts the Vite development server for the React app.

---

## API Documentation

### User Routes

| Endpoint            | Method | Description                         | Protected | Body (Example)                                        |
| ------------------- | ------ | ----------------------------------- | --------- | ----------------------------------------------------- |
| `/api/users/register` | POST   | Register a new user.                | No        | `{ "name", "email", "password" }`                     |
| `/api/users/login`    | POST   | Log in a user and get a JWT.        | No        | `{ "email", "password" }`                             |
| `/api/users/profile`  | GET    | Get the profile of the logged-in user. | Yes       | `null`                                                |

### Project Routes

| Endpoint         | Method | Description                        | Protected | Body (Example)                  |
| ---------------- | ------ | ---------------------------------- | --------- | ------------------------------- |
| `/api/projects`    | GET    | Get all projects for the user.     | Yes       | `null`                          |
| `/api/projects`    | POST   | Create a new project.              | Yes       | `{ "title", "description" }`    |
| `/api/projects/:id`| PUT    | Update a project (owner only).     | Yes       | `{ "title", "description" }`    |
| `/api/projects/:id`| DELETE | Delete a project (owner only).     | Yes       | `null`                          |

### Task Routes

| Endpoint                  | Method | Description                       | Protected | Body (Example)                                |
| ------------------------- | ------ | --------------------------------- | --------- | --------------------------------------------- |
| `/api/tasks`              | POST   | Create a new task.                | Yes       | `{ "title", "projectId" }`                    |
| `/api/tasks/project/:id`  | GET    | Get all tasks for a project.      | Yes       | `null`                                        |
| `/api/tasks/:id`          | PUT    | Update a task (owner/assignee).   | Yes       | `{ "title", "status", "assignee" }` |
| `/api/tasks/:id`          | DELETE | Delete a task (owner only).       | Yes       | `null`                                        |

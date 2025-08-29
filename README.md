📝 RedNotes

A full-stack MERN note-taking application with PDF export and shareable notes

📌 Overview

RedNotes is a minimal yet feature-rich note-taking web app that I built to demonstrate my skills in full-stack development with the MERN stack.
It combines a React + Vite frontend with a Node.js/Express backend and MongoDB database, following industry-standard project structuring and best practices.

This project highlights:

Building a scalable REST API in Express

Designing a responsive React frontend with Tailwind CSS

Using MongoDB + Mongoose for data modeling

Handling authentication, CRUD operations, and rate limiting

Implementing PDF export and shareable read-only note links

🎯 Key Features

Notes CRUD: Create, update, delete, and view notes

PDF Export: Download notes as professional-looking PDFs

Sharable Links: Read-only view for sharing notes securely

Security: Basic rate-limiting to protect against abuse

Responsive Design: Works seamlessly across desktop and mobile

🏗️ Tech Stack

Frontend: React (Vite) + React Router + Tailwind CSS

Backend: Node.js (Express, ESM) + REST API

Database: MongoDB with Mongoose ODM

Other Tools: dotenv, CORS, PDF libraries

🔍 Why I Built This

I wanted to create a project that is:

Practical — note taking is universally useful

Full-stack — demonstrates frontend + backend integration

Extensible — features like PDF export and shareable links show ability to go beyond CRUD basics

This project simulates the kind of real-world product features recruiters look for: usability, scalability, and clear code organization.

📂 Architecture
RedNotes/
│── frontend/     # React + Vite client
│── backend/      # Express.js server
│    ├── src/
│    │   ├── server.js      # Backend entry point
│    │   ├── models/        # Mongoose models
│    │   ├── routes/        # Express routes
│    │   └── middleware/    # Rate limiting, validation
│── .gitignore
│── README.md


Frontend → clean UI with React Router navigation, styled with Tailwind

Backend → modular Express API, connected to MongoDB, secured with middleware

Database → document-based schema for flexible note storage

⚡ Highlights for Recruiters

✅ Applied clean separation of concerns (frontend & backend folders)

✅ Wrote code in ESM modules for modern Node.js

✅ Used environment variables for secure DB configs

✅ Implemented middleware patterns (rate limiting, error handling)

✅ Applied Git best practices (.gitignore, separating node_modules, etc.)

✅ Designed for scalability and extensibility

🚀 How to Run (For Reviewers)
# Clone repo
git clone https://github.com/<your-username>/RedNotes.git


Backend

cd backend
npm install
npm start


Frontend

cd frontend
npm install
npm run dev


App runs at:

Frontend → http://localhost:5173

Backend API → http://localhost:5001/api/notes


# ⚡ CipherStudio – Full Stack Web Application

CipherStudio is a **modern, cloud-enabled full-stack web application** that allows users to **register, log in, create projects, manage files, and edit code in-browser** — all with **AWS S3 integration** for secure file storage.  
It’s built using **React (Vite)** for the frontend and **Node.js + Express + MongoDB** for the backend.

---

## 🧭 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Folder Structure](#-folder-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Frontend Overview](#-frontend-overview)
- [Deployment](#-deployment)
- [Screenshots (Optional)](#-screenshots-optional)
- [Troubleshooting](#-troubleshooting)
- [Author](#-author)
- [License](#-license)

---

## 🌍 Overview

CipherStudio is a web platform where users can:

- Sign up and authenticate securely using JWT.
- Create and organize multiple projects.
- Upload, edit, and delete files in each project.
- Store files on AWS S3 for scalability.
- Use an integrated code editor and live preview panel.
- Manage everything through a clean and responsive React interface.

---

## ✨ Features

### 🔐 Authentication
- User Registration and Login with **JWT** tokens.
- **Password hashing** using bcrypt for security.
- Secure routes protected by middleware.

### 📁 Project & File Management
- Create, view, and delete projects.
- Upload files and store them on AWS S3.
- Download and manage file versions.

### 🧠 In-Browser Code Editor
- Syntax highlighting and code editing experience.
- File Explorer-style layout for easy navigation.
- Real-time preview for HTML/CSS/JS code.

### 🌐 Backend API
- RESTful architecture using **Express.js**.
- Modular route management (Auth, File, Project, User).
- Validation and error handling middleware.

### ☁️ Cloud Integration
- AWS S3 configured via SDK in `utils/s3.js`.
- Secure storage with environment-based credentials.

### 🧩 Additional Features
- Environment-based configurations for dev/production.
- Fully responsive UI built with **Tailwind CSS**.
- Clean folder separation for scalability.

---

## 🛠️ Tech Stack

| Layer | Technologies Used |
|--------|------------------|
| **Frontend** | React (Vite), Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB + Mongoose |
| **Authentication** | JWT, bcrypt |
| **Cloud Storage** | AWS S3 |
| **Environment Config** | dotenv |
| **Build Tools** | npm, vite |
| **Hosting (suggested)** | Render / Vercel / AWS EC2 |

---

## 🧱 System Architecture

```

Client (React) → Express API (Node.js) → MongoDB
↓
AWS S3

```

- **Frontend (cipherstudio/)** communicates with the **Backend (backend/)** using REST APIs.
- **Backend** handles all CRUD operations, authentication, and AWS uploads.
- **MongoDB** stores metadata (users, projects, files).
- **AWS S3** stores actual user-uploaded file content.

---

## 📂 Folder Structure

```

full-stack/
│
├── backend/
│   ├── server.js                # Main entry point
│   ├── package.json             # Backend dependencies
│   ├── .env                     # Environment variables
│   ├── models/                  # Database Schemas
│   │   ├── User.js              # User schema (name, email, password)
│   │   ├── Project.js           # Project schema (name, owner, files)
│   │   └── File.js              # File schema (filename, s3Key, projectId)
│   ├── routes/                  # API Routes
│   │   ├── authRoutes.js        # /api/auth (login/register)
│   │   ├── userRoutes.js        # /api/users
│   │   ├── projectRoutes.js     # /api/projects
│   │   └── fileRoutes.js        # /api/files
│   ├── middleware/
│   │   └── authMiddleware.js    # Protect routes using JWT
│   └── utils/
│       └── s3.js                # AWS S3 upload configuration
│
└── cipherstudio/                # Frontend React App
├── index.html
├── vite.config.js
├── package.json
├── tailwind.config.js
├── src/
│   ├── App.jsx              # Main React component
│   ├── main.jsx             # Entry point for Vite
│   ├── components/
│   │   ├── Editor.jsx       # Code editor component
│   │   ├── FileExplorer.jsx # Sidebar for files
│   │   ├── Preview.jsx      # Live output preview
│   │   ├── Navbar.jsx       # Top navigation bar
│   │   └── LoginForm.jsx    # Authentication form
│   ├── pages/
│   │   ├── Dashboard.jsx    # User dashboard
│   │   ├── ProjectPage.jsx  # Project details
│   │   └── Home.jsx         # Landing page
│   ├── services/
│   │   └── api.js           # Axios instance for API calls
│   └── styles/
│       └── global.css       # Tailwind styles

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/cipherstudio.git
cd cipherstudio/full-stack
````

### 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

### 3️⃣ Install Frontend Dependencies

```bash
cd ../cipherstudio
npm install
```

### 4️⃣ Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=your_region
S3_BUCKET_NAME=your_bucket_name
```

---

## 🚀 Running the Application

### Run Backend (Node Server)

```bash
cd backend
npm start
```

### Run Frontend (React)

```bash
cd ../cipherstudio
npm run dev
```

Now open your browser and visit:

```
http://localhost:5173
```

---

## 🧾 API Documentation

### 🔐 Authentication Routes (`/api/auth`)

| Method | Endpoint    | Description         |
| ------ | ----------- | ------------------- |
| POST   | `/register` | Register a new user |
| POST   | `/login`    | Login existing user |

### 📁 Project Routes (`/api/projects`)

| Method | Endpoint | Description          |
| ------ | -------- | -------------------- |
| GET    | `/`      | Get all projects     |
| POST   | `/`      | Create a new project |
| DELETE | `/:id`   | Delete a project     |

### 🗂️ File Routes (`/api/files`)

| Method | Endpoint      | Description               |
| ------ | ------------- | ------------------------- |
| POST   | `/upload`     | Upload file to S3         |
| GET    | `/:projectId` | Get all files for project |
| DELETE | `/:fileId`    | Delete a file             |

---

## 💻 Frontend Overview

The frontend is powered by **React + Vite** for ultra-fast development and **Tailwind CSS** for styling.

### Key Components:

* **Editor.jsx** – Main code editor with syntax highlighting
* **FileExplorer.jsx** – Displays project file hierarchy
* **Preview.jsx** – Renders real-time output for HTML/CSS/JS
* **Navbar.jsx** – Provides navigation and logout functionality

---

## 🚀 Deployment

### 🖥️ Backend

* You can deploy your Node.js + MongoDB backend on **Render**, **Railway**, or **AWS EC2**.
* Ensure environment variables are configured in your deployment dashboard.

### 🌐 Frontend

* Build the frontend:

  ```bash
  npm run build
  ```
* Deploy on **Vercel** or **Netlify** using the `dist/` folder.

---

## 🧩 Troubleshooting

| Issue                              | Possible Fix                                                             |
| ---------------------------------- | ------------------------------------------------------------------------ |
| **MongoDB not connecting**         | Check if your `MONGO_URI` is correct and your cluster IP is whitelisted. |
| **AWS Upload not working**         | Verify AWS credentials and correct bucket region.                        |
| **JWT Token Invalid**              | Delete old token and re-login.                                           |
| **Frontend not connecting to API** | Update API base URL in `src/services/api.js`.                            |

---

## 👨‍💻 Author

**Raj Sekhar**

If you like this project, consider giving it a ⭐ on GitHub!

---

## 📜 License

This project is licensed under the **MIT License**.
You are free to use, modify, and distribute it as long as proper credit is given.

---

> 🚀 *CipherStudio – A developer-friendly full-stack playground built for scalability, learning, and innovation.*

```

---

